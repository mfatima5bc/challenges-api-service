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

Antes de partir para a execução dos app execute os containers para iniciar o serviço do postegres e kafka:

```bash
$ docker compose up
```

O compose também irá iniciar o serviço do kafka ui caso queira conferir os tópicos.
