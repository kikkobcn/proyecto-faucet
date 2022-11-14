const express = require("express")
const Web3 = require("web3")
const cors = require("cors")
const app = express();
app.use(cors())

require("dotenv").config();  //Toma el .env y crea varibles accesibles por "process.env.<nombre_variable>"

//Declaramos cual es nuestro proveidor:es el que esta en nuestro contenedor
const web3 = new Web3("http://localhost:8545");


  app.get("/ping", (req, res) => {
  res.send({ fecha:new Date().toISOString() })
});

  //Accedemos a la cuenta
  app.get("/balance/:cuenta" , async (req, res) => {
    const balance = await web3.eth.getBalance(req.params.cuenta);
    res.send({balance:balance})
  });



app.get("/  enviar/:cuenta", async (req, res) => {
  console.log(req.params.cuenta, process.env.ADDRESS);
//crear transaccion en eth
  const tx = await web3.eth.accounts.signTransaction({
        to: req.params.cuenta,
        from: process.env.ADDRESS,
        value: 10E18,
        gas:2000000
    }, process.env.PRIVATE_KEY)
  
//enviar la tx al provider
const txSended = await web3.eth.sendSignedTransaction(
  tx.rawTransaction  
)

//enviar el nuevo saldo
const balance = await web3.eth.getBalance(req.params.cuenta);
  res.send({balance})
});




app.listen(3000, () => {
  console.log("port", 3000)
})