function initContacto() {
    console.warn('initContacto()')
    palMax = ""

    let areaComentarios = document.querySelector(".contacto__comments")
    const reducer = (x, y) => x > y
    function esMayor(x, y) {
        if (x > y) {
            return x
        }
        return y
    }

    const getLargoTexto = () => areaComentarios.value.length


    function getPalabraMasLarga() {
        let palabras = areaComentarios.value
        let arrPalabras = palabras.split(" ")

        arrPalabras.forEach(pal => {
            if (pal.length >= palMax.length) {
                palMax = pal
            }
        });
        console.log(palMax)
        return palMax
    }

    function getCantidadPalabras() {
        let palabras = areaComentarios.value
        return palabras.split(" ").length
    }

    function getPalindromos() {
        let arrPalindromos = []
        let palabras = areaComentarios.value
        let arrPal = palabras.split(" ")
        arrPal.forEach(pal => {
            let palDadaVuelta = Array.from(pal).reverse().join("").trim()
            console.log("pal dada vuelta: ", palDadaVuelta)
            if (palDadaVuelta.length > 2 && palDadaVuelta === pal)  arrPalindromos.push(pal) 
        });
        return arrPalindromos
    }


    
    areaComentarios.addEventListener("input", e => {

        e.preventDefault()
        document.querySelector(".contador_caracteres").innerText = getLargoTexto()
        document.querySelector(".palabra-mas-larga").innerText = getPalabraMasLarga()
        document.querySelector(".contador_palabras").innerText = getCantidadPalabras()
        document.querySelector(".palindromos").innerText = getPalindromos()
    })



}