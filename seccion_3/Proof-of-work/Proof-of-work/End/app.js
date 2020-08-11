
let Block = require('./block')
let Blockchain = require('./blockchain')
let Transaction = require('./transaction')

let transaction = new Transaction('Mary','Jerry',100)

let genesisBlock = new Block()
let blockchain = new Blockchain(genesisBlock)

let block = blockchain.getNextBlock([transaction])
blockchain.addBlock(block)

let anotherTransaction = new Transaction("Azam","Jerry",10)
let block1 = blockchain.getNextBlock([anotherTransaction,transaction])
blockchain.addBlock(block1)


console.log(blockchain)
