module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define('task', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        status: { type: Sequelize.TINYINT(1), allowNull: false }
    });

    return Task;
};