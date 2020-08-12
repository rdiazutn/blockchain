
const express = require('express')
const app = express()

const Block = require('./block')
const Blockchain = require('./blockchain')
const Transaction = require('./transaction')



function generateAndAddTo(blockchain, transaction) {
    const nextBlock = blockchain.getNextBlock([transaction])
    blockchain.addBlock(nextBlock)
}

app.get('/', (request, response) => {
    response.send('hello world')
})

app.get('/blockchain', (request, response) => {
    let transaction = new Transaction('Rodri','Dai',100)
    let genesisBlock = new Block()
    genesisBlock.addTransaction(transaction)
    let blockchain = new Blockchain(genesisBlock)
    generateAndAddTo(blockchain, transaction)
    generateAndAddTo(blockchain, transaction)
    response.json(blockchain)
})

app.listen(3000, () => {
    console.log('The server has started propperly')
})


/*




generateAndAdd()
generateAndAdd()
console.log(blockchain)*/