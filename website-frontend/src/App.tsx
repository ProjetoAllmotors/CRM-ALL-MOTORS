import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
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

const DashboardPage = lazy(() => import('./pages/DashboardPage').then((module) => ({ default: module.DashboardPage })))

export default function App() {
  return (
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
            <Route path="/pedidos" element={<GenericPage title="Pedidos" kind="orders" />} />
            <Route path="/assistencia" element={<GenericPage title="Assistência técnica" kind="support" />} />
            <Route path="/pos-venda" element={<GenericPage title="Pós-venda" kind="aftersales" />} />
            <Route path="/omnichannel" element={<OmnichannelPage />} />
            <Route path="/automacoes" element={<AutomationsPage />} />
            <Route path="/configuracoes" element={<GenericPage title="Configurações" kind="settings" />} />
            <Route path="/leads" element={<GenericPage title="Leads" kind="leads" />} />
            <Route path="/recuperar-senha" element={<GenericPage title="Recuperar senha" kind="recovery" />} />
            <Route path="/nova-senha" element={<GenericPage title="Nova senha" kind="recovery" />} />
            <Route path="/*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </QuickActionProvider>
  )
}
