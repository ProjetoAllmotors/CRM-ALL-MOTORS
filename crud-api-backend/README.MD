# All Motors | Backend

API da **All Motors**, desenvolvida em **Java com Spring Boot**. Centraliza as regras de negócio do sistema de CRM: leads, funil de vendas, clientes, produtos, pedidos, test rides, assistência técnica e pós-venda.

## Tecnologias

- Java 21
- Spring Boot (Web, Data JPA, Security, Validation)
- Autenticação com JWT
- Maven como gerenciador de dependências
- PostgreSQL como banco de dados, acessado via Spring Data JPA

## Responsabilidades

- Autenticação e controle de acesso por perfil (Administrador, Gerente, Vendedor)
- CRUD de leads, clientes, produtos, pedidos, test rides e ordens de serviço
- Regras do funil de vendas e cálculo de métricas do dashboard
- Integração com o banco de dados definido na camada de infraestrutura
- Documentação dos endpoints para consumo pelo frontend

## Estrutura sugerida

```
backend/
├── src/main/java/br/com/allmotors/
│   ├── auth/          # login, JWT e perfis de acesso
│   ├── lead/          # leads e funil de vendas
│   ├── cliente/       # clientes e histórico de interações
│   ├── produto/       # bicicletas, patinetes e acessórios
│   ├── pedido/        # pedidos e propostas
│   ├── testride/      # agendamento de test rides
│   ├── assistencia/   # ordens de serviço
│   └── posvenda/      # garantias e lembretes
├── src/main/resources/
│   └── application.yml
└── pom.xml
```

## Como executar

1. Suba o banco de dados pela pasta `infra/` com Docker.
2. Configure as variáveis de ambiente de conexão (URL, usuário e senha do banco) e a chave secreta do JWT.
3. Execute:

```bash
./mvnw spring-boot:run
```

A API ficará disponível em `http://localhost:8080`.

## Testes

```bash
./mvnw test
```

## Status

Em desenvolvimento.