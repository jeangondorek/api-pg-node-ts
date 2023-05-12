# api-pg-node-ts

Tecnologias usadas


[![Node.js Package](https://github.com/jeangondorek/api-pg-node-ts/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/jeangondorek/api-pg-node-ts/actions/workflows/npm-publish.yml)

[![My Skills](https://skillicons.dev/icons?i=nodejs,typescript,express,postgres,sqlite&perline=5)](https://skillicons.dev)

### Rodar projeto 

```bash
yarn install
```

```bash
yarn start
```

#### Gerando build

```bash
yarn tsc
```

##### Configurando eslint

```bash
npx eslint --init
```

##### Extensões VSCODE

- eslint
- editorconfig

### Arquitetura

```bash
   📁 src
        📁 server
           📁  controllers
                📁 pastas de controllers
            📁 database
                📁 seeds
                📁 models
                📁 migrations
                📁 providers
                📁 knex
                    📁 @types
           📁 routes
           📁  shared
               📁 middlewares
               📁 services
```

- src --pasta geral do projeto com arquivo principal para rodar o projeto
- server --pasta geral com toda a parte do back-end, com arquivo que roda o servidor do projeto
- controllers --pasta com arquivos com funções de resposta e/ou edição de dados
- database -- pasta com arquivos para configuração dos databases
- routes -- pasta com arquivo com a definição das rotas
- shared --pasta com arquivos com funções “globais”
- middlewares --pasta com arquivos para um mediador ex: autenticação
- services --pasta com arquivos para um serviço que possa ser reaproveitado, ex: criptografia de senhas
- knex - query builder para facilitar criação de bancos de dados
  - @types - ajuda a definir o tipo de dado para o banco
- seeds - contém arquivos para facilitar criação de dados no banco
- models - contém os modelos de dados
- migrations - comandos/funções executadas no banco de dados
