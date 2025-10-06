import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD')
    const data = await response.json()
    
    return NextResponse.json({
      rates: {
        USD: 1,
        INR: data.rates.INR
      },
      lastUpdated: data.date
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch rates' }, { status: 500 })
  }
}