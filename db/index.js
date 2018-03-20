const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres:localhost/my_todo_db');

const Item = conn.define('items',{
  name: Sequelize.STRING
});

const syncNseed= ()=> {
  conn.sync({ force: true })
.then(()=>Promise.all([
  Item.create({name:'Apples'}),
  Item.create({name:'Bananas'}),
  Item.create({name:'Oranges'}),
  Item.create({name:'Pears'}),
]));
};

module.exports = {
  syncNseed,
  models: {
    Item
  }
};
