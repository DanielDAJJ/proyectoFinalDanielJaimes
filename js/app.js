// ************************************** variables

const jugador = prompt("Ingresa el nombre del jugador");
const cartasJugador = [];

const maquina = "Rival";
const cartasRival = [];

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

manoJugador();

// función para crear cartas jugador

function generarNumero(min, max) {
    return Math.floor(Math.random()*(max - min + 1) +min);
}// función para generar los números de las cartas
function generarPalo() {
    let palo = generarNumero(1,4);
    switch (palo){
        case 1:
            return "♥";
        break;
        case 2:
            return "♦";
        break;
        case 3:
            return "♣";
        break;
        default:
            return "♠"
    }
}// función para devolver el palo de la carta
function manoJugador() {
    if (cartasJugador.length <= 3 && cartasRival.length <= 3) {
        for (let i = 0; i < 3; i+=1) {
            const carta = new cartas (generarNumero(1,13), generarPalo());
            cartasJugador.push(carta);
            cartasRival.push(carta);
        }
    }
}//Función para crear nuevas cartas en la mano de los jugadores
