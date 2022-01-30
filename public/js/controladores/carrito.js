class CarritoController extends CarritoModel {

    constructor() {
        super()
        try {
            this.carrito = JSON.parse(localStorage.getItem('carrito')) || []
        }
        catch {
            this.carrito = []
            localStorage.setItem('carrito',this.carrito)
        }
    }

    elProductoEstaEnElCarrito(producto) {
        return this.carrito.filter(prod => prod.id == producto.id).length
    }
    
    obtenerProductoDeCarrito(producto) {
        return this.carrito.find(prod => prod.id == producto.id)
    }
    
    agregarAlCarrito(producto) {
        //console.log(producto)
        if(!this.elProductoEstaEnElCarrito(producto)) { // primer prod
            producto.cantidad = 1
            this.carrito.push(producto)
        }
        else {
            let productoDeCarrito = this.obtenerProductoDeCarrito(producto)
            productoDeCarrito.cantidad = parseInt(productoDeCarrito.cantidad) + 1
        }   
    
        localStorage.setItem('carrito', JSON.stringify(this.carrito)) //guardado local
    }

    agregarAlCarritoSuma(producto,contador) { // if contador == null usar 1 , else usar contador . Utilizado en sumar al carrito con numero
        //console.log(producto)
        if(!this.elProductoEstaEnElCarrito(producto)) { // primer prod
            producto.cantidad = contador
            this.carrito.push(producto)
        }
        else { 
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
    }
    


    async borrarProductoCarrito(id) {
        let index = this.carrito.findIndex(producto => producto.id == id)
        this.carrito.splice(index,1)
        localStorage.setItem('carrito', JSON.stringify(this.carrito))
    
        await renderTablaCarrito(this.carrito)
    }
    
    async enviarCarrito() {
        var elemSectionCarrito = document.getElementsByClassName('section-carrito')[0]

        elemSectionCarrito.innerHTML = '<h2>Enviando carrito...</h2>'
        await carritoService.guardarCarritoService(this.carrito)
        this.carrito = []
        localStorage.setItem('carrito',this.carrito)
    
        elemSectionCarrito.innerHTML = '<h2>Enviando carrito... <b>OK!</b></h2>'
    
        setTimeout(() => {
            elemSectionCarrito.classList.remove('section-carrito--visible')
            mostrarCarrito = false
        },1500)
    }
}

const carritoController = new CarritoController()