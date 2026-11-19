import { Plus } from 'lucide-react'
import { QuickActionButtons } from '../components/features/QuickActionButtons'
import { useQuickActions } from '../components/features/useQuickActions'

interface Opportunity {
  name: string
  city: string
  model: string
  status: string
  channel: string
  price: string
  warning?: boolean
}

const stages: { title: string; count: number; color: string; cards: Opportunity[] }[] = [
  {
    title: 'Novo Lead', count: 3, color: 'border-t-[#66A5FF]', cards: [
      { name: 'Mariana Costa', city: 'Recife, PE', model: 'K1-May 600W', status: 'Sem CNH/Placa', channel: 'B2C · Cartão 12x', price: 'R$ 8.900' },
      { name: 'Pedro Alves', city: 'Natal, RN', model: 'K-Zero 350W', status: 'Sem CNH/Placa', channel: 'B2C · Pix', price: 'R$ 5.900' },
      { name: 'Mercado Boa Vista', city: 'Maceió, AL', model: 'ALL-TK Carga 400kg', status: 'Triagem B2B', channel: 'B2B · Financiamento', price: 'R$ 18.900' },
    ],
  },
  {
    title: 'Triagem CONTRAN 996', count: 2, color: 'border-t-warning', cards: [
      { name: 'Ana Beatriz', city: 'João Pessoa, PB', model: 'Ciclomotor 1200W', status: 'Requer CNH', channel: 'B2C · Cartão 18x', price: 'R$ 12.900', warning: true },
      { name: 'Lucas Ferreira', city: 'Recife, PE', model: 'ALL-B1Z 800W', status: 'Sem CNH/Placa', channel: 'B2C · Pix', price: 'R$ 9.900' },
    ],
  },
  {
    title: 'Test-Ride', count: 2, color: 'border-t-[#B38BFF]', cards: [
      { name: 'Carlos Eduardo', city: 'Maceió, AL', model: 'Bosch 1000W', status: 'Sem CNH/Placa', channel: 'B2C · Financiamento', price: 'R$ 10.900' },
      { name: 'Renata Silva', city: 'Natal, RN', model: 'Design iF 400W', status: 'Sem CNH/Placa', channel: 'B2C · Cartão 12x', price: 'R$ 8.900' },
    ],
  },
  {
    title: 'Simulação', count: 1, color: 'border-t-[#35C7E8]', cards: [
      { name: 'Júlia Santos', city: 'Recife, PE', model: 'Triciclo 650W', status: 'Sem CNH/Placa', channel: 'B2C · Pix', price: 'R$ 11.900' },
    ],
  },
  {
    title: 'Faturamento', count: 1, color: 'border-t-success', cards: [
      { name: 'Bruno Lima', city: 'João Pessoa, PB', model: 'K1-May 600W', status: 'Sem CNH/Placa', channel: 'B2C · Cartão 12x', price: 'R$ 8.900' },
    ],
  },
  {
    title: 'Entrega', count: 1, color: 'border-t-success', cards: [
      { name: 'João Lima', city: 'Recife, PE', model: 'K-Zero 350W', status: 'Sem CNH/Placa', channel: 'B2C · Pix', price: 'R$ 5.300' },
    ],
  },
]

export function PipelinePage() {
  const { openLead, openTriage } = useQuickActions()

  return (
    <div className="mx-auto max-w-[1152px]">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
        <div>
          <h1 className="font-heading text-[28px] font-semibold tracking-tight">Pipeline de vendas</h1>
          <p className="mt-1 text-sm text-slate-400">Cada conversa, um novo caminho para a mobilidade.</p>
        </div>
        <QuickActionButtons />
      </div>

      <div className="mb-3 mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
        <span className="text-xs font-semibold">10 oportunidades</span>
        <span className="text-xs text-slate-400">R$ 102.400 em negociação</span>
        <div className="ml-auto flex gap-2">
          <button className="rounded-md bg-[#172B49] px-3 py-1.5 text-[10px] text-slate-300">Todos os responsáveis ⌄</button>
          <button className="rounded-md bg-[#172B49] px-3 py-1.5 text-[10px] text-slate-300">B2C + B2B ⌄</button>
        </div>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="grid min-w-[1120px] grid-cols-6 gap-3">
          {stages.map((stage) => (
            <section key={stage.title} className={`flex min-h-[664px] flex-col rounded-b-lg border-t-[3px] ${stage.color} bg-elevated p-2`}>
              <header className="flex h-11 items-center justify-between gap-1 px-1">
                <h2 className="truncate text-[11px] font-semibold">{stage.title}</h2>
                <span className="text-[10px] text-slate-400">{stage.count}</span>
              </header>
              <div className="space-y-3">
                {stage.cards.map((card) => <OpportunityCard key={card.name} card={card} onTriage={openTriage} />)}
              </div>
              <button type="button" onClick={openLead} className="mt-auto flex items-center gap-1 px-1 py-3 text-[10px] text-slate-400 hover:text-brand-500">
                <Plus className="h-3 w-3" />Adicionar oportunidade
              </button>
            </section>
          ))}
        </div>
      </div>
      <p className="mt-4 text-[10px] leading-relaxed text-slate-400">
        Triagem regulatória: valide potência, velocidade e dimensões. A circulação depende da classificação e das regras locais.
      </p>
      <p className="mt-5 text-[10px] text-slate-500">Operação demonstrativa • valores e registros de exemplo</p>
    </div>
  )
}

function OpportunityCard({ card, onTriage }: { card: Opportunity; onTriage(): void }) {
  return (
    <article className="rounded-lg border border-[#344258] bg-raised p-3 transition-colors hover:border-brand-500/60">
      <div className="flex items-start justify-between gap-1">
        <h3 className="text-[11px] font-medium">{card.name}</h3>
        <button type="button" aria-label={`Opções de ${card.name}`} className="text-slate-400 hover:text-white">···</button>
      </div>
      <p className="mt-2 text-[10px] text-slate-400">{card.city}</p>
      <p className="mt-3 truncate text-[10px] text-slate-100">{card.model}</p>
      {card.warning ? (
        <button type="button" onClick={onTriage} aria-label={`Abrir triagem CONTRAN 996 de ${card.name}`} className="mt-2 w-full rounded bg-[#142E4A] px-2 py-1.5 text-left text-[9px] text-warning hover:bg-[#203B61]">
          {card.status}
        </button>
      ) : (
        <p className="mt-2 rounded bg-[#142E4A] px-2 py-1.5 text-[9px] text-emerald-300">{card.status}</p>
      )}
      <p className="mt-3 truncate text-[9px] text-slate-400">{card.channel}</p>
      <p className="mt-2 text-sm font-medium">{card.price}</p>
    </article>
  )
}
