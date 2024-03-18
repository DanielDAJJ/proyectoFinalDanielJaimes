// ************************************** variables

const jugador = prompt("Ingresa el nombre del jugador");
const cartasJugador = [];

const maquina = "Rival";
const cartasRival = [];

let seleccionJugador;
let seleccionRival;

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
escogerCartaJugador();
escogerCartaRival();
puntaje();
sumarRondas();

//-------- función para crear cartas del jugador y el rival

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
        for (let i = 0; i <= 3; i+=1) {
            const cartaJugador = new cartas (generarNumero(1,13), generarPalo());
            const cartaRival = new cartas (generarNumero(1,13), generarPalo());
            cartasJugador.push(cartaJugador);
            cartasRival.push(cartaRival);
        }
    }
}//Función para crear nuevas cartas en la mano de los jugadores

//-------- función para seleccionar cartas del jugador

function escogerCartaJugador() {
    if (cartasJugador.length == 3) {
        console.log("Tus cartas son: ");
        cartasJugador.forEach(cartas => {
            console.log(cartas)
        });
    }
    let seleccion = Number(prompt("Elige tu carta: " + cartasJugador[0].numero + cartasJugador[0].palo + ", " + cartasJugador[1].numero + cartasJugador[1].palo + ", " + cartasJugador[2].numero + cartasJugador[2].palo));
    if (seleccion == cartasJugador[0].numero){
        seleccionJugador = cartasJugador[0];
        cartasJugador.splice(0,1);
    } else if (seleccion == cartasJugador[1].numero){
        seleccionJugador = cartasJugador[1];
        cartasJugador.splice(1,1);
    } else if (seleccion == cartasJugador[2].numero){
        seleccionJugador = cartasJugador[2];
        cartasJugador.splice(2,1);
    } else {
        alert ("debes seleccionar una opción de carta valida")
        escogerCartaJugador();
    }
    return alert ("Escogiste la carta: " + seleccionJugador.numero + seleccionJugador.palo);
}//Función que permite al jugador escoger una carta
function escogerCartaRival() {
    let seleccionR = generarNumero(1,3);
    switch (seleccionR) {
        case 1:
            if (seleccionR == 1) {
                seleccionRival = cartasRival[0];
                cartasRival.splice(0, 1);  
            };
            break;
        case 2:
            if (seleccionR == 2) {
                seleccionRival = cartasRival[0];
                cartasRival.splice(1, 1);  
            };
            break;
        default:
            seleccionRival = cartasRival[2];
            cartasRival.splice(2, 1);
    }
    return alert ("Tu " + maquina + " ha sacado " + seleccionRival.numero + seleccionRival.palo);
}//Función para escoger la carta del rival

//-------- Función para sumar victorias y cambiar de ronda

function puntaje() {
    if (seleccionJugador.numero < seleccionRival.numero) {
        victoriasMaquina +=1;
        console.log("tu " + maquina  + " tiene ha escogido una carta más alta. Haz perdido esta ronda");
        alert("Ronda " + rondas + " gana tu " + maquina);
    } else if (seleccionJugador.numero > seleccionRival.numero) {
        victoriasJugador +=1;
        console.log(jugador + " tiene el puntaje más alto. Has ganado esta ronda!");
        alert("Ronda " + rondas + " " + jugador + " ha ganado");
    } else{
        console.log("Ambos jugadores tienen el mismo puntaje. Es un empate");
        alert("Ronda " + rondas + " ha sido un empate");
    }
    console.log("puntaje jugador " + victoriasJugador + " puntaje rival " + victoriasMaquina);
};// Función para sumar puntaje
function sumarRondas() {
        while (rondas < 5 && victoriasJugador < 3 && victoriasMaquina < 3) {
            rondas +=1;
            manoJugador();
            escogerCartaJugador();
            escogerCartaRival();
            puntaje();
        }
}//Función para reiniciar las rondas