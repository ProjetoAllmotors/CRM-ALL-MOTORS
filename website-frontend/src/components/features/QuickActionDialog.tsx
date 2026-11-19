import { LeadFormDialog } from './LeadFormDialog'
import { TestRideDialog } from './TestRideDialog'
import { SimulatorDialog } from './SimulatorDialog'
import { SuccessDialog } from './SuccessDialog'
import { ModalShell } from './ModalShell'
import { RegionFilterDialog } from './RegionFilterDialog'
import { GlobalSearchDialog } from './GlobalSearchDialog'
import { TriageDialog } from './TriageDialog'
import { ServiceChecklistDialog } from './ServiceChecklistDialog'
import { QuickReplyDialog } from './QuickReplyDialog'

export interface LeadDetails {
  name: string
  city: string
  model: string
  payment: string
}

export interface RideDetails {
  customer: string
  city: string
  date: string
  time: string
  vehicle: string
}

export type DialogState =
  | null
  | { type: 'lead' }
  | { type: 'testRide' }
  | { type: 'simulator' }
  | { type: 'regionFilter' }
  | { type: 'globalSearch' }
  | { type: 'triage' }
  | { type: 'checklist' }
  | { type: 'quickReply'; onUse(message: string): void }
  | { type: 'leadSuccess'; details: LeadDetails }
  | { type: 'rideSuccess'; details: RideDetails }

interface QuickActionDialogProps {
  state: Exclude<DialogState, null>
  onClose(): void
  onLeadSuccess(details: LeadDetails): void
  onRideSuccess(details: RideDetails): void
  navigate(path: string): void
  region: string
  onSelectRegion(region: string): void
}

export function QuickActionDialog({ state, onClose, onLeadSuccess, onRideSuccess, navigate, region, onSelectRegion }: QuickActionDialogProps) {
  if (state.type === 'lead') {
    return <LeadFormDialog onClose={onClose} onSuccess={onLeadSuccess} />
  }
  if (state.type === 'testRide') {
    return <TestRideDialog onClose={onClose} onSuccess={onRideSuccess} />
  }
  if (state.type === 'simulator') {
    return <SimulatorDialog onClose={onClose} />
  }
  if (state.type === 'regionFilter') {
    return <RegionFilterDialog selectedRegion={region} onClose={onClose} onSelect={onSelectRegion} />
  }
  if (state.type === 'globalSearch') {
    return <GlobalSearchDialog onClose={onClose} navigate={navigate} />
  }
  if (state.type === 'triage') {
    return <TriageDialog onClose={onClose} />
  }
  if (state.type === 'checklist') {
    return <ServiceChecklistDialog onClose={onClose} />
  }
  if (state.type === 'quickReply') {
    return <QuickReplyDialog onClose={onClose} onUse={state.onUse} />
  }
  if (state.type === 'leadSuccess') {
    return <SuccessDialog type="lead" details={state.details} onClose={onClose} navigate={navigate} />
  }
  return <SuccessDialog type="ride" details={state.details} onClose={onClose} navigate={navigate} />
}

export { ModalShell }
