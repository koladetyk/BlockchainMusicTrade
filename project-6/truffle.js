const HDWalletProvider = require("truffle-hdwallet-provider");
const infuraKey = "a5a6be766c1245eda4c925fba44e8368";
const mnemonic = "bread book banner toy during mix muscle sack dilemma staff label brick";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    sepolia: {
      provider: () => new HDWalletProvider(mnemonic, `https://sepolia.infura.io/v3/${infuraKey}`),
      network_id: 11155111, // Sepolia's network ID
      gas: 4000000, // Adjust the gas limit as per your requirements
      gasPrice: 10000000000, // Set the gas price to an appropriate value
      confirmations: 2, // Set the number of confirmations needed for a transaction
      timeoutBlocks: 200, // Set the timeout for transactions
      skipDryRun: true // Skip the dry run option
    }
  },
  compilers: {
    solc: {
      version: "0.4.24"
    }
  }
};
