const Sequelize = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
	host: 'localhost',
	port: 3306,
	dialect: 'mysql',
	operatorsAliases: false
});


sequelize.authenticate()
	.then(() => console.log('Connection has been established established ;)).'))
	.catch((err) => console.log('Unable to connect to the database:', err));


module.exports = sequelize;
global.sequelize = sequelize;
