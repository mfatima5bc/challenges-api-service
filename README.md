
# 🚀 Back end challenges-submissions project

## Visão geral

Este projeto é composto por dois microsserviços independentes escritos em Node.js com NestJS, que se comunicam por meio de eventos Kafka em uma arquitetura event-driven. O objetivo do sistema é permitir o registro de desafios e submissões, bem como a correção automática das submissões através de mensagens assíncronas.

O serviço `./packages/challenges-service` contem a api graphql de criação de desafios e submissões;

O serviço `./packages/corrections` contem o serviço que deve ouvir as submissões e enviar suas correções;

## Regras de negocio

O serviço **'challenges-service'** devera ser responsável pela criação dos desafios e submissões, armazenando e gerenciando esses dados no banco de dados. Nesse sistema deverá ser possível realizar as seguintes operações:

### ⚔️ Desafio

| Atributo        | Tipo     |
| --------------- | -------- |
| Identificador   | `uuidv4` |
| Titulo          | `texto`  |
| Descrição       | `texto`  |
| Data de criação | `data`   |

**Operações necessárias**

- [x] Criar
- [x] Remover (a remoção ocorre em cascata, deletando as submissões também)
- [x] Editar
- [x] Listar
  - [x] Paginação
  - [x] Busca por título e descrição

### 📓 Submissão

| Atributo                 | Tipo                   | Descrição                                                                               |
| ------------------------ | ---------------------- | --------------------------------------------------------------------------------------- |
| Identificador            | `uuidv4`               |                                                                                         |
| Identificador do desafio | `uuidv4`               |                                                                                         |
| Link para o reposítorio  | `texto`                | Deverá armazena a url valida do repo no github                                          |
| Data de criação          | `data`                 |                                                                                         |
| Status                   | `Pending, Error, Done` | O valor default será `Pending` caso o repo seja valido, se não será criado como `Error` |
| Nota                     | `númerico`             |                                                                                         |

**Operações necessárias**

- [x] Enviar
- [x] Listar
  - [x] Paginação
  - [x] Filtros: desafio, intervalo de datas, status

O serviço de **'corrections'** deve ser notificado sempre que uma nova submissão de um desafio for criada, gerando de imediato sua correção e notificando o serviço de **'challenges-service'** da nova correção, que deverá atualizar então os dados da submissão de status para `Done` e a nota gerada.

### 🚰 Fluxo esperado

- Uma submissão de um desafio é **enviada**;
- A submissão é registrada com o status `Pending`;
  - :warning: **Caso não exista o desafio** ou a **url não seja um repositório do github** a submissão é registrada com status `Error` e um erro é retornado ao usuário, dando fim a esse fluxo;
- O serviço [corrections](packages/corrections) é notificado e retorna a correção da submissão;
- O status e a nota da submissão são **atualizados**;

## Stack

- nodejs
- nestjs
- typescript
- kafka
- postgres
- prisma
- Docker
- graphql
- apollo graphql


## Decisões arquiteturais

### 🧩 Event-based Architecture
Kafka foi utilizado com o modelo event-based ao invés de request-response, pois este projeto simula um cenário realista onde as correções poderiam ser feitas de forma assíncrona e independente do fluxo de submissão.
- Permite escalabilidade horizontal dos consumidores.
- Garante resiliência caso o serviço de correção esteja temporariamente offline.
- Facilita rastreamento por meio de tópicos e logs.

---
O projeto `challenges` segue padrões de clean architecture e DDD, separando definições de negocio das definições ferramentais, com o uso do nest foi possível implementar um gerenciamento de injeção de dependências simples seguindo o padrão do framework.
O uso do graphql + apollo simplificou a implementação dos controllers visto que as validações de dados ficam implícitas na tipagem embutida no protocolo.
- Foi implementado a nível de domínio a regra de validação do repositório do github enviado na submissão, a nível ferramental implementei um adapter com axios onde implemento um método de request genérico e utilizo a biblioteca rxjs e seus métodos de realizar operações observáveis e capturar eventos específicos.
- Para a paginação usei uma transaction personalizada para que fosse possível retornar se haviam mais itens para paginar, tendo em vista que o prisma não possui recursos específicos para paginação;
- As tabelas com relacionamentos estão configuradas para deleção em cascata;
- Como o Prisma não oferece suporte nativo a paginação baseada em cursor com total de itens restantes, foi implementada uma transação customizada com contagem auxiliar.
<br />

No projeto de `corrections` a implementação é bem simples seguindo o padrão do nest.<br />
- Para a implementação da service do Kafka sigo o padrão `Event-based` que comentei anteriormente, mesmo que o projeto de `corrections` seja simples, não segui a implementação `request-response` pois no cenário esperado as correções seriam feitas manualmente gerando então os eventos de correções.

## Execução dos projetos:

O projeto possui variáveis de ambiente, cada serviço possui um .env.example com as variáveis necessárias.
Você deve replicar essas variáveis em um arquivo .env com suas credenciais.

Em seguida crie um arquivo .env no diretório atual com os dados do arquivo local .env.example (altere os valores com suas credenciais), esse arquivo é responsável pelas variáveis necessárias para o Postgres.

Em seguida execute o seguinte comando para iniciar os serviços:

```bash
$ docker compose up
```

_O compose também irá iniciar o serviço do kafka ui caso queira conferir os tópicos._
