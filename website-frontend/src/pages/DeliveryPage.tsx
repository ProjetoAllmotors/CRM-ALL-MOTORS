import { useState } from 'react'
import { CalendarDays, Check, ChevronDown, MapPin, PackageCheck, Plus, Truck } from 'lucide-react'

const shipments = [
  { id: '#10482', customer: 'Mariana Costa', vehicle: 'AIMA K1-May', city: 'Recife, PE', date: '21 nov · 09:30', status: 'Saiu para entrega', tone: 'blue' },
  { id: '#10479', customer: 'Bruno Lima', vehicle: 'AIMA K-Zero', city: 'João Pessoa, PB', date: '21 nov · 14:00', status: 'Separação concluída', tone: 'success' },
  { id: '#10476', customer: 'Mercado Boa Vista', vehicle: 'ALL-TK Carga', city: 'Maceió, AL', date: '22 nov · 10:00', status: 'Agendada', tone: 'neutral' },
]

export function DeliveryPage() {
  const [notice, setNotice] = useState('')

  return (
    <div className="mx-auto max-w-[1152px]">
      <header className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
        <div>
          <h1 className="font-heading text-[28px] font-semibold tracking-tight">Envios e entregas</h1>
          <p className="mt-1 text-sm text-slate-400">Prepare, acompanhe e conclua a entrega dos veículos.</p>
        </div>
        <button type="button" onClick={() => setNotice('Nova entrega adicionada à agenda.')} className="flex h-[38px] items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-xs font-medium text-white hover:bg-brand-700">
          <Plus className="h-4 w-4" />Nova entrega
        </button>
      </header>

      <section className="mt-7 grid gap-4 sm:grid-cols-3">
        {[
          { value: '3', label: 'Entregas hoje', icon: Truck },
          { value: '1', label: 'Em rota', icon: MapPin },
          { value: '2', label: 'Preparadas', icon: PackageCheck },
        ].map(({ value, label, icon: Icon }) => (
          <article key={label} className="rounded-xl bg-elevated p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-heading text-2xl font-semibold">{value}</p>
                <p className="mt-1 text-[11px] text-slate-400">{label}</p>
              </div>
              <Icon className="h-5 w-5 text-[#66A5FF]" />
            </div>
          </article>
        ))}
      </section>

      <section className="mt-5 overflow-hidden rounded-xl bg-elevated">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
          <div>
            <h2 className="text-base font-semibold">Agenda de entregas</h2>
            <p className="mt-1 text-[10px] text-slate-400">Próximas 48 horas</p>
          </div>
          <button className="flex h-9 items-center gap-2 rounded-md bg-raised px-3 text-[10px] text-slate-300">
            <CalendarDays className="h-3.5 w-3.5" />21–22 nov <ChevronDown className="h-3 w-3" />
          </button>
        </div>
        <div className="divide-y divide-border">
          {shipments.map((shipment) => (
            <article key={shipment.id} className="grid gap-4 px-5 py-4 md:grid-cols-[90px_minmax(180px,1fr)_minmax(180px,1fr)_150px] md:items-center">
              <span className="text-[10px] font-semibold text-[#66A5FF]">{shipment.id}</span>
              <div>
                <h3 className="text-xs font-semibold">{shipment.customer}</h3>
                <p className="mt-1 text-[10px] text-slate-400">{shipment.vehicle}</p>
              </div>
              <div>
                <p className="flex items-center gap-1.5 text-[10px] text-slate-300"><MapPin className="h-3 w-3 text-slate-400" />{shipment.city}</p>
                <p className="mt-1 text-[10px] text-slate-400">{shipment.date}</p>
              </div>
              <span className={`justify-self-start rounded-md px-2 py-1.5 text-[9px] md:justify-self-end ${shipment.tone === 'success' ? 'bg-emerald-950 text-emerald-300' : shipment.tone === 'blue' ? 'bg-[#12305B] text-[#8AB9FF]' : 'bg-raised text-slate-300'}`}>
                {shipment.status}
              </span>
            </article>
          ))}
        </div>
      </section>

      {notice && (
        <div role="status" className="mt-4 flex items-center justify-between rounded-lg bg-[#12305B] px-4 py-3 text-xs text-[#CFE1FF]">
          <span className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-300" />{notice}</span>
          <button type="button" onClick={() => setNotice('')} aria-label="Fechar aviso">×</button>
        </div>
      )}
    </div>
  )
}
