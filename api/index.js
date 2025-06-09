const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const serviceAccount = {
  type: "service_account",
  project_id: "bdportfolio-83f5f",
  private_key_id: "6254c0351488afbe1ebfe36b4c8bdeaefb6a50d7",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDB634WIjisCJPE\ntpVKmvuKoW3Z0IfZJv1cfqy47/2FldT8LzVe/eh9SQMv2COlUfQwOhCmY2O+TBrn\nnX1B9Fp2HEeLGAdQ2S/3mxLxw0jadGGOU/BTzs3KRmgY6Mvci+XqCuSXzmciuuxb\nJD68IVAFXeZ58RxI07/6BWIvElIP8MMEmtTSXfohs1a4f3OsbPlDMTcNjIAaZ8Mr\nmkyQfA+DB18UoFzUFG6QySaj3RnP2sFtqSnCavBY1VSg/NSTIxQ8lXTXiwN1DwKq\nCR7o+n427TOTkkI35o9/luXhJNCSqaPlSz/SQ3E1WTP5JlCdSFF4iOzXHMKnJ6wM\nqjmrj9mnAgMBAAECggEAEpVnTWa1KKNfydu3feFRVs02kkeeJSzL3ffTxJtXH9ym\nfw5lHnfVtl/vWr/rVpX+gTqnStK+hceUUnrwvIfWvXfjUUyZsuFFbASj8aBF1I2P\npcycfOOWLBrIMg7pLncHrwChPH0OvDDOosNb8bp9iS4g/rGhBMeqH6MxcBJg498D\nkMoPGfvUXspp24B0twqnhbG2wQwYrMFA6w2NfXQit0orOaBOekl+OC8WmsttCgOK\nUCJ2osgtwKxbcJDE627XR1NpAMlSMbChQZMXD+9HGsomTjO6QF0PwSMNKMuxIVFd\n8nqjyBQoe/21O5PWAFY7Am7RuoPANth5aXAFYT86vQKBgQDlFPndQdkaA96jq0DD\nrwZ8t8mSDmagsTI58JmKJAxN+HrkpU1GG09YS66TY2KJvS05B1nNT6pYUArC+QiF\noEwwreWxiM0Z3w4eD1eC2cmgYYFmagbs3CFkVI1mY1xB9rWlSNvD8Z6veWu/tWxe\nWbG/IFeWyNMV8bGgNFm5z+EkkwKBgQDYtM4yKCcxKkBdIX2IP3WBHa/Qar4wFU4r\nSLhi64t8ratLBId7nzv3aBWsD0ychyZA+qYRvlnviLcpfohVN7HUFOzukUVnMNd2\nJ13XCiSdwScImRXsSwZm5Tilgd2XwnjySYDmDR3LU8ZvyiIbq5SkSwirnr70kRL8\ngISPDRSXHQKBgBe78p9P4TRmzjxa09zyV1O4nvO49j0T3sZN/TpovbWeVu01iyoG\nTlQxkybGF0F6DiNodY9l/5oiwNqufomJsBsjCTc5mzZg+891e3WdJtys/YEk3w7P\nR85jTDsddEOJUgyL3ekRMYWwqM819sJXvKi2qxx+NhCB+AtHITy1IvhtAoGAI0+6\n9bNTR5Ch8kr9wJDOnd5vgp+SJBWkqirsWLoW/Zby/YNcbElzJQph1aqcijj/g8EU\nBHom/4AgkHNc1b4AjRVn0iv7yifMRCWABgVSGB6cNKt1Rg6nmWaqh1WU/SCkQp61\nkUb73uDkydx/GFEqJGdRn117sjBdjqWGdCTmgQUCgYEAwNUgl75oM7c6zqkXW8Pq\n2Wf0ecyoKUR32dvNbGc1Zrs+3rFwUQ2v3r7ifXw82kTH15U7CU5mVQFwMljdKF3j\nwmK8AdDJugRpfn249MUK6kHnYsQ7d0Io44wndFCwm0sqys/LmtcTS1H0QCeMPBM1\nPYnKwGXjZBvU0htA9/c/HyQ=\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-fbsvc@bdportfolio-83f5f.iam.gserviceaccount.com",
  client_id: "117944970640363647417",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40bdportfolio-83f5f.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
}



const app = express();
app.use(cors());
app.use(express.json());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
// const routerFormacao = require('./routers/formacao');
// const routerProjetos = require('./routers/projetos');


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