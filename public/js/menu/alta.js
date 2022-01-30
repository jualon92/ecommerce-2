class FormularioAlta {
    inputs = null
    form = null
    button = null
    camposValidos = [false, false, false, false, false, false]
    regExpValidar = [ //mejorar regex
        /^.+$/, //regexp nombre
        /^[0-9]+$/, //regexp precio, estaria bueno que no incluya 0
        /^[0-9]+$/, //regexp stock
        /^.+$/, //regexp marca
        /^.+$/, //regexp categoria 
        /^.+$/, //regexp detalles
    ]

    //drag n drop
    imagenSubida = ""
    dropArea = null
    progressBar = null 


    constructor(renderTablaAlta, guardarProducto) {
      //  this.inputs = document.querySelectorAll('main form input')
     this.inputs = document.querySelectorAll('.form-alta__input-datos')
       
      this.form = document.querySelector('main form')
        this.button = document.querySelector('.form-alta__p')

        this.button.disabled = true

        //console.log(inputs)
        this.inputs.forEach((input, index) => {
            if (input.type != 'checkbox') {
                input.addEventListener('input', () => { //input value has been changed
                    this.validar(input.value, this.regExpValidar[index], index)
                    if (renderTablaAlta) renderTablaAlta(!this.algunCampoNoValido(), productoController.productos)  //rever
                })
            }
        })


        //al submit
        this.form.addEventListener('submit', e => {
            e.preventDefault()
            console.log("leyendo")
            let producto = this.leerProductoIngresado()
            this.limpiarFormulario()
            console.log("limpiando")

            if (guardarProducto) guardarProducto(producto) // guarda en api y renderiza, mejor serian dos funciones, rever
            //   console.log("cargo exitosa")
        })
         
        this.dropArea = document.getElementById("droparea")
        this.progressBar = document.getElementById("progressbar")

        ;["dragenter","dragover","dragleave", "drop"].forEach(eventName =>{ //prevent default de todos
            this.dropArea.addEventListener(eventName, e => e.preventDefault())
            document.body.addEventListener(eventName, e => e.preventDefault())
        })  //eventos drag

        ;["dragenter","dragover"].forEach(eventName =>{  
            this.dropArea.addEventListener(eventName, () => this.dropArea.classList.add("highlight"))

           
        })  //eventos drag

        ;["dragleave","drop"].forEach(eventName =>{  
            this.dropArea.addEventListener(eventName, () => this.dropArea.classList.remove("highlight"))

           
        })  //eventos drag*/

        this.dropArea.addEventListener("drop", e =>{
            var dt = e.dataTransfer
            var files = dt.files 

            this.handlefiles(files) // arrow func, this apunta a clase
        })

    }

    setCustomValidityJS = function (mensaje, index) {
        let divs = document.querySelectorAll('.notificacion')
        divs[index].innerHTML = mensaje
        divs[index].style.display = mensaje ? 'inline' : 'none'
    }

    algunCampoNoValido() {
        let valido =
            this.camposValidos[0] &&
            this.camposValidos[1] &&
            this.camposValidos[2] &&
            this.camposValidos[3] &&
            this.camposValidos[4] &&
            this.camposValidos[5]

        return !valido
    }

    validar(valor, validador, index) {
        //console.log(valor,index)

        if (!validador.test(valor)) {
            this.setCustomValidityJS('Este campo no es válido', index)
            this.camposValidos[index] = false
            this.button.disabled = true
            return null
        }

        this.camposValidos[index] = true
        this.button.disabled = this.algunCampoNoValido()

        this.setCustomValidityJS('', index)
        return valor
    }

    leerProductoIngresado() {  
        return {
            nombre: this.inputs[0].value,
            precio: this.inputs[1].value,
            stock: this.inputs[2].value,
            marca: this.inputs[3].value,
            categoria: this.inputs[4].value,
            foto: this.imagenSubida? `/uploads/${this.imagenSubida}`:"", 
            detalles: this.inputs[5].value,
            envio: this.inputs[6].checked,
        }
    }

    limpiarFormulario() {
        //borro todos los input
        this.inputs.forEach(input => {
            if (input.type == 'checkbox') {
                input.checked = false
            } else if (input.value !== "Enviar" && input.value !== "Borrar") { //rever, refactor
                input.value = ''
            }
        })

        this.button.disabled = true
        this.camposValidos = [false, false, false, false, false, false, false]
        let img =  document.querySelector("#gallery img") 
        img.src = ""  //img vacia

        this.initializeProgressBar()
        this.imagenSubida = ""
        
    }

    /* ------------------------------------------------------------ */
    /*      drag n drop                                             */
    /* ------------------------------------------------------------ */

    initializeProgressBar(){
        this.progressBar.value = 0
    }
    updateProgress(percent){
        this.progressBar.value = percent

    }

    previewFile(file){
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = function() {
            let img = document.querySelector("#gallery img") //donde inyectar
            img.src = reader.result //
        }

    }
    getPorcentaje = (progreso,total) => progreso * 100 / total
     

    handlefiles = (files) => { // arrow bindea this, handler
        let file = files[0]
        this.initializeProgressBar()
        this.uploadFile(file)
        this.previewFile(file)
    }
    uploadFile = (file) => {   //arrow function, this contextuado, ahorrarse utilizar bind
        const url = "/upload"
        let xhr = new XMLHttpRequest
        xhr.open("POST", url)

        xhr.upload.addEventListener("progress",  e =>{ // xhr.addEventListener("progress", callback) es para download
            this.updateProgress(this.getPorcentaje(e.loaded,e.total)) || 100
        })


        xhr.addEventListener("load", () => {
            if (xhr.status == 200) {
                this.imagenSubida = JSON.parse(xhr.response).nombre
            }
        })
        var formdata = new FormData()
        formdata.append("foto", file) //identificador foto
        xhr.send(formdata)
    }
}


/* ------------------------------------------------------------ */
/*      render helper                                           */
/* ------------------------------------------------------------ */

function renderTablaAlta(hayValidos, productos) {

    const xhr = new XMLHttpRequest
    xhr.open('get', 'plantillas/alta.hbs')
    xhr.addEventListener('load', () => {
        if (xhr.status == 200) {
            let plantillaHbs = xhr.response

            var template = Handlebars.compile(plantillaHbs);
            let html = template({ productos, hayValidos })
            document.getElementById('listado-productos').innerHTML = html
        }
    })
    xhr.send()
}

/* ------------------------------------------------------------ */
/*      Inicializaciones para el funcionamiento del módulo      */
/* ------------------------------------------------------------ */

let formularioAlta = null

async function initAlta() {
    console.warn('initAlta()')
    formularioAlta = new FormularioAlta(renderTablaAlta, productoController.guardarProducto)

    //render tabla inicial desde api
    let productosIniciales = await productoController.obtenerProductos() // pide productos api
    renderTablaAlta(null, productosIniciales)
}