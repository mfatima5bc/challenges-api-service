# Corrections

Esse é o serviço responsável pela correção dos desafios e nele toda a comunicação é feita via Apache Kafka.
Aqui, nos comunicamos utilizando o tópico `challenge.correction` (consumer groupId: `challenge-consumer`).

```typescript
interface CorrectLessonMessage {
  value: {
    submissionId: string;
    repositoryUrl: string;
  };
}

interface CorrectLessonResponse {
  submissionId: string;
  repositoryUrl: string;
  grade: number;
  status: 'Pending' | 'Error' | 'Done';
}
```

### Instale as dependências

```bash
# development
$ npm ci

```

### Executando o app

Antes de tudo certifique-se que o serviço do kafka esta executando, utilize o arquivo docker-compose.yml na raiz do projeto.

Crie um arquivo no diretório atual com suas variáveis assim como o arquivo .env.example

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
