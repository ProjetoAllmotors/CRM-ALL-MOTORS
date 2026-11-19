import { useState } from 'react'
import { CalendarDays, ChevronDown } from 'lucide-react'
import { QuickActionButtons } from '../components/features/QuickActionButtons'

const rides = [
  { time: '09:30', name: 'Mariana Costa', model: 'K1-May • Grafeno', status: 'Concluído', note: 'Triagem concluída · termo de responsabilidade', warning: false },
  { time: '11:00', name: 'Carlos Eduardo', model: 'Bosch 1000W • Chumbo', status: 'Confirmado', note: 'Triagem concluída · termo de responsabilidade', warning: false },
  { time: '14:30', name: 'Ana Beatriz', model: 'Ciclomotor 1200W • Chumbo', status: 'Validar CNH', note: 'CNH A / ACC · documento pendente', warning: true },
  { time: '16:00', name: 'Pedro Alves', model: 'K-Zero • Chumbo', status: 'Confirmado', note: 'Triagem concluída · termo de responsabilidade', warning: false },
]

const vehicles = [
  { name: 'K1-May · DEMO-01', detail: 'Grafeno · 428 km', percent: 92, status: 'Disponível', warning: false },
  { name: 'ALL-B1Z · DEMO-02', detail: 'Lítio · 612 km', percent: 68, status: 'Em Test-Ride', warning: false },
  { name: 'K-Zero · DEMO-03', detail: 'Chumbo · 201 km', percent: 24, status: 'Recarregando', warning: true },
  { name: 'Ciclomotor · DEMO-04', detail: 'Chumbo · 890 km', percent: 83, status: 'Disponível', warning: false },
]

export function TestRidesPage() {
  const [activeTab, setActiveTab] = useState<'agenda' | 'frota'>('agenda')

  return (
    <div className="mx-auto max-w-[1152px]">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
        <div>
          <h1 className="font-heading text-[28px] font-semibold tracking-tight">Test-Rides &amp; frota</h1>
          <p className="mt-1 text-sm text-slate-400">Experiências que transformam interesse em vendas.</p>
        </div>
        <QuickActionButtons />
      </div>

      <div className="mb-5 mt-7 flex flex-wrap items-center gap-3">
        <button className="flex h-8 items-center gap-2 rounded-md bg-[#172B49] px-3 text-[10px] text-slate-200">Recife · Piedade <ChevronDown className="h-3 w-3" /></button>
        <button className="flex h-8 items-center gap-2 rounded-md bg-[#172B49] px-3 text-[10px] text-slate-200">Hoje, 18 novembro <ChevronDown className="h-3 w-3" /></button>
        <div className="ml-auto flex rounded-lg bg-elevated p-1" role="tablist" aria-label="Visualização de Test-Rides">
          <button
            role="tab"
            aria-selected={activeTab === 'agenda'}
            onClick={() => setActiveTab('agenda')}
            className={`rounded-md px-3 py-1.5 text-[10px] ${activeTab === 'agenda' ? 'bg-[#12305B] text-[#8AB9FF]' : 'text-slate-400'}`}
          >
            Agenda
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'frota'}
            onClick={() => setActiveTab('frota')}
            className={`rounded-md px-3 py-1.5 text-[10px] ${activeTab === 'frota' ? 'bg-[#12305B] text-[#8AB9FF]' : 'text-slate-400'}`}
          >
            Frota
          </button>
        </div>
      </div>

      <section className={`grid gap-5 ${activeTab === 'frota' ? 'xl:grid-cols-1' : 'xl:grid-cols-[minmax(0,740px)_minmax(300px,1fr)]'}`}>
        {activeTab === 'agenda' && (
          <article className="rounded-xl bg-elevated p-5 sm:p-6">
            <h2 className="text-base font-semibold">Quarta-feira, 18 de novembro</h2>
            <p className="mt-1 text-[11px] text-slate-400">4 agendamentos • 2 confirmados • 1 pendente • 1 concluído</p>
            <div className="mt-6 space-y-4">
              {rides.map((ride) => (
                <div key={ride.time} className="grid grid-cols-[52px_minmax(0,1fr)] items-start gap-3">
                  <span className="pt-3 text-xs text-slate-400">{ride.time}</span>
                  <article className={`rounded-lg border-l-[3px] ${ride.warning ? 'border-warning' : 'border-brand-500'} bg-raised p-4`}>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h3 className="text-xs font-semibold">{ride.name}</h3>
                        <p className="mt-1.5 text-[10px] text-slate-400">{ride.model}</p>
                      </div>
                      <span className={`rounded-md bg-[#142E4A] px-2 py-1.5 text-[9px] ${ride.warning ? 'text-warning' : 'text-emerald-300'}`}>{ride.status}</span>
                    </div>
                    <p className={`mt-4 text-[10px] ${ride.warning ? 'text-warning' : 'text-emerald-300'}`}>{ride.note}</p>
                  </article>
                </div>
              ))}
            </div>
            <p className="mt-7 text-[10px] text-slate-400">Duração padrão de 30 min • intervalo de recarga reservado</p>
          </article>
        )}

        <article className="rounded-xl bg-elevated p-5 sm:p-6">
          <h2 className="text-base font-semibold">Prontos para uma volta</h2>
          <p className="mt-1 text-[11px] text-slate-400">Saúde e disponibilidade da frota</p>
          <div className="mt-7 space-y-7">
            {vehicles.map((vehicle) => (
              <div key={vehicle.name}>
                <h3 className="text-xs font-semibold">{vehicle.name}</h3>
                <p className="mt-2 text-[10px] text-slate-400">{vehicle.detail}</p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="h-1.5 flex-1 rounded-full bg-[#334155]">
                    <div className={`h-full rounded-full ${vehicle.warning ? 'bg-warning' : 'bg-success'}`} style={{ width: `${vehicle.percent}%` }} />
                  </div>
                  <span className="w-8 text-right text-[10px]">{vehicle.percent}%</span>
                </div>
                <p className={`mt-2 text-[10px] ${vehicle.warning ? 'text-warning' : 'text-emerald-300'}`}>{vehicle.status}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <div className="mt-5 flex items-center gap-2 rounded-md bg-[#142E4A] px-3 py-2 text-[10px] text-warning">
        <CalendarDays className="h-3 w-3 shrink-0" />
        Atenção: CNH A ou ACC obrigatória na categoria ciclomotor. Não liberar saída com documentação pendente.
      </div>
      <p className="mt-5 text-[10px] text-slate-500">Operação demonstrativa • valores e registros de exemplo</p>
    </div>
  )
}
