const express = require('express');
const dateFormat = require('dateformat');
const authMiddleware = require('../middlewares/auth');

const Restaurant = require('../models/restaurant');
const User = require('../models/user');
const Vote = require('../models/vote');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try {

        const vote = await Vote.findOne();
        if (!vote || !vote.started) {
            return res.status(400).send({ error: 'Voting stopped' });
        }

        const restaurants = await Restaurant.find({ canVote: true });

        return res.send({ restaurants });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading restaurants' });
    }
});

router.get('/canvote', async (req, res) => {
    try {

        const vote = await Vote.findOne();
        if (!vote || !vote.started) {
            return res.status(400).send({ error: 'Voting stopped' });
        }

        const restaurants = await Restaurant.find({ canVote: "true" });

        return res.send({ restaurants });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading restaurants' });
    }
});

router.get('/cannotvote', async (req, res) => {
    try {

        const vote = await Vote.findOne();
        if (!vote || !vote.started) {
            return res.status(400).send({ error: 'Voting stopped' });
        }

        const restaurants = await Restaurant.find({ canVote: "false" });

        return res.send({ restaurants });
    } catch (err) {
        return res.status(400).send({ error: 'Error loading restaurants' });
    }
});


router.get('/:restaurantId', async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.restaurantId);

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

        return res.send({ success: 'Restaurant deleted' });
    } catch (err) {
        return res.status(400).send({ error: 'Error deleting restaurant' });
    }
});

router.put('/:restaurantId/vote', async (req, res) => {
    try {

        const vote = await Vote.findOne();
        if (!vote || !vote.started) {
            return res.status(400).send({ error: 'Voting stopped' });
        }


        const restaurant = await Restaurant.findById(req.params.restaurantId);
        if (!restaurant) {
            return res.status(400).send({ error: 'Restaurant not found' });
        }

        if (!restaurant.canVote) {
            return res.status(400).send({ error: 'Restaurant was already chosen' });
        }

        const user = await User.findById(req.userId);
        if (user.lastDayVote == dateFormat(new Date(), "dd-mm-yyyy")) {
            return res.status(400).send({ error: 'User already vote today' });
        }

        await User.findByIdAndUpdate(req.userId, {
            lastDayVote: dateFormat(new Date(), "dd-mm-yyyy")
        });

        restaurant.votes++;
        await restaurant.save();
        return res.send({ restaurant });
    } catch (err) {
        return res.status(400).send({ error: 'Error voting restaurant' });
    }
});

router.put('/:restaurantId/chose', async (req, res) => {
    try {

        const vote = await Vote.findOne();
        if (!vote || !vote.started) {
            return res.status(400).send({ error: 'Voting stopped' });
        }


        const restaurant = await Restaurant.findById(req.params.restaurantId);
        if (!restaurant) {
            return res.status(400).send({ error: 'Restaurant not found' });
        }

        if (!restaurant.canVote) {
            return res.status(400).send({ error: 'Restaurant was already chosen' });
        }
        restaurant.canVote = false;
        await restaurant.save();
        return res.send({ restaurant });
    } catch (err) {
        return res.status(400).send({ error: 'Error voting restaurant' });
    }
});

module.exports = app => app.use('/restaurants', router);