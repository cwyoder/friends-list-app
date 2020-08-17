const Sequelize = require('sequelize');
const conn = new Sequelize('postgres://localhost/friendslist');

const Friend = conn.define('friend', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  rating: {
    type: Sequelize.INTEGER,
    defaultValue: 5,
    allowNull: false
  }
})

const syncAndSeed = async() => {
  await conn.sync({force: true});
  const [jordan, eric, reba] = await Promise.all([
    Friend.create({name: 'Jordan'}),
    Friend.create({name: 'Eric'}),
    Friend.create({name: 'Reba', rating: 10})
  ])
};

module.exports = {
  syncAndSeed,
  models: {
    Friend
  }
}
