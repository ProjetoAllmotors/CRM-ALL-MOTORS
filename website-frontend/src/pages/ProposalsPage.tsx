import { useMemo, useState, type FormEvent } from 'react'
import { FileText, Plus, Search, X } from 'lucide-react'
import { useUserRole } from '../auth/userRoleStore'

interface Proposal {
  id: string
  customer: string
  model: string
  value: string
  validUntil: string
  status: string
  responsible: string
}

const initialProposals: Proposal[] = [
  { id: '#P-2481', customer: 'João Lima', model: 'AIMA K-Zero 350W', value: 'R$ 5.300', validUntil: '2026-11-22', status: 'Enviada', responsible: 'Rafael Mendes' },
  { id: '#P-2478', customer: 'Helena Duarte', model: 'AIMA K1-May', value: 'R$ 8.900', validUntil: '2026-11-24', status: 'Em negociação', responsible: 'Marina Costa' },
  { id: '#P-2471', customer: 'Mercado Boa Vista', model: 'ALL-TK Carga', value: 'R$ 18.900', validUntil: '2026-11-20', status: 'Aprovada', responsible: 'Marina Costa' },
]

export function ProposalsPage() {
  const { role, userName } = useUserRole()
  const [proposals, setProposals] = useState(initialProposals)
  const [search, setSearch] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [notice, setNotice] = useState('')

  const visibleProposals = useMemo(() => proposals.filter((proposal) => (
    (role === 'admin' || proposal.responsible === userName)
    && `${proposal.id} ${proposal.customer} ${proposal.model} ${proposal.status}`.toLowerCase().includes(search.toLowerCase())
  )), [proposals, role, search, userName])

  function createProposal(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const customer = String(formData.get('customer') ?? '').trim()
    const model = String(formData.get('model') ?? '').trim()
    const value = String(formData.get('value') ?? '').trim()
    const validUntil = String(formData.get('validUntil') ?? '')
    if (!customer || !model || !value || !validUntil) {
      setNotice('Preencha todos os campos para criar a proposta.')
      return
    }

    setProposals((current) => [{
      id: `#P-${2482 + current.length - initialProposals.length}`,
      customer,
      model,
      value: value.startsWith('R$') ? value : `R$ ${value}`,
      validUntil,
      status: 'Rascunho',
      responsible: userName,
    }, ...current])
    setIsCreating(false)
    setNotice('Proposta criada como rascunho.')
  }

  return (
    <div className="mx-auto max-w-[1500px]">
      <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-slate-400">CRM All Motors</p>
          <h1 className="mt-1 font-heading text-2xl font-bold text-slate-50">Propostas comerciais</h1>
        </div>
        <button type="button" onClick={() => { setNotice(''); setIsCreating(true) }} className="flex h-10 items-center justify-center gap-2 self-start rounded-lg bg-brand-500 px-4 text-sm font-bold text-white hover:bg-brand-700">
          <Plus className="h-4 w-4" />Nova proposta
        </button>
      </header>

      <section className="overflow-hidden rounded-xl border border-border bg-elevated">
        <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center">
          <label className="flex h-10 max-w-md flex-1 items-center gap-2 rounded-lg border border-border bg-raised px-3 text-slate-300">
            <Search className="h-4 w-4 text-slate-400" />
            <span className="sr-only">Buscar propostas comerciais</span>
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar propostas comerciais" className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-400" />
          </label>
          <p className="text-xs text-slate-400">{visibleProposals.length} propostas</p>
        </div>
        {visibleProposals.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left">
              <thead className="bg-raised text-[10px] uppercase tracking-wide text-slate-400">
                <tr>
                  {['Proposta', 'Cliente', 'Modelo', 'Valor', 'Validade', 'Status'].map((column) => <th key={column} className="px-5 py-3 font-semibold">{column}</th>)}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {visibleProposals.map((proposal) => (
                  <tr key={proposal.id} className="text-xs text-slate-200 transition-colors hover:bg-raised">
                    <td className="px-5 py-4 font-semibold text-[#8AB9FF]">{proposal.id}</td>
                    <td className="px-5 py-4">{proposal.customer}</td>
                    <td className="px-5 py-4 text-slate-300">{proposal.model}</td>
                    <td className="px-5 py-4">{proposal.value}</td>
                    <td className="px-5 py-4 text-slate-300">{new Date(`${proposal.validUntil}T12:00:00`).toLocaleDateString('pt-BR')}</td>
                    <td className="px-5 py-4"><span className="rounded-md bg-[#172B49] px-2 py-1 text-[10px] text-[#CFE1FF]">{proposal.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex min-h-56 flex-col items-center justify-center p-8 text-center">
            <FileText className="h-8 w-8 text-slate-500" />
            <h2 className="mt-3 font-heading text-base font-semibold text-slate-100">Nenhuma proposta encontrada</h2>
            <p className="mt-1 text-sm text-slate-400">Altere a busca ou crie uma nova proposta.</p>
          </div>
        )}
      </section>

      {notice && <p role="status" className="mt-4 rounded-lg bg-[#12305B] px-4 py-3 text-xs text-[#CFE1FF]">{notice}</p>}

      {isCreating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onMouseDown={(event) => event.target === event.currentTarget && setIsCreating(false)}>
          <form onSubmit={createProposal} role="dialog" aria-modal="true" aria-labelledby="new-proposal-title" className="w-full max-w-lg rounded-xl border border-border bg-elevated p-5 shadow-2xl">
            <header className="flex items-start justify-between gap-4">
              <div>
                <h2 id="new-proposal-title" className="font-heading text-lg font-semibold text-slate-50">Nova proposta comercial</h2>
                <p className="mt-1 text-xs text-slate-400">Preencha os dados para criar um rascunho.</p>
              </div>
              <button type="button" onClick={() => setIsCreating(false)} aria-label="Fechar" className="rounded-md p-1 text-slate-400 hover:bg-raised hover:text-white"><X className="h-4 w-4" /></button>
            </header>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="text-xs text-slate-300 sm:col-span-2">Cliente
                <input name="customer" required className="mt-2 h-10 w-full rounded-md border border-border bg-raised px-3 text-xs text-slate-100" placeholder="Nome do cliente" />
              </label>
              <label className="text-xs text-slate-300 sm:col-span-2">Modelo
                <input name="model" required className="mt-2 h-10 w-full rounded-md border border-border bg-raised px-3 text-xs text-slate-100" placeholder="Modelo ou veículo" />
              </label>
              <label className="text-xs text-slate-300">Valor
                <input name="value" required className="mt-2 h-10 w-full rounded-md border border-border bg-raised px-3 text-xs text-slate-100" placeholder="8.900" />
              </label>
              <label className="text-xs text-slate-300">Válida até
                <input name="validUntil" type="date" required className="mt-2 h-10 w-full rounded-md border border-border bg-raised px-3 text-xs text-slate-100 [color-scheme:dark]" />
              </label>
            </div>
            <footer className="mt-6 flex justify-end gap-2 border-t border-border pt-4">
              <button type="button" onClick={() => setIsCreating(false)} className="h-9 rounded-md px-3 text-xs text-slate-300 hover:bg-raised">Cancelar</button>
              <button type="submit" className="flex h-9 items-center gap-2 rounded-md bg-brand-500 px-3 text-xs font-semibold text-white hover:bg-brand-700"><Plus className="h-3.5 w-3.5" />Criar rascunho</button>
            </footer>
          </form>
        </div>
      )}
      <p className="mt-5 text-[10px] text-slate-500">Propostas demonstrativas • registros locais, sem envio ou persistência no servidor.</p>
    </div>
  )
}
