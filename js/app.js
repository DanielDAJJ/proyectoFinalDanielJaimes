/* 
Lista de tareas
► Generar una pantalla de inicio✔
► Una transición entre la pantalla y el juego ⚠
    → Sección para mostrar la reglas del juego✔
► Diseñar la visual del juego✔
► Crear la función de generar cartas en el DOM ✔
    → Funcion para hacer aparecer las secciones✔
    → Generar la mano del jugador✔
    → Generar la mano del Rival✔
    → Agregar la función de seleccionar carta del jugador
    → Agregar la función de seleccionar carta del rival
    → Agregar la función para mostrar la selección en pantalla
    → Generar la la función que permita que los jugadores siempre tengan 3 cartas en la mano
► Función de comprar las cartas elegidas por cada jugador 
► Función de sumar los puntos 
    → Mostrar los puntos obtenidos por cada jugador
    → Verificar si hay ganador o no.
► Función de sumar ronda y repetir proceso
► Función de historial de jugadas
*/

/******************************************Variables globales*****************************************/

let pantallaInicio =  document.querySelector("#pantallaInicio");//Pantalla de inicio
let btnNuevaPartida = document.querySelector("#BtnNuevaPartida");//Boton iniciar partida
let nombre = document.querySelector("#POPNombre");//Alert para introducir el nombre del jugador
let nombreForm = document.querySelector("#nombreForm");//Formulario para introducir el nombre
let inputNombre = document.querySelector("#POPNick");//Input para poner el nombre
let btnNombre = document.querySelector("#btnNombre");//Boton para enviar el nombre
let instrucciones = document.querySelector("#instruccion");//Seccion para mostrar las instrucciones del juego
let nombreJugador = document.querySelector("#NombreJ");//variable que guarda el nombre del jugador 
let btnInstrucciones = document.querySelector("#instruccionBTN");//Boton para continuar despues de leer las instrucciones
let tablero = document.querySelector("#tablero");//Variable que guarda la seccion del tablero
let cartasJugador = document.querySelector("#cartasJugador");//Variable que guarda el div de la mano del jugador
let cartasRival = document.querySelector("#cartasRival");//Div donde se colocaran las cartas del rival
let nombreJugadorTablero = document.querySelector("#nombreJTablero")
let pasarTurno = document.querySelector("#pasarTurno");//Boton para pasar turno
let temporizador = document.querySelector("#temporizador");//Variable que muestra el tiempo 
let ganador = document.querySelector("#ganador");//Span para poner el nombre del ganador

const manoJugador = [];
const manoRival = [];
class cartas {
    constructor(numero, palo){
        this.numero = numero,
        this.palo = palo
    }
};
let rondas

/*************************************************************Funciones**********************************************/

btnNuevaPartida.addEventListener("click", mostrarPopNombre =() => {
    ocultarSeccion(pantallaInicio, "titulo");
    return mostrarSeccion(nombre, "POP")
});//Funcion para iniciar el juego

nombreForm.addEventListener("submit", validarNombre);//Funcion para almacenar el nombre en la localStorage y activar la pantalla de instrucciones

btnInstrucciones.addEventListener("click", empezarjuego = () => {
    ocultarSeccion(instrucciones, "instrucciones");
    nombreJugadorTablero.innerText = localStorage.nombre;
    return mostrarSeccion(tablero, "tablero")
});//Funcion para iniciar el tablero

crearCartas();
seleccionarCartajugador();

function validarNombre(e) {
    e.preventDefault();
    if (inputNombre.textLength !== 0) {
        localStorage.setItem('nombre', inputNombre.value);
        ocultarSeccion(nombre, "POP");
        mostrarNombreJugador();
        return mostrarSeccion(instrucciones, "instrucciones")
    }else {
        inputNombre.placeholder = "Debes eligir un nombre";
    }
};//Valida que el jugador tenga un nombre
function ocultarSeccion(seccion, estilo) {
    seccion.classList.remove(estilo);
    return seccion.classList.add("nulos")
};//Funcion para ocultar las secciones
function mostrarSeccion(seccion, estilo) {
    seccion.classList.remove("nulos");
    return seccion.classList.add(estilo);
};//Funcion para mostra las secciones
function mostrarNombreJugador() {
    nombreJugador.innerText = localStorage.nombre
};//Muestra el nombre del jugador

function aleatorierdad(min, max) {
    return Math.floor(Math.random()*(max - min + 1) +min);    
};//Aleatoriedad
function generarPalo() {
    let palo = aleatorierdad(1,4);
    switch (palo){
        case 1:
            return "♥";
            break
        case 2:
            return "♦";
            break
        case 3:
            return "♠";
            break
        default:
            return "♣"
    }
}//generar palo para las cartas

/****************************generar cartas en la mano de los jugadores********************************/

function crearCartas() {
    do {
        for (let i = 0; i < 3; i+=1) {
            const cartaJ = new cartas(aleatorierdad(1, 13), generarPalo());
            const cartaR = new cartas(aleatorierdad(1,13), generarPalo());
            manoJugador.push(cartaJ);
            manoRival.push(cartaR);           
        }
    } while (manoJugador.length < 3 && manoRival.length < 3);
    renderizarCartasJ();
    renderizarCartasR()
}
function renderizarCartasJ() {
    for (const carta of manoJugador) {
        let mano = document.createElement("button");
        mano.classList.add("card");
        mano.setAttribute("id", "carta" + manoJugador.indexOf(carta));
        mano.innerHTML = `<p class="cardSim">${carta.palo}</p>
        <p class="cardTXT">${carta.numero}</p>
        <p class="cardSim">${carta.palo}</p>`;
    cartasJugador.appendChild(mano);
    }
}
function renderizarCartasR() {
    for (const carta of manoRival) {
        let mano = document.createElement("div");
        mano.classList.add("card_Rival");
        mano.innerHTML = `<div class="card_RivalBorder"></div>`;
    cartasRival.appendChild(mano);
    }
}

/**********************************Función para seleccionar la carta del jugador*************************************/

function seleccionarCartajugador() {
    let carta1 = document.querySelector("#carta0");
    let carta2 = document.querySelector("#carta1");
    let carta3 = document.querySelector("#carta2");
    carta1.addEventListener()
}