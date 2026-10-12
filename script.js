// Base de datos local con plantas y preguntas sobre la huerta
const plantas = [
    {
        nombre: "Tomate Chonto 🍅",
        preguntas: [
            {
                pregunta: "¿Cuánta luz solar directa necesita el tomate al día para un desarrollo óptimo?",
                opciones: ["1 a 2 horas de sol suave", "Al menos 6 a 8 horas diarias de sol directo", "Ninguna, crece mejor en total sombra"],
                correcta: 1
            },
            {
                pregunta: "¿Cuál es la forma correcta de regar esta planta?",
                opciones: ["Inundar el suelo una vez cada dos semanas", "Humedecer la tierra de forma constante evitando encharcamientos", "Rociar únicamente las hojas al caer la noche"],
                correcta: 1
            }
        ]
    },
    {
        nombre: "Albahaca 🌿",
        preguntas: [
            {
                pregunta: "¿Qué beneficio principal aporta tener albahaca en la huerta?",
                opciones: ["Ahuyenta ciertas plagas y atrae polinizadores", "Absorbe todos los nutrientes de las demás plantas", "Produce raíces subterráneas comestibles"],
                correcta: 0
            },
            {
                pregunta: "¿Cómo se debe realizar la poda o cosecha de sus hojas correctamente?",
                opciones: ["Arrancar la planta entera desde la raíz", "Cortar por encima de los nudos o ramificaciones para estimular su crecimiento", "Cortar únicamente el tallo principal a ras de suelo"],
                correcta: 1
            }
        ]
    },
    {
        nombre: "Cilantro 🌱",
        preguntas: [
            {
                pregunta: "¿Qué tipo de suelo prefiere el cilantro para crecer sanamente?",
                opciones: ["Suelo arcilloso, pesado y muy compacto", "Suelo suelto, bien drenado y rico en materia orgánica", "Suelo exclusivamente rocoso y seco"],
                correcta: 1
            },
            {
                pregunta: "¿Qué sucede si el cilantro se expone a temperaturas de calor extremo?",
                opciones: ["Produce hojas el doble de grandes", "Florece prematuramente ('espiga') y sus hojas se vuelven amargas", "Se transforma en un arbusto leñoso"],
                correcta: 1
            }
        ]
    }
];

let plantaActual = {};
let preguntaIndex = 0;
let puntaje = 0;

// Referencias del DOM
const plantBadge = document.getElementById("plant-assigned");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const resultTitle = document.getElementById("result-title");
const resultMessage = document.getElementById("result-message");

function iniciarJuego() {
    // Asigna aleatoriamente una planta de la lista
    const randomIndex = Math.floor(Math.random() * plantas.length);
    plantaActual = plantas[randomIndex];
    
    plantBadge.textContent = `Planta asignada: ${plantaActual.nombre}`;
    preguntaIndex = 0;
    puntaje = 0;
    
    quizScreen.style.display = "block";
    resultScreen.style.display = "none";
    
    mostrarPregunta();
}

function mostrarPregunta() {
    const actual = plantaActual.preguntas[preguntaIndex];
    questionText.textContent = actual.pregunta;
    optionsContainer.innerHTML = "";

    actual.opciones.forEach((opcion, index) => {
        const btn = document.createElement("button");
        btn.classList.add("btn-option");
        btn.textContent = opcion;
        btn.addEventListener("click", () => verificarRespuesta(index, btn));
        optionsContainer.appendChild(btn);
    });
}

function verificarRespuesta(seleccionada, boton) {
    const actual = plantaActual.preguntas[preguntaIndex];
    const botones = optionsContainer.querySelectorAll(".btn-option");

    // Deshabilitar botones temporalmente tras la selección
    botones.forEach(b => b.disabled = true);

    if (seleccionada === actual.correcta) {
        boton.classList.add("correct");
        puntaje++;
    } else {
        boton.classList.add("incorrect");
        // Resalta la opción correcta para retroalimentación
        botones[actual.correcta].classList.add("correct");
    }

    // Esperar un momento antes de pasar a la siguiente pregunta
    setTimeout(() => {
        preguntaIndex++;
        if (preguntaIndex < plantaActual.preguntas.length) {
            mostrarPregunta();
        } else {
            mostrarResultados();
        }
    }, 1300);
}

function mostrarResultados() {
    quizScreen.style.display = "none";
    resultScreen.style.display = "block";

    const total = plantaActual.preguntas.length;
    if (puntaje === total) {
        resultTitle.textContent = "¡Excelente trabajo! 🎉";
        resultMessage.textContent = `¡Has respondido correctamente todas las preguntas sobre el cuidado de tu ${plantaActual.nombre}! Demuestras gran compromiso con el mantenimiento de la huerta de la Universidad San Buenaventura.`;
    } else {
        resultTitle.textContent = "¡Buen intento! 🌱";
        resultMessage.textContent = `Acertaste ${puntaje} de ${total} preguntas sobre tu ${plantaActual.nombre}. Visita de nuevo la huerta para seguir aprendiendo sobre su cuidado diario.`;
    }
}

// Iniciar el juego automáticamente al cargar la página
window.onload = iniciarJuego;