const { Router } = require('express');
const router = Router();

const Project = require('../models/Projects');
const Task = require('../models/Tasks');
const { authorizationUser } = require('../middlewares/authorization');

router.post('/task/:url', authorizationUser, async(req, res, next) => {
    try {
        const { url } = req.params;
        const { task } = req.body;
        const state = 0;
        let errors = [];

        if (!task) errors.push({ "text": "Agregar Tarea Al Proyecto" });

        /* Me Entrega El ID */
        if (!errors.length > 0) {
            const project = await Project.findOne({ where: { url } });
            const projectId = project.id;

            const result = await Task.create({ task, state, projectId });
            if (!result) return next();
        }

        res.redirect(`/project/${url}`);
    } catch (error) {
        console.log(error);
    }
});

router.patch('/task/:id', authorizationUser, async(req, res, next) => {
    try {
        const { id } = req.params;
        let state = 0;

        const task = await Task.findOne({ where: { id } });

        if (task.state === state) state = 1;
        task.state = state;

        const result = await task.save();
        if (!result) return next();

        res.json({
            ok: true,
            message: 'Estado Cambiado Exitosamente'
        });
    } catch (error) {
        console.log(error);
    }
});

router.delete('/task/:id', authorizationUser, async(req, res, next) => {
    try {
        const { id } = req.params;

        const result = await Task.destroy({ where: { id } });
        if (!result) return next();

        res.json({
            ok: true,
            message: 'Tarea Eliminada Exitosamente'
        });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;