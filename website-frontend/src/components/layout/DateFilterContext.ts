import { createContext, useContext } from 'react'

interface DateFilterValue {
  selectedDate: string
}

export const DateFilterContext = createContext<DateFilterValue | null>(null)

export function useDateFilter() {
  const context = useContext(DateFilterContext)
  if (!context) throw new Error('useDateFilter precisa estar dentro de DateFilterContext')
  return context
}
