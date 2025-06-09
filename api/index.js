const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
const routerFormacao = require('./routers/formacao');
const routerProjetos = require('./routers/projetos');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json())

app.use('/formacao', routerFormacao);
app.use('/projetos', routerProjetos);

// app.listen(3000, () => {
//   console.log('Servidor rodando na porta 3000');
// });

module.export = app;