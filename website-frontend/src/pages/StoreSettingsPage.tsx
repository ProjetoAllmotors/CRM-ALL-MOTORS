import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Check, ImagePlus, Save } from 'lucide-react'

export function StoreSettingsPage() {
  const [logo, setLogo] = useState('/aima-motors-logo.png')
  const [notice, setNotice] = useState('')

  function handleLogo(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) setLogo(URL.createObjectURL(file))
  }

  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setNotice('Dados da loja atualizados com sucesso.')
  }

  return (
    <div className="mx-auto max-w-[900px]">
      <header>
        <h1 className="font-heading text-[28px] font-semibold tracking-tight">Dados da loja</h1>
        <p className="mt-1 text-sm text-slate-400">Alterações usadas nas informações públicas e operacionais da loja.</p>
      </header>

      <form onSubmit={save} className="mt-7">
        <section className="rounded-xl bg-elevated p-5">
          <h2 className="text-base font-semibold">Identificação</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-[150px_minmax(0,1fr)]">
            <div>
              <p className="mb-2 text-[10px] text-slate-300">Logo da loja</p>
              <label className="flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-[#40516A] bg-raised text-slate-400 hover:border-brand-500">
                {logo ? (
                  <img src={logo} alt="Logo da loja" className="h-24 w-24 rounded-full object-cover" />
                ) : (
                  <>
                    <ImagePlus className="h-5 w-5" />
                    <span className="mt-2 text-[9px]">Enviar imagem</span>
                  </>
                )}
                <input type="file" accept="image/*" onChange={handleLogo} className="hidden" />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-[10px] text-slate-300">
                Nome da loja *
                <input defaultValue="ALL MOTORS Brasil" required className="mt-2 h-10 w-full rounded-md border border-[#26354D] bg-raised px-3 text-xs text-slate-100" />
              </label>
              <label className="text-[10px] text-slate-300">
                CNPJ *
                <input defaultValue="12.345.678/0001-90" required className="mt-2 h-10 w-full rounded-md border border-[#26354D] bg-raised px-3 text-xs text-slate-100" />
              </label>
              <label className="text-[10px] text-slate-300 sm:col-span-2">
                Endereço
                <input defaultValue="Av. Conselheiro Aguiar, 2000 - Piedade" className="mt-2 h-10 w-full rounded-md border border-[#26354D] bg-raised px-3 text-xs text-slate-100" />
              </label>
            </div>
          </div>
        </section>

        <section className="mt-5 rounded-xl bg-elevated p-5">
          <h2 className="text-base font-semibold">Contato e funcionamento</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="text-[10px] text-slate-300">
              Telefone
              <input defaultValue="(81) 99999-0000" className="mt-2 h-10 w-full rounded-md border border-[#26354D] bg-raised px-3 text-xs text-slate-100" />
            </label>
            <label className="text-[10px] text-slate-300">
              E-mail
              <input defaultValue="contato@allmotorsbrasil.com.br" type="email" className="mt-2 h-10 w-full rounded-md border border-[#26354D] bg-raised px-3 text-xs text-slate-100" />
            </label>
            <label className="text-[10px] text-slate-300">
              Horário de funcionamento
              <input defaultValue="Segunda a sábado, 08h às 18h" className="mt-2 h-10 w-full rounded-md border border-[#26354D] bg-raised px-3 text-xs text-slate-100" />
            </label>
            <label className="text-[10px] text-slate-300">
              Cidade / UF
              <input defaultValue="Jaboatão dos Guararapes, PE" className="mt-2 h-10 w-full rounded-md border border-[#26354D] bg-raised px-3 text-xs text-slate-100" />
            </label>
          </div>
        </section>

        <footer className="mt-5 flex items-center justify-between">
          {notice ? (
            <p role="status" className="flex items-center gap-2 text-[10px] text-emerald-300"><Check className="h-4 w-4" />{notice}</p>
          ) : <span />}
          <button type="submit" className="flex h-10 items-center gap-2 rounded-md bg-brand-500 px-4 text-xs font-semibold text-white hover:bg-brand-700">
            <Save className="h-4 w-4" />Salvar alterações
          </button>
        </footer>
      </form>
    </div>
  )
}
