// ************************************** variables

const jugador = prompt("Ingresa el nombre del jugador");
const cartaSeleccionadaJugador = [];

const maquina = "Rival";
const cartaSeleccionadaRival = [];

class cartas {
    constructor (numero, palo) {
        this.numero = numero;
        this.palo = palo;
    }
};

let victoriasJugador = 0;
let victoriasMaquina = 0;

let rondas = 1;
//************************************* Funciones

alert("Hola " + jugador + " a continuación te enfrentarás en un juego de cartas contra tu " + maquina + ". El objetivo es ganar 3 de 5 rondas en las que deberás escoger entre un conjunto de tres números, una vez hayas seleccionado tu número este se comparará con la carta de tu " + maquina + ". El número mayor ganará");

// función para crear cartas jugador

