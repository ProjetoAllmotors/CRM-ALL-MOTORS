import { Plus, SlidersHorizontal } from 'lucide-react'
import { useQuickActions } from './useQuickActions'

export function QuickActionButtons() {
  const actions = useQuickActions()

  return (
    <div className="grid grid-cols-2 gap-3 sm:flex">
      <button onClick={actions.openLead} className="flex h-[38px] items-center justify-center gap-2 rounded-lg bg-brand-500 px-3 text-xs font-medium text-white transition-colors hover:bg-brand-700">
        <Plus className="h-4 w-4" />Novo Lead
      </button>
      <button onClick={actions.openTestRide} className="flex h-[38px] items-center justify-center gap-2 rounded-lg bg-raised px-3 text-xs text-slate-100 transition-colors hover:bg-slate-700">
        <Plus className="h-4 w-4" />Test-Ride
      </button>
      <button onClick={actions.openSimulator} className="col-span-2 flex h-[38px] items-center justify-center gap-2 rounded-lg bg-raised px-3 text-xs text-slate-100 transition-colors hover:bg-slate-700 sm:col-span-1">
        <SlidersHorizontal className="h-3.5 w-3.5" />Simulador
      </button>
    </div>
  )
}
