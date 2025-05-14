const express = require('express');
const cors = require('cors');
const routes = require('./app');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/', routes);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
