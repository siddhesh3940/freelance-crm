'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface CurrencyRates {
  USD: number
  INR: number
}

interface CurrencyContextType {
  currency: string
  setCurrency: (currency: string) => void
  rates: CurrencyRates | null
  convertAmount: (amount: number, fromCurrency?: string) => number
  formatAmount: (amount: number, fromCurrency?: string) => string
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState('USD')
  const [rates, setRates] = useState<CurrencyRates | null>(null)

  useEffect(() => {
    fetch('/api/currency')
      .then(res => res.json())
      .then(data => setRates(data.rates))
      .catch(console.error)
  }, [])

  const convertAmount = (amount: number, fromCurrency = 'USD'): number => {
    if (!rates || fromCurrency === currency) return amount
    
    const usdAmount = fromCurrency === 'USD' ? amount : amount / rates.INR
    return currency === 'USD' ? usdAmount : usdAmount * rates.INR
  }

  const formatAmount = (amount: number, fromCurrency = 'USD'): string => {
    const converted = convertAmount(amount, fromCurrency)
    const formatters = {
      USD: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }),
      INR: new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' })
    }
    return formatters[currency as keyof typeof formatters]?.format(converted) || `${converted}`
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, rates, convertAmount, formatAmount }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider')
  }
  return context
}