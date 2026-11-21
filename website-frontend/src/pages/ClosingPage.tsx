import { useState } from 'react'
import { Check, CircleCheck, FileCheck2, Landmark, Plus, ReceiptText } from 'lucide-react'
import { useUserRole } from '../auth/userRoleStore'

const closings = [
  { id: '#10482', customer: 'Mariana Costa', vehicle: 'AIMA K1-May', value: 'R$ 8.900', stage: 'Entrega técnica', progress: 75, responsible: 'Rafael Mendes' },
  { id: '#10481', customer: 'Carlos Mendes', vehicle: 'AIMA K-Zero', value: 'R$ 5.900', stage: 'Documentação', progress: 50, responsible: 'Rafael Mendes' },
  { id: '#10479', customer: 'Mercado Boa Vista', vehicle: 'ALL-TK Carga', value: 'R$ 18.900', stage: 'Pagamento confirmado', progress: 100, responsible: 'Marina Costa' },
]

export function ClosingPage() {
  const { role, userName } = useUserRole()
  const [notice, setNotice] = useState('')
  const [requesting, setRequesting] = useState(false)
  const [lossRequests, setLossRequests] = useState<{ id: string; opportunity: string; reason: string; justification: string; responsible: string }[]>([])
  const visibleClosings = role === 'admin' ? closings : closings.filter((closing) => closing.responsible === userName)
  const visibleLossRequests = role === 'admin' ? lossRequests : lossRequests.filter((request) => request.responsible === userName)
  const closingValue = visibleClosings.reduce((total, closing) => total + Number(closing.value.replace(/\D/g, '')), 0)
  const formattedClosingValue = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(closingValue)

  function registerLossRequest(formData: FormData) {
    const opportunity = String(formData.get('opportunity') ?? '').trim()
    const reason = String(formData.get('reason') ?? '').trim()
    const justification = String(formData.get('justification') ?? '').trim()
    if (!opportunity || !reason || !justification) {
      setNotice('Preencha a oportunidade, o motivo e a justificativa.')
      return
    }

    setLossRequests((current) => [{
      id: `ENC-${String(current.length + 1).padStart(4, '0')}`,
      opportunity,
      reason,
      justification,
      responsible: userName,
    }, ...current])
    setRequesting(false)
    setNotice('Solicitação registrada para análise. O histórico da oportunidade foi preservado.')
  }

  return (
    <div className="mx-auto max-w-[1152px]">
      <header className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
        <div>
          <h1 className="font-heading text-[28px] font-semibold tracking-tight">Encerramentos</h1>
          <p className="mt-1 text-sm text-slate-400">Solicite a perda de uma oportunidade sem remover o histórico do cliente.</p>
        </div>
        <button type="button" onClick={() => setRequesting(true)} className="flex h-[38px] items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-xs font-medium text-white hover:bg-brand-700">
          <Plus className="h-4 w-4" />Solicitar encerramento
        </button>
      </header>

      <section className="mt-7 grid gap-4 sm:grid-cols-3">
        {[
          { value: formattedClosingValue, label: 'Valor em fechamento', icon: Landmark },
          { value: String(visibleClosings.length), label: 'Vendas em andamento', icon: FileCheck2 },
          { value: String(visibleClosings.filter((closing) => closing.progress === 100).length), label: 'Pagamento confirmado', icon: ReceiptText },
        ].map(({ value, label, icon: Icon }) => (
          <article key={label} className="rounded-xl bg-elevated p-4">
            <div className="flex items-center justify-between">
              <div><p className="font-heading text-xl font-semibold">{value}</p><p className="mt-1 text-[10px] text-slate-400">{label}</p></div>
              <Icon className="h-5 w-5 text-[#66A5FF]" />
            </div>
          </article>
        ))}
      </section>

      <section className="mt-5 overflow-hidden rounded-xl bg-elevated">
        <div className="border-b border-border px-5 py-4">
          <h2 className="text-base font-semibold">Solicitações de perda registradas</h2>
          <p className="mt-1 text-[10px] text-slate-400">Os registros ficam no histórico e não podem ser apagados por esta tela.</p>
        </div>
        {visibleLossRequests.length ? (
          <div className="divide-y divide-border">
            {visibleLossRequests.map((request) => (
              <article key={request.id} className="grid gap-2 px-5 py-4 sm:grid-cols-[90px_1fr_150px] sm:items-start">
                <span className="text-[10px] font-semibold text-[#66A5FF]">{request.id}</span>
                <div>
                  <h3 className="text-xs font-semibold">{request.opportunity}</h3>
                  <p className="mt-1 text-[10px] text-slate-400">Motivo: {request.reason}</p>
                  <p className="mt-1 text-[10px] text-slate-400">Justificativa: {request.justification}</p>
                </div>
                <span className="justify-self-start rounded-md bg-amber-950 px-2 py-1.5 text-[9px] text-amber-300">Em análise</span>
              </article>
            ))}
          </div>
        ) : (
          <p className="px-5 py-6 text-xs text-slate-400">Nenhuma solicitação registrada nesta demonstração.</p>
        )}
      </section>

      <section className="mt-5 overflow-hidden rounded-xl bg-elevated">
        <div className="border-b border-border px-5 py-4">
          <h2 className="text-base font-semibold">Fechamentos ativos</h2>
          <p className="mt-1 text-[10px] text-slate-400">Acompanhe os últimos requisitos antes da entrega</p>
        </div>
        <div className="divide-y divide-border">
          {visibleClosings.map((closing) => (
            <article key={closing.id} className="grid gap-4 px-5 py-5 md:grid-cols-[90px_minmax(180px,1fr)_140px_minmax(180px,1fr)] md:items-center">
              <span className="text-[10px] font-semibold text-[#66A5FF]">{closing.id}</span>
              <div><h3 className="text-xs font-semibold">{closing.customer}</h3><p className="mt-1 text-[10px] text-slate-400">{closing.vehicle}</p></div>
              <p className="text-sm font-semibold">{closing.value}</p>
              <div>
                <div className="flex items-center justify-between gap-3"><span className="text-[10px] text-slate-300">{closing.stage}</span>{closing.progress === 100 && <CircleCheck className="h-4 w-4 text-emerald-300" />}</div>
                <div className="mt-2 h-1.5 rounded-full bg-[#334155]"><div className="h-full rounded-full bg-brand-500" style={{ width: `${closing.progress}%` }} /></div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {requesting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <form action={registerLossRequest} className="w-full max-w-md rounded-xl border border-border bg-elevated p-5 shadow-2xl">
            <h2 className="font-heading text-lg font-semibold">Solicitar encerramento</h2>
            <p className="mt-1 text-xs text-slate-400">A oportunidade permanecerá registrada para consulta.</p>
            <label className="mt-5 block text-xs text-slate-300">Oportunidade
              <input name="opportunity" required className="mt-2 h-10 w-full rounded-md border border-[#26354D] bg-raised px-3 text-xs" placeholder="Nome do cliente ou oportunidade" />
            </label>
            <label className="mt-4 block text-xs text-slate-300">Motivo
              <select name="reason" required defaultValue="" className="mt-2 h-10 w-full rounded-md border border-[#26354D] bg-raised px-3 text-xs">
                <option value="" disabled>Selecione um motivo</option>
                <option>Cliente desistiu</option>
                <option>Preço ou condição comercial</option>
                <option>Sem retorno após tentativas</option>
                <option>Escolheu outro fornecedor</option>
                <option>Outro</option>
              </select>
            </label>
            <label className="mt-4 block text-xs text-slate-300">Justificativa
              <textarea name="justification" required minLength={5} rows={3} className="mt-2 w-full rounded-md border border-[#26354D] bg-raised px-3 py-2 text-xs" placeholder="Descreva o contexto da solicitação" />
            </label>
            <div className="mt-6 flex justify-end gap-2">
              <button type="button" onClick={() => setRequesting(false)} className="h-9 rounded-md px-3 text-xs text-slate-300 hover:bg-raised">Cancelar</button>
              <button type="submit" className="h-9 rounded-md bg-brand-500 px-3 text-xs font-semibold text-white hover:bg-brand-700">Enviar solicitação</button>
            </div>
          </form>
        </div>
      )}

      {notice && (
        <div role="status" className="mt-4 flex items-center justify-between rounded-lg bg-[#12305B] px-4 py-3 text-xs text-[#CFE1FF]">
          <span className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-300" />{notice}</span>
          <button type="button" onClick={() => setNotice('')} aria-label="Fechar aviso">×</button>
        </div>
      )}
    </div>
  )
}
