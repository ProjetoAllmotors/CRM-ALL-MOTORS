import { CircleCheck } from 'lucide-react'
import { ModalShell } from './ModalShell'
import type { LeadDetails, RideDetails } from './QuickActionDialog'

type SuccessDialogProps =
  | { type: 'lead'; details: LeadDetails; onClose(): void; navigate(path: string): void }
  | { type: 'ride'; details: RideDetails; onClose(): void; navigate(path: string): void }

export function SuccessDialog(props: SuccessDialogProps) {
  const isLead = props.type === 'lead'
  const title = isLead ? 'Lead criado com sucesso' : 'Test-Ride confirmado'

  return (
    <ModalShell title="" onClose={props.onClose}>
      <div className="-mt-2 flex flex-col items-center text-center">
        <CircleCheck className="h-11 w-11 text-emerald-400" aria-hidden="true" />
        <h3 className="mt-3 font-heading text-base font-semibold">{title}</h3>
        <p className="mt-1 text-[10px] text-slate-400">
          {isLead ? 'A oportunidade foi adicionada à etapa Novo Lead.' : 'O horário foi reservado na agenda da loja.'}
        </p>
        <div className="mt-5 w-full rounded-lg border border-border bg-raised p-4 text-left">
          {isLead ? (
            <LeadSummary details={props.details} />
          ) : (
            <RideSummary details={props.details} />
          )}
        </div>
        <button
          type="button"
          onClick={() => {
            props.navigate(isLead ? '/pipeline' : '/test-rides')
            props.onClose()
          }}
          className="mt-5 h-10 w-full rounded-md bg-brand-500 text-xs font-semibold transition-colors hover:bg-brand-700"
        >
          {isLead ? 'Ver no pipeline' : 'Ver agenda'}
        </button>
      </div>
    </ModalShell>
  )
}

function LeadSummary({ details }: { details: LeadDetails }) {
  return (
    <div className="space-y-2 text-[10px]">
      <SummaryRow label="Cliente" value={details.name} />
      <SummaryRow label="Cidade" value={details.city} />
      <SummaryRow label="Interesse" value={details.model} />
      <SummaryRow label="Pagamento" value={details.payment} />
    </div>
  )
}

function RideSummary({ details }: { details: RideDetails }) {
  return (
    <div className="space-y-2 text-[10px]">
      <SummaryRow label="Cliente" value={details.customer} />
      <SummaryRow label="Loja" value={details.city} />
      <SummaryRow label="Data e horário" value={`${details.date} às ${details.time}`} />
      <SummaryRow label="Veículo" value={details.vehicle} />
      <div className="mt-2 border-t border-border pt-2 text-emerald-300">CNH A/ACC validada · Termo aceito</div>
    </div>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return <div className="flex items-start justify-between gap-4"><span className="shrink-0 text-slate-400">{label}</span><span className="text-right text-slate-100">{value}</span></div>
}
