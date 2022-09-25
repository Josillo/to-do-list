module.exports = app => {
    const tasks = require('../controllers/task.controller.js');

    var router = require('express').Router();

    // Create a task
    router.post('/add', tasks.create);

    // Retrieve all tasks
    router.get('/tasks', tasks.findAll);

    // Update a task
    router.put('/task/:id', tasks.update);

    // Delete a task
    router.delete('/task/:id', tasks.delete);

    app.use('/api/task-manager', router)
};