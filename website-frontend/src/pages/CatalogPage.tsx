import { useMemo, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { QuickActionButtons } from '../components/features/QuickActionButtons'
import { useQuickActions } from '../components/features/useQuickActions'

const models = [
  { name: 'K-Zero', power: '350W', battery: 'Chumbo', status: 'Sem CNH/Placa', pe: 8, al: 3, pb: 4, rn: 2, price: 'R$ 5.900', category: 'Autopropelido' },
  { name: 'K1-May', power: '600W', battery: 'Grafeno', status: 'Sem CNH/Placa', pe: 12, al: 5, pb: 6, rn: 4, price: 'R$ 8.900', category: 'Autopropelido' },
  { name: 'ALL-B1Z', power: '800W', battery: 'Lítio', status: 'Sem CNH/Placa', pe: 6, al: 2, pb: 3, rn: 2, price: 'R$ 9.900', category: 'Autopropelido' },
  { name: 'Bosch', power: '1000W', battery: 'Chumbo', status: 'Validar enquadramento', pe: 4, al: 2, pb: 2, rn: 1, price: 'R$ 10.900', category: 'Ciclomotor' },
  { name: 'Design iF', power: '400W', battery: 'Lítio', status: 'Sem CNH/Placa', pe: 5, al: 2, pb: 3, rn: 1, price: 'R$ 8.900', category: 'Autopropelido' },
  { name: 'Ciclomotor', power: '1200W', battery: 'Chumbo', status: 'Requer CNH A / ACC', pe: 3, al: 1, pb: 2, rn: 1, price: 'R$ 12.900', category: 'Ciclomotor' },
  { name: 'Triciclo', power: '650W', battery: 'Chumbo', status: 'Validar dimensões', pe: 2, al: 1, pb: 1, rn: 1, price: 'R$ 11.900', category: 'Triciclo' },
  { name: 'ALL-TK Carga 400kg', power: '1000W', battery: 'Chumbo', status: 'B2B · triagem obrigatória', pe: 3, al: 2, pb: 1, rn: 1, price: 'R$ 18.900', category: 'Carga / B2B' },
]

export function CatalogPage() {
  const { openSimulator } = useQuickActions()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Todas as categorias')
  const visibleModels = useMemo(() => models.filter((model) => {
    const matchesSearch = model.name.toLowerCase().includes(search.toLowerCase())
    return matchesSearch && (category === 'Todas as categorias' || model.category === category)
  }), [category, search])

  return (
    <div className="mx-auto max-w-[1152px]">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
        <div>
          <h1 className="font-heading text-[28px] font-semibold tracking-tight">Catálogo AIMA</h1>
          <p className="mt-1 text-sm text-slate-400">Mobilidade elétrica para cada perfil de cliente.</p>
        </div>
        <QuickActionButtons />
      </div>

      <section className="mt-7 grid gap-5 rounded-xl bg-elevated p-4 sm:grid-cols-[148px_minmax(0,1fr)_215px] sm:items-center sm:p-4">
        <img
          src="/images/aima-k1-may.png"
          alt="Scooter elétrica AIMA K1-May em exposição"
          className="h-40 w-full rounded-md object-cover sm:h-[148px]"
        />
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-[#66A5FF]">Destaque da rede</p>
          <h2 className="mt-2 font-heading text-2xl font-semibold">AIMA K1-May</h2>
          <p className="mt-1 text-xs text-slate-400">600W de potência. Mais energia para o dia a dia.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-md bg-raised px-3 py-2 text-[10px] text-emerald-300">Bateria de Grafeno</span>
            <span className="rounded-md bg-raised px-3 py-2 text-[10px] text-[#66A5FF]">Até 70 km*</span>
          </div>
          <p className="mt-4 text-[9px] text-slate-400">*Autonomia informada no site da marca; varia com uso e condições.</p>
        </div>
        <div className="flex flex-col gap-3 sm:items-stretch">
          <div>
            <p className="text-2xl font-semibold">R$ 8.900</p>
            <p className="mt-1 text-[10px] text-slate-400">Preço demonstrativo</p>
          </div>
          <button type="button" onClick={openSimulator} className="rounded-md bg-raised px-3 py-2 text-left text-[10px] hover:bg-slate-700">Simular proposta →</button>
        </div>
      </section>

      <section className="mt-5 rounded-xl bg-elevated p-4 sm:p-5">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <h2 className="text-base font-semibold">Portfólio elétrico</h2>
            <p className="mt-1 text-[11px] text-slate-400">8 modelos • estoque demonstrativo por unidade</p>
          </div>
          <label className="flex h-8 items-center gap-2 rounded-md bg-[#172B49] px-3">
            <span className="sr-only">Filtrar modelo</span>
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar modelo" className="w-24 bg-transparent text-[10px] placeholder:text-slate-400 sm:w-28" />
            <select value={category} onChange={(event) => setCategory(event.target.value)} className="max-w-36 bg-transparent text-[10px] text-[#8AB9FF]">
              <option className="bg-elevated" value="Todas as categorias">Todas as categorias</option>
              <option className="bg-elevated" value="Autopropelido">Autopropelido</option>
              <option className="bg-elevated" value="Ciclomotor">Ciclomotor</option>
              <option className="bg-elevated" value="Triciclo">Triciclo</option>
              <option className="bg-elevated" value="Carga / B2B">Carga / B2B</option>
            </select>
            <ChevronDown className="h-3 w-3 text-[#8AB9FF]" />
          </label>
        </div>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[790px] border-separate border-spacing-0 text-left">
            <thead>
              <tr className="text-[9px] uppercase text-slate-400">
                {['Modelo', 'Potência', 'Bateria', 'Classificação', 'PE', 'AL', 'PB', 'RN', 'Valor demo'].map((column) => (
                  <th key={column} className="px-2 py-2 font-medium">{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visibleModels.map((model) => (
                <tr key={model.name} className="text-[10px] even:bg-[#152238] hover:bg-[#1B2C46]">
                  <td className="rounded-l px-2 py-3 font-medium">{model.name}</td>
                  <td className="px-2 py-3">{model.power}</td>
                  <td className="px-2 py-3">{model.battery}</td>
                  <td className={`px-2 py-3 ${model.status.includes('CNH') || model.status.includes('Validar') ? 'text-warning' : 'text-emerald-300'}`}>{model.status}</td>
                  <td className="px-2 py-3">{model.pe}</td><td className="px-2 py-3">{model.al}</td>
                  <td className="px-2 py-3">{model.pb}</td><td className="px-2 py-3">{model.rn}</td>
                  <td className="rounded-r px-2 py-3">{model.price}</td>
                </tr>
              ))}
              {visibleModels.length === 0 && (
                <tr><td colSpan={9} className="py-12 text-center text-xs text-slate-400">Nenhum modelo encontrado para os filtros selecionados.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <p className="mt-5 text-[10px] leading-relaxed text-slate-400">
        CONTRAN 996: a potência isolada não define a categoria. Confirmar velocidade, dimensões e exigências de circulação antes da venda.
      </p>
      <p className="mt-4 text-[10px] text-slate-500">Operação demonstrativa • valores e registros de exemplo</p>
    </div>
  )
}
