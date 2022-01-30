let mostrarCarrito = false

function volverInvisible(ele, clase) {
    ele.classList.remove(clase)
}

 

async function renderTablaCarrito(carrito) { //estaria bueno encontrar la manera de evitar codigo repetida al utilizar cada render, hbs.
    var elemSectionCarrito = document.getElementsByClassName('section-carrito')[0]

    let plantillaHbs = await fetch('plantillas/carrito.hbs').then(r => r.text())
    var template = Handlebars.compile(plantillaHbs);
    // execute the compiled template and print the output to the console
    //let html = template({ productos: productos, validos: !algunCampoNoValido() })
    let html = template({ carrito })
    elemSectionCarrito.innerHTML = html
    elemSectionCarrito.classList.add('section-carrito--visible')
}

function initCarrito() {
    var btnCarrito = document.getElementsByClassName('search-bar__carrito-container')[0]
    var elemSectionCarrito = document.getElementsByClassName('section-carrito')[0]


    btnCarrito.addEventListener('click', async function () {
        mostrarCarrito = !mostrarCarrito
        mostrarCarrito ? await renderTablaCarrito(carritoController.carrito) : volverInvisible(elemSectionCarrito, 'section-carrito--visible')
    })

    document.querySelector("main").addEventListener("click", async function () { //volverlo invisible al clickear fondo
        volverInvisible(elemSectionCarrito, 'section-carrito--visible')
        mostrarCarrito = false
    })
}


initCarrito()
