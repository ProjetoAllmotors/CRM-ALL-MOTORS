import { useState } from "react";
import { ArrowUpRight, Check, TrendingUp } from "lucide-react";
import { QuickActionButtons } from "../components/features/QuickActionButtons";

const initialRules = [
  {
    id: "welcome",
    name: "Boas-vindas ao novo lead",
    detail: "Novo lead · WhatsApp automático",
    active: true,
  },
  {
    id: "test-ride",
    name: "Lembrete de Test-Ride",
    detail: "24h antes · confirmar presença",
    active: true,
  },
  {
    id: "contran",
    name: "Triagem CONTRAN 996",
    detail: "Ciclomotor · solicitar validação",
    active: true,
  },
  {
    id: "proposal",
    name: "Retomar proposta em aberto",
    detail: "48h sem interação · lembrete",
    active: false,
  },
  {
    id: "review",
    name: "Lembrete de revisão",
    detail: "Revisão programada · pós-venda",
    active: true,
  },
];

const ranking = [
  {
    state: "PE",
    name: "Pernambuco",
    sales: "R$ 185.200",
    units: "22 veículos",
    width: "100%",
  },
  {
    state: "AL",
    name: "Alagoas",
    sales: "R$ 88.900",
    units: "10 veículos",
    width: "72%",
  },
  {
    state: "PB",
    name: "Paraíba",
    sales: "R$ 77.400",
    units: "9 veículos",
    width: "61%",
  },
  {
    state: "RN",
    name: "Rio Grande do Norte",
    sales: "R$ 60.200",
    units: "7 veículos",
    width: "48%",
  },
];

const channels = [
  { name: "WhatsApp", leads: "120 leads", conversion: "20%", width: "62%" },
  { name: "Instagram", leads: "84 leads", conversion: "20%", width: "47%" },
  { name: "Loja física", leads: "36 leads", conversion: "40%", width: "100%" },
];

export function AutomationsPage() {
  const [rules, setRules] = useState(initialRules);
  const [notice, setNotice] = useState("");

  function toggleRule(id: string) {
    setRules((current) =>
      current.map((rule) =>
        rule.id === id ? { ...rule, active: !rule.active } : rule,
      ),
    );
  }

  return (
    <div className="mx-auto max-w-[1152px]">
      <header className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
        <div>
          <h1 className="font-heading text-[28px] font-semibold tracking-tight">
            Automações &amp; relatórios
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Mais tempo para o que move o seu negócio.
          </p>
        </div>
        <QuickActionButtons />
      </header>

      <section className="mt-7 grid gap-5 xl:grid-cols-[minmax(0,1.7fr)_minmax(300px,1fr)]">
        <article className="rounded-xl bg-elevated p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold">Piloto automático</h2>
              <p className="mt-1 text-[9px] text-slate-400">
                Ative regras para manter cada etapa em movimento.
              </p>
            </div>
            <span className="rounded-md bg-emerald-950 px-2 py-1 text-[8px] text-emerald-300">
              {rules.filter((rule) => rule.active).length} ativas
            </span>
          </div>
          <div className="mt-4 space-y-2">
            {rules.map((rule) => (
              <div
                key={rule.id}
                className="flex items-center gap-3 rounded-lg bg-raised px-3 py-3"
              >
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-[10px] font-semibold">
                    {rule.name}
                  </h3>
                  <p className="mt-1 truncate text-[8px] text-slate-400">
                    {rule.detail}
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={rule.active}
                  aria-label={`${rule.active ? "Desativar" : "Ativar"} automação: ${rule.name}`}
                  onClick={() => toggleRule(rule.id)}
                  className={`inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                    rule.active ? "bg-brand-500" : "bg-slate-600"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 ease-in-out ${
                      rule.active ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[8px] leading-relaxed text-slate-500">
            Regras demonstrativas • revise os critérios e as mensagens antes de
            ativar em produção.
          </p>
        </article>

        <div className="space-y-5">
          <article className="rounded-xl bg-elevated p-5">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-sm font-semibold">Ranking regional</h2>
                <p className="mt-1 text-[9px] text-slate-400">
                  Vendas por estado · novembro de 2026
                </p>
              </div>
              <TrendingUp className="h-4 w-4 text-emerald-300" />
            </div>
            <ol className="mt-4 space-y-3">
              {ranking.map((item, index) => (
                <li key={item.state} className="flex items-center gap-2">
                  <span className="w-5 text-[8px] text-slate-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-2">
                      <span className="truncate text-[9px] font-semibold">
                        {item.name}
                      </span>
                      <span className="shrink-0 text-[9px]">{item.sales}</span>
                    </span>
                    <span className="mt-1 block text-[8px] text-slate-500">
                      {item.units}
                    </span>
                    <span className="mt-1.5 block h-1 rounded-full bg-[#26354D]">
                      <span
                        className="block h-full rounded-full bg-brand-500"
                        style={{ width: item.width }}
                      />
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </article>

          <article className="rounded-xl bg-elevated p-5">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-sm font-semibold">Conversão por canal</h2>
                <p className="mt-1 text-[9px] text-slate-400">
                  Origem dos leads · mês atual
                </p>
              </div>
              <button
                onClick={() => setNotice("Relatório demonstrativo atualizado.")}
                aria-label="Atualizar relatório"
                className="rounded-md p-1 text-slate-400 hover:bg-raised hover:text-white"
              >
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="mt-4 space-y-4">
              {channels.map((channel) => (
                <div key={channel.name}>
                  <div className="flex justify-between gap-2 text-[9px]">
                    <span className="font-medium">{channel.name}</span>
                    <span className="text-emerald-300">
                      {channel.conversion}
                    </span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="h-1 flex-1 rounded-full bg-[#26354D]">
                      <div
                        className="h-full rounded-full bg-brand-500"
                        style={{ width: channel.width }}
                      />
                    </div>
                    <span className="w-14 text-right text-[8px] text-slate-500">
                      {channel.leads}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-[8px]">
              <span className="text-slate-400">Conversão geral</span>
              <span className="flex items-center gap-1 font-semibold text-emerald-300">
                <Check className="h-3 w-3" />
                27,4%
              </span>
            </div>
          </article>
        </div>
      </section>
      {notice && (
        <p
          role="status"
          aria-live="polite"
          className="mt-4 rounded-lg bg-[#12305B] px-4 py-3 text-xs text-[#CFE1FF]"
        >
          {notice}
        </p>
      )}
      <p className="mt-5 text-[10px] text-slate-500">
        Operação demonstrativa • valores e registros de exemplo
      </p>
    </div>
  );
}
