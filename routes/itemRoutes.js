const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// Adicionar um novo item
router.post('/', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'O campo de texto é obrigatório.' });
    }

    const newItem = new Item({ text });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar o item.' });
  }
});

// Listar todos os itens
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar os itens.' });
  }
});

// Excluir um item pelo ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Item.findByIdAndDelete(id);
    res.status(200).json({ message: 'Item excluído com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir o item.' });
  }
});

module.exports = router;
