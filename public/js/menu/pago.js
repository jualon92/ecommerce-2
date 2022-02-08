// Agrega credenciales de SDK
const mercadopago = new MercadoPago("APP_USR-5e526118-d978-4a6c-9f5c-0bfb7e9e828b", {
  locale: "es-AR",
});

console.warn(" -- sistema de pago iniciado  --")


async function renderPago(preference) { // levantar archivo vistas/pago.html

  let html = await fetch('vistas/pago.html').then(r => r.text())

  document.querySelector('main').style.display = 'none' //ocultar el main
  document.querySelector('.section-pago').innerHTML = html //inyecto
  console.log("pref")
  console.log(preference)
  createCheckoutButton(preference.id)

  const refItems = document.querySelector(".item")
  const refTotal = document.querySelector("#summary-total")
  const listaItems = preference.arrItems
  console.log("items")
  console.log(preference.items)
  let acu = 0

  /*
  for (let i = 0; i < items.length; i++) {
    let price = items.unit_price[i]
    let title = items[i].title
    let quantity = items[i].quantity
    let subtotal = price * quantity
    let acu = acu  + subtotal
    refItems.innerHTML = 
  }*/

  for (const item of listaItems) { //alternativa handlebars estaria bueno
    let subtotal = item.unit_price * item.quantity
    acu += subtotal
    refItems.innerHTML += `
            <span class="price summary-price">${subtotal}</span>
            <p class="item-name">${item.title} x <span class="summary-quantity">${item.quantity}</span></p>
        `
  }

  refTotal.innerHTML = acu

  // Go back
  document.getElementById("go-back").addEventListener("click", function () {
    document.querySelector('main').style.display = 'block'
    document.querySelector('.section-pago').innerHTML = ""  //vuelvo para atras, elimino html agregado
  });

 


  // Create preference when click on checkout button
  function createCheckoutButton(preferenceId) { //requiere preferenceId para func
    // Initialize the checkout
    mercadopago.checkout({ //  obj mercadopago
      preference: {
        id: preferenceId
      },
      render: {
        container: '#button-checkout', // Class name where the payment button will be displayed
        label: 'Pagar', // Change the payment button text (optional)
      }
    });
  }
}

 