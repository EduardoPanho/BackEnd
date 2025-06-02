const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

router.get('/', async (req, res) => {
    try {
        const snapshot = await admin.firestore().collection('projetos').get();
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

router.post('/', async (req, res) => {
    try {
        const docRef = await admin.firestore().collection('projetos').add(req.body);
        res.status(201).send({ id: docRef.id });
    } catch (err) {
        res.status(500).send(err.message)
    }
});

router.put('/:id', async (req, res) => {
    try {
        await admin.firestore().collection('projetos').doc(req.params.id).update(req.body);
        res.send({ message: 'Atualizado com secesso' })
    } catch (err) {
res.status(500).send(err.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await admin.firestore().collection('projetos').doc(req.params.id).delete();
        res.send({ message: 'Deletao com secesso' })
    } catch (err) {
res.status(500).send(err.message);
    }
});

module.exports = router;
