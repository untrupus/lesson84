const router = require("express").Router();
const auth = require("../middleware/auth");
const Task = require("../models/Task");

router.post('/', auth, async (req, res) => {
    const taskData = req.body;
    taskData.user = req.user._id;
    const task = new Task(taskData);
    try {
        await task.save();
        res.send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/', auth, async (req, res) => {
    const result = await Task.find({user: req.user._id});
    if (result) {
        res.send(result);
    } else {
        res.sendStatus(404);
    }
});

router.delete('/:id', auth, async (req, res) => {
    const result = await Task.findByIdAndRemove({_id: req.params.id});

    if (result) {
        res.send("Task removed");
    } else {
        res.sendStatus(404);
    }
});

router.put('/:id', auth, async (req, res) => {
   const result = await Task.findByIdAndUpdate(req.params.id, req.body);
    if (result) {
        res.send(result);
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;