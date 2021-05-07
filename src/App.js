import React from 'react';
import './App.css';
import BlockChain from "./components/Blockchain/BlockChain";
const SHA256 = require("crypto-js/sha256");

const difficulty = 2; 
const miningReward = 1;
const hash = (index, prevHash, difficulty) =>{
  let nonce = 0;
  while (true){
    const time = Date.now();
    const hash = index + time + prevHash + nonce;
    const codeHash = SHA256(hash).toString();
    if (codeHash.substring(0, difficulty) === Array(difficulty + 1).join("0")) { // Trick to test whether hash start with enough "0" length or not
      return codeHash;
    }
    nonce++;
  }
}

const findMiner = (from, to, max) =>{
  if (max <= 2 ){ // if wallets <= 2
    return -1;
  }
  while(true){ // if wallets >= 3, random the miner, miner can be any one except reciever and sender
    const randomIndex = Math.floor(Math.random() * max);
    if (randomIndex !== from && randomIndex !== to){
      return randomIndex;
    }
  }
}

class App extends React.Component {

  render() {
      return (
          <div>
            <BlockChain />
          </div>
      );
  }
}

export default App;