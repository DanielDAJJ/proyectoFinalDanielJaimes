// ************************************** variables

const jugador = prompt("Ingresa el nombre del jugador");
let cartaSeleccionadaJugador;

const maquina = "Rival";
let cartaSeleccionadaRival

let victoriasJugador = 0;
let victoriasMaquina = 0;

let rondas = 1;
//************************************* Funciones

alert("Hola " + jugador + " a continuación te enfrentarás en un juego de cartas contra tu " + maquina + ". El objetivo es ganar 3 de 5 rondas en las que deberás escoger entre un conjunto de tres números, una vez hayas seleccionado tu número este se comparará con la carta de tu " + maquina + ". El número mayor ganará");

cartasParaJugador();
cartasMaquina();
puntaje();
sumarRondas();
victoria();

function generarCartas(min, max) {
    return Math.floor(Math.random()*(max - min + 1) +min);
}//se utilizara para  generar las cartas de los jugadores

function cartasParaJugador() {
    let carta1 = generarCartas(1, 13);
    let carta2 = generarCartas(1, 13);
    let carta3 = generarCartas(1, 13);
    let cartaJugador = Number(prompt("Elige una carta: " + carta1 + ", " + carta2 + " o " + carta3));
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
    }; // función que valida la elección del usuario y asigna a la variable global cartaSeleccionadaJugador la carta elegida por el jugador

function cartasMaquina() {
    cartaSeleccionadaRival = generarCartas(1, 13);
    return alert("Tu " + maquina + " ha seleccionado " + cartaSeleccionadaRival)
}// función para generar la carta de la máquina y asignarla a la variable global cartaSeleccionadaRival

function puntaje() {
    if (cartaSeleccionadaJugador < cartaSeleccionadaRival) {
        victoriasMaquina +=1;
        console.log("tu " + maquina  + " tiene el puntaje más alto. Haz perdido esta ronda");
        alert("Ronda " + rondas + " gana tu " + maquina);
    } else if (cartaSeleccionadaJugador > cartaSeleccionadaRival) {
        victoriasJugador +=1;
        console.log(jugador + " tiene el puntaje más alto. Has ganado esta ronda!");
        alert("Ronda " + rondas + " " + jugador + " ha ganado");
    } else{
        console.log("Ambos jugadores tienen el mismo puntaje. Es un empate");
        alert("Ronda " + rondas + " ha sido un empate");
    }
    console.log("puntaje jugador " + victoriasJugador + " puntaje rival " + victoriasMaquina);
    }// función para para comparar la puntuación de los usuarios

function sumarRondas() {
    while (rondas < 5 && victoriasJugador < 3 && victoriasMaquina < 3) {
        rondas +=1;
        cartasParaJugador();
        cartasMaquina();
        puntaje();
    }
    /* rondas += 1; 
    for (rondas; rondas < 5; rondas ++) {
        cartasParaJugador();
        cartasMaquina();
        puntaje();        
    } este bucle funciona pero no evalua las victorias de los jugadores*/
}//función para sumar las rondas y reiniciar el juego

function victoria() {
    if (victoriasJugador === 3) {
        console.log("Has ganado!");
        alert("¡Felicidades! Has ganado el juego.");
    } else if (victoriasMaquina === 3) {
        console.log("tu " + maquina + " te ha superado.");
        alert("Lo lamento, has perdido el juego.");
    }else {
        sumarRondas();
    }
}