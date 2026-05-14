# 🚀 LocateHub - BFF (Backend For Frontend)

Este projeto atua como a camada intermediária entre o Frontend (React) e os microserviços do ecossistema LocateHub. Ele implementa o padrão **BFF** para simplificar a comunicação e agregar dados de múltiplas fontes.

## 🎯 Funcionalidades Implementadas
* **Agregador de Dados**: Endpoint `/aggregated-data` que consolida informações de itens (Java/MongoDB) e usuários (SQL Server/Azure Functions) em uma única resposta.
* **Proxy de Itens**: Encaminhamento de operações CRUD (GET, POST, PUT, DELETE) para o Microserviço  de Itens.
* **Documentação Automática**: Swagger configurado para expor os contratos da API.

## 🛠️ Tecnologias
* **Node.js**: Ambiente de execução.
* **Express**: Framework para gestão de rotas e middlewares.
* **Axios**: Cliente HTTP para comunicação com microserviços.
* **Swagger-jsdoc & Swagger-ui-express**: Para documentação OpenAPI 3.0.

## 🔧 Execução Local
1. Instale as dependências: `npm install`
2. Certifique-se de que o Microserviço Java (8081) está rodando.
3. Inicie o servidor: `npm run dev` (ou `node src/server.js`)
4. Acesse: `http://localhost:3000/api-docs`

## 👥 Desenvolvedores
* **Davi Martins**
* **Joshua Mendes**