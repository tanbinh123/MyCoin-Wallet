const {BlockChain, Transaction} = require("./block.js");
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('f75a9dedc5482fe9f6c418584c5e3cf03ab4c44c2775dce9b274ca1de7093e0e'); // my private key
const myWalletAddress = myKey.getPublic('hex');

const myCoin = new BlockChain();

myCoin.minePendingTransaction(myWalletAddress); // mine first block

// Create a transaction & sign it with my key
const transaction = new Transaction(myWalletAddress, 'address2', 5);
transaction.signTransaction(myKey);
myCoin.addTransaction(transaction);

// Mine block
myCoin.minePendingTransaction(myWalletAddress);

// Create second transaction
const transaction2 = new Transaction(myWalletAddress, 'address1', 3);
transaction2.signTransaction(myKey);
myCoin.addTransaction(transaction2);

// Mine block
myCoin.minePendingTransaction(myWalletAddress);

console.log();
console.log(`Balance of my wallet is ${myCoin.getBalanceOfAnAddress(myWalletAddress)}`);
// Ans: 12 => Sent 5 + 3 = 8, mining reward each blockchain: 10, 2 blockchain: 20 => 20 - 8 = 12


// let myCoin = new BlockChain();
// myCoin.createTransaction(new Transaction("address1", "address2", 100)); // Address is a public key of a wallet
// myCoin.createTransaction(new Transaction("address2", "address1", 50));

// console.log("Start mining...");
// myCoin.minePendingTransaction("myaddress");
// console.log("Balance of my address is: " + myCoin.getBalanceOfAnAddress("myaddress"));

// console.log("Start mining...");
// myCoin.minePendingTransaction("myaddress");
// console.log("Balance of my address is: " + myCoin.getBalanceOfAnAddress("myaddress"));

// console.log("Start mining...");
// myCoin.minePendingTransaction("myaddress");
// console.log("Balance of my address is: " + myCoin.getBalanceOfAnAddress("myaddress"));

// console.log("Mining block 1: ");
// myCoin.addBlock(new Block(1, "05/05/2021", { amount: 10}));
// console.log("Mining block 2: ");
// myCoin.addBlock(new Block(2, "05/05/2021", { amount: 20}));

// console.log(JSON.stringify(myCoin, null, 4));
// console.log("Is chain valid? " + myCoin.isChainValid());