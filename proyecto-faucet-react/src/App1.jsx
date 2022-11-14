import { useEffect, useState } from 'react';
const { ethereum } = window;
import './App.css'

function enviarEth() {
  console.log("enviar 10 eth", cuenta);
};

function App() {
  const [cuenta, setCuenta] = useState(null);
  const [balan, setBalan] = useState(null);

  
  useEffect(() => {
    ethereum.request({method: 'eth_requestAccounts'}).then(cuentas => {
      console.log(cuentas);
      setCuenta(cuentas[0]);
      
      ethereum.on('accountsChanged', (cuentas) => {
          console.log("cuentas cambiada", cuentas);
        setCuenta(cuentas[0]);
        getAccountBalance(cuentas[0]);
      })
        
      })
  }, []);
  
  const getAccountBalance = (cuenta) => {
		window.ethereum.request({method: 'eth_getBalance', params: [cuenta, 'latest']})
		.then(balance => {
			setBalan(ethers.utils.formatEther(balance));
		})
		.catch(error => {
			console.log(error.message);
		});
	};

    return (
      <div className="container">
        <div>
          Cuenta de destino <br></br>{cuenta} <br></br><br></br>
          Balance de destino <br></br>{balan} <br></br><br></br>
        </div>

        <button onClick={() => enviarEth()} className="mt-3 btn btn-primary">Enviar 10 Ethx</button>
      </div>
    )
    //Llegado a este punto el envio de esos 10Eth se realiza creando un nodo de Ethereum via Docker, nodo que será el nodo de nuestra red privada.(sigue en el directorio wsl2  "/home/kiko/faucet-curso" en linux)
  }

    
  
export default App
