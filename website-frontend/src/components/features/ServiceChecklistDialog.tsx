import { Check } from 'lucide-react'
import { ModalShell } from './ModalShell'

const checklist = [
  'Freios e pneus inspecionados',
  'Bateria e conectores verificados',
  'Iluminação e fixações conferidas',
  'Orientações de conservação entregues',
]

interface ServiceChecklistDialogProps {
  onClose(): void
}

export function ServiceChecklistDialog({ onClose }: ServiceChecklistDialogProps) {
  return (
    <ModalShell title="Checklist de revisão" description="João Lima · K-Zero · 1.000 km" onClose={onClose} size="frame">
      <div className="flex min-h-[355px] flex-col">
        <ul className="space-y-6 pt-2">
          {checklist.map((item) => (
            <li key={item} className="flex items-start gap-1.5 text-[10px] text-slate-300">
              <Check aria-hidden="true" className="mt-0.5 h-3 w-3 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-12 text-[9px] text-slate-400">Exemplo de checklist. Não substitui o manual de serviço.</p>
        <button type="button" onClick={onClose} className="mt-auto h-[38px] w-full rounded-md bg-brand-500 px-3 text-left text-[10px] text-white transition-colors hover:bg-brand-700">
          Concluir revisão
        </button>
      </div>
    </ModalShell>
  )
}
