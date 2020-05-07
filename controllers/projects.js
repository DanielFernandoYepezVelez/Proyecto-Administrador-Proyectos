const { body } = require('express-validator');
const { Router } = require('express');
const router = Router();

const Project = require('../models/Projects');
const Task = require('../models/Tasks');

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

        /* Listar Tareas De Ese Proyecto */
        /* ProjectOne Ya Me Entrega El ID */
        const tasks = await Task.findAll({
            where: {
                "projectId": projectOne.id
            }, // Incluyendo El Modelo Del Proyecto
            // include: [
            //     { model: Project }
            // ]
        });

        if (!projectOne) return next();

        res.render('tasks', { title: 'Tareas Proyecto', projectOne, projectsAll, tasks });
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

        res.render('editProject', { title: 'Editar Proyecto', projectOne, projectsAll });
    } catch (error) {
        console.log(error);
    }
});

router.post('/newProject', [body('nameProject').not().isEmpty().trim().escape()], async(req, res) => {
    try {
        const { nameProject } = req.body;
        let errors = [];

        const projectsAll = await Project.findAll();

        if (!nameProject) errors.push({ "texto": "Agregar Nombre Al Proyecto" });

        if (errors.length > 0) res.render('newProject', { errors, projectsAll });
        else await Project.create({ "nameProject": nameProject, "url": null })

        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
});

router.post('/:id', [body('nameProject').not().isEmpty().trim().escape()], async(req, res) => {
    const { id } = req.params;
    const { nameProject } = req.body;
    let errors = [];

    const projectsAll = await Project.findAll();

    if (!nameProject) errors.push({ "texto": "Agregar Nombre Al Proyecto" });

    if (errors.length > 0) res.render('newProject', { errors, projectsAll });
    else await Project.update({ "nameProject": nameProject }, { where: { id } });

    res.redirect('/');
});

router.delete('/project/:url', async(req, res, next) => {
    try {
        /* Puedo Tomar Por Params O Query */
        // const { url } = req.params;
        const { projectUrl } = req.query;

        const result = await Project.destroy({ where: { "url": projectUrl } });

        if (!result) return next();

        res.json({
            ok: true,
            message: 'Proyecto Eliminado Correctamente'
        });

    } catch (error) {
        console.log(error);
    }
});

module.exports = router;