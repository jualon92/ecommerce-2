function leerProductoActualizado(valores) { //no anda.
    return {
        nombre: valores[0],
        precio: valores[1],
        stock: valores[2],
        marca: valores[3],
        categoria: valores[4],
        foto: valores[5],
        detalles: valores[6],
        envio: valores[7],
    }
}


function getListaAtributos(listaInputs) {
    let b = []
    for (let i = 0; i < listaInputs.length; i++) { //inputs basicos, de 0 a 4


        b.push(listaInputs[i].value)


    }

    return b

}

function validar(valor, regex, index) {
    //console.log(valor,index)

    if (!regex.test(valor)) {
        console.log("fallo")

        return false
    }
    return true
}



function getRegex() {
    return [ //mejorar regex
        /^.+$/, //regexp nombre
        /^[0-9]+$/, //regexp precio, estaria bueno que no incluya 0
        /^[0-9]+$/, //regexp stock
        /^.+$/, //regexp marca
        /^.+$/, //regexp categoria
        /^.+$/, //regexp detalles
        /^.+$/, //regexp foto
    ]
}
class ProductoController extends ProductoModel {


    constructor() {
        super()
        this.guardarProducto = this.guardarProducto.bind(this) //rever

    }

    async obtenerProductos() {
        this.productos = await productoService.obtenerProductosService()
        return this.productos
    }

    async guardarProducto(producto) { // guarda y renderiza. rever, mala practica?
        let productoGuardado = await productoService.guardarProductoService(producto) //guarda en api
        console.log(productoGuardado)

        this.productos.push(productoGuardado) //guarda en arr

        renderTablaAlta(null, this.productos) //luego de pushear al array, renderiza nueva tabla de productos en api
    }

    getRegex() {
        return [ //mejorar regex
            /^.+$/, //regexp nombre
            /^[0-9]+$/, //regexp precio, estaria bueno que no incluya 0
            /^[0-9]+$/, //regexp stock
            /^.+$/, //regexp marca
            /^.+$/, //regexp categoria
            /^.+$/, //regexp detalles
            /^.+$/, //regexp foto
        ]
    }


    async actualizarProducto(id, ref) { //estaria bueno facilitar con handlebars 
        let targets = ref.parentElement.parentElement.querySelectorAll(".primerSel")

        let arrTargets = Array.from(targets)
        let arrValoresTargets = arrTargets.map(ele => ele.innerHTML)

        //rever
        if (ref.classList.contains("inactive")) {   //si esta inactivo, activar
            for (let i = 0; i < targets.length; i++) { //refactorizar, feo

                if (i == 5) { //grab src
                    let src = arrTargets[5].querySelector(".imagenAlta").src
                    console.log(src)
                    targets[i].innerHTML = `<input type="text" id="fname" name="fname" value="${src}"><br><br>`
                } else {
                    targets[i].innerHTML = `<input type="text" id="fname" name="fname" value="${arrValoresTargets[i]}"><br><br>` //que al actualizar, aparezca valor inicial cargado para modificar

                }
            }

            ref.classList.replace("inactive", "active")
            //  console.log("valor " + ref.innerHTML)
            ref.innerHTML = "Guardar"
            let inputs = Array.from(ref.parentElement.parentElement.querySelectorAll("input")) //la idea es que si hay un mal caracter actualizar este greyed out

            inputs.forEach((input, index) => { //validacion en actualizar
                input.addEventListener('input', () => { //input value has  changed
              //      console.log("hubo input")
              //      console.log(input.value)
              //      console.log(index)
             //       console.log(getRegex())
                    let regex = this.getRegex()
                    let lista = [true, true, true, true, true, true, true]
                    lista[index] = validar(input.value, regex[index], index)
                    ref.disabled = lista.some(ele => ele === false) //any


                })
            })


        } else {
            ref.classList.replace("active", "inactive")
            let inputs = Array.from(ref.parentElement.parentElement.querySelectorAll("input"))
            //  console.log("inputs")

            let valores = inputs.map(ele => ele.value)
            //    console.log(valores)
            //    let valores = getListaAtributos(targets)
            console.log(leerProductoActualizado(valores))
            let producto = leerProductoActualizado(valores)
            let productoActualizado = await productoService.actualizarProductoService(id, producto)
            let index = this.productos.findIndex(producto => producto.id == productoActualizado.id)
            this.productos.splice(index, 1, productoActualizado)

            renderTablaAlta(null, this.productos)
        }
    }



    /*
    //producto nuevo
    let productoActualizado = await productoService.actualizarProductoService(id,producto)
    console.log(productoActualizado)

    //
    let index = this.productos.findIndex(producto => producto.id == productoActualizado.id)
    this.productos.splice(index,1,productoActualizado)

    renderTablaAlta(null, this.productos) 
    /*
    let producto = formularioAlta.leerProductoIngresado()
    formularioAlta.limpiarFormulario()

    let productoActualizado = await productoService.actualizarProductoService(id,producto)
    console.log(productoActualizado)

    let index = this.productos.findIndex(producto => producto.id == productoActualizado.id)
    this.productos.splice(index,1,productoActualizado)

    renderTablaAlta(null, this.productos)*/



    async borrarProducto(id) {
        console.log('borrarProducto', id)

        let productoBorrado = await productoService.borrarProductoService(id)

        //dibujado
        let index = this.productos.findIndex(producto => producto.id == productoBorrado.id)
        console.log('indice', index)
        this.productos.splice(index, 1)

        renderTablaAlta(null, this.productos)
    }
}




const productoController = new ProductoController()