import { createContext } from 'react'

export interface QuickActions {
  region: string
  openRegionFilter(): void
  openGlobalSearch(): void
  openTriage(): void
  openChecklist(): void
  openQuickReply(onUse: (message: string) => void): void
  selectRegion(region: string): void
  openLead(): void
  openTestRide(): void
  openSimulator(): void
}

export const QuickActionContext = createContext<QuickActions | null>(null)
