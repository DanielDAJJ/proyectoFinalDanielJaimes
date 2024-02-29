// ************************************** variables

const jugador = prompt("Ingresa el nombre del jugador");
let cartasJugador;
let cartaSeleccionadaJugador;

const maquina = "Rival";
let cartasRival
let cartaSeleccionadaMaquina;

let victoriasJugador = 0;
let victoriasMaquina = 0;

//************************************* Funciones

alert("hola " + jugador + " a continuación te enfrentaras en un juego de cartas contra " + maquina + " el objetivo es ganar 3 de 5 rondas en las que deberas escoger entre un conjunto de tres numeros, una vez hayas seleccionado tu número se compara el resultado con el de la máquina, el número mayor ganará");

cartasParaJugador();

function generarCartas(min, max) {
    Math.floor(Math.random()*(max - min + 1) +min);
}//se utilizara para  generar las cartas de los jugadores

function cartasParaJugador() {
    let carta1 = generarCartas(1, 13);
    let carta2 = generarCartas(1, 13);
    let carta3 = generarCartas(1, 13);
    Number(prompt("Elige una carta: " + carta1 + " " + carta2 + " " + carta3));
}

