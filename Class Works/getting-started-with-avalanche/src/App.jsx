import { useState } from 'react'
import { ethers } from 'ethers'
import HelloWorld from './artifacts/contracts/HelloWorld.sol/HelloWorld.json'

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS

function App() {
  const [hello, setHelloValue] = useState()

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' })
  }

  async function fetchHello() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(contractAddress, HelloWorld.abi, provider)
      try {
        const data = await contract.hello()
        setHelloValue(data)
        console.log('Greeting: ', data)
        console.log('Contract Address: ', contract.address)
      } catch (err) {
        console.log("Error: ", err)
      }
    }
  }

  return (
    <div>
      <header>
        <h1>Avalanche</h1>
      </header>

      <main>
        <h3>Hello World</h3>

        <button onClick={fetchHello}>
          Click me, you know you want to
        </button>

        <div>{hello}</div>
      </main>
    </div>
  )
}

export default App