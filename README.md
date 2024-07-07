# https://sites.google.com/view/ayokoladeerinlesportfolio/projects/blockchain-supply-chain

The DApp User Interface when running should look like...

![truffle test](images/view1.png)

![truffle test](images/view2.png) 


### Installing


```
cd project-6
npm install
```

Launch Ganache by opening GUI

In a terminal window, Compile smart contracts and test them by using:

```
truffle compile
truffle test
```

Your terminal should look something like this:

![truffle test](images/terminalview.png)

This will create the smart contract artifacts in folder ```build\contracts```.

Migrate smart contracts to the locally running blockchain, ganache-cli:

```
truffle migrate
```

Your terminal should look something like this:

![truffle test](images/deploy1.png)
![truffle test](images/deploy2.png)


In a separate terminal window, launch the DApp:

```
npm run dev
```

## Built With

* [Ethereum](https://www.ethereum.org/) - Ethereum is a decentralized platform that runs smart contracts
* [IPFS](https://ipfs.io/) - IPFS is the Distributed Web | A peer-to-peer hypermedia protocol
to make the web faster, safer, and more open.
* [Truffle Framework](http://truffleframework.com/) - Truffle is the most popular development framework for Ethereum with a mission to make your life a whole lot easier.


## Authors

See also the list of [contributors](https://github.com/your/project/contributors.md) who participated in this project.

## Acknowledgments

* Solidity
* Ganache-cli
* Truffle
* IPFS
