# 🚀 Back end challenges-submissions project

O projeto possui dois serviços que devem se comunicar através de eventos no Kafka.

O serviço `./packages/challenges-service` contem a api graphql de criação de desafios e submissões;

O serviço `./packages/corrections` contem o server que deve ouvir as submissões e enviar suas correções;


## Stack

- nodejs
- nestjs
- typescript
- kafka
- postgres
- prisma
- Docker
- graphql

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
