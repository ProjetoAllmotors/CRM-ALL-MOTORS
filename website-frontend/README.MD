# All Motors | Frontend

Interface web e mobile do CRM da **All Motors**, desenvolvida em **React**. Atende a equipe de vendas e administração pelo computador e pelo celular, com layout responsivo.

## Tecnologias

- React com Vite
- React Router para navegação entre telas
- Tailwind CSS para estilização, com tokens de cor da identidade visual
- Biblioteca de gráficos para o dashboard
- Consumo da API do backend via HTTP

## Identidade visual

- Vermelho `#C8102E` como cor principal de ações e destaques
- Vermelho escuro `#8B0A1F` em gradientes e hover
- Grafite `#1A1A1A` na sidebar e nos textos
- Fundo `#F4F4F5` e cards brancos com cantos arredondados de 12px
- Títulos em Montserrat e textos em Inter

## Telas principais

- Login e recuperação de senha
- Dashboard com métricas e tarefas do dia
- Leads e funil de vendas (Kanban)
- Detalhe do cliente
- Estoque de produtos
- Test rides, pedidos e assistência técnica
- Pós-venda, relatórios e configurações

## Estrutura sugerida

```
frontend/
├── src/
│   ├── components/    # botões, tabelas, modais, badges
│   ├── pages/         # uma pasta por tela
│   ├── layouts/       # sidebar desktop e menu mobile
│   ├── services/      # chamadas à API do backend
│   ├── styles/        # tokens de cor, tipografia e espaçamento
│   └── routes/
├── public/
└── package.json
```

## Como executar

```bash
npm install
npm run dev
```

A aplicação ficará disponível em `http://localhost:5173`.

## Build de produção

```bash
npm run build
```

## Status

Em desenvolvimento.