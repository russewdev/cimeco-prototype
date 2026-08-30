/* =====================================================
CIMECO - FORMULARIO
EmailJS
===================================================== */

// Inicializar EmailJS
emailjs.init("S77wOL6DfGYPNM7N1");

document.addEventListener("DOMContentLoaded", () => {

// Obtener formulario
const form = document.querySelector("#formulario");

// Verificar que el formulario exista
if (!form) {
    console.error("No se encontró el formulario #formulario");
    return;
}

// Obtener botón
const boton = form.querySelector("button[type='submit']");


// =================================================
// EVENTO SUBMIT
// =================================================

form.addEventListener("submit", async (e) => {

    e.preventDefault();


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

    boton.innerHTML = `
        <span class="spinner-border spinner-border-sm me-2"></span>
        Enviando...
    `;


    try {

        // =================================================
        // ENVIAR EMAIL
        // =================================================

        const respuesta = await emailjs.send(
            "service_ziw4ggr",
            "template_ilojrgu",
            datos
        );


        // Mostrar respuesta en consola
        console.log("Email enviado correctamente:", respuesta);


        // =================================================
        // LIMPIAR FORMULARIO
        // =================================================

        form.reset();


        // =================================================
        // ÉXITO
        // =================================================

        alert("Consulta enviada correctamente ✅");


    } catch (error) {

        // =================================================
        // ERROR
        // =================================================

        console.error("Error EmailJS:", error);

        alert(
            "No se pudo enviar la consulta ❌\n\n" +
            "Por favor intentá nuevamente."
        );


    } finally {

        // =================================================
        // RESTAURAR BOTÓN
        // =================================================

        boton.disabled = false;

        boton.innerHTML = `
            Enviar consulta
            <i class="bi bi-send"></i>
        `;

    }

});

});
