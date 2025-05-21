const express = require('express');
const cors = require('cors');

const routerProjetos = require('./routes/projetos');
const routerFormacao = require('./routes/formacao');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/projetos', routerProjetos);
app.use('/api/formacao', routerFormacao);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
