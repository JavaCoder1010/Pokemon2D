const spanelegirpokemonenemigo = document.getElementById("elegirPokemonEnemigo")
const botonElegirPrimerPokemon = document.getElementById("boton-elegirprimerpokemon")
const botonReiniciar = document.getElementById("reiniciar")
const seccionElegir = document.getElementById("Elegir-Pokemon")
const seccionAtaques = document.getElementById("Selecciona-tu-ataque")
const spanelegirpokemon = document.getElementById("elegirpokemon")
const spancontador = document.getElementById("contadorVidas")
const spancontadorEnemigo = document.getElementById ("contadorVidasEnemigo")
const seccionMensajes = document.getElementById("Alertas")
const contenedorTarjetas = document.getElementById("contenedorTarjetas")
const contenedorAtaques = document.getElementById("contenedorAtaques")
const sectionvermapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")
const anchoMapaMax = 350

let ataqueEnemigo = []
let ataqueAliado = []
let pokemonEnemigo
let pokemones = []
let pokemonesEnemigos = []
let opcionPokemon
let inputSquirtle
let inputBulbasaur
let inputCharmander
let pokemonAliado 
let ataquePokemon
let ataquesElementales = []
let botonFuego 
let botonAgua 
let botonTierra 
let botonViento
let botones = []
let indexJugador
let indexEnemigo
let contador = 0
let contadorEnemigo = 0
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = "./assets/mokemap.png"
let altoDelMapa
let anchoDelMapa = window.innerWidth - 500
altoDelMapa = anchoDelMapa * 600 / 800
let jugadorId = null
    
mapa.width = anchoDelMapa
mapa.height = altoDelMapa

if(anchoDelMapa > anchoMapaMax){
    anchoDelMapa = anchoMapaMax - 20
}




class Pokemon{
    constructor(nombre, foto, hp, x, y) {
        this.nombre = nombre
        this.foto = foto
        this.hp = hp
        this.ataques = []
        this.x = x
        this.y = y
        this.ancho = 40
        this.alto = 50
        this.mapaFoto = new Image()
        this.mapaFoto.src = foto
        this.velocidadX = 0
        this.velocidadY= 0
    }
    pintarPokemon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,    
            this.ancho,
            this.alto
        )
    }
}
class PokemonEnemigo{
    constructor(nombre, foto, hp) {
        this.nombre = nombre
        this.foto = foto
        this.hp = hp
        this.ataques = []
        this.ancho = 40
        this.alto = 50
        this.x = Aleatorio(0, mapa.width - this.ancho)
        this.y = Aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = foto
        this.velocidadX = 0
        this.velocidadY= 0
    }
    pintarPokemon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,    
            this.ancho,
            this.alto
        )
    }
}

let squirtle = new Pokemon("Squirtle", "./Assets/Squirtle.png", 5, 10, 10)
let charmander = new Pokemon("Charmander", "./Assets/Charmander.png", 5, 10, 10)
let bulbasaur = new Pokemon ("Bulbasaur", "./Assets/Bulbasaur.png", 5, 10, 10)

let squirtleEnemigo = new PokemonEnemigo("Squirtle", "./Assets/Squirtle.png", 5)
let charmanderEnemigo = new PokemonEnemigo("Charmander", "./Assets/Charmander.png", 5)
let bulbasaurEnemigo = new PokemonEnemigo ("Bulbasaur", "./Assets/Bulbasaur.png", 5)

pokemones.push(squirtle, bulbasaur, charmander)
pokemonesEnemigos.push(squirtleEnemigo, charmanderEnemigo, bulbasaurEnemigo)

squirtle.ataques.push(
    {nombre: "Salpicadura" , id: "boton-agua"},
    {nombre: "Lanzamiento de arena", id: "boton-tierra"},
    {nombre: "Ascuas", id: "boton-fuego"},
    {nombre: "Brisa", id: "boton-viento"},
    {nombre: "Chorro de agua", id: "boton-agua"},
)
squirtleEnemigo.ataques.push(
    {nombre: "Salpicadura" , id: "boton-agua"},
    {nombre: "Lanzamiento de arena", id: "boton-tierra"},
    {nombre: "Ascuas", id: "boton-fuego"},
    {nombre: "Brisa", id: "boton-viento"},
    {nombre: "Chorro de agua", id: "boton-agua"},
)
charmander.ataques.push(
    {nombre: "Salpicadura", id: "boton-agua"},
    {nombre: "Lanzamiento de arena", id: "boton-tierra"},
    {nombre: "Ascuas", id: "boton-fuego"},
    {nombre: "Brisa", id: "boton-viento"},
    {nombre: "Llama bebé", id: "boton-fuego"},
)
charmanderEnemigo.ataques.push(
    {nombre: "Salpicadura", id: "boton-agua"},
    {nombre: "Lanzamiento de arena", id: "boton-tierra"},
    {nombre: "Ascuas", id: "boton-fuego"},
    {nombre: "Brisa", id: "boton-viento"},
    {nombre: "Llama bebé", id: "boton-fuego"},
)
bulbasaur.ataques.push(
    {nombre: "Salpicadura", id: "boton-agua"},
    {nombre: "Lanzamiento de arena", id: "boton-tierra"},
    {nombre: "Ascuas", id: "boton-fuego"},
    {nombre: "Brisa", id: "boton-viento"},
    {nombre: "Pedrada", id: "boton-tierra"},
)
bulbasaurEnemigo.ataques.push(
    {nombre: "Salpicadura", id: "boton-agua"},
    {nombre: "Lanzamiento de arena", id: "boton-tierra"},
    {nombre: "Ascuas", id: "boton-fuego"},
    {nombre: "Brisa", id: "boton-viento"},
    {nombre: "Pedrada", id: "boton-tierra"},
)

function Aleatorio(min, max){
    return Math.floor(Math.random()*(max-min+1)+1)
}

function iniciarJuego() { 

    seccionAtaques.style.display = "none"
    sectionvermapa.style.display = "none"
    botonReiniciar.style.display = "none"
    pokemones.forEach((pokemones) =>{
        opcionPokemon = `
        <input type="radio" name="elegirpokemon" id=${pokemones.nombre}>
                <label class= "tarjetaPokemon" for=${pokemones.nombre}>
                    <p>${pokemones.nombre}</p>
                    <img src=${pokemones.foto} alt=${pokemones.nombre}>
                </label>
                `   
    contenedorTarjetas.innerHTML += opcionPokemon

        inputSquirtle = document.getElementById("Squirtle")
        inputBulbasaur = document.getElementById("Bulbasaur")
        inputCharmander = document.getElementById("Charmander")
    })
 
    botonElegirPrimerPokemon.addEventListener("click", seleccionarPrimerPokemon)
    botonReiniciar.addEventListener("click", reiniciar)

    joingame()
}

function seleccionarPrimerPokemon() { 
    seccionElegir.style.display = "none"
    seccionAtaques.style.display = "none"
    sectionvermapa.style.display = "flex"

    if(inputSquirtle.checked) {
        spanelegirpokemon.innerHTML = inputSquirtle.id
        pokemonAliado = squirtle
    }
    else if(inputBulbasaur.checked)  {
        spanelegirpokemon.innerHTML = inputBulbasaur.id
        pokemonAliado = bulbasaur
    }
    else if (inputCharmander.checked)  {
        spanelegirpokemon.innerHTML = inputCharmander.id
        pokemonAliado = charmander
    }
    else {
        alert("Por favor selecciona un Pokemon")
        location.reload()
    }
    
    
    pokemonBackEnd(pokemonAliado)
    extraerAtaques(pokemonAliado)
    seleccionarPokemonEnemigo()
}

function seleccionarPokemonEnemigo() {
    let pokemonaleatorio = Aleatorio(1, pokemonesEnemigos.length) -1 
    pokemonEnemigo = pokemonesEnemigos[pokemonaleatorio]
    spanelegirpokemonenemigo.innerHTML = pokemonEnemigo.nombre
    IniciarMapa()
}

function moverPokemonDerecha(){
    pokemonAliado.velocidadX = 5
}
function moverPokemonIzquierda(){
    pokemonAliado.velocidadX = -5
}
function moverPokemonArriba(){
    pokemonAliado.velocidadY = -5
}
function moverPokemonAbajo(){
    pokemonAliado.velocidadY = 5
}

function IniciarMapa(){

    fotoPokemon()
    intervalo = setInterval(fotoPokemon, 50)
    
    window.addEventListener("keydown", tecla)
    window.addEventListener("keyup" , detenermovimiento)
    
    function tecla(event){
        switch (event.key) {
            case "ArrowUp":
                moverPokemonArriba()
                break;
            case "ArrowLeft":
                moverPokemonIzquierda()
                break;  
            case "ArrowRight":
                moverPokemonDerecha()
                break;
            case "ArrowDown":
                moverPokemonAbajo()
                break;    
            case "w":
                moverPokemonArriba()
                break;
            case "a":
                moverPokemonIzquierda()
                break;  
            case "d":
                moverPokemonDerecha()
                break;
            case "s":
                moverPokemonAbajo()
                break;      
            default:
                break;
        }
    }
}

function fotoPokemon(){
    pokemonAliado.x = pokemonAliado.x + pokemonAliado.velocidadX
    pokemonAliado.y = pokemonAliado.y + pokemonAliado.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    pokemonAliado.pintarPokemon()

    enviarPosicion(pokemonAliado.x, pokemonAliado.y)

    pokemonEnemigo.pintarPokemon()
    if(pokemonAliado.velocidadX !==0 || pokemonAliado.velocidadY !==0){
        detectarChoque(pokemonEnemigo)
    }
}

function detenermovimiento(){
    pokemonAliado.velocidadX = 0
    pokemonAliado.velocidadY = 0
}

function extraerAtaques(pokemonAliado){
    ataques = pokemonAliado.ataques
    ataquesElementales
    for (let i = 0; i < pokemones.length; i++) {
        if(pokemonAliado === pokemones[i].nombre){
            ataques = pokemones[i].ataques
        }
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque) =>{
        ataquePokemon = `
        <button id=${ataque.id} class="botonElemental">${ataque.nombre}</button>
        `
    contenedorAtaques.innerHTML += ataquePokemon

        botonFuego = document.getElementById("boton-fuego") 
        botonAgua = document.getElementById("boton-agua")
        botonTierra = document.getElementById("boton-tierra")
        botonViento = document.getElementById("boton-viento")
        botones = document.querySelectorAll(".botonElemental")
    })
    secuenciaAtaques()
}

function secuenciaAtaques(){
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) => {
            if (e.target.textContent === "Salpicadura") {
                ataqueAliado.push("Agua")
                boton.style.background = "#112f58"
                boton.disabled = true
            }
            else if (e.target.textContent === "Ascuas") {
                ataqueAliado.push("Fuego")
                boton.style.background = "#112f58"
                boton.disabled = true
            }
            else if (e.target.textContent === "Brisa") {
                ataqueAliado.push("Viento")
                boton.style.background = "#112f58"
                boton.disabled = true
            }
            else if (e.target.textContent === "Lanzamiento de arena") {
                ataqueAliado.push("Tierra")
                boton.style.background = "#112f58"
                boton.disabled = true
            }
            else if (e.target.textContent === "Llama bebé") {
                ataqueAliado.push("Fuego")
                boton.style.background = "#112f58"
                boton.disabled = true
            }
            else if (e.target.textContent === "Chorro de agua") {
                ataqueAliado.push("Agua")
                boton.style.background = "#112f58"
                boton.disabled = true
            }
            else if (e.target.textContent === "Pedrada") {
                ataqueAliado.push("Tierra")
                boton.style.background = "#112f58"
                boton.disabled = true
            }
            seleccionarAtaqueEnemigo()
        })
    })
}

function seleccionarAtaqueEnemigo(){
    let ataquealeatorio = Aleatorio(1, botones.length) -1
    
    if (ataquealeatorio == 0) {
        ataqueEnemigo.push("Fuego")
    }
    else if (ataquealeatorio == 1){
        ataqueEnemigo.push("Agua")
    }
    else if (ataquealeatorio == 2){
        ataqueEnemigo.push("Tierra")
    }
    else if (ataquealeatorio == 3){
        ataqueEnemigo.push("Viento")
    }
    else if (ataquealeatorio == 4 && pokemonEnemigo.nombre == "Bulbasaur"){
        ataqueEnemigo.push("Tierra")
    }
    else if (ataquealeatorio == 4 && pokemonEnemigo.nombre == "Squirtle"){
        ataqueEnemigo.push("Agua")
    }
    else if (ataquealeatorio == 4 && pokemonEnemigo.nombre == "Charmander"){
        ataqueEnemigo.push("Fuego")
    }
    
    inicializador()
}

function inicializador() {
    if(ataqueAliado.length === 5 && ataqueEnemigo.length === 5){
        combate()
    }
}

function combate() {

    for (let index = 0; index < ataqueAliado.length; index++) {
        if(ataqueAliado[index] === ataqueEnemigo[index]){
            indexAtaques(index, index)
            crearMensaje("Empataste")     
        }
        if(ataqueAliado[index] == "Agua" && ataqueEnemigo[index] == "Fuego") {
            indexAtaques(index, index)
            crearMensaje("Ganaste") 
            contador++
            spancontador.innerHTML = contador
        }
        else if(ataqueAliado[index] == "Agua" && ataqueEnemigo[index] == "Tierra"){
            indexAtaques(index, index)
            crearMensaje("Perdiste") 
            contadorEnemigo++
            spancontadorEnemigo.innerHTML = contadorEnemigo
        }
        else if(ataqueAliado[index] == "Agua" && ataqueEnemigo[index] == "Viento") {
            indexAtaques(index, index)
            crearMensaje("Empataste")
        }
        else if(ataqueAliado[index] == "Fuego" && ataqueEnemigo[index] == "Viento") {
            indexAtaques(index, index)
            crearMensaje("Ganaste")
            contador++
            spancontador.innerHTML = contador
        }
        else if(ataqueAliado[index] == "Fuego" && ataqueEnemigo[index] == "Agua"){
            indexAtaques(index, index)
            crearMensaje("Perdiste") 
            contadorEnemigo++
            spancontadorEnemigo.innerHTML = contadorEnemigo
        }
        else if(ataqueAliado[index] == "Fuego" && ataqueEnemigo[index] == "Tierra") {
            indexAtaques(index, index)
            crearMensaje("Empataste")
        }
        else if(ataqueAliado[index] == "Brisa" && ataqueEnemigo[index] == "Tierra") {
            indexAtaques(index, index)
            crearMensaje("Ganaste") 
            contador++
            spancontador.innerHTML = contador
        }
        else if(ataqueAliado[index] == "Viento" && ataqueEnemigo[index] == "Fuego"){
            indexAtaques(index, index)
            crearMensaje("Perdiste") 
            contadorEnemigo++
            spancontadorEnemigo.innerHTML = contadorEnemigo
        }
        else if(ataqueAliado[index] == "Viento" && ataqueEnemigo[index] == "Agua") {
            indexAtaques(index, index)
            crearMensaje("Empataste")
        }
        else if(ataqueAliado[index] == "Tierra" && ataqueEnemigo[index] == "Agua") {
            indexAtaques(index, index)
            crearMensaje("Ganaste")
            contador++
            spancontador.innerHTML = contador
        }
        else if(ataqueAliado[index] == "Tierra" && ataqueEnemigo[index] == "Viento"){
            indexAtaques(index, index)
            crearMensaje("Perdiste") 
            contadorEnemigo++
            spancontadorEnemigo.innerHTML = contadorEnemigo
        }
        else if(ataqueAliado[index] == "Tierra" && ataqueEnemigo[index] == "Fuego") {
            indexAtaques(index, index)
            crearMensaje("Empataste")
        }
    }
    
    Vidas()
}   

    

function indexAtaques(jugador, enemigo){
    indexJugador = ataqueAliado[jugador]
    indexEnemigo = ataqueEnemigo[enemigo]
}

function Vidas(){
    if(contadorEnemigo > contador) {
        crearMensajeFinal("PERDISTE!!")
    }
    else if(contador > contadorEnemigo){
        crearMensajeFinal("GANASTE!")
    }
    else if(contador === contadorEnemigo){
        crearMensajeFinal("EMPATASTE!")
    }
}

function crearMensaje(resultado){
   
    let parrafo = document.createElement("p")
    parrafo.innerHTML = "Tu " + pokemonAliado.nombre + " uso: " + indexJugador
    let parrafo2 = document.createElement("p")
    parrafo2.innerHTML = "El "+ pokemonEnemigo.nombre + " enemigo uso: " + indexEnemigo + ". " + resultado

    seccionMensajes.appendChild(parrafo)
    seccionMensajes.appendChild(parrafo2)
}

function crearMensajeFinal(resultadofinal){

   
    let parrafo = document.createElement("p")
    parrafo.innerHTML = "COMBATE FINALIZADO! " + resultadofinal
    
    seccionMensajes.appendChild(parrafo)

    botonReiniciar.style.display = "flex"
}

function detectarChoque(enemigo){
    const pokemonArriba = pokemonAliado.y
    const pokemonAbajo = pokemonAliado.y + pokemonAliado.alto
    const pokemonIzquierda = pokemonAliado.x
    const pokemonDerecha = pokemonAliado.x + pokemonAliado.ancho
    
    const enemigoArriba = enemigo.y
    const enemigoAbajo = enemigo.y + enemigo.alto
    const enemigoIzquierda = enemigo.x
    const enemigoDerecha = enemigo.x + enemigo.ancho

    if(
        pokemonAbajo < enemigoArriba ||
        pokemonArriba > enemigoAbajo ||
        pokemonIzquierda > enemigoDerecha ||
        pokemonDerecha < enemigoIzquierda
    ) {
        return
    }
    seccionAtaques.style.display = "flex"
    sectionvermapa.style.display = "none"
}

function reiniciar(){
    location.reload()
}

function joingame(){
    fetch("http://localhost:8299/join")
        .then(function (res){
            if(res.ok){
                res.text()
                    .then (function (respuesta){
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })

}

function pokemonBackEnd(pokemonAliado) {
    fetch(`http://localhost:8299/pokemon/${jugadorId}`, {
        method: 'post',          
        headers: {
          'Content-Type': 'application/json'        
        },
        body: JSON.stringify({    
          pokemon: pokemonAliado
        })
    })
}

function enviarPosicion(x, y) {
    fetch(`http://localhost:8299/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
}



window.addEventListener("load", iniciarJuego)