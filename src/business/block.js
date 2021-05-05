const SHA256 = require("crypto-js/sha256");

class Block {
    constructor(index, timestamp, data, previousHash = ""){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while(this.hash.substring(0, difficulty) != Array(difficulty +1).join("0")) { // Trick to test whether hash start with enough "0" length or not
            this.nonce++; // increment nonce until hash has enough "0" after hashed
            this.hash = this.calculateHash();
        }

        console.log("Block mined: " + this.hash);
        console.log(this.nonce);
    }
}

class BlockChain {
    constructor() {
        this.chain = [this.createFirstBlock()];
        this.difficulty = 4;
    }

    createFirstBlock() {
        return new Block(0, "05/05/2021", "First Block", 0);
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        // newBlock.hash = newBlock.calculateHash();
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            let previousBlock = this.chain[i -1];
            let currentBlock = this.chain[i];

            if (currentBlock.hash != currentBlock.calculateHash()){
                return false;
            }

            if (currentBlock.previousHash != previousBlock.hash){
                return false;
            }
        }
        return true;
    }
}

let myCoin = new BlockChain();

console.log("Mining block 1: ");
myCoin.addBlock(new Block(1, "05/05/2021", { amount: 10}));
console.log("Mining block 2: ");
myCoin.addBlock(new Block(2, "05/05/2021", { amount: 20}));

// console.log(JSON.stringify(myCoin, null, 4));
// console.log("Is chain valid? " + myCoin.isChainValid());