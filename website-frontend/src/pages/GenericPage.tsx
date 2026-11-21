import { useMemo, useState } from 'react'
import { ChevronDown, Plus, Search } from 'lucide-react'

type PageKind =
  | 'customers' | 'catalog' | 'rides' | 'orders' | 'support'
  | 'aftersales' | 'chat' | 'automation' | 'settings' | 'leads' | 'recovery'

interface GenericPageProps {
  title: string
  kind: PageKind
}

const kindConfig: Record<PageKind, { singular: string; columns: string[]; rows: string[][] }> = {
  customers: { singular: 'Cliente', columns: ['Cliente', 'Contato', 'Última compra', 'Status'], rows: [['Mariana Silva', '(11) 98888-1001', 'Hoje', 'Ativo'], ['Carlos Mendes', '(11) 97777-1002', '12 nov', 'Ativo']] },
  catalog: { singular: 'Produto', columns: ['Produto', 'Categoria', 'Estoque', 'Preço'], rows: [['Haojue NK150', 'Motos', '8 unidades', 'R$ 14.990'], ['Patinete S10', 'Patinetes', '12 unidades', 'R$ 3.490']] },
  rides: { singular: 'Test-Ride', columns: ['Cliente', 'Veículo', 'Data', 'Status'], rows: [['Ana Paula', 'Shineray SY 150', '20 nov · 09:30', 'Confirmado'], ['Lucas Ferreira', 'Haojue DK150', '20 nov · 14:00', 'Pendente']] },
  orders: { singular: 'Pedido', columns: ['Pedido', 'Cliente', 'Valor', 'Status'], rows: [['#10482', 'Mariana Silva', 'R$ 15.240', 'Pagamento'], ['#10481', 'Carlos Mendes', 'R$ 3.490', 'Aguardando']] },
  support: { singular: 'Chamado', columns: ['Chamado', 'Cliente', 'Motivo', 'Status'], rows: [['OS-2081', 'Roberto Lima', 'Revisão', 'Em andamento'], ['OS-2080', 'Beatriz Alves', 'Bateria', 'Aberto']] },
  aftersales: { singular: 'Atendimento', columns: ['Cliente', 'Tipo', 'Responsável', 'Status'], rows: [['João Pedro', 'Garantia', 'Equipe técnica', 'Em análise']] },
  chat: { singular: 'Conversa', columns: ['Contato', 'Canal', 'Última mensagem', 'Status'], rows: [['Fernanda Costa', 'WhatsApp', 'Há 5 min', 'Não atendido'], ['Paulo Souza', 'Instagram', 'Há 18 min', 'Em atendimento']] },
  automation: { singular: 'Automação', columns: ['Nome', 'Tipo', 'Execuções', 'Status'], rows: [['Boas-vindas', 'WhatsApp', '342', 'Ativo'], ['Follow-up de lead', 'E-mail', '128', 'Ativo']] },
  settings: { singular: 'Configuração', columns: ['Configuração', 'Responsável', 'Atualização', 'Status'], rows: [['Usuários e permissões', 'Administrador', 'Hoje', 'Configurado']] },
  leads: { singular: 'Lead', columns: ['Lead', 'Origem', 'Responsável', 'Status'], rows: [['Mariana Silva', 'Indicação', 'Equipe vendas', 'Novo'], ['Tiago Rocha', 'Site', 'Equipe vendas', 'Contato']] },
  recovery: { singular: 'Solicitação', columns: ['Etapa', 'Ação', 'Prazo', 'Status'], rows: [['Identificação', 'Informe seu e-mail', 'Imediato', 'Disponível']] },
}

export function GenericPage({ title, kind }: GenericPageProps) {
  const [search, setSearch] = useState('')
  const config = kindConfig[kind]
  const filteredRows = useMemo(
    () => config.rows.filter((row) => row.join(' ').toLowerCase().includes(search.toLowerCase())),
    [config.rows, search],
  )

  return (
    <div className="mx-auto max-w-[1500px]">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-slate-400">CRM All Motors</p>
          <h1 className="mt-1 font-heading text-2xl font-bold">{title}</h1>
        </div>
        {kind !== 'recovery' && (
          <button className="flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 text-sm font-bold text-white hover:bg-brand-700">
            <Plus className="h-4 w-4" />
            Novo {config.singular.toLowerCase()}
          </button>
        )}
      </div>

      {kind === 'recovery' ? (
        <RecoveryForm />
      ) : (
        <section className="overflow-hidden rounded-card border border-border bg-elevated">
          <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-center">
            <label className="flex h-10 max-w-md flex-1 items-center gap-2 rounded-lg border border-border bg-raised px-3">
              <Search className="h-4 w-4 text-slate-400" />
              <span className="sr-only">Buscar {title}</span>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={`Buscar ${title.toLowerCase()}`}
                className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-400"
              />
            </label>
            <button className="flex h-10 items-center justify-between gap-3 rounded-lg border border-border bg-raised px-3 text-sm text-slate-300">
              Todos os status
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
          {filteredRows.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] text-left">
                <thead className="bg-raised text-xs uppercase text-slate-400">
                  <tr>{config.columns.map((column) => <th key={column} className="px-5 py-3 font-semibold">{column}</th>)}</tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredRows.map((row) => (
                    <tr key={row.join('-')} className="text-sm text-slate-200 transition-colors hover:bg-raised">
                      {row.map((cell, index) => (
                        <td key={`${row.join('-')}-${index}`} className={`px-5 py-4 ${index === 0 ? 'font-semibold text-slate-100' : 'text-slate-300'}`}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex min-h-64 flex-col items-center justify-center p-8 text-center">
              <Search className="h-8 w-8 text-slate-500" />
              <h2 className="mt-3 font-heading text-base font-bold text-slate-100">Nenhum resultado encontrado</h2>
              <p className="mt-1 text-sm text-slate-400">Tente alterar os filtros ou o termo pesquisado.</p>
            </div>
          )}
        </section>
      )}
    </div>
  )
}

function RecoveryForm() {
  return (
    <section className="mx-auto max-w-lg rounded-card border border-border bg-elevated p-6">
      <h2 className="font-heading text-xl font-bold text-slate-100">Recuperar senha</h2>
      <p className="mt-2 text-sm text-slate-400">Enviaremos um código de confirmação para seu e-mail.</p>
      <label htmlFor="recovery-email" className="mt-6 block text-sm font-semibold text-slate-200">E-mail</label>
      <input id="recovery-email" type="email" placeholder="seu@email.com" className="mt-2 h-12 w-full rounded-lg border border-border bg-raised px-4 text-slate-100 placeholder:text-slate-400" />
      <button className="mt-4 h-12 w-full rounded-lg bg-brand-500 text-sm font-bold text-white hover:bg-brand-700">Enviar código</button>
    </section>
  )
}
