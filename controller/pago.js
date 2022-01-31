 
// SDK de Mercado Pago
import mercadopago from "mercadopago"

// Agrega credenciales
mercadopago.configure({
    access_token: "APP_USR-415255069673949-013103-53933e062c46695b33189542f57470bc-92731233",
});

console.log('------ Sistema de pago iniciado -------')


const feedback = (req, res) => {
	let info = {
		Payment: req.query.payment_id,
		Status: req.query.status,
		MerchantOrder: req.query.merchant_order_id
	}
    console.log(info)

    res.redirect('/')
}

export default {
    feedback
}