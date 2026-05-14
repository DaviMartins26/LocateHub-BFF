const express = require('express');
const cors = require('cors');
//axios que faz a comunicação com o Mongo
const axios = require('axios')
const swaggerUi = require('swagger-ui-express'); // Import do Swagger
const swaggerJsdoc = require('swagger-jsdoc'); // Import do Swagger
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// === CONFIGURAÇÃO DO SWAGGER (AQUI!) ===
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'LocateHub BFF API',
      version: '1.0.0',
      description: 'Documentação do Backend for Frontend',
    },
    servers: [{ url: 'http://localhost:3000' }],
  },
  apis: ['./src/server.js'], 
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// =======================================

// Rota Leitura de dados e configuração Swagger
/**
 * @openapi
 * /aggregated-data: 
 *   get:
 *     description: Retorna dados agregados de itens e usuários
 *     responses:
 *       200:
 *         description: Sucesso
 */
app.get('/aggregated-data', async (req, res) => {
   try {
        // 1. O BFF "liga" para o seu Microserviço Java
        const responseItens = await axios.get('http://localhost:8081/api/itens');
        const itensDoBanco = responseItens.data;

        // 2. Montamos o objeto final para o React
        const responseFinal = {
            usuario: { id: "123", nome: "Davi Martins" }, // Isso virá do MS SQL depois
            equipamentos: itensDoBanco, // Agora os dados vêm do Java/Mongo!
            orcamento: { total: 150.00 } // Isso virá da Azure Function depois
        };
        
        res.status(200).json(responseFinal);

    } catch (error) {
        console.error("Erro ao conectar com o Microserviço Java:", error.message);
        res.status(500).json({ error: "Erro ao buscar dados do Microserviço de Itens" });
    }
});

// Buscar UM item pelo ID
app.get('/items/:id', async (req, res) => {
    try {
        //Passa o ID na URL e o corpo (req.body) para o java
        const response = await axios.get(`http://localhost:8081/api/itens/${req.params.id}`);
        res.json(response.data); // responde sempre em JSON
    } catch (error) {
        console.error("Erro no Update:",error.message)
        res.status(500).send("Erro ao atualizar Item");
    }
});

// Rota Escrita de Objetos e configuração Swagger
/**
 * @openapi
 * /items:
 *   post:
 *     description: Cadastra um novo item enviando para o Microserviço Java
 *     responses:
 *       201:
 *         description: Criado
 */
app.post('/items', async (req, res) => {
    try {
        const novoItem = req.body;
        // Repassa o objeto recebido do React para o Java
        const response = await axios.post('http://localhost:8081/api/itens', novoItem);
        res.status(201).json(response.data);
    } catch (error) {
        console.error("Erro ao cadastrar no Java:", error.message);
        res.status(500).json({ error: "Não foi possível salvar o item." });
    }
});

// Rota para Atualizar e configurar Swagger
/**
 * @openapi
 * /items/{id}:
 *   put:
 *     description: Atualiza um item existente no Microserviço Java
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Item atualizado com sucesso
 */
app.put('/items/:id', async (req, res) => {
    try {
        //isso da erro de segurança em sistema serio
        console.log("Enviando para o JavaID:", req.params.id);
        console.log("Corpo enviado:",req.body); // Verificar se o id aparece no terminal
        
        const response = await axios.put(
            `http://localhost:8081/api/itens/${req.params.id}`, 
            req.body,
            { headers:{ 'Content-Type': 'application/json'} } // Força Json para o Microserviço em java
        );
        res.json(response.data);
    } catch (error) {
        console.error("Erro no Update:",error.message);
        res.status(500).send("Erro ao atualizar");
    }
});


// Rota para Deletar e configurar Swagger
/**
 * @openapi
 * /items/{id}:
 *   delete:
 *     description: Remove um item do banco NoSQL via Microserviço Java
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Item removido com sucesso
 */
app.delete('/items/:id', async (req, res) => {
    try {
        await axios.delete(`http://localhost:8081/api/itens/${req.params.id}`);
        res.status(204).send();
    } catch (error) {
        res.status(500).send("Erro ao deletar");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`BFF LocateHub rodando na porta ${PORT}`);
    console.log(`Swagger disponível em http://localhost:3000/api-docs`);
});