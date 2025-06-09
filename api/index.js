const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const serviceAccount = {
  type: "service_account",
  project_id: "bdportfolio-83f5f",
  private_key_id: "a8802c52427cb6444e1283304ee04710f7a59e41",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDEYyqmX2Ew6dcF\ns+og7gFVsJxvulWSU4ApVGQwyYt4GO9VSkY4Cb7HsJTR3kf5b9oKv48Un0eayOMg\n8ZvmQgH9fjpcPi45GKZP2+48khR70j0YAxnv5qCdxAP8t57sSR4h4YcBDXUIAwGn\nCbbYVummYTK4pGMGsSCTn4olsRTP4Bqq59pDUmIdnKNUVGZdNyg2Saxuqs9MFdgo\nRGY9ItzvpZB+0yQE1Boedn3WP27oLCRX590j5FEYy1PbIPSuEjo+t8nfOL2iHI+e\nYcVtWxRPgw66R+6qIumEHHNPOXuaGE0GqAd01OGMYXf5OrPvqYike7vLrza19ITe\nFAODHfAPAgMBAAECggEAF0XjO4UpGOlVTH02PUHHUbbUyx7LXkRb90njd66iwxA9\naJ+dM63f+H0yHa7YW7SII+bwl1KK40p0NCa9wWtIHhjT5LOPub90khkvoejz2Xqg\nN9TCQZ5UoW2lxVCjWkAN/Jjj7VmBaXolu3xYuUmPdeKl5qDAhX3/LM9myTGzlDC2\ntG++erZdFgQ0j+mBtv33H2OepKxmanX9dqdmTfCiT3a8grP9BxPs5J1jI0ojWp0q\nWQeyRw64iCHIc0rMiVdjd7D1lj64TZtR5Kgvit96Tsret6kYxKJWayUkmMSUWCPn\nA+1mceYlLFRnjvDmrn6sDKTbJzZnsIOv2n65zXH0eQKBgQD5vKlT+6zlfCyfkDJo\nvZlzeBkDiPqZZS6BeCUoth6usfIRio++hYYLkwkOjYrU/rMra6n8bP5Id10MIg1+\nU6QkfVBogYpLv3E0E2YJVw+rh7BrgFQlKAchkOJUvyzlp59hr4wsjJe1du+aZva2\njA9sQ/eRxlTtd6wGAuw+sTe9VwKBgQDJT/62dJQ0cpa+GM9iMNuFyxH8yuODWdh1\nb9WBawiW3AQ4jJTBec1CKXR2ukRo+LNMzgwHa4fkHQtwzsX5X3WOpCs7WpsYM4mr\nm8qZIP126ZHy/lzsC32xdD0T9+PwlexUtYxGyD8MdR1au8Qkb6NSgb7CzEKsCIau\nz1X4y6T4CQKBgQDGlE3Qif8hO2wANRjgUGMEfirltLYP43TnXjGt/aLIJpble9hx\nFptP+Mrq14Hde+ncTPAN2F0aIk/Kpgk0ui17Fmopr1fYg5HwZrxsEN5U9sBBuvkt\n0nZZKmvOF3YL5w3FD2HWyrSXhstfayAiZ5yb6i+hqqM9cDtJTGmuMByyYQKBgQCY\nIxRj3waB/HdfgnB3zGSaYDVfzhTSl3u2hKXeAH2lRPELq3JgJSSx85JIh8xbaFhY\nmv8MPH+eLTUQM7P6GeJFwlvJp1e+mnRYdIxP3VawHyRld0XSPXzoNuhRxu1ETIkm\nG22/sGW1jGx6vZwlzRioqdT4clWQnYDra1WViJFLwQKBgDRU+Co3dxKcQjcbhay5\n1qWKA5b3tlee9kSbhwH86XwfJxLvRuE37YwkXsFq61OicIuuuR/pexHhU6DOZemh\nz2vDnCM118OR/8ghUhrar1x0Z9Brk98bMIg4bHY6rHqPaLd/4IxN+M4UQZ+ZLL38\njgOyhZnmZtR+YI1Nb1tEN6mx\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-fbsvc@bdportfolio-83f5f.iam.gserviceaccount.com",
  client_id: "117944970640363647417",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40bdportfolio-83f5f.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
}


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const app = express();
// const routerFormacao = require('./routers/formacao');
// const routerProjetos = require('./routers/projetos');

app.use(cors());
app.use(express.json());

// app.use('/formacao', routerFormacao);
// app.use('/projetos', routerProjetos);

// app.listen(3000, () => {
//   console.log('Servidor rodando na porta 3000');
// });

app.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('projetos').get();
    const projetos = snapshot.docs.map(doc => ({
      ...doc.data(),
      uid: doc.id
    }));

    return res.json(projetos);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao buscar projetos" });
  }
});

app.post('/', async (req, res) => {
  try {
    const docRef = await db.collection('projetos').add(req.body);
    res.status(201).send({ id: docRef.id });
  } catch (err) {
    res.status(500).send(err.message)
  }
});

app.put('/:id', async (req, res) => {
  try {
    await db.collection('projetos').doc(req.params.id).update(req.body);
    res.send({ message: 'Atualizado com secesso' })
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.delete('/:id', async (req, res) => {
  try {
    await db.collection('projetos').doc(req.params.id).delete();
    res.send({ message: 'Deletado com sucesso' });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = app;