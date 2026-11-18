# All Motors | Infraestrutura

Configuração do banco de dados da **All Motors**, com PostgreSQL executado em **Docker**. Esta pasta contém o schema inicial do sistema e o arquivo de orquestração dos containers.

## Conteúdo

- `docker-compose.yml`: sobe o container do PostgreSQL com volume persistente
- `schema.sql`: estrutura inicial das tabelas (usuários, leads, clientes, produtos, pedidos, test rides, ordens de serviço e garantias)
- `.env.example`: modelo das variáveis de ambiente do banco

## Pré-requisitos

- Docker e Docker Compose instalados

## Como executar

1. Copie o arquivo de exemplo de variáveis e ajuste os valores:

```bash
cp .env.example .env
```

2. Suba o banco de dados:

```bash
docker compose up -d
```

O `schema.sql` é aplicado automaticamente na primeira inicialização do container.

## Conexão com o banco

| Variável | Descrição |
|---|---|
| `POSTGRES_DB` | Nome do banco de dados |
| `POSTGRES_USER` | Usuário de acesso |
| `POSTGRES_PASSWORD` | Senha de acesso |
| `POSTGRES_PORT` | Porta exposta no host (padrão 5432) |

## Comandos úteis

```bash
docker compose logs -f db    # acompanhar logs do banco
docker compose down          # parar os containers
docker compose down -v       # parar e apagar os dados (use com cuidado)
```

## Observações

- Não versione o arquivo `.env`, apenas o `.env.example`.
- Alterações no `schema.sql` só são aplicadas em uma instalação nova. Para recriar o banco, use `docker compose down -v` e suba novamente.

## Status

Em desenvolvimento.