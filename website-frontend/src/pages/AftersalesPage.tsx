import { useState, type FormEvent } from 'react'
import { CalendarDays, ChevronRight, CircleCheck, ClipboardCheck, Plus, Star, Wrench, X } from 'lucide-react'
import { useUserRole } from '../auth/userRoleStore'

const tickets = [
  { id: 'OS-2081', customer: 'João Lima', service: 'Revisão de 1.000 km', date: '21 nov · 14:30', status: 'Agendado', tone: 'blue', responsible: 'Rafael Mendes' },
  { id: 'OS-2080', customer: 'Mariana Costa', service: 'Ajuste de freios', date: '20 nov · 16:00', status: 'Em atendimento', tone: 'warning', responsible: 'Rafael Mendes' },
  { id: 'OS-2078', customer: 'Carlos Eduardo', service: 'Diagnóstico de bateria', date: '18 nov · 10:00', status: 'Concluído', tone: 'success', responsible: 'Diego Alves' },
]

export function AftersalesPage() {
  const { role, userName } = useUserRole()
  const [notice, setNotice] = useState('')
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)
  const [rating, setRating] = useState(5)
  const [customerNote, setCustomerNote] = useState('')
  const [nextSteps, setNextSteps] = useState('')
  const visibleTickets = role === 'admin' ? tickets : tickets.filter((ticket) => ticket.responsible === userName)

  function submitRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsRegisterOpen(false)
    setCustomerNote('')
    setNextSteps('')
    setRating(5)
    setNotice('Acompanhamento pós-venda registrado com sucesso.')
  }

  return (
    <div className="mx-auto max-w-[1152px]">
      <header className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
        <div>
          <h1 className="font-heading text-[28px] font-semibold tracking-tight">Pós-venda</h1>
          <p className="mt-1 text-sm text-slate-400">Cuidados que fortalecem o relacionamento após a venda.</p>
        </div>
        <button type="button" onClick={() => setIsRegisterOpen(true)} className="flex h-[38px] items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-xs font-medium text-white hover:bg-brand-700">
          <Plus className="h-4 w-4" />Novo atendimento
        </button>
      </header>

      <section className="mt-7 grid gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(280px,.7fr)]">
        <article className="overflow-hidden rounded-xl bg-elevated">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <h2 className="text-base font-semibold">Atendimentos em andamento</h2>
              <p className="mt-1 text-[10px] text-slate-400">Revisões, garantias e suporte técnico</p>
            </div>
            <button className="rounded-md p-2 text-slate-400 hover:bg-raised hover:text-white" aria-label="Ver todos"><ChevronRight className="h-4 w-4" /></button>
          </div>
          <div className="divide-y divide-border">
            {visibleTickets.map((ticket) => (
              <article key={ticket.id} className="grid gap-3 px-5 py-4 sm:grid-cols-[70px_minmax(160px,1fr)_minmax(150px,1fr)_110px] sm:items-center">
                <span className="text-[10px] font-semibold text-[#66A5FF]">{ticket.id}</span>
                <div><h3 className="text-xs font-semibold">{ticket.customer}</h3><p className="mt-1 text-[10px] text-slate-400">{ticket.service}</p></div>
                <p className="flex items-center gap-1.5 text-[10px] text-slate-300"><CalendarDays className="h-3 w-3 text-slate-400" />{ticket.date}</p>
                <span className={`justify-self-start rounded-md px-2 py-1.5 text-[9px] sm:justify-self-end ${ticket.tone === 'success' ? 'bg-emerald-950 text-emerald-300' : ticket.tone === 'warning' ? 'bg-amber-950 text-warning' : 'bg-[#12305B] text-[#8AB9FF]'}`}>{ticket.status}</span>
              </article>
            ))}
          </div>
        </article>

        <article className="rounded-xl bg-elevated p-5">
          <h2 className="text-base font-semibold">Próximas revisões</h2>
          <div className="mt-5 space-y-4">
            {[
              { title: '500 km', customer: 'João Lima', status: 'Concluído', icon: CircleCheck },
              { title: '1.000 km', customer: 'João Lima', status: '21 nov', icon: Wrench },
              { title: 'Garantia', customer: 'Mariana Costa', status: 'Em 30 dias', icon: ClipboardCheck },
            ].map(({ title, customer, status, icon: Icon }) => (
              <div key={title} className="flex items-center gap-3 rounded-lg bg-raised p-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-[#12305B]"><Icon className="h-4 w-4 text-[#8AB9FF]" /></span>
                <div className="min-w-0 flex-1"><p className="text-[11px] font-semibold">{title}</p><p className="mt-1 truncate text-[9px] text-slate-400">{customer}</p></div>
                <span className="text-[9px] text-slate-300">{status}</span>
              </div>
            ))}
          </div>
        </article>
      </section>

      {notice && (
        <div role="status" className="mt-4 flex items-center justify-between rounded-lg bg-[#12305B] px-4 py-3 text-xs text-[#CFE1FF]">
          {notice}<button type="button" onClick={() => setNotice('')} aria-label="Fechar aviso">×</button>
        </div>
      )}

      {isRegisterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setIsRegisterOpen(false)
        }}>
          <form
            onSubmit={submitRegister}
            role="dialog"
            aria-modal="true"
            aria-labelledby="register-aftersales-title"
            className="w-full max-w-[560px] rounded-xl border border-[#334155] bg-elevated shadow-2xl"
          >
            <header className="flex items-start justify-between border-b border-border px-5 py-4">
              <div>
                <h2 id="register-aftersales-title" className="text-base font-semibold">Registrar acompanhamento</h2>
                <p className="mt-1 text-[10px] text-slate-400">Registre o contato e retorne ao cliente com próximo passo.</p>
              </div>
              <button type="button" onClick={() => setIsRegisterOpen(false)} aria-label="Fechar" className="rounded-md p-1 text-slate-400 hover:bg-raised hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </header>

            <div className="grid gap-4 p-5 sm:grid-cols-2">
              <label className="text-[10px] text-slate-300">
                Cliente (entrega confirmada)
                <select className="mt-2 h-10 w-full rounded-md border border-[#26354D] bg-raised px-3 text-xs text-slate-100">
                  {role === 'admin' && <option>Helena Duarte</option>}
                  <option>João Lima</option>
                  <option>Mariana Costa</option>
                  {role === 'admin' && <option>Mercado Boa Vista</option>}
                </select>
              </label>

              <label className="text-[10px] text-slate-300">
                Responsável
                <select className="mt-2 h-10 w-full rounded-md border border-[#26354D] bg-raised px-3 text-xs text-slate-100">
                  {role === 'seller' ? <option>{userName}</option> : <option>Bruna Nogueira</option>}
                  <option>Equipe pós-venda</option>
                  <option>Assistência técnica</option>
                </select>
              </label>

              <fieldset className="text-[10px] text-slate-300">
                <legend>Avaliação do cliente</legend>
                <div className="mt-2 flex gap-1" role="radiogroup" aria-label="Avaliação do cliente">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      role="radio"
                      aria-checked={rating === value}
                      aria-label={`${value} estrelas`}
                      onClick={() => setRating(value)}
                      className="rounded p-0.5"
                    >
                      <Star className={`h-5 w-5 ${value <= rating ? 'fill-[#F59E0B] text-[#F59E0B]' : 'text-slate-500'}`} />
                    </button>
                  ))}
                  <span className="ml-2 self-center text-[10px] font-semibold text-slate-300">{rating}/5</span>
                </div>
              </fieldset>

              <label className="text-[10px] text-slate-300">
                Situação da pendência
                <select className="mt-2 h-10 w-full rounded-md border border-[#26354D] bg-raised px-3 text-xs text-slate-100">
                  <option>Sem pendência</option>
                  <option>Em andamento</option>
                  <option>Cliente ausente</option>
                  <option>Resolvida</option>
                </select>
              </label>

              <label className="text-[10px] text-slate-300 sm:col-span-2">
                Dúvidas, solicitações ou percepções
                <textarea
                  value={customerNote}
                  onChange={(event) => setCustomerNote(event.target.value)}
                  rows={3}
                  className="mt-2 w-full resize-none rounded-md border border-[#26354D] bg-raised px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500"
                  placeholder="Descreva o contato..."
                />
              </label>

              <label className="text-[10px] text-slate-300 sm:col-span-2">
                Pendências a acompanhar
                <textarea
                  value={nextSteps}
                  onChange={(event) => setNextSteps(event.target.value)}
                  rows={3}
                  className="mt-2 w-full resize-none rounded-md border border-[#26354D] bg-raised px-3 py-2 text-xs text-slate-100 placeholder:text-slate-500"
                  placeholder="Informe a próxima ação..."
                />
              </label>
            </div>

            <footer className="flex justify-end gap-2 border-t border-border px-5 py-4">
              <button type="button" onClick={() => setIsRegisterOpen(false)} className="h-9 rounded-md border border-[#26354D] px-4 text-[10px] text-slate-300 hover:bg-raised">
                Cancelar
              </button>
              <button type="submit" className="h-9 rounded-md bg-brand-500 px-4 text-[10px] font-semibold text-white hover:bg-brand-700">
                Salvar acompanhamento
              </button>
            </footer>
          </form>
        </div>
      )}
    </div>
  )
}
