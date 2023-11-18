App = {
    web3Provider: null,
    contracts: {},
    emptyAddress: "0x0000000000000000000000000000000000000000",
    sku: 0,
    upc: 0,
    metamaskAccountID: "0x0000000000000000000000000000000000000000",
    ownerID: "0x0000000000000000000000000000000000000000",
    artistID: "0x0000000000000000000000000000000000000000",
    musicPrice: 0,
    distributorID: "0x0000000000000000000000000000000000000000",
    recordLabelID: "0x0000000000000000000000000000000000000000",
    consumerID: "0x0000000000000000000000000000000000000000",
    musicID: 0,
    musicNotes: "notes",

    init: async function () {
        App.readForm();
        /// Setup access to blockchain
        return await App.initWeb3();
    },

    readForm: function () {
        App.sku = $("#sku").val();
        App.upc = $("#upc").val();
        App.ownerID = $("#ownerID").val();
        App.artistID = $("#artistID").val();
        App.musicPrice = $("#musicPrice").val();
        App.musicState = $("#musicState").val();
        App.distributorID = $("#distributorID").val();
        App.recordLabelID = $("#recordLabelID").val();
        App.consumerID = $("#consumerID").val();
        App.musicID = $("#musicID").val();
        App.musicNotes = $("#musicNotes").val();

        console.log(
            App.sku,
            App.upc,
            App.ownerID, 
            App.artistID, 
            App.musicPrice, 
            App.musicState, 
            App.distributorID, 
            App.recordLabelID, 
            App.consumerID,
            App.musicID,
            App.musicNotes
        );
    },

    initWeb3: async function () {
        /// Find or Inject Web3 Provider
        /// Modern dapp browsers...
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            try {
                // Request account access
                await window.ethereum.enable();
            } catch (error) {
                // User denied account access...
                console.error("User denied account access")
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
        }
        // If no injected web3 instance is detected, fall back to Ganache
        else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        }

        App.getMetaskAccountID();

        return App.initSupplyChain();
    },

    getMetaskAccountID: function () {
        web3 = new Web3(App.web3Provider);

        // Retrieving accounts
        web3.eth.getAccounts(function(err, res) {
            if (err) {
                console.log('Error:',err);
                return;
            }
            console.log('getMetaskID:',res);
            App.metamaskAccountID = res[0];

        })
    },

    initSupplyChain: function () {
        /// Source the truffle compiled smart contracts
        var jsonSupplyChain='../../build/contracts/SupplyChain.json';
        
        /// JSONfy the smart contracts
        $.getJSON(jsonSupplyChain, function(data) {
            console.log('data',data);
            var SupplyChainArtifact = data;
            App.contracts.SupplyChain = TruffleContract(SupplyChainArtifact);
            App.contracts.SupplyChain.setProvider(App.web3Provider);
            
            App.fetchmusicBufferOnePartOne();
            App.fetchmusicBufferOnePartTwo();
            App.fetchmusicBufferOnePartThree();
            App.fetchEvents();

        });

        return App.bindEvents();
    },

    bindEvents: function() {
        $(document).on('click', App.handleButtonClick);
    },

    handleButtonClick: async function(event) {
        event.preventDefault();

        App.getMetaskAccountID();

        var processId = parseInt($(event.target).data('id'));
        console.log('processId',processId);

        switch(processId) {
            case 1:
                return await App.makeMusic(event);
                break;
            case 2:
                return await App.registerMusic(event);
                break;
            case 3:
                return await App.verifyMusic(event);
                break;
            case 4:
                return await App.promoteMusic(event);
                break;
            case 5:
                return await App.distributeMusic(event);
                break;
            case 6:
                return await App.sellMusic(event);
                break;
            case 7:
                return await App.buyMusic(event);
                break;
            case 8:
                return await App.listenToMusic(event);
                break;
            case 9:
                return await App.fetchmusicBufferOnePartOne(event);
                break;
            case 10:
                return await App.fetchmusicBufferOnePartTwo(event);
                break;
            case 11:
                return await App.fetchmusicBufferOnePartThree(event);
                break;
            }
    },

    makeMusic: function(event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.makeMusic(
                App.sku,
                App.upc, 
                App.metamaskAccountID, 
                App.musicID, 
                App.musicNotes,
                { from: App.metamaskAccountID }
            );
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('makeMusic',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    registerMusic: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.registerMusic(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('registerMusic',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    verifyMusic: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.verifyMusic(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('verifyMusic',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },
    
    promoteMusic: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.promoteMusic(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('promoteMusic',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    distributeMusic: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.distributeMusic(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('distributeMusic',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    sellMusic: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            const productPrice = web3.toWei(1000000, "gwei");
            console.log('musicPrice',musicPrice);
            return instance.sellMusic(App.upc, App.musicPrice, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('sellMusic',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    buyMusic: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            const walletValue = web3.toWei(2000000, "gwei");
            return instance.buyMusic(App.upc, {from: App.metamaskAccountID, value: walletValue});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('buyMusic',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    listenToMusic: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.listenToMusic(App.upc, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('listenToMusic',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    fetchmusicBufferOnePartOne: function () {
    ///   event.preventDefault();
    ///    var processId = parseInt($(event.target).data('id'));
        App.upc = $('#upc').val();
        console.log('upc',App.upc);

        App.contracts.SupplyChain.deployed().then(function(instance) {
          return instance.fetchmusicBufferOnePartOne(App.upc);
        }).then(function(result) {
          $("#ftc-item").text(result);
          console.log('fetchmusicBufferOnePartOne', result);
        }).catch(function(err) {
          console.log(err.message);
        });
    },

    fetchmusicBufferOnePartTwo: function () {
    ///    event.preventDefault();
    ///    var processId = parseInt($(event.target).data('id'));
                        
        App.contracts.SupplyChain.deployed().then(function(instance) {
          return instance.fetchmusicBufferOnePartTwo.call(App.upc);
        }).then(function(result) {
          $("#ftc-item").text(result);
          console.log('fetchmusicBufferOnePartTwo', result);
        }).catch(function(err) {
          console.log(err.message);
        });
    },

    fetchmusicBufferOnePartThree: function () {
    ///    event.preventDefault();
    ///    var processId = parseInt($(event.target).data('id'));
                        
        App.contracts.SupplyChain.deployed().then(function(instance) {
          return instance.fetchmusicBufferOnePartThree.call(App.upc);
        }).then(function(result) {
          $("#ftc-item").text(result);
          console.log('fetchmusicBufferOnePartThree', result);
        }).catch(function(err) {
          console.log(err.message);
        });
    },

    fetchEvents: function () {
        if (typeof App.contracts.SupplyChain.currentProvider.sendAsync !== "function") {
            App.contracts.SupplyChain.currentProvider.sendAsync = function () {
                return App.contracts.SupplyChain.currentProvider.send.apply(
                App.contracts.SupplyChain.currentProvider,
                    arguments
              );
            };
        }

        App.contracts.SupplyChain.deployed().then(function(instance) {
        var events = instance.allEvents(function(err, log){
          if (!err)
            $("#ftc-events").append('<li>' + log.event + ' - ' + log.transactionHash + '</li>');
        });
        }).catch(function(err) {
          console.log(err.message);
        });
        
    }
};

$(function () {
    $(window).load(function () {
        App.init();
    });
});
