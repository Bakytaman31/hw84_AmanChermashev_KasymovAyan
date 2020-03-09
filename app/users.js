const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const User = require('../models/User');

const router = express.Router();

router.post('/', bodyParser.json(),async (req, res) => {
    console.log(req.body);
    const user = new User(req.body);

    try {
        user.generateToken();
        await user.save();
        return res.send(user);
    } catch (error) {
        return res.status(400).send(error);
    }
});

router.post('/sessions', bodyParser.json(),async (req, res) => {
    const user = await User.findOne({username: req.body.username});

    if (!user) {
        return res.status(400).send({error: 'Username or password not correct!'});
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
        return res.status(400).send({error: 'Username or password not correct!'});
    }

    user.generateToken();

    await user.save();

    return res.send({token: user.token});
});

module.exports = router;