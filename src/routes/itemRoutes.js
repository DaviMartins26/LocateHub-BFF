const express = require('express');
const router = express.Router();
const axios = require('axios');

const URL = process.env.URL_ITENS;

// Rotas que lista os itens
router.get('/aggregated', async (req, res) => {
    try {
        const resItens = await axios.get(URL);
        const resUsers = await axios.get(process.env.URL_USUARIOS);
        
        res.json({
            status: "Conecção Estabelecida",
            total_equipamentos: resItens.data.length,
            usuarios_ativos: resUsers.data.length,
            equipamentos: resItens.data
        });
    } catch (e) { res.status(500).send("Erro ao agregar dados"); }
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

module.exports = router;