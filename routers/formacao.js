let bd_cards_formacao = [
    { titulo: "Yonsei University", preco: "연세대학교", imagem: "./../assets/Yonsei_Img_1.png" },
    { titulo: "Formação - Exatas", preco: "Carga horária - 250h", imagem: "./../assets/Yonsei_Img_2.png" },
    { titulo: "KAIST University", preco: "카이스트대학교", imagem: "./../assets/KAIST_Img_1.png" },
    { titulo: "Formação - Linguagens - Coreano", preco: "Carga horária - 130h", imagem: "./../assets/KAIST_Img_2.png" },
    { titulo: "Sejong University", preco: "세종대학교", imagem: "./../assets/Sejong_Img_1.png" },
    { titulo: "Formação - Sistemas", preco: "Carga horária - 120h", imagem: "./../assets/Sejong_Img_2.png" },
];

module.exports = bd_cards_formacao;

const express = require('express');
const router = express.Router();

const bd_cards_formacao = require('./caminho_para_pasta/bd_cards_formacao');

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
        const index = bd_cards_formacao.findIndex(p => p.nome === nome);

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
        const index = bd_cards_formacao.findIndex(p => p.nome === nome);

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