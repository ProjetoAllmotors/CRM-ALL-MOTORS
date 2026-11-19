import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowUpRight, Check, ChevronDown, Paperclip, Search, Send, Sparkles } from 'lucide-react'
import { QuickActionButtons } from '../components/features/QuickActionButtons'
import { useQuickActions } from '../components/features/useQuickActions'

interface Conversation {
  name: string
  preview: string
  channel: string
  time: string
  initials: string
}

interface ChatMessage {
  author: 'customer' | 'agent'
  text: string
  time: string
}

const conversations: Conversation[] = [
  { name: 'Mariana Costa', preview: 'Precisa de carteira para pilotar?', channel: 'WhatsApp · agora', time: '09:12', initials: 'MC' },
  { name: 'Pedro Alves', preview: 'Qual o tempo de recarga?', channel: 'Instagram · 5 min', time: '09:08', initials: 'PA' },
  { name: 'Mercado Boa Vista', preview: 'Queremos uma frota para entregas.', channel: 'WhatsApp · 12 min', time: '08:59', initials: 'MB' },
  { name: 'Ana Beatriz', preview: 'Já enviei minha habilitação.', channel: 'WhatsApp · 23 min', time: '08:48', initials: 'AB' },
  { name: 'Lucas Ferreira', preview: 'Podemos agendar para sábado?', channel: 'Instagram · 41 min', time: '08:30', initials: 'LF' },
  { name: 'João Lima', preview: 'Confirma minha revisão.', channel: 'WhatsApp · 1 h', time: '08:02', initials: 'JL' },
]

const initialMessages: ChatMessage[] = [
  { author: 'customer', text: 'Olá! Gostei da K1-May. Precisa de carteira para pilotar?', time: '09:12' },
  { author: 'agent', text: 'Olá, Mariana! Para os modelos enquadrados como autopropelidos pela Resolução CONTRAN 996, não há exigência de CNH nem placa. Vou confirmar a ficha e as regras de circulação com você.', time: '09:13' },
  { author: 'customer', text: 'Perfeito! Posso experimentar na loja de Piedade amanhã?', time: '09:14' },
]

export function OmnichannelPage() {
  const { openTestRide, openQuickReply } = useQuickActions()
  const [selected, setSelected] = useState(conversations[0])
  const [search, setSearch] = useState('')
  const [draft, setDraft] = useState('')
  const [messages, setMessages] = useState(initialMessages)
  const [status, setStatus] = useState('Abertas')
  const [notice, setNotice] = useState('')

  const visibleConversations = useMemo(
    () => conversations.filter((conversation) => conversation.name.toLowerCase().includes(search.toLowerCase())),
    [search],
  )

  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const text = draft.trim()
    if (!text) return
    setMessages((current) => [...current, { author: 'agent', text, time: 'Agora' }])
    setDraft('')
  }

  return (
    <div className="mx-auto max-w-[1152px]">
      <header className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
        <div>
          <h1 className="font-heading text-[28px] font-semibold tracking-tight">Omnichannel</h1>
          <p className="mt-1 text-sm text-slate-400">Todas as conversas. Uma só experiência.</p>
        </div>
        <QuickActionButtons />
      </header>

      <section className="mt-7 grid gap-3 xl:grid-cols-[270px_minmax(0,1fr)_230px]">
        <aside className="flex min-h-[620px] flex-col overflow-hidden rounded-xl bg-elevated">
          <div className="border-b border-border p-3">
            <h2 className="text-sm font-semibold">Caixa de entrada</h2>
            <p className="mt-1 text-[9px] text-slate-400">WhatsApp · Instagram</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {['Abertas', 'Minhas'].map((tab, index) => (
                <button key={tab} onClick={() => setStatus(tab)} className={`rounded-md px-2 py-2 text-[9px] ${status === tab ? 'bg-[#12305B] text-[#8AB9FF]' : 'bg-raised text-slate-400'}`}>
                  {tab} <span className="ml-1">{index === 0 ? '08' : '03'}</span>
                </button>
              ))}
            </div>
            <label className="mt-3 flex h-8 items-center gap-2 rounded-md bg-raised px-2">
              <Search className="h-3 w-3 text-slate-400" />
              <span className="sr-only">Buscar conversas</span>
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar conversa" className="w-full bg-transparent text-[10px] placeholder:text-slate-500" />
            </label>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {visibleConversations.map((conversation) => (
              <button
                key={conversation.name}
                onClick={() => { setSelected(conversation); setNotice('') }}
                aria-current={selected.name === conversation.name ? 'true' : undefined}
                className={`mb-1 w-full rounded-lg p-2.5 text-left transition-colors ${selected.name === conversation.name ? 'bg-[#18315A]' : 'hover:bg-raised'}`}
              >
                <span className="flex items-start gap-2">
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[9px] font-semibold ${selected.name === conversation.name ? 'bg-brand-500 text-white' : 'bg-[#27364D] text-slate-300'}`}>{conversation.initials}</span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-1">
                      <span className="truncate text-[10px] font-semibold">{conversation.name}</span>
                      <span className="text-[8px] text-slate-500">{conversation.time}</span>
                    </span>
                    <span className="mt-1 block truncate text-[9px] text-slate-400">{conversation.preview}</span>
                    <span className="mt-1 block text-[8px] text-[#8AB9FF]">{conversation.channel}</span>
                  </span>
                </span>
              </button>
            ))}
            {visibleConversations.length === 0 && <p className="p-4 text-center text-[10px] text-slate-400">Nenhuma conversa encontrada.</p>}
          </div>
        </aside>

        <section className="flex min-h-[620px] min-w-0 flex-col overflow-hidden rounded-xl bg-elevated">
          <header className="flex items-center justify-between border-b border-border px-4 py-3">
            <div>
              <h2 className="text-xs font-semibold">{selected.name}</h2>
              <p className="mt-1 text-[9px] text-emerald-300">{selected.channel.split(' · ')[0]} · Atendimento demo</p>
            </div>
            <button aria-label="Mais opções da conversa" className="rounded-md p-1.5 text-slate-400 hover:bg-raised"><ChevronDown className="h-4 w-4" /></button>
          </header>
          <div className="flex items-center justify-center border-b border-border py-2 text-[8px] text-slate-500">HOJE, 18 DE NOVEMBRO</div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div key={`${message.time}-${index}`} className={`flex ${message.author === 'agent' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[88%] rounded-lg px-3 py-2.5 ${message.author === 'agent' ? 'bg-[#123B75]' : 'bg-raised'}`}>
                  <p className="text-[10px] leading-relaxed text-slate-100">{message.text}</p>
                  <p className="mt-2 flex items-center justify-end gap-1 text-[8px] text-slate-400">{message.time}{message.author === 'agent' && <Check className="h-2.5 w-2.5 text-[#66A5FF]" />}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="px-3">
            <p className="mb-2 flex items-center gap-1 text-[9px] font-medium text-slate-400"><Sparkles className="h-3 w-3 text-[#66A5FF]" />Respostas rápidas</p>
            <div className="flex gap-1.5 overflow-x-auto pb-2">
              {['CONTRAN 996', 'Ciclomotor', 'Triagem', 'Ficha'].map((reply) => (
                <button
                  key={reply}
                  type="button"
                  onClick={() => {
                    if (reply === 'CONTRAN 996') {
                      openQuickReply(setDraft)
                    } else {
                      setDraft(reply === 'Triagem' ? 'Vou confirmar a triagem e já retorno com as informações.' : reply)
                    }
                  }}
                  className="shrink-0 rounded-md bg-raised px-2 py-1.5 text-[8px] text-slate-300 hover:bg-[#263A58]"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>
          <form onSubmit={sendMessage} className="p-3 pt-0">
            <label className="flex min-h-11 items-center gap-2 rounded-lg bg-raised px-3">
              <span className="sr-only">Escrever uma mensagem</span>
              <input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Escreva sua mensagem..." className="min-w-0 flex-1 bg-transparent text-[10px] placeholder:text-slate-500" />
              <button type="button" aria-label="Anexar arquivo" className="text-slate-400 hover:text-white"><Paperclip className="h-3.5 w-3.5" /></button>
              <button type="submit" aria-label="Enviar mensagem" disabled={!draft.trim()} className="rounded-md bg-brand-500 p-1.5 text-white hover:bg-brand-700 disabled:opacity-40"><Send className="h-3.5 w-3.5" /></button>
            </label>
            <button type="button" onClick={openTestRide} className="mt-2 rounded-md bg-raised px-3 py-2 text-[9px] text-slate-300 hover:bg-slate-700">Agendar Test-Ride</button>
          </form>
        </section>

        <aside className="rounded-xl bg-elevated p-4">
          <h2 className="text-xs font-semibold">Contexto 360°</h2>
          <div className="mt-5 flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1C3C68] text-[10px] font-semibold text-[#8AB9FF]">{selected.initials}</span>
            <div>
              <h3 className="text-[10px] font-semibold">{selected.name}</h3>
              <p className="mt-1 text-[8px] text-slate-400">Recife, PE · B2C</p>
            </div>
          </div>
          <Info label="Etapa" value="Novo Lead" />
          <Info label="Interesse" value="K1-May · Grafeno" />
          <Info label="Preferência" value="Cartão de crédito · 12x" />
          <Info label="Responsável" value="Camila Santos" />
          <Info label="Origem" value={selected.channel.startsWith('WhatsApp') ? 'WhatsApp orgânico' : 'Instagram orgânico'} />
          <Info label="Último contato" value="Hoje, às 09:14" />
          <button onClick={() => setNotice('Perfil demonstrativo do cliente selecionado.')} className="mt-5 flex w-full items-center justify-between rounded-md bg-raised px-3 py-2 text-[9px] text-slate-300 hover:bg-slate-700">
            Ver carteira de clientes <ArrowUpRight className="h-3 w-3" />
          </button>
          {notice && <p role="status" aria-live="polite" className="mt-3 rounded-md bg-[#12305B] p-2 text-[8px] text-[#CFE1FF]">{notice}</p>}
        </aside>
      </section>
      <p className="mt-4 text-[10px] text-slate-500">Operação demonstrativa • valores e registros de exemplo</p>
    </div>
  )
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-5">
      <p className="text-[8px] uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-[9px] text-slate-200">{value}</p>
    </div>
  )
}
