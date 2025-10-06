import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import jsPDF from 'jspdf'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const invoice = await db.invoice.findUnique({
      where: { id: params.id },
      include: {
        client: true,
        project: true,
        items: true
      }
    })

    if (!invoice) {
      return NextResponse.json({ error: 'Invoice not found' }, { status: 404 })
    }

    // Create PDF
    const pdf = new jsPDF()
    
    // Header
    pdf.setFontSize(24)
    pdf.text('INVOICE', 20, 30)
    
    pdf.setFontSize(12)
    pdf.text(`Invoice #: ${invoice.number}`, 20, 50)
    pdf.text(`Date: ${new Date(invoice.issueDate).toLocaleDateString()}`, 20, 60)
    pdf.text(`Due Date: ${new Date(invoice.dueDate).toLocaleDateString()}`, 20, 70)
    
    // Bill To
    pdf.setFontSize(14)
    pdf.text('Bill To:', 20, 90)
    pdf.setFontSize(12)
    pdf.text(invoice.client.name, 20, 105)
    if (invoice.client.company) {
      pdf.text(invoice.client.company, 20, 115)
    }
    if (invoice.client.address) {
      pdf.text(invoice.client.address, 20, 125)
    }
    if (invoice.client.email) {
      pdf.text(invoice.client.email, 20, 135)
    }

    // Project Info
    if (invoice.project) {
      pdf.text(`Project: ${invoice.project.name}`, 20, 150)
    }

    // Items Table Header
    let yPos = 170
    pdf.setFontSize(12)
    pdf.text('Description', 20, yPos)
    pdf.text('Qty', 120, yPos)
    pdf.text('Rate', 140, yPos)
    pdf.text('Amount', 170, yPos)
    
    // Draw line under header
    pdf.line(20, yPos + 5, 190, yPos + 5)
    yPos += 15

    // Items
    invoice.items.forEach((item) => {
      pdf.text(item.description, 20, yPos)
      pdf.text(item.quantity.toString(), 120, yPos)
      pdf.text(`$${item.rate.toFixed(2)}`, 140, yPos)
      pdf.text(`$${item.amount.toFixed(2)}`, 170, yPos)
      yPos += 10
    })

    // Totals
    yPos += 10
    pdf.line(120, yPos, 190, yPos)
    yPos += 10
    
    pdf.text('Subtotal:', 140, yPos)
    pdf.text(`$${invoice.subtotal.toFixed(2)}`, 170, yPos)
    yPos += 10
    
    if (invoice.tax > 0) {
      pdf.text('Tax:', 140, yPos)
      pdf.text(`$${invoice.tax.toFixed(2)}`, 170, yPos)
      yPos += 10
    }
    
    pdf.setFontSize(14)
    pdf.text('Total:', 140, yPos)
    pdf.text(`$${invoice.total.toFixed(2)}`, 170, yPos)

    // Notes
    if (invoice.notes) {
      yPos += 20
      pdf.setFontSize(12)
      pdf.text('Notes:', 20, yPos)
      pdf.text(invoice.notes, 20, yPos + 10)
    }

    // Generate PDF buffer
    const pdfBuffer = Buffer.from(pdf.output('arraybuffer'))

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="Invoice-${invoice.number}.pdf"`
      }
    })

  } catch (error) {
    console.error('PDF generation error:', error)
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 })
  }
}