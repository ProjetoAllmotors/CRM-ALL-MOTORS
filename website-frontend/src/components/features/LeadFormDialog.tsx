import { useForm } from 'react-hook-form'
import type { ReactNode } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ModalShell } from './ModalShell'
import type { LeadDetails } from './QuickActionDialog'

const leadSchema = z.object({
  name: z.string().trim().min(2, 'Informe o nome do lead'),
  city: z.string().trim().min(2, 'Informe a cidade e o estado'),
  model: z.string().min(1, 'Selecione um modelo'),
  payment: z.string().min(1, 'Selecione uma forma de pagamento'),
})

type LeadFormValues = z.infer<typeof leadSchema>

interface LeadFormDialogProps {
  onClose(): void
  onSuccess(details: LeadDetails): void
}

export function LeadFormDialog({ onClose, onSuccess }: LeadFormDialogProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: { name: '', city: '', model: 'K-Zero · R$ 5.900', payment: 'Pix' },
  })

  return (
    <ModalShell title="Novo Lead" description="Registre uma oportunidade para a rede All Motors." onClose={onClose}>
      <form onSubmit={handleSubmit(onSuccess)} className="space-y-4">
        <Field label="Nome do cliente" error={errors.name?.message}>
          <input {...register('name')} placeholder="Ex.: Fernanda Rocha" className="field-control" />
        </Field>
        <Field label="Cidade e UF" error={errors.city?.message}>
          <input {...register('city')} placeholder="Ex.: Recife, PE" className="field-control" />
        </Field>
        <Field label="Modelo de interesse" error={errors.model?.message}>
          <select {...register('model')} className="field-control">
            <option>K-Zero · R$ 5.900</option>
            <option>K1-May · R$ 8.900</option>
            <option>ALL-B1Z · R$ 9.900</option>
            <option>Ciclomotor · R$ 12.900</option>
          </select>
        </Field>
        <Field label="Forma de pagamento" error={errors.payment?.message}>
          <select {...register('payment')} className="field-control">
            <option>Pix</option>
            <option>Cartão de crédito · 12x</option>
            <option>Financiamento</option>
          </select>
        </Field>
        <div className="flex gap-3 pt-1">
          <button type="button" onClick={onClose} className="h-10 flex-1 rounded-md bg-raised text-xs hover:bg-slate-700">Cancelar</button>
          <button type="submit" className="h-10 flex-1 rounded-md bg-brand-500 text-xs font-semibold hover:bg-brand-700">Criar Lead</button>
        </div>
      </form>
    </ModalShell>
  )
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] font-medium text-slate-200">{label}</span>
      {children}
      {error && <span className="mt-1 block text-[9px] text-rose-300">{error}</span>}
    </label>
  )
}
