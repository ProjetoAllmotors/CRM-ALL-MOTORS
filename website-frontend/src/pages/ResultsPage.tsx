import { useState } from 'react'
import { Download, TrendingUp, Clock3, Percent, Smile } from 'lucide-react'

const dataByPeriod = {
  '7 dias': { completed: '100%', followup: '33%', conversion: '33%', satisfaction: '5,0/5', time: '16,9 dias' },
  '30 dias': { completed: '95%', followup: '40%', conversion: '55%', satisfaction: '4,8/5', time: '24,4 dias' },
  '90 dias': { completed: '92%', followup: '38%', conversion: '48%', satisfaction: '4,6/5', time: '21,2 dias' },
}

export function ResultsPage() {
  const [period, setPeriod] = useState<keyof typeof dataByPeriod>('30 dias')
  const data = dataByPeriod[period]

  return (
    <div className="mx-auto max-w-[1152px]">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <h1 className="font-heading text-[28px] font-semibold tracking-tight">Indicadores e resultados</h1>
          <p className="mt-1 text-sm text-slate-400">Resultados comerciais dos últimos {period}.</p>
        </div>
        <button type="button" className="flex h-9 items-center gap-2 self-start rounded-md border border-[#26354D] px-3 text-[10px] text-slate-300 hover:bg-raised"><Download className="h-3.5 w-3.5" />Exportar</button>
      </header>

      <div className="mt-7 flex flex-wrap items-center gap-2 rounded-xl bg-elevated p-3">
        <span className="mr-2 text-[10px] text-slate-300">Período de análise</span>
        {(['7 dias', '30 dias', '90 dias'] as const).map((item) => (
          <button key={item} type="button" onClick={() => setPeriod(item)} className={`h-8 rounded-md px-3 text-[9px] ${period === item ? 'bg-[#12305B] text-[#8AB9FF]' : 'text-slate-400 hover:bg-raised'}`}>{item}</button>
        ))}
        <button type="button" className="ml-auto h-8 rounded-md bg-brand-500 px-3 text-[9px] font-semibold text-white">Aplicar período</button>
      </div>

      <section className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Registros concluídos', value: data.completed, note: '9 de 9 registros', icon: TrendingUp, tone: 'emerald' },
          { label: 'Follow-up no prazo', value: data.followup, note: '1 de 3 vencidas', icon: Clock3, tone: 'warning' },
          { label: 'Conversão de propostas', value: data.conversion, note: '1 de 3 propostas', icon: Percent, tone: 'blue' },
          { label: 'Satisfação pós-venda', value: data.satisfaction, note: 'Média das avaliações', icon: Smile, tone: 'emerald' },
        ].map(({ label, value, note, icon: Icon, tone }) => (
          <article key={label} className="rounded-xl bg-elevated p-4">
            <div className="flex items-start justify-between"><p className="text-[10px] text-slate-400">{label}</p><Icon className={`h-4 w-4 ${tone === 'warning' ? 'text-warning' : tone === 'blue' ? 'text-[#66A5FF]' : 'text-emerald-300'}`} /></div>
            <p className="mt-3 font-heading text-2xl font-semibold">{value}</p><p className="mt-1 text-[8px] text-slate-500">{note}</p>
          </article>
        ))}
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-2">
        <article className="rounded-xl bg-elevated p-5">
          <h2 className="text-sm font-semibold">Evolução dos indicadores</h2>
          <div className="mt-5 flex h-[230px] items-end gap-3 border-b border-l border-[#26354D] px-3 pb-1">
            {[42, 58, 49, 64, 52, 68].map((height, index) => (
              <div key={index} className="flex flex-1 flex-col items-center justify-end">
                <div className="w-full max-w-12 rounded-t bg-brand-500/80" style={{ height: `${height}%` }} />
                <span className="mt-2 text-[8px] text-slate-500">{['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][index]}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-xl bg-elevated p-5">
          <h2 className="text-sm font-semibold">Tempo médio por etapa</h2>
          <div className="mt-5 space-y-4">
            {[
              ['Prospecção', '1,2 d', 24],
              ['Atendimento', '2,4 d', 48],
              ['Test-Ride', '3,6 d', 72],
              ['Proposta', '5,2 d', 100],
              ['Entrega', '4,1 d', 82],
              ['Pós-venda', '5,8 d', 116],
            ].map(([name, time, width]) => (
              <div key={String(name)} className="grid grid-cols-[72px_minmax(0,1fr)_38px] items-center gap-3 text-[9px]">
                <span className="text-slate-300">{name}</span>
                <div className="h-2 rounded-full bg-[#26354D]"><div className="h-full rounded-full bg-brand-500" style={{ width: `${Number(width) / 1.16}%` }} /></div>
                <span className="text-right text-slate-400">{time}</span>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  )
}
