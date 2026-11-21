import { lazy, Suspense } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { QuickActionProvider } from './components/features/QuickActionProvider'
import { LoginPage } from './pages/LoginPage'
import { PipelinePage } from './pages/PipelinePage'
import { TestRidesPage } from './pages/TestRidesPage'
import { CatalogPage } from './pages/CatalogPage'
import { OmnichannelPage } from './pages/OmnichannelPage'
import { ClientsPage } from './pages/ClientsPage'
import { AutomationsPage } from './pages/AutomationsPage'
import { GenericPage } from './pages/GenericPage'
import { AftersalesPage } from './pages/AftersalesPage'
import { DeliveryPage } from './pages/DeliveryPage'
import { ClosingPage } from './pages/ClosingPage'
import { StoreSettingsPage } from './pages/StoreSettingsPage'
import { UsersPage } from './pages/UsersPage'
import { FollowupsAgendaPage } from './pages/FollowupsAgendaPage'
import { UserRoleProvider } from './auth/UserRoleContext'
import { useUserRole } from './auth/userRoleStore'
import { OrdersPage } from './pages/OrdersPage'
import { FollowupRulesPage } from './pages/FollowupRulesPage'
import { ProposalsPage } from './pages/ProposalsPage'

const DashboardPage = lazy(() => import('./pages/DashboardPage').then((module) => ({ default: module.DashboardPage })))

export default function App() {
  return (
    <UserRoleProvider>
      <QuickActionProvider>
        <Suspense fallback={<div role="status" aria-live="polite" className="min-h-screen animate-pulse bg-canvas p-8 text-sm text-slate-400">Carregando tela...</div>}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<AppLayout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/pipeline" element={<PipelinePage />} />
              <Route path="/clientes" element={<ClientsPage />} />
              <Route path="/catalogo" element={<CatalogPage />} />
              <Route path="/test-rides" element={<TestRidesPage />} />
              <Route path="/pedidos" element={<OrdersPage />} />
              <Route path="/propostas" element={<ProposalsPage />} />
              <Route path="/pos-venda" element={<AftersalesPage />} />
              <Route path="/encerramentos" element={<ClosingPage />} />
              <Route path="/omnichannel" element={<OmnichannelPage />} />
              <Route path="/agenda-follow-ups" element={<FollowupsAgendaPage />} />
              <Route element={<RequireAdmin />}>
                <Route path="/assistencia" element={<GenericPage title="Assistência técnica" kind="support" />} />
                <Route path="/envios" element={<DeliveryPage />} />
                <Route path="/automacoes" element={<AutomationsPage />} />
                <Route path="/configuracoes" element={<StoreSettingsPage />} />
                <Route path="/usuarios" element={<UsersPage />} />
                <Route path="/regras-acompanhamento" element={<FollowupRulesPage />} />
                <Route path="/leads" element={<GenericPage title="Leads" kind="leads" />} />
              </Route>
              <Route path="/recuperar-senha" element={<GenericPage title="Recuperar senha" kind="recovery" />} />
              <Route path="/nova-senha" element={<GenericPage title="Nova senha" kind="recovery" />} />
              <Route path="/*" element={<Navigate to="/dashboard" replace />} />
            </Route>
          </Routes>
        </Suspense>
      </QuickActionProvider>
    </UserRoleProvider>
  )
}

function RequireAdmin() {
  const { role } = useUserRole()
  return role === 'admin' ? <Outlet /> : <Navigate to="/dashboard" replace />
}
