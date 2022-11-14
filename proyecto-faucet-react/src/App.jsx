import { useEffect, useState } from 'react'
const { ethereum } = window
import './App.css'


function App() {
  const [cuenta, setCuenta] = useState(null);
  const [saldo, setSaldo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  async function enviarEth() {
  setIsLoading(true);
  const response = await fetch(`http://localhost:3000/enviar/${cuenta}`)
  if (response.status == "200") {
    const datos = await response.json();
    await verSaldo(cuenta);
  setIsLoading(false);
  }
}

//Al conectarse visualizamos el saldo 
  async function verSaldo(cuenta) {
    const response = await fetch(`http://localhost:3000/balance/${cuenta}`)
  if (response.status == "200") {
    const datos = await response.json();
    setSaldo(datos);
  }
  }

  useEffect(() => {
    ethereum.request({ method: 'eth_requestAccounts' }).then(cuentas => {
      setCuenta(cuentas[0]);
      verSaldo(cuentas[0]);

      //Para que el cambio de una cuenta a la otra se vea reflejado en el navegador utilizamos el evento del meteodo ethereum.on('accountChanged'.........)
      ethereum.on('accountsChanged', (cuentas) => { 
        setCuenta(cuentas[0]);    //[0] no es porque me devuelva un array con todas las cuentas leida, sino la ultima que ha leido
      verSaldo(cuentas[0]);
      })
    })
  }, []);

  return (
    <div className="container">
      <div>Cuenta de destino <br></br>{cuenta} <br></br><br></br></div>
      <div>Balance cuenta de destino={JSON.stringify(saldo)} <br></br><br></br> </div>
      {/* Si la tx no ha sido lanzada muestra el boton */}
      {!isLoading && <button onClick={() => enviarEth()} className="mt-3 btn btn-primary">Enviar 10 Ethx</button>}
      {/* Si la tx ha sido lanzada muestra un mensaje */}
      {isLoading && <div>Tx en curso</div>}
    </div>
  )
  //Llegado a este punto el envio de esos 10Eth se realiza creando un nodo de Ethereum via Docker, nodo que será el nodo de nuestra red privada.(sigue en el directorio wsl2  "/home/kiko/faucet-curso" en linux)
}

    
  
export default App
