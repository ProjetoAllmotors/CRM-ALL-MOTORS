import { ModalShell } from './ModalShell'

const regions = [
  'Todas NE',
  'PE · Pernambuco',
  'AL · Alagoas',
  'PB · Paraíba',
  'RN · Rio Grande do Norte',
]

interface RegionFilterDialogProps {
  selectedRegion: string
  onClose(): void
  onSelect(region: string): void
}

export function RegionFilterDialog({ selectedRegion, onClose, onSelect }: RegionFilterDialogProps) {
  return (
    <ModalShell title="Filtros regionais" description="Selecione a área de atuação" onClose={onClose} size="frame">
      <div className="space-y-3">
        {regions.map((region) => (
          <button
            key={region}
            type="button"
            aria-pressed={selectedRegion === region}
            onClick={() => onSelect(region)}
            className={`flex h-[38px] w-full items-center rounded-md px-3 text-left text-[10px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500 ${
              selectedRegion === region ? 'bg-brand-500 text-white' : 'bg-raised text-slate-100 hover:bg-slate-700'
            }`}
          >
            {region}
          </button>
        ))}
      </div>
    </ModalShell>
  )
}
