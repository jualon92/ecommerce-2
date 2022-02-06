import dotenv from  "dotenv"

console.log("process.cwd()", process.cwd())
dotenv.config({  // segun lo que le paso por terminal va a devovler cfg de archivo
    path: process.cwd() + '/' + process.env.NODE_ENV + '.env' 
}
 
)

console.log("process.env.PORT" , process.env.PORT)
console.log("process.env.TIPO" , process.env.TIPO)
console.log("process.env.CNX" , process.env.CNX)
//npm start toma de .env 
/*export default {
    PORT : 8080,
    TIPO_DE_PERSISTENCIA: 'MONGODB',    // 'MEM', 'FILE', 'MONGODB'
    //STR_CNX: 'mongodb://localhost/ecommerce'
   // STR_CNX: 'mongodb+srv://daniel:daniel123@misdatos.fs00f.mongodb.net/ecommerce2?retryWrites=true&w=majority'
    STR_CNX: 'mongodb+srv://jualon92:dadaismo128@cluster0.8hv3u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
}*/

export default { //toma de scripts 
    PORT : process.env.PORT || 8080,
    TIPO_DE_PERSISTENCIA: process.env.TIPO || "MEM",    // 'MEM', 'FILE', 'MONGODB'
    //STR_CNX: 'mongodb://localhost/ecommerce'
   // STR_CNX: 'mongodb+srv://daniel:daniel123@misdatos.fs00f.mongodb.net/ecommerce2?retryWrites=true&w=majority'
    STR_CNX: process.env.CNX || null
}
