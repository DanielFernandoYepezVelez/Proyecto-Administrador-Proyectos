const { body } = require('express-validator');
const { Router } = require('express');
const router = Router();

const Project = require('../models/Projects');

router.get('/', async(req, res) => {
    try {
        const projectsAll = await Project.findAll();

        res.render('layout/main', { title: 'Proyectos', projectsAll });
    } catch (error) {
        console.log(error);
    }
});

router.get('/new-project', async(req, res) => {
    try {
        const projectsAll = await Project.findAll();

        res.render('newProject', { title: 'Nuevo Proyecto', projectsAll });
    } catch (error) {
        console.log(error);
    }
});

/* List Project */
/* Codigo Mejorado, Consultas Independientes */
router.get('/:url', async(req, res, next) => {
    try {
        const { url } = req.params;

        const projectsAllPromise = Project.findAll();
        const projectOnePromise = Project.findOne({ where: { url } });
        const [projectsAll, projectOne] = await Promise.all([projectsAllPromise, projectOnePromise]);

        if (!projectOne) return next();

        res.render('tasks', { title: 'Tareas Proyecto', projectOne, projectsAll });
    } catch (error) {
        console.log(error);
    }
})

/* Edit Project */
/* Codigo Mejorado, Consultas Independientes */
router.get('/:id', async(req, res) => {
    try {
        const { id } = req.params;

        const projectsAllPromise = Project.findAll();
        const projectOnePromise = Project.findOne({ where: { id } });
        const [projectsAll, projectOne] = await Promise.all([projectsAllPromise, projectOnePromise]);

        res.render('newProject', { title: 'Editar Proyecto', projectOne, projectsAll });
    } catch (error) {
        console.log(error);
    }
});

router.post('/new-project', [body('nameProject').not().isEmpty().trim().escape()], async(req, res) => {
    const { nameProject } = req.body;
    let errors = [];

    const projectsAll = await Project.findAll();

    if (!nameProject) errors.push({ "texto": "Agregar Nombre Al Proyecto" });

    if (errors.length > 0) res.render('newProject', { errors, projectsAll });
    else {
        /* Este ORM esta basado en promesas, para las otras consultas
        voy a utilizar Async/Await */
        Project.create({ "nameProject": nameProject, "url": null })
            .then(() => console.log('Successfully Inserted Record'))
            .catch(err => console.log(err));

        res.redirect('/');
    }
});

module.exports = router;