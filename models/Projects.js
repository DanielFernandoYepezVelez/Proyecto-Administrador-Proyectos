const Sequelize = require('sequelize');
const db = require('../config/database');

/* URLS ÚNICAS(Cadena De Caracteres Únicas) */
const slug = require('slug');
const shortid = require('shortid');

const Projects = db.define('projects', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    nameProject: { type: Sequelize.STRING(100) },
    url: { type: Sequelize.STRING(100) }
}, {
    hooks: {
        beforeCreate(projectRegister) {
            // console.log('Antes De Insertar En La Base De Datos');
            const url = slug(projectRegister.nameProject).toLowerCase();
            projectRegister.url = `${url}-${shortid.generate()}`;
        }
    }
});

/* RELACIONES, EN CASO DE SER NECESARIAS */
/* Un Proyecto Puede Tener Muchas Tareas */
// Projects.hasMany(Tasks);
module.exports = Projects;