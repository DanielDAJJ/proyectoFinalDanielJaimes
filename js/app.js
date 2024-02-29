// ************************************** variables

const jugador = prompt("Ingresa el nombre del jugador");
let cartaSeleccionadaJugador;

const maquina = "Rival";
let cartasSeleccionadaRival

let victoriasJugador = 0;
let victoriasMaquina = 0;

//************************************* Funciones

alert("hola " + jugador + " a continuación te enfrentaras en un juego de cartas contra tu " + maquina + " el objetivo es ganar 3 de 5 rondas en las que deberas escoger entre un conjunto de tres numeros, una vez hayas seleccionado tu número se compara el resultado con el de la máquina, el número mayor ganará");

cartasParaJugador();
cartasMaquina();

function generarCartas(min, max) {
    return Math.floor(Math.random()*(max - min + 1) +min);
}//se utilizara para  generar las cartas de los jugadores

function cartasParaJugador() {
    let carta1 = generarCartas(1, 13);
    let carta2 = generarCartas(1, 13);
    let carta3 = generarCartas(1, 13);
    let cartaJugador = Number(prompt("Elige una carta: " + carta1 + " " + carta2 + " " + carta3));
    if (cartaJugador == carta1) {
        cartaSeleccionadaJugador = carta1;
    }else if (cartaJugador == carta2) {
        cartaSeleccionadaJugador = carta2;
    }else if (cartaJugador == carta3){
        cartaSeleccionadaJugador = carta3;
    }else { 
        while(cartaJugador !== carta1 || cartaJugador !== carta2 || cartaJugador !== carta3){
            cartaSeleccionadaJugador = cartaJugador = Number(prompt("Debes elegir una de estas cartas: " + carta1 + " " + carta2 + " " + carta3));
            return cartaJugador
        }}
    };

function cartasMaquina() {
    cartasSeleccionadaRival = generarCartas(1, 13);
    return alert("Tu " + maquina + " ha seleccionado " + cartasSeleccionadaRival)
}

