/************************Variables************************/
let pantallaInicio =  document.querySelector("#pantallaInicio")
let btnNuevaPartida = document.querySelector("#BtnNuevaPartida")
let nombre = document.querySelector("#POPNombre")
let nombreForm = document.querySelector("#nombreForm")
let inputNombre = document.querySelector("#POPNick")
let btnNombre = document.querySelector("#btnNombre")
let instrucciones = document.querySelector("#instruccion")
let nombreJugador = document.querySelector("#NombreJ")
let btnInstrucciones = document.querySelector("#instruccionBTN");
let tablero = document.querySelector("#tablero")
let cartasJugador = document.querySelector("#cartasJugador")
let cartasRival = document.querySelector("#cartasRival")
let nombreJugadorTablero = document.querySelector("#nombreJTablero")
let pasarTurno = document.querySelector("#pasarTurno")
let siguienteRondaBTN = document.querySelector("#siguienteRondaBTN")
let temporizador = document.querySelector("#temporizador")
let ganador = document.querySelector("#ganador")
let pantallaVictoria = document.querySelector("#victoria");
let reiniciar = document.querySelector("#BTNReiniciarJuego")

const manoJugador = [];
const manoRival = [];
class cartas {
    constructor(palo, numero){
        this.palo = palo,
        this.numero = numero
    }
};
let cartaElegidaJ;
let cartaElegidaR;
let rondas = 0;
let victoraJugador = 0;
let victoriaRival = 0;

/*************************Eventos*************************/
btnNuevaPartida.addEventListener("click", mostrarPopNombre =() => {
    ocultarSeccion(pantallaInicio, "inicio");
    return mostrarSeccion(nombre, "POP")
})
nombreForm.addEventListener("submit", validarNombre)
btnInstrucciones.addEventListener("click", empezarjuego = () => {
    ocultarSeccion(instrucciones, "instrucciones");
    nombreJugadorTablero.innerText = localStorage.nombre;
    return mostrarSeccion(tablero, "tablero")
})
pasarTurno.addEventListener("click", compararCartas)
siguienteRondaBTN.addEventListener("click", siguienteRonda)
reiniciar.addEventListener("click", reiniciarJuego = () => {
    rondas = 0;
    victoraJugador = 0;
    victoriaRival = 0;
    reiniciarRondasGanadas();
    ocultarSeccion(pantallaVictoria, "victoria");
    mostrarSeccion(tablero, "tablero");
    
})
/************************Funciones************************/

crearCartas();


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
}
function ocultarSeccion(seccion, estilo) {
    seccion.classList.remove(estilo);
    return seccion.classList.add("nulos")
}
function mostrarSeccion(seccion, estilo) {
    seccion.classList.remove("nulos");
    return seccion.classList.add(estilo);
}
function mostrarNombreJugador() {
    nombreJugador.innerText = localStorage.nombre
}
function aleatoriedad(min, max) {
    return Math.floor(Math.random()*(max - min + 1) +min);    
}
function crearCartas() {
    fetch('/data/baraja.json')
    .then((Response) =>{
        return Response.json();
    })
    .then((baraja) => {
        do {
            const cartaJ = new cartas(baraja.palo[aleatoriedad(0, 3)], baraja.valor[aleatoriedad(0, 12)]);
            const cartaR = new cartas(baraja.palo[aleatoriedad(0, 3)], baraja.valor[aleatoriedad(0, 12)]);
            manoJugador.push(cartaJ);
            manoRival.push(cartaR);
        } while (manoJugador.length < 3 && manoRival.length < 3);
        renderizarCartasJ();
        renderizarCartasR();
        seleccionarCartaJugador();
        seleccionarCartaRival();

    })
    .catch((error) =>{
        let MSError = document.createElement("div")
        document.body.appendChild(MSError);
        MSError.innerText = "Error al cargar las cartas";
        MSError.classList.add("error")        
    });    
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
        mano.setAttribute("id", "cartaR" + manoRival.indexOf(carta))
        mano.innerHTML = `<div class="card_RivalBorder">
        </div>`;
        cartasRival.appendChild(mano);
    }
}
function seleccionarCartaJugador() {
    let carta1 = document.querySelector("#carta0");
    let carta2 = document.querySelector("#carta1");
    let carta3 = document.querySelector("#carta2");
    carta1.addEventListener("click", () => {
        localStorage.setItem("cartaJ", JSON.stringify(manoJugador[0]));
        cartaElegidaJ = manoJugador[0];
    });
    carta2.addEventListener("click", () => {
        localStorage.setItem("cartaJ", JSON.stringify(manoJugador[1]));
        cartaElegidaJ = manoJugador[1];
    });
    carta3.addEventListener("click", () => {
        localStorage.setItem("cartaJ", JSON.stringify(manoJugador[2]));
        cartaElegidaJ = manoJugador[2];
    });

} 

function seleccionarCartaRival() {
    let cartaR = aleatoriedad(1,3);
    switch (cartaR) {
        case 1:
            if (cartaR == 1) {
                localStorage.setItem('cartaR', JSON.stringify(manoRival[0]));
                cartaElegidaR = manoRival[0];
            }
            break;
        case 2:
            if (cartaR == 2) {
                localStorage.setItem('cartaR', JSON.stringify(manoRival[1]));
                cartaElegidaR = manoRival[1];
            }
            break;
        default:
            if (cartaR == 3) {
                localStorage.setItem('cartaR', JSON.stringify(manoRival[2]));
                cartaElegidaR = manoRival[2];
            }
            break;
    }
    return cartaElegidaR;
}

function compararCartas() {
    let comparar = document.querySelector("#comparacion");
    mostrarSeccion(comparar, "comparacion");
    eliminarCartaJ();
    eliminarCartaR();
    generarCartasComparar();
    compararValores();
}
function eliminarCartaJ() {
    let carta0 = document.querySelector('#carta0');
    let carta1 = document.querySelector('#carta1');
    let carta2 = document.querySelector('#carta2');
    if (cartaElegidaJ == manoJugador[0]) {
        carta0.remove();
        carta1.remove();
        carta2.remove();
        manoJugador.splice(0, 1);
    } else if (cartaElegidaJ == manoJugador[1]) {
        carta0.remove();
        carta1.remove();
        carta2.remove();
        manoJugador.splice(1, 1);
    } else {
        carta0.remove();
        carta1.remove();
        carta2.remove();
        manoJugador.splice(2, 1);
    };
}
function eliminarCartaR() {
    let cartaR0 = document.querySelector('#cartaR0') 
    let cartaR1 = document.querySelector('#cartaR1')
    let cartaR2 = document.querySelector('#cartaR2')
    if (cartaElegidaR == manoRival[0]) {
        cartaR0.remove();
        cartaR1.remove();
        cartaR2.remove();
        manoRival.splice(0, 1);
    } else if (cartaElegidaR == manoRival[1]) {
        cartaR0.remove();
        cartaR1.remove();
        cartaR2.remove();
        manoRival.splice(1, 1);
    } else {
        cartaR0.remove();
        cartaR1.remove();
        cartaR2.remove();
        manoRival.splice(2, 1);
    };
}
function generarCartasComparar() {
    let cartaRC =  JSON.parse(localStorage.getItem("cartaR"));
    let cartaJC = JSON.parse(localStorage.getItem("cartaJ"));
    let comparacion = document.querySelector(".comparacion_cartas");
    compararPalos(cartaJC, cartaRC);
    let crearCartaRC = document.createElement("div");
    let crearCartaJC = document.createElement("div");
    crearCartasDOMComparación(crearCartaJC, crearCartaRC, cartaJC, cartaRC);
    comparacion.appendChild(crearCartaJC);
    comparacion.appendChild(crearCartaRC);
};
function crearCartasDOMComparación(a, b, c, d) {
    a.setAttribute("class", "card_comparacion");
    a.setAttribute("id", "cartaJComprar");
    a.innerHTML = `<p class="cardSim">${c.palo}</p>
    <p class="cardTXT">${c.numero}</p>
    <p class="cardSim">${c.palo}</p>`;
    b.setAttribute("class", "card_comparacion");
    b.setAttribute("id", "cartaRComprar");
    b.innerHTML = `<p class="cardSim">${d.palo}</p>
    <p class="cardTXT">${d.numero}</p>
    <p class="cardSim">${d.palo}</p>`;
};
function compararValores() {
    let cartaRC =  JSON.parse(localStorage.getItem("cartaR"));
    let cartaJC = JSON.parse(localStorage.getItem("cartaJ"));
    compararPalos(cartaJC, cartaRC);
    if (cartaJC.numero > cartaRC.numero){
        ganador.innerText = localStorage.getItem('nombre');
    } else if (cartaJC.numero < cartaRC.numero) {
        ganador.innerText = "Tu rival"
    } else {
        ganador.innerText = "Empate"
    };
};
function compararPalos(a, b) {
    if ((a.palo == "♥" && b.palo == "♣") || (a.palo == "♣" && b.palo == "♦") || (a.palo == "♦" && b.palo == "♠") || (a.palo == "♠" && b.palo == "♥")){
        b.numero -=1;
    }else if ((a.palo == "♥" && b.palo == "♦") || (a.palo == "♣" && b.palo == "♠")) {
        a.numero +=2;
    } else if ((a.palo == "♦" && b.palo == "♥") || (a.palo == "♠" && b.palo == "♣")) {
        b.numero +=2;
    } else if ((a.palo == "♥" && b.palo == "♥") || (a.palo == "♣" && b.palo == "♣") || (a.palo == "♦" && b.palo == "♦") || (a.palo == "♠" && b.palo == "♠")) {
        b.numero;
        a.numero;
    } 
    else {
        a.numero -=1;
    };
};

function siguienteRonda() {
    rondas += 1;
    sumarVictoria();
    finalPartida(victoraJugador, victoriaRival);
    document.querySelector("#cartaJComprar").remove()
    document.querySelector("#cartaRComprar").remove()
    ocultarSeccion(document.querySelector("#comparacion"), "comparacion");
    eliminarExcedenteCartas(manoJugador, manoRival);
    crearCartas();
};
function sumarVictoria() {
    let puntoJ = document.querySelector(".wins");
    let puntoR = document.querySelector(".winsR"); 
    if (ganador.innerText == localStorage.getItem("nombre")) {
        victoraJugador += 1;
        puntoJ.classList.add("winsOk");
        return puntoJ.classList.remove("wins");
    } else if (ganador.innerText == "Tu rival") {
        victoriaRival += 1;
        puntoR.classList.add("winsOk");
        return puntoR.classList.remove("winsR");
    } else {
        puntoJ;
        puntoR;
    }
};
function eliminarExcedenteCartas(a, b) {
    do {
        a.splice(4, a.indexOf(a))
        b.splice(4, b.indexOf(b))
    } while (a.length > 3 && b.length > 3);
};
function finalPartida(a, b) {
    if (a == 3 || b == 3) {
        ocultarSeccion(tablero, "tablero")
        mostrarSeccion(pantallaVictoria, "victoria")
        a == 3 ? document.querySelector("#ganadorF").innerText = localStorage.getItem("nombre") : document.querySelector("#ganadorF").innerText = "Tu rival";
    } else if (rondas == 5) {
        ocultarSeccion(tablero, "tablero")
        mostrarSeccion(pantallaVictoria, "victoria")
        a > b ? document.querySelector("#ganadorF").innerText = localStorage.getItem("nombre") : document.querySelector("#ganadorF").innerText = "Tu rival";
    }
}
function reiniciarRondasGanadas() {
    let puntoJ1 = document.querySelector("#winsJ1");
    let puntoJ2 = document.querySelector("#winsJ2");
    let puntoJ3 = document.querySelector("#winsJ3");
    let puntoR1 = document.querySelector("#winsR1");
    let puntoR2 = document.querySelector("#winsR2");
    let puntoR3 = document.querySelector("#winsR3");

    puntoJ1.classList.remove("winsOk");
    puntoJ2.classList.remove("winsOk");
    puntoJ3.classList.remove("winsOk");
    puntoR1.classList.remove("winsOk");
    puntoR2.classList.remove("winsOk");
    puntoR3.classList.remove("winsOk");
    puntoJ1.classList.add("wins");
    puntoJ2.classList.add("wins");
    puntoJ3.classList.add("wins");
    puntoR1.classList.add("winsR");
    puntoR2.classList.add("winsR");
    puntoR3.classList.add("winsR");
}