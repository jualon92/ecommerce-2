class CarritoController extends CarritoModel {

    constructor() {
        super()
        try {
            this.carrito = JSON.parse(localStorage.getItem('carrito')) || []
        }
        catch {
            this.carrito = []
            localStorage.setItem('carrito', this.carrito)
        }
    }

    elProductoEstaEnElCarrito(producto) {
        return this.carrito.filter(prod => prod.id == producto.id).length
    }

    obtenerProductoDeCarrito(producto) {
        return this.carrito.find(prod => prod.id == producto.id)
    }

    getTotalCarrito() {
       try{
            let arrItems = JSON.parse(localStorage.getItem('carrito'))
            let acu = 0
            if (arrItems) {
                for (let i = 0; i < arrItems.length; i++)
                    // console.log(arrItems[i].cantidad)
                    acu = acu + parseInt(arrItems[i].cantidad)
                //   console.log(acu)
                return acu
            } else { //rever, no necesario
                return 0
            }
        }catch (error){
            return 0
        }
        /*
         let acu = 0
         if (arrItems.length) {
             for (let i = 0; i < arrItems.length; i++)
                 // console.log(arrItems[i].cantidad)
                 acu = acu + parseInt(arrItems[i].cantidad)
             //   console.log(acu)
             return acu
         } else { //si es primera vez que inicia servidor y carrito esta vacio arrItems es undefined
             return 0
         }*/

    }


    agregarAlCarrito(producto) {
        //console.log(producto)
        console.log("agregando 1 al carrito")
        if (!this.elProductoEstaEnElCarrito(producto)) { // primer prod
            console.log("primer producto")
            producto.cantidad = 1
            this.carrito.push(producto)

        }
        else {
            console.log("ya existe")
            let productoDeCarrito = this.obtenerProductoDeCarrito(producto)
            productoDeCarrito.cantidad = parseInt(productoDeCarrito.cantidad) + 1


        }
        localStorage.setItem('carrito', JSON.stringify(this.carrito)) //guardado local

        document.querySelector(".fa-layers-counter").innerHTML = carritoController.getTotalCarrito()
    }

    /*
    agregarAlCarritoSuma(producto,contador) { // if contador == null usar 1 , else usar contador . Utilizado en sumar al carrito con numero
        //console.log(producto)
        if(!this.elProductoEstaEnElCarrito(producto)) { // primer prod
            producto.cantidad = contador
            this.carrito.push(producto)
        }
        else { 
             let carrito = localStorage.getItem('carrito')
             
            let productoDeCarrito = this.obtenerProductoDeCarrito(producto)
            console.log(productoDeCarrito)
            console.log("productos iniciales = " + productoDeCarrito.cantidad)
            let suma  = parseInt(productoDeCarrito.cantidad) + parseInt(contador)
            let resta = suma -  parseInt(productoDeCarrito.cantidad)
            let total = productoDeCarrito.cantidad + suma
            if (total > productoDeCarrito.stock){ //si la suma es mayor al maximo, cantidad es el maximo
                productoDeCarrito.cantidad = productoDeCarrito.stock
            }else{  
            productoDeCarrito.cantidad = suma 
            console.log("productos finales = " + suma)
            console.log("diferencia " + resta)
            console.log("agregado al carrito n prod mas: " + contador )
        }
        }   
       
        localStorage.setItem('carrito', JSON.stringify(this.carrito)) //guardado local
        document.querySelector(".fa-layers-counter").innerHTML =   parseInt(carritoController.getTotalCarrito())
    }*/
    getVeces = (contador) => contador == 1 ? "vez" : "veces"

    agregarAlCarritoSuma(producto, contador) { // if contador == null usar 1 , else usar contador . Utilizado en sumar al carrito con numero
        //console.log(producto)
        let ele = document.createElement("div") //creo ele html porque quiero que cada uno tenga su propio fade out, animacion.  instanciar objetos desde clase 
        ele.classList.add("helping-hand")

        document.querySelector(".contenedor-prueba").appendChild(ele)
  

        if (!this.elProductoEstaEnElCarrito(producto)) { // primer prod
            producto.cantidad = contador
            this.carrito.push(producto)
            //      let mensajeHelper = `agregado al carrito ${producto.nombre}  ${contador} ${contador == 1 ? "vez" : "veces"}`    // refactor, repite logica


            let texto = document.createTextNode(`agregado al carrito  ${contador} ${producto.nombre}`);
            ele.appendChild(texto)

        }
        else {

            //   let carrito = localStorage.getItem('carrito')

            let productoDeCarrito = this.obtenerProductoDeCarrito(producto)
            console.log(productoDeCarrito)
            console.log("productos iniciales = " + productoDeCarrito.cantidad)

            let suma = parseInt(productoDeCarrito.cantidad) + parseInt(contador)
            console.log("productos finales" + suma)
            let resta = suma - parseInt(productoDeCarrito.cantidad)
            //  let total = parseInt(productoDeCarrito.cantidad) + suma


            if (suma > parseInt(productoDeCarrito.stock)) { //si la suma es mayor al maximo, cantidad es el maximo
                productoDeCarrito.cantidad = productoDeCarrito.stock
                console.log("limite")
                console.log("total", suma)
                //    document.querySelector(".helping-hand").innerHTML = "limite de stock alcanzado" 
                let texto = document.createTextNode(`sin suficiente stock`);
                ele.appendChild(texto)


            } else {
                productoDeCarrito.cantidad = suma
                console.log("productos finales = " + suma)
                console.log("diferencia " + resta)
                console.log("agregado al carrito n prod mas: " + contador)
                //helping hand
                // let mensajeHelper = `agregado al carrito ${productoDeCarrito.nombre}  ${contador} ${contador == 1 ? "vez" : "veces"}  : `
                //      console.log(mensajeHelper)
                //     document.querySelector(".helping-hand").classList.add("aparecer") //aparece
                //    document.querySelector(".helping-hand").classList.remove("aparecer") //aparece

                //document.querySelector(".helping-hand").innerHTML = `agregado al carrito  ${contador} ${productoDeCarrito.nombre}`
                let texto = document.createTextNode(`agregado al carrito  ${contador} ${productoDeCarrito.nombre}`);
                ele.appendChild(texto)
                document.querySelector(".contenedor-prueba").appendChild(ele)
                //          document.querySelector(".helping-hand").classList.add("aparecer") //aparece

            }
        }

        console.log(document.querySelector(".fa-layers-counter").innerHTML)
        localStorage.setItem('carrito', JSON.stringify(this.carrito)) //guardado local

        console.log("total carrito = " + carritoController.getTotalCarrito())
        document.querySelector(".fa-layers-counter").innerHTML = parseInt(carritoController.getTotalCarrito())
    }

    /*
    async borrarProductoCarrito(id) {
        let index = this.carrito.findIndex(producto => producto.id == id)
        this.carrito.splice(index,1)
        localStorage.setItem('carrito', JSON.stringify(this.carrito))
        document.querySelector(".fa-layers-counter").innerHTML = carritoController.getTotalCarrito()
        await renderTablaCarrito(this.carrito)
    }*/

    async borrarProductoCarrito(id) {
        let index = this.carrito.findIndex(producto => producto.id == id)
        this.carrito.splice(index, 1)
        localStorage.setItem('carrito', JSON.stringify(this.carrito))

        document.querySelector(".fa-layers-counter").innerHTML = carritoController.getTotalCarrito()
        await renderTablaCarrito(this.carrito)
    }

    async enviarCarrito() {
        var elemSectionCarrito = document.getElementsByClassName('section-carrito')[0]

        elemSectionCarrito.innerHTML = '<h2>Enviando carrito...</h2>'
        let preference = await carritoService.guardarCarritoService(this.carrito)

        //reinicio del carrito

        this.carrito = [] // podria reiniciarse aguas arriba. ej: if (mpago.saleSucessful) reiniciar else nada

        localStorage.setItem('carrito', this.carrito)
        document.querySelector(".fa-layers-counter").innerHTML = 0




        elemSectionCarrito.innerHTML = '<h2>Enviando carrito... <b>OK!</b></h2>'
        //   console.log("timeout carrito")
        setTimeout(async () => {
            elemSectionCarrito.classList.remove('section-carrito--visible')
            mostrarCarrito = false
            console.log("volver invisible")
            console.log(preference)

            await renderPago(preference)
            // console.log("abriendo mpago")
        }, 0) //1500
    }
}

const carritoController = new CarritoController()