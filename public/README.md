# eCommerce, SPA con js vanilla. utiliza handlebars y ajax

## Cartas
 - la informacion de la carta es pedida a mock api mediante ajax. Luego es renderizada, se utiliza handlebars para el html de cada carta. (ventajas:mantiene coloreado, separa logica js de html)

## Headers
 - inicio alta contacto y nosotros no causan refresco, se conserva la habilidad de ir hacia atras y adelante en navegacion mediante add.eventListener y hashchange como trigger

## Alta

- En alta se agregan cartas a mock api mediante ajax. Se utiliza validacion mediante regex.  
- Permite actualizar, utiliza validacion js, si no pasa test actualizar se vuelve gris.

## Inicio
- Utilizar Busqueda hace filter de cartas que contengan palabra clave
- el carrito se accede presionando el simbolo de carrito, apretar afuera o esperar cierto tiempo lo vuelve invisible
- al presionar agregar a carrito se agrega 1 a la cantidad de productos en el carrito
- posibilidad de añadir mas de una compra a la vez mediante botones - y + en cada carta. Si quiero comprar 10 cables, no tengo que presionar 10 veces el boton 
- Agregar al carrito mas que el stock disponible no aumenta la cantidad en carrito

 
 


