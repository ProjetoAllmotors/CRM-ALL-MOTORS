import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { ModalShell } from './ModalShell'

const products = [
  { name: 'K1-May 600W · Grafeno', price: 8900 },
  { name: 'K-Zero 350W · Chumbo', price: 5900 },
  { name: 'ALL-B1Z 800W · Lítio', price: 9900 },
]

const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

interface SimulatorDialogProps {
  onClose(): void
}

export function SimulatorDialog({ onClose }: SimulatorDialogProps) {
  const [productName, setProductName] = useState(products[0].name)
  const [downPayment, setDownPayment] = useState(2000)
  const [installments, setInstallments] = useState(12)
  const [distance, setDistance] = useState(1000)
  const product = products.find((item) => item.name === productName) ?? products[0]

  const estimate = useMemo(() => {
    const principal = Math.max(0, product.price - downPayment)
    const kmFactor = Math.max(0, distance) / 1000
    const fuel = 174.29 * kmFactor
    const electricity = 33.25 * kmFactor
    return {
      installment: principal / installments,
      total: downPayment + principal,
      fuel,
      electricity,
      savings: fuel - electricity,
    }
  }, [distance, downPayment, installments, product.price])

  return (
    <ModalShell title="Parcelas & economia" description="Uma simulação simples para cada escolha." onClose={onClose} size="large">
      <div className="space-y-3">
        <Field label="Modelo">
          <select value={productName} onChange={(event) => setProductName(event.target.value)} className="field-control">
            {products.map((item) => <option key={item.name} value={item.name}>{item.name} · {currency.format(item.price)}</option>)}
          </select>
        </Field>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Entrada">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">R$</span>
              <input type="number" min="0" max={product.price} step="100" value={downPayment} onChange={(event) => setDownPayment(Math.min(product.price, Math.max(0, Number(event.target.value))))} className="field-control pl-9" />
            </div>
          </Field>
          <Field label="Condição estimativa">
            <div className="flex h-10 items-center rounded-md border border-[#26354D] bg-raised px-3 text-[10px] text-slate-300">Cartão · sem tarifa</div>
          </Field>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Número de parcelas">
            <select value={installments} onChange={(event) => setInstallments(Number(event.target.value))} className="field-control">
              {[6, 10, 12, 18].map((value) => <option key={value} value={value}>{value} parcelas</option>)}
            </select>
          </Field>
          <Field label="Distância mensal">
            <div className="relative">
              <input type="number" min="0" step="100" value={distance} onChange={(event) => setDistance(Math.max(0, Number(event.target.value)))} className="field-control pr-12" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] text-slate-400">km/mês</span>
            </div>
          </Field>
        </div>

        <div className="rounded-lg border border-[#24395A] bg-[#11284A] p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[8px] uppercase tracking-wide text-[#8AB9FF]">Parcela estimada</p>
              <p className="mt-1 font-heading text-2xl font-semibold">{currency.format(estimate.installment)}</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] text-slate-400">{installments} parcelas</p>
              <p className="mt-1 text-[9px] text-slate-300">Saldo {currency.format(product.price - downPayment)}</p>
            </div>
          </div>
          <p className="mt-2 text-[8px] text-slate-400">Total estimado: {currency.format(estimate.total)} · sujeito à análise da instituição financeira.</p>
        </div>

        <div>
          <h3 className="text-[10px] font-semibold">Elétrica vs. gasolina · {distance.toLocaleString('pt-BR')} km/mês</h3>
          <div className="mt-2 flex justify-between text-[9px]">
            <span className="text-slate-400">Gasolina estimada</span><span className="text-warning">{currency.format(estimate.fuel)} / mês</span>
          </div>
          <div className="mt-1 flex justify-between text-[9px]">
            <span className="text-slate-400">Energia estimada</span><span className="text-slate-300">{currency.format(estimate.electricity)} / mês</span>
          </div>
        </div>
        <div className="flex items-center justify-between rounded-md bg-[#0D322C] px-3 py-3">
          <span className="text-[9px] text-emerald-100">Economia estimada</span>
          <span className="text-xs font-semibold text-emerald-300">{currency.format(estimate.savings)} / mês</span>
        </div>
        <p className="text-[8px] leading-relaxed text-slate-500">Estimativa demonstrativa de consumo; o resultado real varia conforme percurso, tarifa, combustível e condições de uso.</p>
        <button type="button" onClick={onClose} className="h-10 w-full rounded-md bg-brand-500 text-xs font-semibold hover:bg-brand-700">Fechar simulação</button>
      </div>
    </ModalShell>
  )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="block"><span className="mb-1.5 block text-[10px] font-medium text-slate-200">{label}</span>{children}</label>
}
