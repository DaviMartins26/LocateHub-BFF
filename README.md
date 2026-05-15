# 🚀 LocateHub - BFF (Backend For Frontend)

Este projeto atua como a camada intermediária entre o Frontend (React) e os microserviços do LocateHub. Ele implementa o padrão **BFF** para simplificar a comunicação, consolidar a segurança e agregar dados de múltiplas fontes (SQL e NoSQL).

## 🎯 Funcionalidades e Melhorias Recentes
* **Arquitetura Modular**: O projeto foi refatorado para utilizar um sistema de rotas separadas (`src/routes`), eliminando o "código espaguete" e facilitando a manutenção e futuras expansões.
* **Agregador de Dados (Poliglotismo)**: Endpoint `/items/aggregated` capaz de unir, em uma única resposta JSON, dados provenientes do MongoDB (Itens) e do Azure SQL (Usuários).
* **Gestão de Ambiente**: Implementação do `dotenv` para gerenciar URLs de microserviços e portas, tornando o projeto pronto para Deploy em ambientes de nuvem (Azure).
* **Proxy de Microserviços**: Encaminhamento inteligente de operações CRUD para os micro serviços Java correspondentes de forma transparente para o Frontend.
* **Documentação Automática**: Swagger (OpenAPI 3.0) centralizado para visualizar e testar todos os endpoints do ecossistema em uma única interface.

## 🛠️ Tecnologias
* **Node.js**: Ambiente de execução JavaScript no servidor.
* **Express**: Framework web minimalista para gestão de rotas e middlewares.
* **Axios**: Cliente HTTP para comunicação assíncrona com os microserviços Java.
* **Dotenv**: Gestão de variáveis de ambiente para segurança de credenciais.
* **Swagger-jsdoc & Swagger-ui-express**: Geração e exibição da documentação técnica da API.

## 📂 Estrutura de Pastas
```text
/bff-locatehub
├── /src
│    ├── /routes
│    │    ├── itemRoutes.js  (Comunicação com Microserviço de Itens - NoSQL)
│    │    └── userRoutes.js  (Comunicação com Microserviço de Usuários - SQL)
│    └── server.js           (Ponto de entrada e configuração global)
├── .env                     (Configurações de ambiente)
└── package.json             (Gerenciamento de dependências)

## 🔧 Execução Local

1.  **Instale as dependências**:
    Abra o terminal na pasta raiz do BFF e execute:
    ```bash
    npm install
    ```

2.  **Configure o arquivo `.env`**:
    Crie um arquivo chamado `.env` (exatamente com esse nome) na raiz do projeto e cole as URLs dos seus microserviços. Isso é essencial para que o BFF saiba onde "ligar" para buscar os dados:
    ```env
    PORT=3000
    URL_ITENS=http://localhost:8081/api/itens
    URL_USUARIOS=http://localhost:8082/api/usuarios
    ```

3.  **Inicie o servidor**:
    Para rodar em modo de desenvolvimento (com reinicialização automática):
    ```bash
    npm run dev
    ```
    Ou via node diretamente:
    ```bash
    node src/server.js
    ```

4.  **Acesse a Documentação**:
    Com o servidor rodando, você pode testar todos os endpoints (tanto de itens quanto de usuários) através da interface do Swagger em:
    `http://localhost:3000/api-docs`

## 👥 Desenvolvedores
* **Davi Martins**
* **Joshua Mendes**