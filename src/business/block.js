const SHA256 = require("crypto-js/sha256");

class Block {
    constructor(index, timestamp, data, previousHash = ""){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash).toString();
    }
}

class BlockChain {
    constructor() {
        this.chain = [this.createFirstBlock()];
    }

    createFirstBlock() {
        return new Block(0, "05/05/2021", "First Block", 0);
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
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
myCoin.addBlock(new Block(1, "05/05/2021", { amount: 10}));
myCoin.addBlock(new Block(2, "05/05/2021", { amount: 20}));

console.log(JSON.stringify(myCoin, null, 4));
console.log("Is chain valid? " + myCoin.isChainValid());