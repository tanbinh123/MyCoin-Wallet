const SHA256 = require("crypto-js/sha256");

class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Block {
    constructor(timestamp, transactions, previousHash = ""){
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(this.timestamp + JSON.stringify(this.data) + this.previousHash + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while(this.hash.substring(0, difficulty) != Array(difficulty +1).join("0")) { // Trick to test whether hash start with enough "0" length or not
            this.nonce++; // increment nonce until hash has enough "0" after hashed
            this.hash = this.calculateHash();
        }

        console.log("Block mined: " + this.hash);
        // console.log(this.nonce);
    }
}

class BlockChain {
    constructor() {
        this.chain = [this.createFirstBlock()];
        this.difficulty = 2;
        this.pendingTransactions = [];
        this.miningReward = 10;
    }

    createFirstBlock() {
        return new Block("05/05/2021", "First Block", 0);
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    // addBlock(newBlock) {
    //     newBlock.previousHash = this.getLatestBlock().hash;
    //     // newBlock.hash = newBlock.calculateHash();
    //     newBlock.mineBlock(this.difficulty);
    //     this.chain.push(newBlock);
    // }
    minePendingTransaction (miningRewardAddress) {
        let block = new Block(Date.now(), this.pendingTransactions);
        block.mineBlock(this.difficulty);

        console.log("Successfully mined...");
        this.chain.push(block);

        // Reset pending transaction array, and create new mining transation to give miner rewards, reciever is miner, sender can be null
        this.pendingTransactions = [new Transaction(null, miningRewardAddress, this.miningReward)];
    }

    createTransaction (transaction) {
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAnAddress(address) {
        let balance = 0;
        for (const block of this.chain){
            for (const tran of block.transactions){
                if (tran.fromAddress == address){
                    balance -= tran.amount;
                }
                if (tran.toAddress == address){
                    balance += tran.amount;
                }
            }
        }
        return balance;
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
myCoin.createTransaction(new Transaction("address1", "address2", 100)); // Address is a public key of a wallet
myCoin.createTransaction(new Transaction("address2", "address1", 50));

console.log("Start mining...");
myCoin.minePendingTransaction("myaddress");
console.log("Balance of my address is: " + myCoin.getBalanceOfAnAddress("myaddress"));

console.log("Start mining...");
myCoin.minePendingTransaction("myaddress");
console.log("Balance of my address is: " + myCoin.getBalanceOfAnAddress("myaddress"));

console.log("Start mining...");
myCoin.minePendingTransaction("myaddress");
console.log("Balance of my address is: " + myCoin.getBalanceOfAnAddress("myaddress"));

// console.log("Mining block 1: ");
// myCoin.addBlock(new Block(1, "05/05/2021", { amount: 10}));
// console.log("Mining block 2: ");
// myCoin.addBlock(new Block(2, "05/05/2021", { amount: 20}));

// console.log(JSON.stringify(myCoin, null, 4));
// console.log("Is chain valid? " + myCoin.isChainValid());