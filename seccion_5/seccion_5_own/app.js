
const Block = require('./block')
const Blockchain = require('./blockchain')
const Transaction = require('./transaction')

const bodyParser = require('body-parser')
const express = require('express')
const app = express()

/*
    Blockchain info
 */

const transactions = []
const genesisBlock = new Block()
const blockchain = new Blockchain(genesisBlock)

/*
    APP endpoints setup
 */

app.use(bodyParser.json())

app.get('/', (request, response) => {
    response.send('hello world')
})

app.get('/mine', (request, response) => {
    const minedBlock = blockchain.getNextBlock(transactions)
    blockchain.addBlock(minedBlock)
    response.json(minedBlock)
})

app.post('/transactions', (request, response) => {
    console.log(request.body)
    const {body} = request
    const {from, to, amount} = body
    let transaction = new Transaction(from, to, amount)
    transactions.push(transaction)
    response.json(transaction)
})

app.get('/blockchain', (request, response) => {
    response.json(blockchain)
})

app.listen(3000, () => {
    console.log('The server has started propperly')
})


/*
    Extra functions
 */

function generateAndAddTo(blockchain, transaction) {
    const nextBlock = blockchain.getNextBlock([transaction])
    blockchain.addBlock(nextBlock)
}
