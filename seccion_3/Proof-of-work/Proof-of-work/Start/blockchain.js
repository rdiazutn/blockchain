

let sha256 = require('js-sha256')

class Blockchain {

  constructor(genesisBlock) {

    this.blocks = []
    this.addBlock(genesisBlock)
  }

  addBlock(block) {

    if(this.blocks.length == 0) {
      block.previousHash = "0000000000000000"
      block.hash = this.generateHash(block)
    }

    this.blocks.push(block)

  }

  generateHash(block) {

      let hash = sha256(block.key)
      return hash
  }

}

module.exports = Blockchain
