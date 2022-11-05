module.exports = app => {
    const tasks = require('../controllers/task.controller.js');
    const auth = require("../controllers/auth.js");
    const upload = require('../multer/upload');

    var router = require('express').Router();

    // Create a task
    router.post('/add', auth.isAuthenticated, upload.single('file'), tasks.create);

    // Retrieve all tasks
    router.get('/tasks', auth.isAuthenticated, tasks.findAll);

    // Update a task
    router.put('/task/:id', auth.isAuthenticated, tasks.update);

    // Delete a task
    router.delete('/task/:id', auth.isAuthenticated, tasks.delete);


    app.use('/api/task-manager', router)
};