import { useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { QuickActionDialog, type DialogState, type LeadDetails, type RideDetails } from './QuickActionDialog'
import { QuickActionContext } from './QuickActionContext'
import type { QuickActions } from './QuickActionContext'

export function QuickActionProvider({ children }: { children: ReactNode }) {
  const [dialog, setDialog] = useState<DialogState>(null)
  const [region, setRegion] = useState('Todas NE')
  const navigate = useNavigate()

  const actions: QuickActions = {
    region,
    openRegionFilter: () => setDialog({ type: 'regionFilter' }),
    openGlobalSearch: () => setDialog({ type: 'globalSearch' }),
    openTriage: () => setDialog({ type: 'triage' }),
    openChecklist: () => setDialog({ type: 'checklist' }),
    openQuickReply: (onUse) => setDialog({ type: 'quickReply', onUse }),
    selectRegion: (selectedRegion) => {
      setRegion(selectedRegion)
      setDialog(null)
    },
    openLead: () => setDialog({ type: 'lead' }),
    openTestRide: () => setDialog({ type: 'testRide' }),
    openSimulator: () => setDialog({ type: 'simulator' }),
  }

  function showLeadSuccess(details: LeadDetails) {
    setDialog({ type: 'leadSuccess', details })
  }

  function showRideSuccess(details: RideDetails) {
    setDialog({ type: 'rideSuccess', details })
  }

  function navigateFromDialog(path: string) {
    setDialog(null)
    navigate(path)
  }

  return (
    <QuickActionContext.Provider value={actions}>
      {children}
      {dialog && (
        <QuickActionDialog
          state={dialog}
          onClose={() => setDialog(null)}
          onLeadSuccess={showLeadSuccess}
          onRideSuccess={showRideSuccess}
          navigate={navigateFromDialog}
          region={region}
          onSelectRegion={actions.selectRegion}
        />
      )}
    </QuickActionContext.Provider>
  )
}
