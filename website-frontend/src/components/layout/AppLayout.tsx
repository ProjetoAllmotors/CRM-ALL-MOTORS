import { useState } from 'react'
import { CalendarDays, ChevronDown, Grid2X2, Menu, Search, X } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import { navigationItems } from '../../data/navigation'
import { useQuickActions } from '../features/useQuickActions'

const regions = ['Pernambuco', 'Alagoas', 'Paraíba', 'Rio Grande do Norte']

export function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { region, openRegionFilter, openGlobalSearch } = useQuickActions()

  return (
    <div className="min-h-screen bg-canvas text-slate-50 lg:flex">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-56 border-r border-border bg-elevated px-3 py-6 lg:flex lg:flex-col">
        <SidebarContent />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Fechar menu"
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative flex h-full w-72 flex-col border-r border-border bg-elevated px-3 py-6">
            <button
              type="button"
              aria-label="Fechar menu"
              className="absolute right-3 top-3 rounded-lg p-2 text-slate-300 hover:bg-raised"
              onClick={() => setMobileOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
            <SidebarContent onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      <div className="min-w-0 flex-1 lg:ml-56">
        <header className="sticky top-0 z-20 flex min-h-20 flex-wrap items-center gap-3 border-b border-border bg-elevated px-4 py-3 sm:px-6 lg:flex-nowrap lg:px-7">
          <button
            type="button"
            aria-label="Abrir menu"
            className="rounded-lg p-2 text-slate-300 hover:bg-raised lg:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
          <button type="button" onClick={openRegionFilter} className="flex h-[38px] max-w-40 shrink-0 items-center gap-2 rounded-lg bg-raised px-3 text-xs text-slate-100 hover:bg-slate-700">
            <span className="truncate">{region}</span> <ChevronDown className="h-3 w-3 shrink-0" />
          </button>
          <button type="button" onClick={openGlobalSearch} aria-label="Abrir busca global" className="flex h-[38px] min-w-40 max-w-md flex-1 items-center gap-2 rounded-lg bg-raised px-3 text-left text-slate-300 transition-colors hover:bg-slate-700">
            <span aria-hidden="true" className="flex-1 text-xs text-slate-400">Buscar cliente, VIN ou modelo</span>
            <Search className="h-4 w-4 shrink-0 text-slate-400" />
          </button>
          <div className="hidden items-center gap-2 text-xs text-slate-400 xl:flex">
            <CalendarDays className="h-4 w-4" />
            18 NOV, 2026
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="hidden sm:block">
              <p className="text-xs font-semibold text-slate-100">Operação Nordeste</p>
              <p className="mt-1 text-[10px] text-slate-400">Gerência regional</p>
            </div>
            <span className="ml-2 h-2 w-2 rounded-full bg-success" aria-label="Status conectado" />
          </div>
        </header>
        <main className="min-h-[calc(100vh-5rem)] px-4 py-6 sm:px-6 lg:px-8 lg:py-7">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      <NavLink to="/dashboard" onClick={onNavigate} className="mb-9 block px-3">
        <span className="block font-heading text-[21px] font-bold tracking-tight">ALL MOTORS</span>
        <span className="mt-1 block text-[10px] tracking-wide text-slate-400">BRASIL&nbsp;&nbsp; / &nbsp;&nbsp;CRM 360°</span>
      </NavLink>
      <div className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-wide text-slate-400">Área de trabalho</div>
      <nav aria-label="Navegação principal" className="space-y-1">
        {navigationItems.filter((item) => item.label !== 'Relatórios' && ['/dashboard', '/pipeline', '/test-rides', '/catalogo', '/omnichannel', '/clientes', '/automacoes'].includes(item.to)).map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex h-11 items-center gap-3 rounded-lg px-3 text-xs transition-colors ${
                isActive ? 'bg-[#12305B] font-semibold text-[#66A5FF]' : 'text-slate-400 hover:bg-raised hover:text-slate-100'
              }`
            }
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="mt-7 border-t border-border pt-6">
        <p className="px-2 text-[10px] font-semibold uppercase tracking-wide text-slate-400">Rede Nordeste</p>
        <ul className="mt-3 space-y-3 px-2">
          {regions.map((region) => <li key={region} className="text-xs text-slate-400">{region}</li>)}
        </ul>
      </div>
      <div className="mt-auto">
        <div className="mb-6 rounded-lg bg-[#0D2545] p-3">
          <p className="font-heading text-base font-semibold leading-5">Energia que<br />move vidas.</p>
          <p className="mt-2 text-[10px] text-[#66A5FF]">Concessionária AIMA</p>
        </div>
        <div className="flex gap-2">
          <button className="h-[38px] flex-1 rounded-lg bg-raised px-3 text-left text-xs hover:bg-slate-700">
            <Grid2X2 className="mr-2 inline h-3 w-3" />Light Mode
          </button>
          <NavLink to="/login" className="flex h-[38px] items-center rounded-lg bg-raised px-4 text-xs hover:bg-slate-700">
            Sair
          </NavLink>
        </div>
      </div>
    </>
  )
}
