'use client'

import { useCurrency } from '@/contexts/currency-context'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DollarSign } from 'lucide-react'

export function CurrencySelector() {
  const { currency, setCurrency, rates } = useCurrency()

  return (
    <div className="flex items-center space-x-2">
      <Select value={currency} onValueChange={setCurrency}>
        <SelectTrigger className="w-24">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="USD">
            <div className="flex items-center">
              <DollarSign className="w-4 h-4 mr-1" />
              USD
            </div>
          </SelectItem>
          <SelectItem value="INR">
            <div className="flex items-center">
              <span className="w-4 h-4 mr-1 text-center font-bold">₹</span>
              INR
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
      {rates && (
        <span className="text-xs text-gray-500">
          1 USD = ₹{rates.INR.toFixed(2)}
        </span>
      )}
    </div>
  )
}