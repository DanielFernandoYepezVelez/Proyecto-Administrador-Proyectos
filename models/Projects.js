const Sequelize = require('sequelize');
const db = require('../config/database');

/* URLS ÚNICAS */
const slug = require('slug');
const shortid = require('shortid');

const Projects = db.define('projects', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    nameProject: { type: Sequelize.STRING },
    url: { type: Sequelize.STRING }
}, {
    hooks: {
        beforeCreate(projectRegister) {
            // console.log('Antes De Insertar En La Base De Datos');
            const url = slug(projectRegister.nameProject).toLowerCase();
            projectRegister.url = `${url}-${shortid.generate()}`;
        }
    }
});

module.exports = Projects;