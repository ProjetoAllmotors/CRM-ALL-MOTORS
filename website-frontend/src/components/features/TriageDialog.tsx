import { Check } from 'lucide-react'
import { ModalShell } from './ModalShell'

const requirements = [
  'Potência nominal e velocidade verificadas',
  'Dimensões e configuração verificadas',
  'Ficha técnica e enquadramento registrados',
  'Exigências de CNH / ACC e placa conferidas',
]

interface TriageDialogProps {
  onClose(): void
}

export function TriageDialog({ onClose }: TriageDialogProps) {
  return (
    <ModalShell title="Triagem CONTRAN 996" description="A classificação não depende apenas da potência." onClose={onClose} size="frame">
      <div className="flex min-h-[355px] flex-col">
        <ul className="space-y-6 pt-2">
          {requirements.map((requirement) => (
            <li key={requirement} className="flex items-start gap-1.5 text-[10px] text-slate-300">
              <Check aria-hidden="true" className="mt-0.5 h-3 w-3 shrink-0" />
              {requirement}
            </li>
          ))}
        </ul>
        <p className="mt-12 text-[9px] leading-relaxed text-warning">
          Ciclovias e ciclofaixas: consulte a classificação do veículo e as regras da autoridade local. Não prometa acesso universal.
        </p>
        <button type="button" onClick={onClose} className="mt-auto h-[38px] w-full rounded-md bg-brand-500 px-3 text-left text-[10px] text-white transition-colors hover:bg-brand-700">
          Triagem concluída
        </button>
      </div>
    </ModalShell>
  )
}
