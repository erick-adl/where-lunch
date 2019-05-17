const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Restaurant = require('../models/Restaurant');
const Task = require('../models/Restaurant');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try {
        const restaurants = await Restaurant.find().populate('user');

        return res.send({ restaurants });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading restaurants' });
    }
});

router.get('/:restaurantId', async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.restaurantId).populate('user');

        return res.send({ restaurant });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading restaurant' });
    }
});

router.post('/', async (req, res) => {
    try {
        const restaurant = await Restaurant.create({ ...req.body, user: req.userId });
        return res.send({ restaurant });
    } catch (err) {
        return res.status(400).send({ error: 'Error creating new restaurant' });
    }
});

router.put('/:restaurantId', async (req, res) => {
    try {
        const { title, description } = req.body;

        const restaurant = await Restaurant.findByIdAndUpdate(req.params.restaurantId, {
            title,
            description
        }, { new: true });       

        await restaurant.save();

        return res.send({ restaurant });
    } catch (err) {
        return res.status(400).send({ error: 'Error updating restaurant' });
    }
});

router.delete('/:restaurantId', async (req, res) => {
    try {
        await Restaurant.findByIdAndRemove(req.params.restaurantId);

        return res.send({success:'Restaurant deleted'});
    } catch (err) {
        return res.status(400).send({ error: 'Error deleting restaurant' });
    }
});

module.exports = app => app.use('/restaurants', router);