import { useContext } from 'react'
import { QuickActionContext } from './QuickActionContext'

export function useQuickActions() {
  const context = useContext(QuickActionContext)
  if (!context) throw new Error('useQuickActions must be used within QuickActionProvider')
  return context
}
