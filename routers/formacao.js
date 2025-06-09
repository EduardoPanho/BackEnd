const express = require('express');
const router = express.Router();
const bd_cards_formacao = require('../caminho_para_pasta/bd_cards_formacao');

router.get('/', (req, res) => {
    res.json(bd_cards_formacao);
});

router.post('/', (req, res) => {
    try {
        const { dados } = req.body;
        bd_cards_formacao.push(dados);
        res.json({ resposta: "formação adicionada com sucesso" });
    } catch (e) {
        console.log(e);
        res.status(500).json({ resposta: "erro no servidor" });
    }
});

router.put('/', (req, res) => {
    try {
        const { nome, linguagem, img } = req.body;
        const index = bd_cards_formacao.findIndex(f => f.nome === nome);

        if (index !== -1) {
            bd_cards_formacao[index] = { nome, linguagem, img };
            res.json({ resposta: "formação atualizada com sucesso" });
        } else {
            res.status(404).json({ resposta: "formação não encontrada" });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ resposta: "erro no servidor" });
    }
});

router.delete('/', (req, res) => {
    try {
        const { nome } = req.body;
        const index = bd_cards_formacao.findIndex(f => f.nome === nome);

        if (index === -1) {
            return res.status(404).json({ resposta: "formação não encontrada" });
        }

        bd_cards_formacao.splice(index, 1);
        res.json({ resposta: "formação deletada com sucesso" });
    } catch (e) {
        console.log(e);
        res.status(500).json({ resposta: "erro no servidor" });
    }
});

module.exports = router;
