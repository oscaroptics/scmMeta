import { useEffect, useState } from 'react'
import { ethers } from 'ethers';
import abi from '../artifacts/contracts/number.sol/number.json'

function App() {

  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [countContract, setCountContract] = useState(undefined);
  const [count, setCount] = useState(undefined);
  

  const contractAddress = "0xd9145CCE52D386f254917e481eB44e9943F39138";

  const countABI = abi.abi;


  const getWallet = async() => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({method: "eth_accounts"});
      handleAccount(account);
    }
  }


  const handleAccount = (account) => {
    if (account) {
      console.log ("Account connected: ", account);
      setAccount(account);
    }
    else {
      console.log("No account found");
    }
  }

  const connectAccount = async() => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }
  
    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);
    

    getCountContract();
  };


  const getCountContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, countABI, signer);
 
    setCountContract(contract);
  }


  const getCount = async () =>{
    if (countContract) {
      setCount((await countContract.count()).toNumber());
    }
  }

  const increasenumber = async () => {
    if (countContract) {
      const tx = await countContract.increasenumber();
      await tx.wait();
      getCount();
    }
  }

  const decreasenumber = async () => {
    if (countContract) {
      try{
        const tx = await countContract.decreasenumber();
        await tx.wait();
        getCount();
      } catch(error){
        alert("Count Cannot Be Less Than 0")
      }
      
    }
  }


  const Home = () =>{
    if(!ethWallet){
      return<h1>Please install METAMASK!</h1>
    }

    if(!account){
      return<button onClick={connectAccount}>Please connect your account!</button>
    }

    if(count == undefined){
      getCount()
    }

    return(
      <div>
        <p>Address: {account[0]}</p>
        <br/>
        <h1>number: {count}</h1>
        <br/>
        <button onClick={increasenumber}>Increase number</button>
        <button onClick={decreasenumber}>Decrease number</button>
      </div>
    )
  }

  useEffect(()=>{
    getWallet();
  },[])


  return (
    <div className='container' style={{height:"90vh", display:"flex", flexDirection:"column", alignItems:"center"}}>
      <h1>the number game!!</h1>
      <Home/>
    </div>
  )
}

export default App
