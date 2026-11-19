import { useForm } from 'react-hook-form'
import type { ReactNode } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { AlertTriangle } from 'lucide-react'
import { ModalShell } from './ModalShell'
import type { RideDetails } from './QuickActionDialog'

const rideSchema = z.object({
  customer: z.string().min(2, 'Selecione um cliente'),
  store: z.string().min(2, 'Selecione uma loja'),
  date: z.string().min(1, 'Informe uma data'),
  time: z.string().min(1, 'Informe um horário'),
  vehicle: z.string().min(1, 'Selecione um veículo'),
  licenseReviewed: z.boolean().refine((value) => value, 'Confirme a validação da habilitação'),
  termsAccepted: z.boolean().refine((value) => value, 'Confirme o aceite do termo'),
})

type RideFormValues = z.infer<typeof rideSchema>

interface TestRideDialogProps {
  onClose(): void
  onSuccess(details: RideDetails): void
}

export function TestRideDialog({ onClose, onSuccess }: TestRideDialogProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<RideFormValues>({
    resolver: zodResolver(rideSchema),
    defaultValues: {
      customer: 'Ana Beatriz · João Pessoa, PB',
      store: 'João Pessoa / PB',
      date: '2026-11-19',
      time: '14:30',
      vehicle: 'Ciclomotor 1200W · DEMO-04',
      licenseReviewed: false,
      termsAccepted: false,
    },
  })

  function submit(values: RideFormValues) {
    const [year, month, day] = values.date.split('-')
    onSuccess({
      customer: values.customer.split(' · ')[0],
      city: values.store,
      date: `${day}/${month}/${year}`,
      time: values.time,
      vehicle: values.vehicle,
    })
  }

  return (
    <ModalShell title="Agendar Test-Ride" description="Uma experiência segura começa com uma boa triagem." onClose={onClose} size="large">
      <form onSubmit={handleSubmit(submit)} className="space-y-3">
        <Field label="Cliente" error={errors.customer?.message}>
          <select {...register('customer')} className="field-control">
            <option>Ana Beatriz · João Pessoa, PB</option>
            <option>Mariana Costa · Recife, PE</option>
            <option>Carlos Eduardo · Maceió, AL</option>
          </select>
        </Field>
        <Field label="Loja" error={errors.store?.message}>
          <select {...register('store')} className="field-control">
            <option>João Pessoa / PB</option>
            <option>Recife · Piedade / PE</option>
            <option>Maceió / AL</option>
            <option>Natal / RN</option>
          </select>
        </Field>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Data" error={errors.date?.message}><input type="date" {...register('date')} className="field-control" /></Field>
          <Field label="Horário" error={errors.time?.message}><input type="time" {...register('time')} className="field-control" /></Field>
        </div>
        <Field label="Veículo demo" error={errors.vehicle?.message}>
          <select {...register('vehicle')} className="field-control">
            <option>Ciclomotor 1200W · DEMO-04</option>
            <option>K1-May 600W · DEMO-01</option>
            <option>ALL-B1Z 800W · DEMO-02</option>
            <option>K-Zero 350W · DEMO-03</option>
          </select>
        </Field>

        <div className="rounded-lg border border-warning/30 bg-[#2D2616] p-3">
          <div className="flex items-center gap-2 text-warning">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <p className="text-[10px] font-semibold">CNH A ou ACC obrigatória para ciclomotor</p>
          </div>
          <p className="mt-2 text-[9px] leading-relaxed text-amber-100/70">Não libere a saída antes de conferir os documentos e o termo de responsabilidade.</p>
          <label className="mt-3 flex items-start gap-2 text-[9px] text-slate-200">
            <input type="checkbox" {...register('licenseReviewed')} className="mt-0.5 accent-brand-500" />
            CNH A ou ACC conferida para esta categoria
          </label>
          {errors.licenseReviewed && <p className="mt-1 text-[9px] text-amber-300">{errors.licenseReviewed.message}</p>}
          <label className="mt-2 flex items-start gap-2 text-[9px] text-slate-200">
            <input type="checkbox" {...register('termsAccepted')} className="mt-0.5 accent-brand-500" />
            Termo de responsabilidade revisado e aceito
          </label>
          {errors.termsAccepted && <p className="mt-1 text-[9px] text-amber-300">{errors.termsAccepted.message}</p>}
        </div>
        <div className="flex gap-3 pt-1">
          <button type="button" onClick={onClose} className="h-10 flex-1 rounded-md bg-raised text-xs hover:bg-slate-700">Cancelar</button>
          <button type="submit" className="h-10 flex-1 rounded-md bg-brand-500 text-xs font-semibold hover:bg-brand-700">Confirmar agendamento</button>
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
