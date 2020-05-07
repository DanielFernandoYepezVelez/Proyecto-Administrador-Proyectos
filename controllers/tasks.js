const { Router } = require('express');
const router = Router();

const Project = require('../models/Projects');
const Task = require('../models/Tasks');

router.post('/task/:url', async(req, res, next) => {
    const { url } = req.params;
    const { task } = req.body;
    const state = 0;

    /* Me Entrega El ID */
    const project = await Project.findOne({ where: { url } });
    const projectId = project.id;

    const result = await Task.create({ task, state, projectId });

    if (!result) return next();

    res.redirect(`/${url}`);
});

router.patch('/task/:id', async(req, res, next) => {
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
});

router.delete('/task/:id', async(req, res, next) => {
    const { id } = req.params;

    const result = await Task.destroy({ where: { id } });
    if (!result) return next();

    res.json({
        ok: true,
        message: 'Tarea Eliminada Exitosamente'
    });
});



















module.exports = router;