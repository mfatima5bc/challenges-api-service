# 🚀 Back end challenges-submissions project

O projeto possui dois serviços que devem se comunicar através de eventos no Kafka.

O serviço `./packages/challenges-service` contem a api graphql de criação de desafios e submissões;

O serviço `./packages/corrections` contem o server que deve ouvir as submissões e enviar suas correções;

## Business roles

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
O projeto `challenges` segue padrões de clean architecture e DDD, separando definições de negocio das definições ferramentais, com o uso do nest foi possível implementar um gerenciamento de injeção de dependências simples seguindo o padrão do framework.
O uso do graphql + apollo simplificou a implementação dos controllers visto que as validações de dados ficam implícitas na tipagem embutida no protocolo.
<br />
Ainda no projeto `challenges` foi implementado a nível de domínio a regra de validação do repositório do github enviado na submissão, a nível ferramental implementei um adapter com axios onde implemento um método de request genérico e utilizo a biblioteca rxjs e seus métodos de realizar operações observáveis e capturar eventos específicos.
<br />

A implementação da service do Kafka optei pela implementação `Event-based` que além de ser a mais adequada para p kafka creio que faz sentido para o objetivo desse projeto.

No projeto de `corrections` a implementação é bem simples seguindo o padrão do nest.<br />
A implementação da service do Kafka optei pela implementação `Event-based` que além de ser a mais adequada para p kafka creio que faz sentido para o objetivo desse projeto, mesmo que o projeto de `corrections` seja simples, não segui a implementação `request-response` pois no cenário esperado as correções seriam feitas manualmente gerando então os eventos de correções.

## Execução dos projetos:

O projeto possui variáveis de ambiente, cada serviço possui um .env.example com as variáveis necessárias.
Você deve replicar essas variáveis em um arquivo .env com suas credenciais.

Antes de partir para a execução dos apps execute os containers do Kafka e postgres para que os serviços possam executar corretamente.
Primeiro crie um arquivo .env no diretório atual com os dados do arquivo .env.example (altere os valores com suas credenciais), esse arquivo é responsável pelas variáveis necessárias para o postgres.

Em seguida execute o seguinte comando para iniciar o postgres e o kafka:

```bash
$ docker compose up
```

Com esses serviços rodando acesse as pastas dos projetos em `/packages` e siga as instruções nos README de cada projeto para executar os serviços.

_O compose também irá iniciar o serviço do kafka ui caso queira conferir os tópicos._
