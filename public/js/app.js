import projects from './modules/projects';
import tasks from './modules/tasks';
import { updateAvance } from './functions/avance';

document.addEventListener('DOMContentLoaded', () => {
    updateAvance();
});