/* =====================================================
   CIMECO - FORMULARIO
   EmailJS
===================================================== */

// Inicializar EmailJS
emailjs.init("S77wOL6DfGYPNM7N1");

document.addEventListener("DOMContentLoaded", () => {

    // =================================================
    // OBTENER FORMULARIOo
    // =================================================

    const form = document.querySelector("#contactForm");

    if (!form) {
        console.error("No se encontró el formulario #contactForm");
        return;
    }

    // Botón
    const boton = form.querySelector("button[type='submit']");

    // Texto original
    const textoOriginal = `
        <span class="button-text">Enviar consulta</span>
        <i class="bi bi-send"></i>
    `;


    // =================================================
    // SUBMIT
    // =================================================

    form.addEventListener("submit", async (e) => {

        e.preventDefault();


        // =================================================
        // VALIDACIÓN
        // =================================================

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }


        // =================================================
        // OBTENER DATOS
        // =================================================

        const datos = {

            nombre:
                document.querySelector("#nombre").value,

            direccion:
                document.querySelector("#direccion").value,

            telefono:
                document.querySelector("#telefono").value,

            email:
                document.querySelector("#email").value,

            motivo:
                document.querySelector(
                    'input[name="motivo"]:checked'
                )?.value || "No especificado",

            mensaje:
                document.querySelector("#mensaje").value

        };


        // =================================================
        // BOTÓN - ESTADO ENVIANDO
        // =================================================

        boton.disabled = true;

        boton.classList.add("sending");

        boton.innerHTML = `
            <div class="button-progress">
                <div class="button-progress-bar"></div>
            </div>

            <span class="button-loading-text">
                Enviando...
            </span>
        `;

        const progressBar =
            boton.querySelector(".button-progress-bar");


        // =================================================
        // ANIMACIÓN DE PROGRESO
        // =================================================

        let progreso = 0;

        const intervalo = setInterval(() => {

            // No llegar al 100% hasta que EmailJS confirme
            if (progreso < 90) {

                progreso += 1;

                progressBar.style.width = `${progreso}%`;

            }

        }, 35);


        try {

            // =================================================
            // ENVIAR EMAIL
            // =================================================

            const respuesta = await emailjs.send(
                "service_ziw4ggr",
                "template_ilojrgu",
                datos
            );


            console.log(
                "Email enviado correctamente:",
                respuesta
            );


            // =================================================
            // DETENER PROGRESO
            // =================================================

            clearInterval(intervalo);


            // Completar barra
            progressBar.style.width = "100%";


            // Esperar un poquito para que se vea el 100%
            await new Promise(resolve => {
                setTimeout(resolve, 450);
            });


            // =================================================
            // LIMPIAR FORMULARIO
            // =================================================

            form.reset();


            // =================================================
            // MOSTRAR MODAL DE ÉXITO
            // =================================================

            const modalElemento =
                document.querySelector("#modalExito");

            if (modalElemento) {

                const modalExito =
                    bootstrap.Modal.getOrCreateInstance(
                        modalElemento
                    );

                modalExito.show();

            }


        } catch (error) {

            // =================================================
            // ERROR
            // =================================================

            clearInterval(intervalo);

            console.error(
                "Error EmailJS:",
                error
            );


            // Mostrar error dentro del formulario
            const formMessage =
                document.querySelector("#formMessage");

            if (formMessage) {

                formMessage.className =
                    "form-message error text-center mt-3";

                formMessage.innerHTML = `
                    <i class="bi bi-exclamation-circle-fill"></i>
                    No se pudo enviar la consulta. Intentá nuevamente.
                `;

            }

        } finally {

            // =================================================
            // RESTAURAR BOTÓN
            // =================================================

            setTimeout(() => {

                boton.disabled = false;

                boton.classList.remove("sending");

                boton.innerHTML = textoOriginal;

            }, 600);

        }

    });

});
