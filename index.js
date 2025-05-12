const express = require('express');
const cors = require('cors');

const bd_cards_projetos = require('./caminho_para_pasta/bd_cards_projetos');
const bd_cards_formacao = require('./caminho_para_pasta/bd_cards_formacao');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ projetos: bd_cards_projetos, formacoes: bd_cards_formacao });
});

app.post('/', (req, res) => {
    try {
        const { tipo, dados } = req.body;

        if (tipo === "projeto") {
            bd_cards_projetos.push(dados);
        } else if (tipo === "formacao") {
            bd_cards_formacao.push(dados);
        } else {
            return res.status(400).json({ resposta: "Tipo inválido" });
        }

        res.json({ resposta: "adicionado com sucesso" });
    } catch (e) {
        console.log(e);
        res.status(500).json({ resposta: "erro no servidor" });
    }
});

app.put('/', (req, res) => {
    try {
        const { tipo, nome, linguagem, img } = req.body;
        const bd = tipo === "projeto" ? bd_cards_projetos : bd_cards_formacao;
        const index = bd.findIndex(p => p.nome === nome);

        if (index !== -1) {
            bd[index] = { nome, linguagem, img };
            res.json({ resposta: "atualizado com sucesso" });
        } else {
            res.status(404).json({ resposta: "item não encontrado" });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ resposta: "erro no servidor" });
    }
});

app.delete('/', (req, res) => {
    try {
        const { tipo, nome } = req.body;
        const bd = tipo === "projeto" ? bd_cards_projetos : bd_cards_formacao;
        const index = bd.findIndex(p => p.nome === nome);

        if (index === -1) {
            return res.status(404).json({ resposta: "item não encontrado" });
        }

        bd.splice(index, 1);

        res.json({ resposta: "deletado com sucesso" });
    } catch (e) {
        console.log(e);
        res.status(500).json({ resposta: "erro no servidor" });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
