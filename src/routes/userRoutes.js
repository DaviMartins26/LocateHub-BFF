const express = require('express');
const router = express.Router();
const axios = require('axios');

const URL = process.env.URL_USUARIOS;

//Rota que lista os usuarios READ
router.get('/', async (req, res) => {
    const response = await axios.get(URL);
    res.json(response.data);
});

// Rota que lista o usuario pelo id READ
router.get('/:id', async (req, res) => {
    const response = await axios.get(`${URL}/${req.params.id}`);
    res.json(response.data);
});

// Rota que Cria um usuario CREATE
router.post('/', async (req, res) => {
    const response = await axios.post(URL, req.body);
    res.status(201).json(response.data);
});

// Rota que atualiza usuario pelo id UPDATE
router.put('/:id', async (req, res) => {
    const response = await axios.put(`${URL}/${req.params.id}`, req.body);
    res.json(response.data);
});

// Rota que deleta usuario pelo ID
router.delete('/:id', async (req, res) => {
    await axios.delete(`${URL}/${req.params.id}`);
    res.status(204).send();
});

module.exports = router;