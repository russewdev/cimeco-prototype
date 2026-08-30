/* =====================================================
   CIMECO - FORMULARIO
   EmailJS
===================================================== */

// Inicializar EmailJS
emailjs.init("S77wOL6DfGYPNM7N1");


document.addEventListener("DOMContentLoaded", () => {

    // =================================================
    // OBTENER FORMULARIO
    // =================================================

    const form = document.querySelector("#contactForm");

    if (!form) {
        console.error("No se encontró el formulario #contactForm");
        return;
    }


    // =================================================
    // EVITAR DOBLE INICIALIZACIÓN
    // =================================================

    if (form.dataset.emailjsInitialized === "true") {
        return;
    }

    form.dataset.emailjsInitialized = "true";


    // =================================================
    // OBTENER BOTÓN
    // =================================================

    const boton = form.querySelector("button[type='submit']");

    if (!boton) {
        console.error("No se encontró el botón submit");
        return;
    }


    // Texto original del botón
    const textoOriginal = `
        <span class="button-text">
            Enviar consulta
        </span>

        <i class="bi bi-send"></i>
    `;


    // =================================================
    // SUBMIT
    // =================================================

    form.addEventListener("submit", async (e) => {

        e.preventDefault();


        // =================================================
        // EVITAR DOBLE ENVÍO
        // =================================================

        if (boton.disabled) {
            return;
        }


        // =================================================
        // VALIDAR FORMULARIO
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
        // BOTÓN - ENVIANDO
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
        // PROGRESO VISUAL
        // =================================================

        let progreso = 0;

        const intervalo = setInterval(() => {

            if (progreso < 90) {

                progreso += 1;

                progressBar.style.width =
                    `${progreso}%`;

            }

        }, 35);


        try {

            // =================================================
            // ENVIAR CON EMAILJS
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
            // COMPLETAR BARRA
            // =================================================

            clearInterval(intervalo);

            progressBar.style.width = "100%";


            // Esperar para mostrar el 100%
            await new Promise(resolve => {
                setTimeout(resolve, 450);
            });


            // =================================================
            // LIMPIAR FORMULARIO
            // =================================================

            /*
             * Usamos el método nativo directamente.
             * Esto evita problemas si algún elemento
             * está sobrescribiendo "reset".
             */

            HTMLFormElement.prototype.reset.call(form);


            // =================================================
            // LIMPIAR MENSAJE
            // =================================================

            const formMessage =
                document.querySelector("#formMessage");

            if (formMessage) {

                formMessage.innerHTML = "";

                formMessage.className =
                    "form-message text-center mt-3";

            }


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

            } else {

                console.error(
                    "No se encontró el modal #modalExito"
                );

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


            const formMessage =
                document.querySelector("#formMessage");


            if (formMessage) {

                formMessage.className =
                    "form-message error text-center mt-3";

                formMessage.innerHTML = `
                    <i class="bi bi-exclamation-circle-fill"></i>
                    No se pudo enviar la consulta.
                    Intentá nuevamente.
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
