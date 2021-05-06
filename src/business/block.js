const SHA256 = require("crypto-js/sha256");
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }

    // Creates a SHA256 hash of the transaction
    calculateHash() {
        return SHA256(this.fromAddress + this.toAddress + this.amount).toString();
    }

    
    // Signs a transaction with the given signingKey (which is an Elliptic keypair object that contains a private key). 
    // The property signature is then stored inside the transaction object and later stored on the blockchain.
    signTransaction (signingKey) {
        if (signingKey.getPublic('hex') !== this.fromAddress) {  // check if the fromAddress matches your publicKey
            throw new Error('You cannot sign transactions from other wallets! Must be your wallet!');
        }   

        // Calculate the hash of this transaction, sign it with the key and store it inside the transaction object
        const hashTx = this.calculateHash();
        const sig = signingKey.sign(hashTx, 'base64');

        this.signature = sig.toDER('hex');
    }

    isValid() {
        if (this.fromAddress === null) return true; // valid because mining reward for miners, watch on blochain mining reward props
    
        if (!this.signature || this.signature.length === 0) {
          throw new Error('No signature in this transaction');
        }
    
        const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
        return publicKey.verify(this.calculateHash(), this.signature); // verify if this hash has been signed by this signature.
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

    // Validates all the transactions inside this block (signature + hash) 
    // then returns true if everything checks out, false if the block is invalid.
    hasValidTransactions() {
        for (const tx of this.transactions) {
            if (!tx.isValid()) {
                return false;
            }
        }

        return true;
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
        return new Block("05/05/2021", [], 0);
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

    addTransaction (transaction) {
        if (!transaction.fromAddress || !transaction.toAddress) {
            throw new Error('Transaction must include from and to address');
        }

        if (!transaction.isValid()) {
            throw new Error('Cannot add invalid transaction to chain');
        }
        
        if (transaction.amount <= 0) {
            throw new Error('Transaction amount must be higher than 0');
        }
        
        // if (this.getBalanceOfAnAddress(transaction.fromAddress) < transaction.amount) {
        //     throw new Error('Not enough balance to add this transaction');
        // }
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

            if (!currentBlock.hasValidTransactions()) {
                return false;
            }

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

module.exports.BlockChain = BlockChain;
module.exports.Transaction = Transaction;