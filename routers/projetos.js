const bd_cards_projetos = [
    { titulo: "Safe Haven", preco: "15/03/2025", imagem: "./../assets/Project_Img_1.png" },
    { titulo: "Bandeiras", preco: "29/02/2025", imagem: "./../assets/Project_Bandeiras_Img_2.jpg" },
    { titulo: "Fones de Ouvido JBL T500", preco: "R$ 179,00" },
    { titulo: "Smartwatch Apple Watch Series 8", preco: "R$ 3.999,00" },
    { titulo: "Câmera Digital Canon EOS 90D", preco: "R$ 8.999,00" },
    { titulo: "TV LED 55\" Samsung QLED", preco: "R$ 4.699,00" },
    { titulo: "Micro-ondas Panasonic 20L", preco: "R$ 399,00" },
    { titulo: "Aspirador de Pó Philco 1600W", preco: "R$ 299,00" },
];

module.exports = bd_cards_projetos;

const express = require('express');
const router = express.Router();

const bd_cards_projetos = require('./caminho_para_pasta/bd_cards_projetos');

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
