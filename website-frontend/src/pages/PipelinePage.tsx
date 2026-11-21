import { useState } from 'react'
import { LayoutGrid, List, Plus } from 'lucide-react'
import { QuickActionButtons } from '../components/features/QuickActionButtons'
import { useQuickActions } from '../components/features/useQuickActions'
import { useUserRole } from '../auth/userRoleStore'

interface Opportunity {
  name: string
  city: string
  model: string
  status: string
  channel: string
  price: string
  owner?: string
  warning?: boolean
}

const stages: { title: string; count: number; color: string; cards: Opportunity[] }[] = [
  {
    title: 'Novo Lead', count: 3, color: 'border-t-[#66A5FF]', cards: [
      { name: 'Mariana Costa', city: 'Recife, PE', model: 'K1-May 600W', status: 'Sem CNH/Placa', channel: 'B2C · Cartão 12x', price: 'R$ 8.900', owner: 'Rafael Mendes' },
      { name: 'Pedro Alves', city: 'Natal, RN', model: 'K-Zero 350W', status: 'Sem CNH/Placa', channel: 'B2C · Pix', price: 'R$ 5.900' },
      { name: 'Mercado Boa Vista', city: 'Maceió, AL', model: 'ALL-TK Carga 400kg', status: 'Triagem B2B', channel: 'B2B · Financiamento', price: 'R$ 18.900', owner: 'Marina Costa' },
    ],
  },
  {
    title: 'Triagem CONTRAN 996', count: 2, color: 'border-t-warning', cards: [
      { name: 'Ana Beatriz', city: 'João Pessoa, PB', model: 'Ciclomotor 1200W', status: 'Requer CNH', channel: 'B2C · Cartão 18x', price: 'R$ 12.900', warning: true, owner: 'Bruna Nogueira' },
      { name: 'Lucas Ferreira', city: 'Recife, PE', model: 'ALL-B1Z 800W', status: 'Sem CNH/Placa', channel: 'B2C · Pix', price: 'R$ 9.900', owner: 'Rafael Mendes' },
    ],
  },
  {
    title: 'Test-Ride', count: 2, color: 'border-t-[#B38BFF]', cards: [
      { name: 'Carlos Eduardo', city: 'Maceió, AL', model: 'Bosch 1000W', status: 'Sem CNH/Placa', channel: 'B2C · Financiamento', price: 'R$ 10.900', owner: 'Diego Alves' },
      { name: 'Renata Silva', city: 'Natal, RN', model: 'Design iF 400W', status: 'Sem CNH/Placa', channel: 'B2C · Cartão 12x', price: 'R$ 8.900', owner: 'Rafael Mendes' },
    ],
  },
  {
    title: 'Simulação', count: 1, color: 'border-t-[#35C7E8]', cards: [
      { name: 'Júlia Santos', city: 'Recife, PE', model: 'Triciclo 650W', status: 'Sem CNH/Placa', channel: 'B2C · Pix', price: 'R$ 11.900', owner: 'Rafael Mendes' },
    ],
  },
  {
    title: 'Faturamento', count: 1, color: 'border-t-success', cards: [
      { name: 'Bruno Lima', city: 'João Pessoa, PB', model: 'K1-May 600W', status: 'Sem CNH/Placa', channel: 'B2C · Cartão 12x', price: 'R$ 8.900', owner: 'Rafael Mendes' },
    ],
  },
  {
    title: 'Entrega', count: 1, color: 'border-t-success', cards: [
      { name: 'João Lima', city: 'Recife, PE', model: 'K-Zero 350W', status: 'Sem CNH/Placa', channel: 'B2C · Pix', price: 'R$ 5.300', owner: 'Rafael Mendes' },
    ],
  },
]

export function PipelinePage() {
  const { openLead, openTriage } = useQuickActions()
  const { role, userName } = useUserRole()
  const [view, setView] = useState<'kanban' | 'list'>('kanban')
  const [claimedLeads, setClaimedLeads] = useState<string[]>([])
  const visibleStages = stages.map((stage) => ({
    ...stage,
    cards: stage.cards
      .map((card) => claimedLeads.includes(card.name) ? { ...card, owner: userName } : card)
      .filter((card) => role === 'admin' || !card.owner || card.owner === userName),
  }))
  const opportunities = visibleStages.flatMap((stage) =>
    stage.cards.map((card) => ({ ...card, stage: stage.title })),
  )
  const pipelineValue = opportunities.reduce((total, item) => total + Number(item.price.replace(/\D/g, '')), 0)
  const formattedValue = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(pipelineValue)

  function claimLead(name: string) {
    setClaimedLeads((current) => current.includes(name) ? current : [...current, name])
  }

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
        <span className="text-xs font-semibold">{opportunities.length} oportunidades</span>
        <span className="text-xs text-slate-400">{formattedValue} em negociação</span>
        <div className="ml-auto flex items-center gap-2">
          <span className="rounded-md bg-[#172B49] px-3 py-1.5 text-[10px] text-slate-300">{role === 'admin' ? 'Todos os responsáveis' : 'Minha carteira + leads livres'}</span>
          <div className="ml-1 flex rounded-lg bg-elevated p-1" role="group" aria-label="Visualização do pipeline">
            <button
              type="button"
              aria-label="Exibir como kanban"
              aria-pressed={view === 'kanban'}
              onClick={() => setView('kanban')}
              className={`flex h-7 w-8 items-center justify-center rounded-md ${view === 'kanban' ? 'bg-[#12305B] text-[#8AB9FF]' : 'text-slate-400 hover:text-white'}`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              aria-label="Exibir como lista"
              aria-pressed={view === 'list'}
              onClick={() => setView('list')}
              className={`flex h-7 w-8 items-center justify-center rounded-md ${view === 'list' ? 'bg-[#12305B] text-[#8AB9FF]' : 'text-slate-400 hover:text-white'}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {view === 'kanban' ? (
        <div className="overflow-x-auto pb-2">
          <div className="grid min-w-[1120px] grid-cols-6 gap-3">
            {visibleStages.map((stage) => (
              <section key={stage.title} className={`flex min-h-[664px] flex-col rounded-b-lg border-t-[3px] ${stage.color} bg-elevated p-2`}>
                <header className="flex h-11 items-center justify-between gap-1 px-1">
                  <h2 className="truncate text-[11px] font-semibold">{stage.title}</h2>
                  <span className="text-[10px] text-slate-400">{stage.cards.length}</span>
                </header>
                <div className="space-y-3">
                  {stage.cards.map((card) => <OpportunityCard key={card.name} card={card} onTriage={openTriage} canClaim={role === 'seller' && !card.owner} onClaim={claimLead} />)}
                </div>
                <button type="button" onClick={openLead} className="mt-auto flex items-center gap-1 px-1 py-3 text-[10px] text-slate-400 hover:text-brand-500">
                  <Plus className="h-3 w-3" />Adicionar oportunidade
                </button>
              </section>
            ))}
          </div>
        </div>
      ) : (
        <section className="overflow-hidden rounded-xl bg-elevated" aria-label="Lista de oportunidades">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left">
              <thead className="border-b border-border text-[9px] uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="px-5 py-3 font-semibold">Cliente</th>
                  <th className="px-4 py-3 font-semibold">Cidade</th>
                  <th className="px-4 py-3 font-semibold">Veículo</th>
                  <th className="px-4 py-3 font-semibold">Etapa</th>
                  <th className="px-4 py-3 font-semibold">Origem / pagamento</th>
                  <th className="px-5 py-3 text-right font-semibold">Valor</th>
                  {role === 'seller' && <th className="px-5 py-3 text-right font-semibold">Ação</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {opportunities.map((opportunity) => (
                  <tr key={opportunity.name} className="text-[11px] transition-colors hover:bg-raised">
                    <td className="px-5 py-4">
                      <button type="button" className="text-left font-semibold text-slate-100 hover:text-[#66A5FF]">{opportunity.name}</button>
                      <p className="mt-1 text-[9px] text-slate-400">{opportunity.status}</p>
                    </td>
                    <td className="px-4 py-4 text-slate-300">{opportunity.city}</td>
                    <td className="px-4 py-4 text-slate-300">{opportunity.model}</td>
                    <td className="px-4 py-4"><span className="rounded-md bg-[#172B49] px-2 py-1.5 text-[9px] text-[#8AB9FF]">{opportunity.stage}</span></td>
                    <td className="px-4 py-4 text-slate-400">{opportunity.channel}</td>
                    <td className="px-5 py-4 text-right font-semibold">{opportunity.price}</td>
                    {role === 'seller' && (
                      <td className="px-5 py-4 text-right">
                        {!opportunity.owner && <button type="button" onClick={() => claimLead(opportunity.name)} className="rounded-md bg-[#12305B] px-2.5 py-2 text-[9px] font-semibold text-[#8AB9FF] hover:bg-[#1A4178]">Puxar lead</button>}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
      <p className="mt-4 text-[10px] leading-relaxed text-slate-400">
        Triagem regulatória: valide potência, velocidade e dimensões. A circulação depende da classificação e das regras locais.
      </p>
      <p className="mt-5 text-[10px] text-slate-500">Operação demonstrativa • valores e registros de exemplo</p>
    </div>
  )
}

function OpportunityCard({ card, onTriage, canClaim, onClaim }: { card: Opportunity; onTriage(): void; canClaim: boolean; onClaim(name: string): void }) {
  return (
    <article className="rounded-lg border border-[#344258] bg-raised p-3 transition-colors hover:border-brand-500/60">
      <div className="flex items-start justify-between gap-1">
        <h3 className="text-[11px] font-medium">{card.name}</h3>
        <button type="button" aria-label={`Opções de ${card.name}`} className="text-slate-400 hover:text-white">···</button>
      </div>
      <p className="mt-2 text-[10px] text-slate-400">{card.city}</p>
      {canClaim && <p className="mt-2 text-[9px] text-[#8AB9FF]">Sem responsável</p>}
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
      {canClaim && <button type="button" onClick={() => onClaim(card.name)} className="mt-3 w-full rounded-md bg-[#12305B] px-2 py-2 text-[9px] font-semibold text-[#8AB9FF] hover:bg-[#1A4178]">Puxar para minha carteira</button>}
    </article>
  )
}
