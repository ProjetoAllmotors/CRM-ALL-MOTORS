import { ModalShell } from './ModalShell'

export const quickReplyText = 'A circulação em ciclovias depende do enquadramento do veículo e das regras locais. Vamos conferir a ficha técnica do modelo e orientar você com segurança.\n\nPara recarregar, utilize o carregador original e siga o manual da bateria do seu veículo.'

interface QuickReplyDialogProps {
  onClose(): void
  onUse(message: string): void
}

export function QuickReplyDialog({ onClose, onUse }: QuickReplyDialogProps) {
  return (
    <ModalShell title="Resposta rápida" onClose={onClose} size="frame">
      <div className="flex min-h-[355px] flex-col">
        <p className="text-[10px] font-semibold text-[#66A5FF]">Orientação para atendimento</p>
        <p className="mt-7 whitespace-pre-line text-xs leading-[1.35] text-slate-300">{quickReplyText}</p>
        <button
          type="button"
          onClick={() => {
            onUse(quickReplyText)
            onClose()
          }}
          className="mt-auto h-[38px] w-full rounded-md bg-brand-500 px-3 text-left text-[10px] text-white transition-colors hover:bg-brand-700"
        >
          Usar resposta e voltar
        </button>
      </div>
    </ModalShell>
  )
}
