import { useState } from 'react'
import { Plus, Pencil, Trash2, Power } from 'lucide-react'

const initialUsers = [
  { name: 'Marina Costa', email: 'marina.costa@allmotors.exemplo', role: 'Administrador', active: true },
  { name: 'Rafael Mendes', email: 'rafael.mendes@allmotors.exemplo', role: 'Vendedor', active: true },
  { name: 'Bruna Nogueira', email: 'bruna.nogueira@allmotors.exemplo', role: 'Gerente', active: true },
  { name: 'Diego Alves', email: 'diego.alves@allmotors.exemplo', role: 'Vendedor', active: true },
  { name: 'Paulo Santos', email: 'paulo.santos@allmotors.exemplo', role: 'Vendedor', active: false },
]

export function UsersPage() {
  const [users, setUsers] = useState(initialUsers)
  const [open, setOpen] = useState(false)
  const [notice, setNotice] = useState('')

  function toggleActive(index: number) {
    setUsers((current) => current.map((user, i) => i === index ? { ...user, active: !user.active } : user))
  }

  return (
    <div className="mx-auto max-w-[1152px]">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <h1 className="font-heading text-[28px] font-semibold tracking-tight">Usuários e equipe</h1>
          <p className="mt-1 text-sm text-slate-400">Gerencie quem acessa o CRM e perfil a cada pessoa.</p>
        </div>
        <button type="button" onClick={() => setOpen(true)} className="flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-xs font-semibold text-white hover:bg-brand-700">
          <Plus className="h-4 w-4" />Novo usuário
        </button>
      </header>

      <section className="mt-7 overflow-hidden rounded-xl bg-elevated">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead className="border-b border-border text-[9px] uppercase text-slate-400">
              <tr>
                <th className="px-5 py-3 font-semibold">Nome</th>
                <th className="px-4 py-3 font-semibold">E-mail</th>
                <th className="px-4 py-3 font-semibold">Perfil</th>
                <th className="px-4 py-3 font-semibold">Situação</th>
                <th className="px-5 py-3 text-right font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((user, index) => (
                <tr key={user.email} className="text-[11px] transition-colors hover:bg-raised">
                  <td className="px-5 py-4 font-semibold">{user.name}</td>
                  <td className="px-4 py-4 text-slate-400">{user.email}</td>
                  <td className="px-4 py-4"><span className="rounded-md bg-[#172B49] px-2 py-1 text-[9px] text-[#8AB9FF]">{user.role}</span></td>
                  <td className="px-4 py-4">
                    <button type="button" onClick={() => toggleActive(index)} className={`flex items-center gap-2 ${user.active ? 'text-emerald-300' : 'text-slate-500'}`} aria-label={`${user.active ? 'Desativar' : 'Ativar'} ${user.name}`}>
                      <span className={`flex h-5 w-9 items-center rounded-full p-0.5 ${user.active ? 'bg-emerald-600' : 'bg-slate-600'}`}>
                        <span className={`h-4 w-4 rounded-full bg-white transition-transform ${user.active ? 'translate-x-4' : 'translate-x-0'}`} />
                      </span>
                      {user.active ? 'Ativo' : 'Inativo'}
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button type="button" onClick={() => setNotice(`Editando ${user.name}.`)} className="flex h-8 items-center gap-1.5 rounded-md border border-[#26354D] px-2.5 text-[9px] text-slate-300 hover:bg-slate-700"><Pencil className="h-3 w-3" />Editar</button>
                      {user.active ? (
                        <button type="button" onClick={() => toggleActive(index)} className="flex h-8 items-center gap-1.5 rounded-md border border-[#26354D] px-2.5 text-[9px] text-slate-300 hover:bg-slate-700"><Power className="h-3 w-3" />Desativar</button>
                      ) : (
                        <button type="button" onClick={() => setUsers((current) => current.filter((item) => item.email !== user.email))} className="flex h-8 items-center gap-1.5 rounded-md border border-rose-900/60 px-2.5 text-[9px] text-rose-300 hover:bg-rose-950"><Trash2 className="h-3 w-3" />Excluir</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {notice && <p role="status" className="mt-4 rounded-lg bg-[#12305B] px-4 py-3 text-xs text-[#CFE1FF]">{notice}</p>}

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onMouseDown={(event) => event.target === event.currentTarget && setOpen(false)}>
          <form onSubmit={(event) => { event.preventDefault(); setOpen(false); setNotice('Usuário criado com sucesso.') }} className="w-full max-w-[430px] rounded-xl border border-border bg-elevated p-5">
            <h2 className="text-base font-semibold">Novo usuário</h2>
            <div className="mt-5 space-y-3">
              <label className="block text-[10px] text-slate-300">Nome *<input required className="mt-2 h-10 w-full rounded-md border border-[#26354D] bg-raised px-3 text-xs" /></label>
              <label className="block text-[10px] text-slate-300">E-mail *<input required type="email" className="mt-2 h-10 w-full rounded-md border border-[#26354D] bg-raised px-3 text-xs" /></label>
              <label className="block text-[10px] text-slate-300">Perfil<select className="mt-2 h-10 w-full rounded-md border border-[#26354D] bg-raised px-3 text-xs"><option>Vendedor</option><option>Gerente</option><option>Administrador</option></select></label>
              <label className="block text-[10px] text-slate-300">Situação<select className="mt-2 h-10 w-full rounded-md border border-[#26354D] bg-raised px-3 text-xs"><option>Ativo</option><option>Inativo</option></select></label>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button type="button" onClick={() => setOpen(false)} className="h-9 rounded-md border border-[#26354D] px-4 text-[10px] text-slate-300">Cancelar</button>
              <button type="submit" className="h-9 rounded-md bg-brand-500 px-4 text-[10px] font-semibold text-white">Cadastrar usuário</button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
