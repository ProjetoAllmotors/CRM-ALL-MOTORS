import { useState } from 'react'
import { RefreshCcw, Save, Settings2 } from 'lucide-react'

export function FollowupRulesPage() {
  const [enabled, setEnabled] = useState(true)
  const [notice, setNotice] = useState('')

  return (
    <div className="mx-auto max-w-[1152px]">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <h1 className="font-heading text-[28px] font-semibold tracking-tight">Regras de acompanhamento</h1>
          <p className="mt-1 text-sm text-slate-400">Defina prazos e limites usados na gestão de oportunidades.</p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => setNotice('Padrões restaurados.')} className="flex h-9 items-center gap-2 rounded-md border border-[#26354D] px-3 text-[10px] text-slate-300 hover:bg-raised"><RefreshCcw className="h-3.5 w-3.5" />Restaurar padrão</button>
          <button type="button" onClick={() => setNotice('Regras verificadas com sucesso.')} className="flex h-9 items-center gap-2 rounded-md border border-[#26354D] px-3 text-[10px] text-slate-300 hover:bg-raised"><Settings2 className="h-3.5 w-3.5" />Verificar agora</button>
          <button type="button" onClick={() => setNotice('Regras de acompanhamento salvas.')} className="flex h-9 items-center gap-2 rounded-md bg-brand-500 px-3 text-[10px] font-semibold text-white hover:bg-brand-700"><Save className="h-3.5 w-3.5" />Salvar regras</button>
        </div>
      </header>

      <section className="mt-7 grid gap-5 lg:grid-cols-2">
        <article className="rounded-xl bg-elevated p-5">
          <h2 className="text-base font-semibold">Critérios</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="text-[10px] text-slate-300">Prazo do primeiro follow-up
              <div className="mt-2 flex h-10 items-center rounded-md border border-[#26354D] bg-raised px-3"><input type="number" defaultValue={24} className="w-full bg-transparent text-xs" /><span className="text-[9px] text-slate-400">horas</span></div>
              <span className="mt-1 block text-[8px] text-slate-500">Em horas</span>
            </label>
            <label className="text-[10px] text-slate-300">Intervalo entre tentativas
              <div className="mt-2 flex h-10 items-center rounded-md border border-[#26354D] bg-raised px-3"><input type="number" defaultValue={48} className="w-full bg-transparent text-xs" /><span className="text-[9px] text-slate-400">horas</span></div>
              <span className="mt-1 block text-[8px] text-slate-500">Em horas</span>
            </label>
            <label className="text-[10px] text-slate-300">Limite de tentativas
              <div className="mt-2 flex h-10 items-center rounded-md border border-[#26354D] bg-raised px-3"><input type="number" defaultValue={4} className="w-full bg-transparent text-xs" /><span className="text-[9px] text-slate-400">tentativas</span></div>
              <span className="mt-1 block text-[8px] text-slate-500">Em tentativas</span>
            </label>
            <label className="text-[10px] text-slate-300">Prazo máximo sem resposta
              <div className="mt-2 flex h-10 items-center rounded-md border border-[#26354D] bg-raised px-3"><input type="number" defaultValue={10} className="w-full bg-transparent text-xs" /><span className="text-[9px] text-slate-400">dias</span></div>
              <span className="mt-1 block text-[8px] text-slate-500">Em dias</span>
            </label>
          </div>
          <label className="mt-5 flex items-center justify-between rounded-lg bg-raised p-3 text-[10px] text-slate-300">
            <span><strong className="block text-xs">Encerramento automático</strong><span className="mt-1 block text-[8px] text-slate-400">Evite oportunidades sem resposta serem finalizadas por encerramento automático.</span></span>
            <button type="button" role="switch" aria-checked={enabled} onClick={() => setEnabled((value) => !value)} className={`flex h-5 w-9 items-center rounded-full p-0.5 ${enabled ? 'bg-emerald-500' : 'bg-slate-600'}`}><span className={`h-4 w-4 rounded-full bg-white transition-transform ${enabled ? 'translate-x-4' : ''}`} /></button>
          </label>
        </article>

        <article className="rounded-xl bg-elevated p-5">
          <h2 className="text-base font-semibold">Prévia da cadência</h2>
          <p className="mt-1 text-[9px] text-slate-400">Exemplo de contatos programados após o cadastro</p>
          <div className="mt-5 space-y-3">
            {[
              ['24 h', 'Primeiro follow-up após o cadastro'],
              ['72 h', 'Tentativa 2 de 4'],
              ['120 h', 'Tentativa 3 de 4'],
              ['168 h', 'Tentativa 4 de 4'],
              ['10 dias', 'Encerramento automático por ausência de resposta'],
            ].map(([time, label]) => (
              <div key={time} className="flex items-center gap-3">
                <span className="w-14 rounded-md bg-brand-900 px-2 py-2 text-center text-[9px] font-semibold text-[#8AB9FF]">{time}</span>
                <span className="text-[10px] text-slate-300">{label}</span>
              </div>
            ))}
          </div>
        </article>
      </section>
      {notice && <p role="status" className="mt-4 rounded-lg bg-[#12305B] px-4 py-3 text-xs text-[#CFE1FF]">{notice}</p>}
    </div>
  )
}
