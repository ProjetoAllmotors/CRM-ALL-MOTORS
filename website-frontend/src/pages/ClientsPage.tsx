import { useState } from 'react'
import { ArrowUpRight, CalendarDays, ChevronRight, CircleCheck, FileText, Wrench } from 'lucide-react'
import { QuickActionButtons } from '../components/features/QuickActionButtons'
import { useQuickActions } from '../components/features/useQuickActions'

const history = [
  { date: '30 mai · 2025', title: 'Revisão de 1.000 km agendada', detail: 'Inspeção de freios, bateria e pneus.', icon: CalendarDays },
  { date: '12 jun · 2025', title: 'Atendimento pós-venda', detail: 'Orientação de recarga e ajuste de freio.', icon: Wrench },
  { date: '17 jan · 2026', title: 'Primeira revisão concluída', detail: '500 km · sem itens críticos identificados.', icon: CircleCheck },
  { date: '10 fev · 2026', title: 'Entrega técnica realizada', detail: 'Manual, termo de garantia e orientações entregues.', icon: FileText },
  { date: '10 fev · 2026', title: 'Compra faturada', detail: 'AIMA K-Zero 350W · Recife, PE.', icon: CircleCheck },
]

export function ClientsPage() {
  const [notice, setNotice] = useState('')
  const { openChecklist } = useQuickActions()

  return (
    <div className="mx-auto max-w-[1152px]">
      <header className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
        <div>
          <h1 className="font-heading text-[28px] font-semibold tracking-tight">Clientes 360°</h1>
          <p className="mt-1 text-sm text-slate-400">Cada cliente, uma história de energia.</p>
        </div>
        <QuickActionButtons />
      </header>

      <section className="mt-7 flex flex-col gap-5 rounded-xl bg-elevated p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#1C3C68] font-heading text-lg font-semibold text-[#8AB9FF]">JL</div>
          <div>
            <h2 className="font-heading text-xl font-semibold">João Lima</h2>
            <p className="mt-1 text-[10px] text-slate-400">Cliente desde 03/2024 · Recife, PE · B2C</p>
            <span className="mt-2 inline-flex items-center gap-1 rounded bg-emerald-950 px-2 py-1 text-[9px] text-emerald-300">
              <CircleCheck className="h-3 w-3" />Cliente ativo
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:min-w-[280px]">
          <div className="rounded-lg bg-raised p-3">
            <p className="text-[9px] uppercase text-slate-400">Relacionamento</p>
            <p className="mt-2 text-xs font-semibold">1 veículo · 2 revisões</p>
          </div>
          <button onClick={() => setNotice('Histórico de relacionamento aberto.')} className="rounded-lg bg-raised p-3 text-left transition-colors hover:bg-slate-700">
            <span className="block text-[9px] uppercase text-slate-400">Ações rápidas</span>
            <span className="mt-2 flex items-center justify-between text-xs font-semibold">Ver histórico <ArrowUpRight className="h-3.5 w-3.5 text-[#66A5FF]" /></span>
          </button>
        </div>
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-2">
        <article className="rounded-xl bg-elevated p-5">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-base font-semibold">Uma jornada de confiança</h2>
              <p className="mt-1 text-[10px] text-slate-400">Histórico de relacionamento com a rede</p>
            </div>
            <button aria-label="Ver histórico completo" className="rounded-md p-1 text-slate-400 hover:bg-raised hover:text-white"><ChevronRight className="h-4 w-4" /></button>
          </div>
          <ol className="mt-5 space-y-4">
            {history.map(({ date, title, detail, icon: Icon }, index) => (
              <li key={`${date}-${title}`} className="relative flex gap-3">
                {index < history.length - 1 && <span className="absolute bottom-[-18px] left-[7px] top-5 w-px bg-[#304059]" />}
                <span className="relative z-10 mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#12305B] text-[#8AB9FF]">
                  <Icon className="h-2.5 w-2.5" />
                </span>
                <div>
                  <p className="text-[9px] text-slate-400">{date}</p>
                  <h3 className="mt-1 text-[11px] font-medium">{title}</h3>
                  <p className="mt-1 text-[9px] text-slate-400">{detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </article>

        <article className="rounded-xl bg-elevated p-5">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-base font-semibold">Meu veículo</h2>
              <p className="mt-1 text-[10px] text-slate-400">Histórico de uso e manutenção</p>
            </div>
            <button aria-label="Ver ficha do veículo" onClick={() => setNotice('Ficha do veículo selecionado.')} className="rounded-md p-1 text-slate-400 hover:bg-raised hover:text-white"><ArrowUpRight className="h-4 w-4" /></button>
          </div>
          <div className="mt-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-[9px] text-slate-400">Veículo vinculado ao cliente</p>
              <h3 className="mt-1 font-heading text-lg font-semibold">AIMA K-Zero · 350W</h3>
              <p className="mt-1 text-[9px] text-slate-400">VIN final ···· 4821</p>
            </div>
            <div className="flex h-14 w-20 shrink-0 items-center justify-center rounded-lg bg-raised">
              <img src="/images/aima-k1-may.png" alt="" className="h-full w-full rounded-lg object-cover" />
            </div>
          </div>

          <div className="mt-5 rounded-lg bg-raised p-3">
            <p className="text-[9px] font-medium uppercase tracking-wide text-slate-400">Garantia de fábrica</p>
            <p className="mt-2 text-[10px] text-slate-200">Consultar certificado vinculado ao VIN</p>
            <button onClick={() => setNotice('Certificado demonstrativo indisponível sem integração de backend.')} className="mt-3 flex w-full items-center justify-between rounded-md bg-[#172B49] px-3 py-2 text-[9px] text-[#8AB9FF] hover:bg-[#203B61]">
              Ver certificado de garantia <ArrowUpRight className="h-3 w-3" />
            </button>
            <button type="button" onClick={openChecklist} className="mt-2 flex w-full items-center justify-between rounded-md bg-[#172B49] px-3 py-2 text-[9px] text-[#8AB9FF] hover:bg-[#203B61]">
              Checklist de revisão <Wrench className="h-3 w-3" />
            </button>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              ['Chumbo', 'Bateria'],
              ['Grafeno', 'Linha AIMA'],
              ['Lítio', 'Alternativas'],
            ].map(([label, caption]) => (
              <div key={label} className="rounded-lg border border-[#28364B] p-3">
                <p className="text-[10px] font-semibold">{label}</p>
                <p className="mt-1 text-[8px] text-slate-400">{caption}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
      {notice && (
        <div role="status" aria-live="polite" className="mt-4 flex items-center justify-between rounded-lg bg-[#12305B] px-4 py-3 text-xs text-[#CFE1FF]">
          {notice}
          <button onClick={() => setNotice('')} aria-label="Fechar aviso" className="ml-3 text-[#8AB9FF]">×</button>
        </div>
      )}
      <p className="mt-5 text-[10px] text-slate-500">Operação demonstrativa • valores e registros de exemplo</p>
    </div>
  )
}
