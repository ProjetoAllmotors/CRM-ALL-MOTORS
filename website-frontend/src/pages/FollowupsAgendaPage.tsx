import { useState } from 'react'
import { CalendarDays, Check, ChevronDown, Clock3, MailPlus, PhoneCall, TriangleAlert } from 'lucide-react'
import { useUserRole } from '../auth/userRoleStore'
import { useDateFilter } from '../components/layout/DateFilterContext'

const followups = [
  { id: 1, name: 'Helena Duarte', vehicle: 'AIMA K1-May', stage: 'Proposta', due: 'Prazo atingido · 11/11/2026 08:30', date: '2026-11-11', responsible: 'Rafael Mendes', attempt: '1ª tentativa', priority: 'Média prioridade', overdue: true, channel: 'WhatsApp', completed: false },
  { id: 2, name: 'João Lima', vehicle: 'AIMA K-Zero', stage: 'Entrega', due: 'Hoje · 14:30', date: '2026-11-18', responsible: 'Rafael Mendes', attempt: 'Entrega confirmada', priority: 'Baixa prioridade', overdue: false, channel: 'Telefone', completed: false },
  { id: 3, name: 'Mariana Costa', vehicle: 'AIMA K1-May', stage: 'Test-Ride', due: 'Hoje · 17:30', date: '2026-11-18', responsible: 'Rafael Mendes', attempt: '2ª tentativa', priority: 'Alta prioridade', overdue: true, channel: 'WhatsApp', completed: false },
  { id: 4, name: 'Rafael Mendes', vehicle: 'ALL-B1Z', stage: 'Proposta', due: 'Amanhã · 09:00', date: '2026-11-19', responsible: 'Rafael Mendes', attempt: '1ª tentativa', priority: 'Média prioridade', overdue: false, channel: 'E-mail', completed: false },
  { id: 5, name: 'Mercado Boa Vista', vehicle: 'ALL-TK Carga', stage: 'Negociação', due: '22 nov · 10:00', date: '2026-11-22', responsible: 'Marina Costa', attempt: '3ª tentativa', priority: 'Alta prioridade', overdue: false, channel: 'Telefone', completed: false },
  { id: 6, name: 'Pedro Alves', vehicle: 'K-Zero 350W', stage: 'Triagem', due: 'Concluído em 11/11/2026', date: '2026-11-11', responsible: 'Diego Alves', attempt: '4ª tentativa', priority: 'Baixa prioridade', overdue: false, channel: 'WhatsApp', completed: true },
  { id: 7, name: 'Ana Beatriz', vehicle: 'Ciclomotor 1200W', stage: 'Triagem', due: 'Concluído em 10/11/2026', date: '2026-11-10', responsible: 'Bruna Nogueira', attempt: '2ª tentativa', priority: 'Baixa prioridade', overdue: false, channel: 'Telefone', completed: true },
]

export function FollowupsAgendaPage() {
  const { role, userName } = useUserRole()
  const { selectedDate } = useDateFilter()
  const [selected, setSelected] = useState<number[]>([])
  const [period, setPeriod] = useState('Todos os períodos')
  const [tab, setTab] = useState<'pending' | 'completed' | 'all'>('pending')
  const [notice, setNotice] = useState('')
  const visibleFollowups = followups.filter((item) =>
    item.date === selectedDate && (role === 'admin' || item.responsible === userName),
  )
  const pendingCount = visibleFollowups.filter((item) => !item.completed).length
  const completedCount = visibleFollowups.filter((item) => item.completed).length
  const overdueCount = visibleFollowups.filter((item) => item.overdue && !item.completed).length
  const todayCount = visibleFollowups.filter((item) => item.due.startsWith('Hoje')).length

  function toggle(id: number) {
    setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  return (
    <div className="mx-auto max-w-[1152px]">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <h1 className="font-heading text-[28px] font-semibold tracking-tight">Agenda de follow-ups</h1>
          <p className="mt-1 text-sm text-slate-400">Acompanhe contatos pendentes e retome oportunidades abertas.</p>
        </div>
        <button type="button" onClick={() => setNotice('Agenda registrada com sucesso.')} className="flex h-10 items-center gap-2 self-start rounded-md bg-brand-500 px-4 text-xs font-semibold text-white hover:bg-brand-700">
          <CalendarDays className="h-4 w-4" />Novo acompanhamento
        </button>
      </header>

      <section className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Pendentes', value: String(pendingCount), icon: Clock3, tone: 'text-[#66A5FF]' },
          { label: 'Para hoje', value: String(todayCount), icon: CalendarDays, tone: 'text-slate-300' },
          { label: 'Concluídos', value: String(completedCount), icon: Check, tone: 'text-emerald-300' },
          { label: 'Atrasados', value: String(overdueCount), icon: TriangleAlert, tone: 'text-rose-300' },
        ].map(({ label, value, icon: Icon, tone }) => (
          <article key={label} className="rounded-xl bg-elevated p-4">
            <div className="flex items-start justify-between">
              <p className="text-[10px] text-slate-400">{label}</p>
              <Icon className={`h-4 w-4 ${tone}`} />
            </div>
            <p className="mt-3 font-heading text-2xl font-semibold">{value}</p>
          </article>
        ))}
      </section>

      <div className="mt-5 flex items-center gap-2 rounded-lg border border-[#3A4A62] bg-[#12305B] px-4 py-3 text-[10px] text-[#CFE1FF]">
        <TriangleAlert className="h-4 w-4 shrink-0 text-rose-300" />
        Regras de acompanhamento ativas: primeiro retorno em 24 h, intervalo de 48 h entre tentativas, limite de 4 tentativas e 10 dias sem resposta. Encerramento automático ligado.
      </div>

      <section className="mt-5 overflow-hidden rounded-xl bg-elevated">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setTab('pending')} className={`flex h-8 items-center gap-2 rounded-md px-3 text-[10px] ${tab === 'pending' ? 'bg-raised text-slate-100' : 'text-slate-400'}`}>Pendentes <span className="rounded-full bg-[#26354D] px-1.5 py-0.5 text-[8px]">{pendingCount}</span></button>
            <button type="button" onClick={() => setTab('completed')} className={`flex h-8 items-center gap-2 rounded-md px-3 text-[10px] ${tab === 'completed' ? 'bg-raised text-slate-100' : 'text-slate-400'}`}>Concluídos <span className="rounded-full bg-[#26354D] px-1.5 py-0.5 text-[8px]">{completedCount}</span></button>
            <button type="button" onClick={() => setTab('all')} className={`flex h-8 items-center gap-2 rounded-md px-3 text-[10px] ${tab === 'all' ? 'bg-raised text-slate-100' : 'text-slate-400'}`}>Todos <span className="rounded-full bg-[#26354D] px-1.5 py-0.5 text-[8px]">{visibleFollowups.length}</span></button>
          </div>
          <div className="flex items-center gap-2">
            {selected.length > 0 && (
              <button type="button" onClick={() => { setNotice(`${selected.length} follow-up(s) marcado(s) como concluído(s).`); setSelected([]) }} className="h-9 rounded-md bg-emerald-950 px-3 text-[10px] text-emerald-300">
                Concluir selecionados
              </button>
            )}
            <label className="text-[9px] text-slate-400">
              Período
              <button type="button" onClick={() => setPeriod(period === 'Todos os períodos' ? 'Este mês' : 'Todos os períodos')} className="mt-1 flex h-9 min-w-40 items-center justify-between gap-2 rounded-md border border-[#26354D] px-3 text-[10px] text-slate-300">
                {period} <ChevronDown className="h-3 w-3" />
              </button>
            </label>
          </div>
        </div>

        <div className="divide-y divide-border">
          {visibleFollowups.filter((item) => tab === 'all' || (tab === 'completed' ? item.completed : !item.completed)).map((item) => (
            <article key={item.id} className={`grid gap-3 px-5 py-4 md:grid-cols-[32px_minmax(220px,1fr)_150px_130px_110px] md:items-center ${item.overdue ? 'border-l-2 border-l-rose-400' : ''}`}>
              <input type="checkbox" checked={selected.includes(item.id)} onChange={() => toggle(item.id)} aria-label={`Selecionar ${item.name}`} className="h-3.5 w-3.5 accent-brand-500" />
              <div>
                <h3 className="text-[11px] font-semibold">{item.name} · <span className="font-normal text-slate-400">Urban E-2M</span></h3>
                <p className="mt-1 text-[9px] text-slate-400">Enviar apresentação do modelo</p>
                <p className="mt-1 text-[9px] text-slate-400">Responsável: <span className="text-slate-300">{item.responsible}</span></p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <span className="rounded-full bg-[#26354D] px-2 py-1 text-[8px] text-slate-300">{item.attempt}</span>
                  <span className={`rounded-full px-2 py-1 text-[8px] ${item.priority === 'Alta prioridade' ? 'bg-rose-950 text-rose-300' : item.priority === 'Média prioridade' ? 'bg-amber-950 text-warning' : 'bg-raised text-slate-300'}`}>{item.priority}</span>
                  {item.completed ? (
                    <span className="rounded-full bg-emerald-950 px-2 py-1 text-[8px] text-emerald-300">Concluído</span>
                  ) : (
                    <span className="flex items-center gap-1 rounded-full bg-[#12305B] px-2 py-1 text-[8px] text-[#8AB9FF]"><CalendarDays className="h-2.5 w-2.5" />{item.due}</span>
                  )}
                </div>
              </div>
              <p className={`text-[10px] ${item.overdue ? 'text-rose-300' : 'text-slate-300'}`}>{item.due}</p>
              <div className="flex items-center justify-end gap-2">
                <button type="button" onClick={() => setNotice(`Registrando contato com ${item.name} via ${item.channel}.`)} className="flex h-8 items-center gap-1.5 rounded-md bg-[#12305B] px-2.5 text-[9px] text-[#8AB9FF]">
                  {item.channel === 'E-mail' ? <MailPlus className="h-3 w-3" /> : <PhoneCall className="h-3 w-3" />}Registrar
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {notice && (
        <p role="status" className="mt-4 flex items-center justify-between rounded-lg bg-[#12305B] px-4 py-3 text-xs text-[#CFE1FF]">
          {notice}
          <button type="button" onClick={() => setNotice('')} aria-label="Fechar aviso">×</button>
        </p>
      )}
    </div>
  )
}
