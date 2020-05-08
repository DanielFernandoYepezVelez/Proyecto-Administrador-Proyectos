import Swal from 'sweetalert2';

/* Logica Barra De Avance */
export const updateAvance = () => {
    /* Seleccionar Las Tareas Existentes */
    const tasks = document.querySelectorAll('li.tarea');

    if (tasks.length) {
        /* Seleccionar Las Tareas Completadas */
        const tasksCompleted = document.querySelectorAll('i.completo');

        /* Calcular El Avance */
        const avance = Math.round((tasksCompleted.length / tasks.length) * 100);

        /* Mostrar El Avance */
        const porcentaje = document.querySelector('#porcentaje');
        porcentaje.style.width = avance + '%';

        if (avance === 100) {
            /* Alert Opcional */
            Swal.fire(
                'Proyecto Finalizado!',
                'Felicitaciones',
                'success'
            );
        }
    }
};