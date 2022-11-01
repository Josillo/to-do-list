const db = require('../models');
const Task = db.tasks;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    if(!req.body.description) {
        res.status(400).send({ message: 'Task description can not be empty.'});
        return;
    }

    const task = {
        description: req.body.description,
        status: false,
        filename: req.file ? req.file.filename : ""
    };

    Task.create(task)
        .then( data => {
            res.send(data)
        }).catch( err => {
            res.status(500).send({
                message: err.message || 'Some error happened while creating a task.'
            });
        })
};


//Retrieve all Tasks
exports.findAll = (req, res) => {
    Task.findAll()
        .then( data => {
            res.send(data);
        }).catch( err => {
            res.status(500).send({
                message: err.message || 'Some error happened while retrieving tasks.'
            })
        });
};

exports.update = (req, res) => {
    if( req.body.status === undefined) {
        res.status(400).send({ message: 'Task status can not be empty.'});
        return;
    }
    Task.update({
        status: req.body.status
    }, {
        where : { id: req.params.id }
    })
        .then( data => {
            res.status(200).send(data);
        }).catch( err => {
            res.status(500).send({
                message: err.message || 'Some error happened while updating tasks.'
            })
        });
};

exports.delete = (req, res) => {
    Task.destroy({
        where : { id: req.params.id }
    })
        .then( data => {
            res.status(200).send({ message: 'register deleted'});
        }).catch( err => {
            res.status(500).send({
                message: err.message || 'Some error happened while retrieving tasks.'
            })
        });
};