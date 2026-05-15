const express = require('express');
const router = express.Router();
const axios = require('axios');

const URL = process.env.URL_ITENS;

// Rota que agrega os dois bancos de dados trabalhando com a possivel falha deles
router.get('/aggregated', async (req, res) => {
    let itens = [];
    let usuarios = [];

    // Tenta buscar Itens (Se falhar, itens continua [])
    try {
        const resItens = await axios.get(URL);
        itens = resItens.data;
    } catch (e) { console.error("Falha ao buscar itens"); }

    // Tenta buscar Usuários (Se falhar/IP bloqueado, usuarios continua [])
    try {
        const resUsers = await axios.get(process.env.URL_USUARIOS);
        usuarios = resUsers.data;
    } catch (e) { console.error("Falha ao buscar usuários, mas o BFF não vai cair!"); }

    // RETORNA UM ÚNICO JSON (Requisito atendido!)
    res.json({
        servidor: "LocateHub Ativo",
        equipamentos: itens,
        usuariosNoSistema: usuarios,
        timestamp: new Date()
    });
});

// Rota  que busca todos os itens READ (Para ItensList e ItensAdmin)
router.get('/list', async (req, res) => {
    try {
        const response = await axios.get(URL);
        res.json(response.data); // Retorna só o array de itens do Mongo
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar itens isolados" });
    }
});

// Rota que busca item por id READ
router.get('/:id', async (req, res) => {
    const response = await axios.get(`${URL}/${req.params.id}`);
    res.json(response.data);
});

// Rota que cria item CREATE
router.post('/', async (req, res) => {
    const response = await axios.post(URL, req.body);
    res.status(201).json(response.data);
});

// Rota que Atualiza um item pelo id UPDATE
router.put('/:id', async (req, res) => {
    const response = await axios.put(`${URL}/${req.params.id}`, req.body);
    res.json(response.data);
});

// Rota que deleta um item pelo id DELETE
router.delete('/:id', async (req, res) => {
    await axios.delete(`${URL}/${req.params.id}`);
    res.status(204).send();
});

// Rota para calcular orçamento via Azure Function
router.post('/calcular-aluguel', async (req, res) => {
    try {
        const { precoDia, dias } = req.body;
        const urlFunction = process.env.URL_AZURE_FUNCTION;

        // O BFF chama a Azure Function que está rodando na porta 7071
        const response = await axios.post(urlFunction, { precoDia, dias });
        
        res.json(response.data); // Devolve o total calculado para o React
    } catch (error) {
        console.error("Erro ao chamar Azure Function:", error.message);
        res.status(500).json({ error: "Erro no cálculo do orçamento." });
    }
});

module.exports = router;