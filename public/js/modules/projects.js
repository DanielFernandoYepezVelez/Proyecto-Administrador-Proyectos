import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.querySelector('#eliminar-proyecto');

if (btnEliminar) {
    btnEliminar.addEventListener('click', e => {
        // const url2 = e.target.dataset.projectUrl; Tambien lo puedo Obtener asi
        const projectUrl = e.target.getAttribute('data-project-url');

        Swal.fire({
            title: 'Deseas Eliminar Este Proyecto?',
            text: "Un Proyecto Eliminado No Se Puede Recuperar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Borrar!',
            cancelButtonText: 'No, Cancelar'
        }).then((result) => {
            if (result.value) {
                const url = `${location.origin}/project/${projectUrl}`;

                axios.delete(url, { params: { projectUrl } })
                    .then(response => {
                        Swal.fire(
                            'Proyecto Eliminado!',
                            response.data.message,
                            'success'
                        )

                        setTimeout(() => {
                            window.location.href = '/';
                        }, 3000);
                    })
                    .catch(() => {
                        Swal.fire({
                            icon: 'warning',
                            type: 'error',
                            title: 'Hubo Un Error',
                            text: 'No Se Puedo Eliminar El Proyecto'
                        });
                    });
            }
        })
    });
}

export default btnEliminar;