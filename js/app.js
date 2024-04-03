/* 
Lista de tareas
► Generar una pantalla de inicio✔
► Una transición entre la pantalla y el juego
    → Sección para mostrar la reglas del juego✔
► Diseñar la visual del juego✔
► Crear la función de generar cartas en el DOM
    → Funcion para hacer aparecer las secciones
    → Generar la mano del jugador
    → Generar la mano del Rival
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


/* 
<div class="tablero2_cartasRival">
    <div class="card_Rival">
        <div class="card_RivalBorder"></div>
    </div>
    <div class="card_Rival">
        <div class="card_RivalBorder"></div>
    </div>
    <div class="card_Rival">
        <div class="card_RivalBorder"></div>
    </div>
</div>
<div class="tablero2_cartasJugador">
    <div class="card">
        <p class="cardSim">♥</p>
        <p class="cardTXT">10</p>
        <p class="cardSim">♥</p>
    </div>
    <div class="card">
        <p class="cardSim">♥</p>
        <p class="cardTXT">10</p>
        <p class="cardSim">♥</p>
    </div>
    <div class="card">
        <p class="cardSim">♥</p>
        <p class="cardTXT">10</p>
        <p class="cardSim">♥</p>
    </div>
</div>
<div class="tablero3_historialJugada">
        <p>🦊</p>
    </div>
    <div class="tablero3_historialJugada">
        <p>🦊</p>
    </div>
    <div class="tablero3_historialJugada">
        <p>🦊</p>
    </div>
    <div class="tablero3_historialJugada">
        <p>🦊</p>
    </div>
    <div class="tablero3_historialJugada">
        <p>🦊</p>
</div>
<div class="card_comparacion">
        <p class="cardSim">♣</p>
        <p class="cardTXT">10</p>
        <p class="cardSim">♣</p>
    </div>
    <div class="card_comparacion">
        <p class="cardSim">♥</p>
        <p class="cardTXT">8</p>
        <p class="cardSim">♥</p>
</div>
*/