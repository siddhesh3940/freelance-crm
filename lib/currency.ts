export function formatCurrency(amount: number, currency: string): string {
  const formatters = {
    USD: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }),
    INR: new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' })
  }
  
  return formatters[currency as keyof typeof formatters]?.format(amount) || `${amount}`
}

export function convertCurrency(amount: number, fromCurrency: string, toCurrency: string, rates: { USD: number; INR: number }): number {
  if (fromCurrency === toCurrency) return amount
  
  const usdAmount = fromCurrency === 'USD' ? amount : amount / rates.INR
  return toCurrency === 'USD' ? usdAmount : usdAmount * rates.INR
}