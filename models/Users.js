const Sequelize = require('sequelize');
const db = require('../config/database');
const bcrypt = require('bcrypt-nodejs');

const Projects = require('../models/Projects');

const Users = db.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            isEmail: {
                msg: 'Agregar Un Email Válido'
            },
            notEmpty: {
                msg: 'El Email No Puede Ir Vacio'
            }
        },
        unique: {
            args: true,
            msg: 'Usuario Ya Registrado'
        }
    },
    password: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El Password No Puede Ir Vacio'
            }
        }
    },
    activo: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    token: Sequelize.STRING,
    expira: Sequelize.DATE
}, {
    hooks: {
        beforeCreate(user) {
            user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
        }
    }
});

/* Metodos Personalizados (Este es para passport)*/
/* Es Obligatorio Utilizar Una function Normal Y NO
Una Function de flecha */
Users.prototype.passwordVerify = function(password) {
    return bcrypt.compareSync(password, this.password);
}

/* Relación De Uno A Muchos */
Users.hasMany(Projects);

module.exports = Users;