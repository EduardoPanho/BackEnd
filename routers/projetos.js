const express = require('express');
const router = express.Router();
const bd_cards_projetos = require('../caminho_para_pasta/bd_cards_projetos');

router.get('/', (req, res) => {
    res.json(bd_cards_projetos);
});

router.post('/', (req, res) => {
    try {
        const { dados } = req.body;
        bd_cards_projetos.push(dados);
        res.json({ resposta: "projeto adicionado com sucesso" });
    } catch (e) {
        console.log(e);
        res.status(500).json({ resposta: "erro no servidor" });
    }
});

router.put('/', (req, res) => {
    try {
        const { nome, linguagem, img } = req.body;
        const index = bd_cards_projetos.findIndex(p => p.nome === nome);

        if (index !== -1) {
            bd_cards_projetos[index] = { nome, linguagem, img };
            res.json({ resposta: "projeto atualizado com sucesso" });
        } else {
            res.status(404).json({ resposta: "projeto não encontrado" });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ resposta: "erro no servidor" });
    }
});

router.delete('/', (req, res) => {
    try {
        const { nome } = req.body;
        const index = bd_cards_projetos.findIndex(p => p.nome === nome);

        if (index === -1) {
            return res.status(404).json({ resposta: "projeto não encontrado" });
        }

        bd_cards_projetos.splice(index, 1);
        res.json({ resposta: "projeto deletado com sucesso" });
    } catch (e) {
        console.log(e);
        res.status(500).json({ resposta: "erro no servidor" });
    }
});

module.exports = router;
