
let Block = require('./block')
let Blockchain = require('./blockchain')
let Transaction = require('./transaction')

let transaction = new Transaction('Rodri','Dai',100)
let genesisBlock = new Block()
genesisBlock.addTransaction(transaction)
let blockchain = new Blockchain(genesisBlock)

function generateAndAdd() {
    const nextBlock = blockchain.getNextBlock([transaction])
    blockchain.addBlock(nextBlock)
}

generateAndAdd()
generateAndAdd()
console.log(blockchain)