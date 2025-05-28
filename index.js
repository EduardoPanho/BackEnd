const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const path = require('path');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(cors());
app.use(express.json());

const routerFormacao = require('./routers/formacao.js');
app.use('/formacao', routerFormacao);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
