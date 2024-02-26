# Backend desafio Reminder DTI 

## Tabela de Conteudos

- [Instruções para Executar o Sistema](#instruções-para-executar-o-sistema-backend)
- [Premissas Assumidas](#premissas-assumidas-backend)
- [Decisões de Projeto](#decisões-de-projeto-backend)



## Instruções para Executar o Sistema Backend

Certifique-se de ter o ambiente de desenvolvimento .NET configurado.

1. Abra um terminal na pasta raiz do projeto.

2. Execute os seguintes comandos para adicionar os packages utlizados no sistema:

```bash
dotnet add package Microsoft.EntityFrameWorkCore
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
dotnet add package Microsoft.EntityFrameworkCore.Design
```
3. O servidor estará disponível em http://localhost:5000 por padrão.

4. O endereço da API Swagger UI estará em Propeties/launchSettings.json. Procure dentro do arquivo "profiles" e dentro das chaves "applicationUrl". Essa porta será importante para substituir no arquivo reminder-dti-front/src/client.ts, em que a const URL deve ser a mesma que do Swagger.

5. Na pasta ReminderAPI/appsettings.json deve ser adicionado dentro das chaves "ConnectionStrings": { "DefaultConnection": "Data Source=reminders.db" }.

6. Executar no terminal a migração para o banco de dados:
```bash
dotnet ef migrations add ReminderAPI
dotnet ef database update
```

7. Pronto para ser iniciado. Podendo utilizar Ctrl + F5 ou
```bash
dotnet run
```

## Premissas Assumidas Backend

- Os lembretes são armazenados em um banco de dados relacional.
- Não é necessário autenticação para acessar a API.
- O CORS (Cross-Origin Resource Sharing) está habilitado para permitir solicitações de diferentes origens.


## Decisões de Projeto Backend

  Algumas decisões de projeto importantes incluem:

- Utilização do ASP.NET Core como framework para criação do backend.
- Armazenamento dos dados dos lembretes em um banco de dados usando o Entity Framework Core.
- Uso do SQLite como banco de dados devido à sua facilidade de configuração e portabilidade.
- Implementação de endpoints REST para listar todos os lembretes, adicionar um novo lembrete e deletar um lembrete por ID.

# Frontend desafio Reminder DTI 

## Tabela de Conteudos

- [Instruções para Executar o Sistema](#instruções-para-executar-o-sistema-frontend)
- [Decisões de Projeto](#decisões-de-projeto-frontend)



## Instruções para Executar o Sistema Frontend

Certifique-se de ter o Node.js e o gerenciador de pacotes npm instalados.

1. Abra um terminal na pasta raiz do projeto.

2. Instale as dependências do projeto.

```bash
npm install
```

3. Inicie o servidor de desenvolvimento.
```bash
npm run dev
```
## Decisões do Projeto Frontend

- Utilização do React.js como biblioteca JavaScript para a construção da interface do usuário.
- Utilização de TypeScript para adicionar tipagem estática ao JavaScript.
- Utilização do Vite como bundler e servidor de desenvolvimento devido à sua velocidade e eficiência.
- Implementação de funcionalidades para adicionar e excluir lembretes, utilizando chamadas de API assíncronas com Axios.
- Organização dos lembretes por data para exibição na interface do usuário.
