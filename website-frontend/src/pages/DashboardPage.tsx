import { CalendarDays, ChevronRight } from 'lucide-react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { QuickActionButtons } from '../components/features/QuickActionButtons'
import { useUserRole } from '../auth/userRoleStore'
import { useDateFilter } from '../components/layout/DateFilterContext'

const metrics = [
  { title: 'Veículos vendidos', value: '48', change: '↑ 20%', note: 'vs. outubro · rede', detail: 'Meta mensal: 60 veículos', progress: 80 },
  { title: 'Receita do mês', value: 'R$ 412.800', change: '↑ 18,4%', note: 'vs. outubro · rede', detail: 'Ticket médio: R$ 8.600', progress: 72 },
  { title: 'Conversão Test-Ride', value: '64%', change: '↑ 8 p.p.', note: 'vs. outubro · rede', detail: '32 vendas em 50 experiências', progress: 64 },
  { title: 'Mix de vendas', value: '75% / 25%', change: '36 / 12', note: 'veículos', detail: 'Autopropelidos / Ciclomotores + B2B', progress: 75 },
]

const revenue = [
  { date: '01 nov', value: 110 }, { date: '03 nov', value: 145 }, { date: '05 nov', value: 128 },
  { date: '07 nov', value: 184 }, { date: '09 nov', value: 163 }, { date: '11 nov', value: 212 },
  { date: '13 nov', value: 242 }, { date: '15 nov', value: 229 }, { date: '17 nov', value: 281 },
  { date: '18 nov', value: 312 }, { date: '20 nov', value: 341 }, { date: '22 nov', value: 366 },
  { date: '24 nov', value: 412 },
]

const states = [
  { name: 'PE', value: 22, share: '46%' },
  { name: 'AL', value: 10, share: '21%' },
  { name: 'PB', value: 9, share: '19%' },
  { name: 'RN', value: 7, share: '14%' },
]

const actions = [
  { time: '09:30', title: 'Test-Ride · Mariana Costa', detail: 'K1-May • Recife, PE', badge: 'Confirmado', tone: 'success', responsible: 'Rafael Mendes', date: '2026-11-18' },
  { time: '11:00', title: 'Enviar proposta · Mercado Boa Vista', detail: 'ALL-TK • Maceió, AL', badge: 'B2B', tone: 'blue', responsible: 'Marina Costa', date: '2026-11-18' },
  { time: '14:30', title: 'Revisão de 1.000 km · João Lima', detail: 'ALL-B1Z • João Pessoa, PB', badge: 'Pós-venda', tone: 'success', responsible: 'Rafael Mendes', date: '2026-11-18' },
]

export function DashboardPage() {
  const { role, userName } = useUserRole()
  const { selectedDate } = useDateFilter()
  const sellerMetrics = [
    { title: 'Vendas do mês', value: '8', change: '↑ 2', note: 'vs. outubro', detail: 'Meta mensal: 12 vendas', progress: 67 },
    { title: 'Comissão estimada', value: 'R$ 6.240', change: '↑ 12%', note: 'vs. outubro', detail: 'Calculada sobre as vendas registradas', progress: 72 },
    { title: 'Conversão Test-Ride', value: '60%', change: '↑ 5 p.p.', note: 'vs. outubro', detail: '6 vendas em 10 experiências', progress: 60 },
    { title: 'Oportunidades ativas', value: '6', change: '↑ 1', note: 'esta semana', detail: '3 follow-ups pendentes', progress: 50 },
  ]
  const visibleMetrics = role === 'admin' ? metrics : sellerMetrics
  const visibleActions = actions.filter((action) =>
    action.date === selectedDate && (role === 'admin' || action.responsible === userName),
  )
  const visibleRevenue = role === 'admin' ? revenue : revenue.map((point) => ({ ...point, value: Math.round(point.value * 0.08) }))

  return (
    <div className="mx-auto max-w-[1152px]">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
        <div>
          <h1 className="font-heading text-[28px] font-semibold tracking-tight">{role === 'admin' ? 'Visão geral da loja' : 'Seus indicadores e resultados'}</h1>
          <p className="mt-1 text-sm text-slate-400">{role === 'admin' ? 'Uma visão completa da energia do seu negócio.' : `Acompanhe suas metas, comissões e vendas, ${userName.split(' ')[0]}.`}</p>
        </div>
        <QuickActionButtons />
      </div>

      <div className="mb-3 mt-8 flex items-center justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{role === 'admin' ? 'Performance da região selecionada' : 'Sua performance neste mês'}</p>
        <button className="flex items-center gap-2 text-xs text-slate-300 hover:text-white">Novembro de 2026 <CalendarDays className="h-3 w-3" /></button>
      </div>
      <section aria-label="Indicadores regionais" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {visibleMetrics.map((metric) => (
          <article key={metric.title} className="rounded-xl bg-elevated px-4 py-4">
            <p className="text-xs text-slate-400">{metric.title}</p>
            <p className="mt-3 font-heading text-[30px] font-semibold leading-none">{metric.value}</p>
            <div className="mt-3 flex items-center gap-2 text-[10px]">
              <span className="text-emerald-300">{metric.change}</span>
              <span className="text-slate-400">{metric.note}</span>
            </div>
            <p className="mt-3 truncate text-[10px] text-slate-400">{metric.detail}</p>
            <div className="mt-3 h-1 rounded-full bg-[#202B3D]">
              <div className="h-full rounded-full bg-brand-500" style={{ width: `${metric.progress}%` }} />
            </div>
          </article>
        ))}
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]">
        <article className="min-h-[290px] rounded-xl bg-elevated p-5">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-base font-semibold">{role === 'admin' ? 'Receita Nordeste em movimento' : 'Sua receita em movimento'}</h2>
              <p className="mt-1 text-[11px] text-slate-400">{role === 'admin' ? 'Acumulado mensal • R$' : 'Acumulado individual • R$'}</p>
            </div>
            <span className="rounded-md bg-emerald-950 px-2 py-1 text-[10px] text-emerald-300">{role === 'admin' ? '+18,4% no mês' : '67% da meta'}</span>
          </div>
          <div className="mt-5 h-[205px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={visibleRevenue} margin={{ top: 8, right: 4, left: -18, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0066FF" stopOpacity={0.14} />
                    <stop offset="100%" stopColor="#0066FF" stopOpacity={0.01} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#26354D" vertical={false} />
                <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fill: '#94A3B8', fontSize: 9 }} interval={3} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: '#94A3B8', fontSize: 9 }} tickFormatter={(value: number) => `${value} mil`} />
                <Tooltip contentStyle={{ background: '#1E2A3D', border: '1px solid #334155', borderRadius: 8, color: '#F8FAFC', fontSize: 11 }} />
                <Area type="linear" dataKey="value" stroke="#0066FF" strokeWidth={2.5} fill="url(#revenueFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="rounded-xl bg-elevated p-5">
          <h2 className="text-base font-semibold">{role === 'admin' ? 'A força do Nordeste' : 'Sua carteira por região'}</h2>
          <p className="mt-1 text-[11px] text-slate-400">{role === 'admin' ? '48 veículos • distribuição por UF' : 'Oportunidades sob sua responsabilidade'}</p>
          <div className="mt-6 space-y-5">
            {(role === 'admin' ? states : states.map((state, index) => ({ ...state, value: index === 0 ? 4 : index === 1 ? 1 : 0, share: index === 0 ? '80%' : index === 1 ? '20%' : '0%' }))).map((state) => (
              <div key={state.name} className="flex items-center gap-3 text-xs">
                <span className="w-7 font-semibold">{state.name}</span>
                <div className="h-2 flex-1 rounded-full bg-[#202B3D]">
                  <div className="h-full rounded-full bg-brand-500" style={{ width: `${state.value / 22 * 100}%`, opacity: state.name === 'PE' ? 1 : 0.7 }} />
                </div>
                <span className="w-10 text-right text-slate-400">{state.value} · {state.share}</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]">
        <article className="rounded-xl bg-elevated p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-semibold">{role === 'admin' ? 'Próximas ações da rede' : 'Suas próximas ações'}</h2>
            <button className="flex items-center gap-1 text-[11px] text-[#66A5FF] hover:text-white">Ver agenda <ChevronRight className="h-3 w-3" /></button>
          </div>
          <div className="divide-y divide-border">
            {visibleActions.map((action) => (
              <div key={action.time} className="flex items-center gap-3 py-3">
                <span className="w-12 text-xs text-slate-400">{action.time}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium">{action.title}</p>
                  <p className="mt-1 text-[10px] text-slate-400">{action.detail}</p>
                </div>
                <span className={`rounded-md px-2 py-1 text-[10px] ${action.tone === 'success' ? 'bg-emerald-950 text-emerald-300' : 'bg-[#12305B] text-[#8AB9FF]'}`}>{action.badge}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-xl bg-elevated p-5">
          <h2 className="text-base font-semibold">Mobilidade para todos</h2>
          <div className="mt-6 space-y-5">
            {[
              { label: 'Autopropelidos', count: 36, percent: 75, color: 'bg-brand-500' },
              { label: 'Ciclomotores', count: 8, percent: 17, color: 'bg-warning' },
              { label: 'Carga / B2B', count: 4, percent: 8, color: 'bg-success' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 text-xs">
                <span className={`h-2 w-2 rounded-full ${item.color}`} />
                <span className="flex-1 text-slate-400">{item.label}</span>
                <span>{item.count}</span><span className="w-8 text-right">{item.percent}%</span>
              </div>
            ))}
          </div>
        </article>
      </section>
      <p className="mt-5 text-[10px] text-slate-500">Operação demonstrativa • valores e registros de exemplo</p>
    </div>
  )
}
