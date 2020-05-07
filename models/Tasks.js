const Sequelize = require('sequelize');
const db = require('../config/database');

const Projects = require('./Projects');

const Tasks = db.define('tasks', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    task: Sequelize.STRING(100),
    state: Sequelize.INTEGER(1)
});

/* RELACIONES, EN CASO DE SER NECESARIAS */
/* Una Tarea Pertenece a un Proyecto En Especial */
Tasks.belongsTo(Projects);

module.exports = Tasks;