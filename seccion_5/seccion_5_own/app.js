
const Block = require('./block')
const Blockchain = require('./blockchain')
const Transaction = require('./transaction')
const BlockchainNode = require('./blockchainnode')

const bodyParser = require('body-parser')
const express = require('express')
const fetch = require('node-fetch')
const app = express()


let locationNumber

/*
    Access the arguments
 */
process.argv.forEach((val, index, array) => {
    console.log(array)
    locationNumber = parseInt(array [2]) || 3000
})

/*
    Blockchain info
 */
const nodes = []
const genesisBlock = new Block()
let transactions = []
let blockchain = new Blockchain(genesisBlock)

/*
    APP endpoints setup
 */

app.use(bodyParser.json())

app.get('/', (request, response) => {
    response.send('hello world')
})

app.get('/resolve', (request, response) => {
    nodes.forEach((node) => {
        fetch(node.url + '/blockchain')
            .then((response) => {
                return response.json()
            })
            .then((otherNodeBlockchain) => {
                if (otherNodeBlockchain.blocks.length > blockchain.blocks.length) {
                    blockchain = otherNodeBlockchain
                }
                response.send(blockchain)
            })
    })
})

app.post('/nodes/register', (request, response) => {
    const nodesLists = request.body.urls
    nodesLists.forEach((nodeUrlOb) => {
        const node = new BlockchainNode(nodeUrlOb.url)
        nodes.push(node)
    })
    response.json(nodes)
})

app.get('/mine', (request, response) => {
    const minedBlock = blockchain.getNextBlock(transactions)
    transactions = []
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

app.listen(locationNumber, () => {
    console.log('The server has started propperly')
})


/*
    Extra functions
 */

function generateAndAddTo(blockchain, transaction) {
    const nextBlock = blockchain.getNextBlock([transaction])
    blockchain.addBlock(nextBlock)
}
