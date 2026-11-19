import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { ModalShell } from './ModalShell'

const results = [
  {
    label: 'João Lima · Recife, PE · Cliente 360° →',
    keywords: 'joão lima recife cliente',
    path: '/clientes',
  },
  {
    label: 'DEMO-KZERO-000012 · K-Zero · João Lima →',
    keywords: 'demo-kzero-000012 k-zero joão lima veículo',
    path: '/catalogo',
  },
]

interface GlobalSearchDialogProps {
  onClose(): void
  navigate(path: string): void
}

export function GlobalSearchDialog({ onClose, navigate }: GlobalSearchDialogProps) {
  const [query, setQuery] = useState('João Lima')
  const visibleResults = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('pt-BR')
    if (!normalizedQuery) return results
    return results.filter((result) => result.keywords.toLocaleLowerCase('pt-BR').includes(normalizedQuery))
  }, [query])

  return (
    <ModalShell title="Busca global" onClose={onClose} size="frame">
      <label className="block">
        <span className="mb-2 block text-[9px] text-slate-300">Cliente, VIN ou modelo</span>
        <span className="flex h-10 items-center gap-2 rounded-md bg-raised px-3">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar cliente, VIN ou modelo"
            className="min-w-0 flex-1 bg-transparent text-[10px] text-slate-100 placeholder:text-slate-500"
          />
          <Search aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-slate-400" />
        </span>
      </label>
      <div className="mt-8 space-y-3" aria-live="polite">
        {visibleResults.map((result) => (
          <button
            key={result.path}
            type="button"
            onClick={() => navigate(result.path)}
            className="flex min-h-[38px] w-full items-center rounded-md bg-raised px-3 py-2 text-left text-[10px] text-slate-100 transition-colors hover:bg-slate-700"
          >
            {result.label}
          </button>
        ))}
        {visibleResults.length === 0 && (
          <p className="rounded-md bg-raised px-3 py-3 text-[10px] text-slate-400">Nenhum resultado encontrado.</p>
        )}
      </div>
      <p className="mt-8 text-[9px] text-slate-400">Pesquisa demonstrativa com resultados predefinidos.</p>
    </ModalShell>
  )
}
