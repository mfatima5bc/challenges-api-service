## Challenges services

Essa é a aplicação de desafios e submissões

## Executando o app

Antes de tudo é necessário que os serviços do postgres e do kafka já estejam rodando, utilize o docker-compose.yml na raiz do projeto.

1. Crie um arquivo no diretório atual com suas variáveis assim como o arquivo .env.example

2. Instale os pacotes:
```bash
$ npm i
# ou com o pnpm
$ pnpm i
 ```

3. Realize as migrações para o banco de dados com o prisma:
```bash
# comando para o prisma gerar as migrações
$ npm run prisma generate
# execute as migrações
$ npm run prisma migrate
 ```

4. Execute o serviço:
```bash
$ npm run start
 ```

