module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    }
  });

  return User;
};