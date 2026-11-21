import { useState } from 'react'
import { Bell, CalendarDays, ChevronDown, LogOut, Menu, Moon, PanelLeftClose, PanelLeftOpen, Search, Sun, X } from 'lucide-react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { navigationItems } from '../../data/navigation'
import { useQuickActions } from '../features/useQuickActions'
import { useUserRole } from '../../auth/userRoleStore'
import { DateFilterContext } from './DateFilterContext'

const regions = ['Pernambuco', 'Alagoas', 'Paraíba', 'Rio Grande do Norte']

export function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [sidebarVisible, setSidebarVisible] = useState(() => (
    window.localStorage.getItem('crm-sidebar-visible') !== 'false'
  ))
  const [theme, setTheme] = useState<'dark' | 'light'>(() => (
    window.localStorage.getItem('crm-theme') === 'light' ? 'light' : 'dark'
  ))
  const [selectedDate, setSelectedDate] = useState(() => (
    window.localStorage.getItem('crm-selected-date') || '2026-11-18'
  ))
  const { region, openRegionFilter, openGlobalSearch } = useQuickActions()
  const { role, userName, setProfile } = useUserRole()
  const navigate = useNavigate()

  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    window.localStorage.setItem('crm-theme', nextTheme)
    setTheme(nextTheme)
  }

  function signOut() {
    setProfile('admin')
    navigate('/login')
  }

  function toggleSidebar() {
    const nextVisibility = !sidebarVisible
    window.localStorage.setItem('crm-sidebar-visible', String(nextVisibility))
    setSidebarVisible(nextVisibility)
  }

  return (
    <DateFilterContext.Provider value={{ selectedDate }}>
    <div data-theme={theme} className="app-shell min-h-screen bg-canvas text-slate-50 lg:flex">
      {sidebarVisible && (
        <aside id="desktop-sidebar" className="fixed inset-y-0 left-0 z-30 hidden w-56 border-r border-border bg-elevated px-3 py-6 lg:flex lg:flex-col">
          <SidebarContent />
        </aside>
      )}

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

      <div className={`min-w-0 flex-1 ${sidebarVisible ? 'lg:ml-56' : 'lg:ml-0'}`}>
        <header className="sticky top-0 z-20 flex min-h-20 flex-wrap items-center gap-3 border-b border-border bg-elevated px-4 py-3 sm:px-6 lg:flex-nowrap lg:px-7">
          <button
            type="button"
            onClick={toggleSidebar}
            aria-label={sidebarVisible ? 'Esconder menu lateral' : 'Mostrar menu lateral'}
            aria-controls="desktop-sidebar"
            aria-expanded={sidebarVisible}
            title={sidebarVisible ? 'Esconder menu lateral' : 'Mostrar menu lateral'}
            className="hidden h-[38px] w-[38px] shrink-0 items-center justify-center rounded-lg bg-raised text-slate-300 hover:bg-slate-700 hover:text-white lg:flex"
          >
            {sidebarVisible ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeftOpen className="h-4 w-4" />}
          </button>
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
          <label className="relative flex h-[38px] shrink-0 items-center gap-1.5 rounded-lg bg-raised px-2.5 text-xs text-slate-300" title="Filtrar por data">
            <CalendarDays className="h-3.5 w-3.5 shrink-0 text-slate-400" />
            <span className="sr-only">Filtrar por data</span>
            <input
              type="date"
              aria-label="Filtrar por data"
              value={selectedDate}
              onChange={(event) => {
                setSelectedDate(event.target.value)
                window.localStorage.setItem('crm-selected-date', event.target.value)
              }}
              style={{ colorScheme: theme }}
              className="w-[116px] bg-transparent text-[10px] text-slate-300 focus:outline-none"
            />
          </label>
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate('/agenda-follow-ups')}
              aria-label="Abrir agenda de follow-ups"
              className="relative flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-lg bg-raised text-slate-300 hover:bg-slate-700 hover:text-white"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#E53935] px-1 text-[8px] font-bold text-white">5</span>
            </button>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Ativar tema ${theme === 'dark' ? 'claro' : 'escuro'}`}
              className="flex h-[38px] shrink-0 items-center gap-1.5 rounded-lg bg-raised px-2.5 text-[10px] text-slate-200 hover:bg-slate-700"
            >
              {theme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>
            <button
              type="button"
              onClick={signOut}
              className="flex h-[38px] shrink-0 items-center gap-1.5 rounded-lg bg-raised px-2.5 text-[10px] text-slate-200 hover:bg-slate-700"
            >
              <LogOut className="h-3.5 w-3.5" />Sair
            </button>
            <div className="hidden sm:block">
              <p className="text-xs font-semibold text-slate-100">{userName}</p>
              <p className="mt-1 text-[10px] text-slate-400">{role === 'admin' ? 'Administrador' : 'Vendedor'}</p>
            </div>
            <span className="ml-2 h-2 w-2 rounded-full bg-success" aria-label="Status conectado" />
          </div>
        </header>
        <main className="min-h-[calc(100vh-5rem)] px-4 py-6 sm:px-6 lg:px-8 lg:py-7">
          <Outlet />
        </main>
      </div>
    </div>
    </DateFilterContext.Provider>
  )
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const { role } = useUserRole()
  const operationalRoutes = ['/dashboard', '/pipeline', '/test-rides', '/catalogo', '/omnichannel', '/clientes', '/propostas', '/agenda-follow-ups', '/pedidos', '/pos-venda', '/encerramentos']
  const adminRoutes = ['/assistencia', '/automacoes', '/envios', '/regras-acompanhamento', '/usuarios', '/configuracoes']
  const items = navigationItems.filter((item) => operationalRoutes.includes(item.to) || (role === 'admin' && adminRoutes.includes(item.to)))
  const managementItems = items.filter((item) => adminRoutes.includes(item.to))

  return (
    <>
      <NavLink to="/dashboard" onClick={onNavigate} className="mb-9 block px-3">
        <span className="block font-heading text-[21px] font-bold tracking-tight">ALL MOTORS</span>
        <span className="mt-1 block text-[10px] tracking-wide text-slate-400">BRASIL&nbsp;&nbsp; / &nbsp;&nbsp;CRM 360°</span>
      </NavLink>
      <div className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-wide text-slate-400">Área de trabalho</div>
      <nav aria-label="Navegação principal" className="space-y-1">
        {items.filter((item) => !adminRoutes.includes(item.to)).map(({ label, to, icon: Icon }) => (
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
      {role === 'admin' && (
        <div className="mt-7 border-t border-border pt-5">
          <div className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-wide text-slate-400">Administração</div>
          <nav aria-label="Administração" className="space-y-1">
            {managementItems.map(({ label, to, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={onNavigate}
                className={({ isActive }) => `flex h-11 items-center gap-3 rounded-lg px-3 text-xs transition-colors ${isActive ? 'bg-[#12305B] font-semibold text-[#66A5FF]' : 'text-slate-400 hover:bg-raised hover:text-slate-100'}`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      )}
      {role === 'admin' && (
        <>
          <div className="mt-7 border-t border-border pt-6">
            <p className="px-2 text-[10px] font-semibold uppercase tracking-wide text-slate-400">Rede Nordeste</p>
            <ul className="mt-3 space-y-3 px-2">
              {regions.map((region) => <li key={region} className="text-xs text-slate-400">{region}</li>)}
            </ul>
          </div>
          <div className="mb-6 rounded-lg bg-[#0D2545] p-3">
            <p className="font-heading text-base font-semibold leading-5">Energia que<br />move vidas.</p>
            <p className="mt-2 text-[10px] text-[#66A5FF]">Concessionária AIMA</p>
          </div>
        </>
      )}
    </>
  )
}
