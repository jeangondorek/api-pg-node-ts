# api-pg-node-ts

Tecnologias usadas

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
                📁 knex
                    📁 @types
                📁 seeds
                📁 migrations
           📁 routes
           📁  shared
               📁 middlewares
               📁 services
```

📁 representa pastas
📓 representa arquivos

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
- seeds -
- migrations - comandos/funções executadas no banco de dados
