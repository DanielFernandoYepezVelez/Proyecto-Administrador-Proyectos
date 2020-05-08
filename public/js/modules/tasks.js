import axios from 'axios';
import Swal from 'sweetalert2';
import { updateAvance } from '../functions/avance';

const tasks = document.querySelector('.listado-pendientes');

if (tasks) {
    tasks.addEventListener('click', e => {
        if (e.target.classList.contains('fa-check-circle')) {
            const task = e.target.parentElement.parentElement.getAttribute('data-task');
            const taskId = task.substring(task.length - 1);

            const url = `${location.origin}/task/${taskId}`;
            axios.patch(url, { taskId })
                .then((resp) => {
                    if (resp.status === 200) {
                        e.target.classList.toggle('completo');
                        updateAvance();
                    }
                }).catch((err) => console.log(err));
        }

        if (e.target.classList.contains('fa-trash')) {
            const taskHTML = e.target.parentElement.parentElement.getAttribute('data-task');
            const taskId = taskHTML.substring(taskHTML.length - 1);

            Swal.fire({
                title: 'Deseas Eliminar Este Tarea?',
                text: "Una Tarea Eliminado No Se Puede Recuperar!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Borrar!',
                cancelButtonText: 'No, Cancelar'
            }).then((response) => {
                if (response.value) {
                    const url = `${location.origin}/task/${taskId}`;

                    axios.delete(url, { params: { url } })
                        .then((response) => {
                            if (response.status === 200) {
                                e.target.parentElement.parentElement.remove();


                                /* Alert Opcional */
                                Swal.fire(
                                    'Tarea Eliminada!',
                                    response.data.message,
                                    'success'
                                );
                            }
                            updateAvance();
                        })
                }
            })
        }
    });
}

export default tasks;