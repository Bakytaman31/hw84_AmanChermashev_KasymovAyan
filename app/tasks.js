const express = require('express');
const bodyParser = require('body-parser');

const Task = require('../models/Task');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', [auth, bodyParser.json()], async (req, res) => {
    console.log(req.body, req.user);
    const obj = {
        user: req.user._id,
        title: req.body.title,
        task: req.body.task
    };
    const task = new Task(obj);

    try{
        await task.save();
        res.send(task)
    } catch (error) {
        return res.status(400).send(error);
    }
});

router.get('/', auth, async (req, res) => {
    const user = req.user;
    const tasks = await Task.find({user: user._id}).populate('users');
    res.send(tasks);
});

router.put('/:id', [auth, bodyParser.json()], async (req, res) => {
    const user = req.user;
    const obj = {
        title: req.body.title,
        task: req.body.task,
        status: req.body.status
    };
    await Task.where({_id: req.params.id, user: user._id}).update(obj);
    return res.send({message: "Updated"});
});

router.delete('/:id', auth, async (req, res) => {
    const user = req.user;
    const task = await Task.findOne({_id: req.params.id, user: user});
    try {
        if (!task) {
            return res.status(404).send({error: "Not found"})
        }
        await Task.deleteOne({user: user, _id: req.params.id});
        return res.send({message: 'Deleted'});
    } catch (e) {
        return res.status(404).send({error: "Not found"})
    }

});

module.exports = router;

