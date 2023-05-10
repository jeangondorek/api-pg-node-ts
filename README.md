# api-pg-node-ts

Tecnologias usadas

[![My Skills](https://skillicons.dev/icons?i=nodejs,typescript,express&perline=3)](https://skillicons.dev)

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

##### Configurando eslint:

```bash
npx eslint --init
```

##### Extensões VSCODE

- eslint
- editorconfig

### Arquitetura
```
    src --pasta geral do projeto com arquivo principal para rodar o projeto
        //arquivos
        server --pasta geral com toda a parte do back-end, com arquivo que roda o servidor do projeto
            //arquivos
            controllers --arquivo com funções de resposta e/ou edição de dados
                //arquivos
            database --arquivo para configuração dos databases
                //arquivos
            routes --arquivo com a definição das rotas
                //arquivos
            shared --arquivo com funções “globais”
                middleares --um mediador ex: autenticação
                services --um serviço que possa ser reaproveitado, ex: criptografia de senhas
```

-- representa pastas

// representa arquivos