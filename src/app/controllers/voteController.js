const express = require('express');
const dateFormat = require('dateformat');
const authMiddleware = require('../middlewares/auth');

const Restaurant = require('../models/restaurant');
const Vote = require('../models/vote');

const router = express.Router();

router.use(authMiddleware);


router.post('/start', async (req, res) => {
    try {

        var vote = await Vote.findOne();
        if (!vote) {
            vote = await Vote.create({ started: true });
        } else {
            vote.started = true;
            await vote.save();
        }

        const restaurants = await Restaurant.find();
        restaurants.forEach(element => {
            element.canVote = true;
            element.save();
        });        

        return res.send({ vote });
    } catch (err) {
        return res.status(400).send({ error: 'Error updating restaurant' });
    }
});

router.put('/stop', async (req, res) => {
    try {

        const vote = await Vote.find();
        vote.started = false;
        await vote.save();
        return res.send({ vote });
    } catch (err) {
        return res.status(400).send({ error: 'Error updating restaurant' });
    }
});




module.exports = app => app.use('/vote', router);