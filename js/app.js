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


/************************Funciones************************/

crearCartas();
// eliminarExcedenteCartas(manoJugador, manoRival);

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
        manoJugador.splice(0, 1);
    } else if (cartaElegidaJ == manoJugador[1]) {
        carta1.remove();
        manoJugador.splice(1, 1);
    } else {
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
        manoRival.splice(0, 1);
    } else if (cartaElegidaR == manoRival[1]) {
        cartaR1.remove()
        manoRival.splice(1, 1);
    } else {
        cartaR2.remove()
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
    if (cartaJC.numero > cartaRC.numero){
        ganador.innerText = localStorage.getItem('nombre');
    } else if (cartaJC.numero < cartaRC.numero) {
        ganador.innerText = "Tu rival"
    } else {
        document.querySelector(".camparacion_titulo").innerHTML = `Esta Ronda es un empate <span id="ganador"></span>`;
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
    ocultarSeccion(document.querySelector("#comparacion"), "comparacion");
    // crearCartas()
    eliminarExcedenteCartas(manoJugador, manoRival)
};
function sumarVictoria() {
    let puntoJ = document.querySelector(`#winsJ${rondas}`);
    let puntoR = document.querySelector(`#winsR${rondas}`);
    if (ganador.innerText == localStorage.getItem("nombre")) {
        puntoJ.classList.remove("wins");
        return puntoJ.classList.add("winsOk");
    } else if (ganador.innerText == "Tu rival") {
        puntoR.classList.remove("wins");
        return puntoR.classList.add("winsOk")
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
    crearCartas();
}