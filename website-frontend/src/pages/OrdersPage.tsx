import { useState } from 'react'
import { Check, Plus } from 'lucide-react'
import { useUserRole } from '../auth/userRoleStore'

interface Order {
  id: string
  customer: string
  vehicle: string
  value: string
  status: string
  responsible: string
}

const initialOrders: Order[] = [
  { id: '#10482', customer: 'João Lima', vehicle: 'AIMA K-Zero 350W', value: 'R$ 5.300', status: 'Aguardando documentação', responsible: 'Rafael Mendes' },
  { id: '#10471', customer: 'Helena Duarte', vehicle: 'AIMA K1-May', value: 'R$ 8.900', status: 'Pagamento confirmado', responsible: 'Rafael Mendes' },
]

export function OrdersPage() {
  const { role, userName } = useUserRole()
  const [orders, setOrders] = useState(initialOrders)
  const [creating, setCreating] = useState(false)
  const [notice, setNotice] = useState('')
  const visibleOrders = role === 'admin' ? orders : orders.filter((order) => order.responsible === userName)

  function registerSale(formData: FormData) {
    const customer = String(formData.get('customer') ?? '').trim()
    const vehicle = String(formData.get('vehicle') ?? '').trim()
    const value = String(formData.get('value') ?? '').trim()
    if (!customer || !vehicle || !value) {
      setNotice('Preencha cliente, modelo e valor para registrar a venda.')
      return
    }

    setOrders((current) => [{
      id: `#${10483 + current.length - initialOrders.length}`,
      customer,
      vehicle,
      value: value.startsWith('R$') ? value : `R$ ${value}`,
      status: 'Novo registro',
      responsible: userName,
    }, ...current])
    setCreating(false)
    setNotice('Venda registrada. O pedido permanece no histórico.')
  }

  return (
    <div className="mx-auto max-w-[1152px]">
      <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
        <div>
          <h1 className="font-heading text-[28px] font-semibold tracking-tight">Pedidos e registro de venda</h1>
          <p className="mt-1 text-sm text-slate-400">Registre vendas e acompanhe o andamento dos seus pedidos.</p>
        </div>
        <button type="button" onClick={() => setCreating(true)} className="flex h-10 items-center justify-center gap-2 self-start rounded-lg bg-brand-500 px-4 text-xs font-semibold text-white hover:bg-brand-700">
          <Plus className="h-4 w-4" />Registrar venda
        </button>
      </header>

      <section className="mt-7 overflow-hidden rounded-xl bg-elevated">
        <div className="border-b border-border px-5 py-4">
          <h2 className="text-sm font-semibold">Meus pedidos</h2>
        </div>
        <div className="divide-y divide-border">
          {visibleOrders.map((order) => (
            <article key={order.id} className="grid gap-3 px-5 py-4 sm:grid-cols-[90px_minmax(160px,1fr)_minmax(160px,1fr)_120px_minmax(160px,1fr)] sm:items-center">
              <span className="text-[10px] font-semibold text-[#66A5FF]">{order.id}</span>
              <span className="text-xs font-medium">{order.customer}</span>
              <span className="text-[10px] text-slate-300">{order.vehicle}</span>
              <span className="text-xs font-semibold">{order.value}</span>
              <span className="justify-self-start rounded-md bg-[#12305B] px-2 py-1.5 text-[9px] text-[#8AB9FF]">{order.status}</span>
            </article>
          ))}
        </div>
      </section>

      {creating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <form
            action={registerSale}
            className="w-full max-w-md rounded-xl border border-border bg-elevated p-5 shadow-2xl"
          >
            <h2 className="font-heading text-lg font-semibold">Registrar venda</h2>
            <label className="mt-5 block text-xs text-slate-300">Cliente
              <input name="customer" required className="mt-2 h-10 w-full rounded-md border border-[#26354D] bg-raised px-3 text-xs" />
            </label>
            <label className="mt-4 block text-xs text-slate-300">Modelo vendido
              <input name="vehicle" required className="mt-2 h-10 w-full rounded-md border border-[#26354D] bg-raised px-3 text-xs" />
            </label>
            <label className="mt-4 block text-xs text-slate-300">Valor
              <input name="value" required className="mt-2 h-10 w-full rounded-md border border-[#26354D] bg-raised px-3 text-xs" placeholder="8.900" />
            </label>
            <div className="mt-6 flex justify-end gap-2">
              <button type="button" onClick={() => setCreating(false)} className="h-9 rounded-md px-3 text-xs text-slate-300 hover:bg-raised">Cancelar</button>
              <button type="submit" className="flex h-9 items-center gap-2 rounded-md bg-brand-500 px-3 text-xs font-semibold text-white hover:bg-brand-700"><Check className="h-3.5 w-3.5" />Registrar</button>
            </div>
          </form>
        </div>
      )}

      {notice && <p role="status" className="mt-4 rounded-lg bg-[#12305B] px-4 py-3 text-xs text-[#CFE1FF]">{notice}</p>}
      <p className="mt-5 text-[10px] text-slate-500">Demonstração local: o registro não é sincronizado com um servidor.</p>
    </div>
  )
}
