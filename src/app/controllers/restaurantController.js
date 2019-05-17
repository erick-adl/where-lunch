const express = require('express');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();
router.use(authMiddleware);




router.get('/', (req, res) => {
    try {
        return res.send({ ok: true });
    } catch (error) {
        return res.status(400).send({ error: 'Error' });
    }
});

module.exports = app => app.use('/restaurants', router);