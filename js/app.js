/* 
Lista de tareas
► Generar una pantalla de inicio✔
► Una transición entre la pantalla y el juego
    → Sección para mostrar la reglas del juego✔
► Diseñar la visual del juego✔
► Crear la función de generar cartas en el DOM
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

let btnNuevaPartida = document.querySelector("#BtnNuevaPartida");//Boton iniciar partida
let nombre = document.querySelector("#POPNombre");//Alert para introducir el nombre del jugador
let nombreForm = document.querySelector("#nombreForm");//Formulario para introducir el nombre
let inputNombre = document.querySelector("#POPNick");//Input para poner el nombre
let btnNombre = document.querySelector("#btnNombre");//Boton para enviar el nombre
let instrucciones = document.querySelector("#instruccion");//
let nombreJugador = document.querySelector("#NombreJ");
let btnInstrucciones = document.querySelector("#instruccionBTN")
let tablero = document.querySelector("#tablero");
let pasarTurno = document.querySelector("#pasarTurno");
let temporizador = document.querySelector("#temporizador");
let ganador = document.querySelector("#ganador");

const manoJugador = [];
const manoRival = [];



