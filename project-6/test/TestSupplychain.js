// This script is designed to test the solidity smart contract - SuppyChain.sol -- and the various functions within
// Declare a variable and assign the compiled smart contract artifact
var SupplyChain = artifacts.require('SupplyChain')
const truffleAssert = require('truffle-assertions')

contract('SupplyChain', function(accounts) {
    // Declare few constants and assign a few sample accounts generated by ganache-cli
    var sku = 0
    var upc = 1
    const ownerID = accounts[0]
    const artistID = accounts[1]
    var musicID = sku + upc
    const musicNotes = "Rema Feat Ice Spice"
    const musicPrice = web3.utils.toWei("1", "ether");
    var musicState = 0
    const distributorID = accounts[2]
    const recordLabelID = accounts[3]
    const consumerID = accounts[4]
    const emptyAddress = '0x00000000000000000000000000000000000000'

    ///Available Accounts
    ///==================
    ///(0) 0x27d8d15cbc94527cadf5ec14b69519ae23288b95
    ///(1) 0x018c2dabef4904ecbd7118350a0c54dbeae3549a
    ///(2) 0xce5144391b4ab80668965f2cc4f2cc102380ef0a
    ///(3) 0x460c31107dd048e34971e57da2f99f659add4f02
    ///(4) 0xd37b7b8c62be2fdde8daa9816483aebdbd356088
    ///(5) 0x27f184bdc0e7a931b507ddd689d76dba10514bcb
    ///(6) 0xfe0df793060c49edca5ac9c104dd8e3375349978
    ///(7) 0xbd58a85c96cc6727859d853086fe8560bc137632
    ///(8) 0xe07b5ee5f738b2f87f88b99aac9c64ff1e0c7917
    ///(9) 0xbd3ff2e3aded055244d66544c9c059fa0851da44

    console.log("ganache-cli accounts used here...")
    console.log("Contract Owner: accounts[0] ", accounts[0])
    console.log("Artist: accounts[1] ", accounts[1])
    console.log("Distributor: accounts[2] ", accounts[2])
    console.log("Record Label: accounts[3] ", accounts[3])
    console.log("Consumer: accounts[4] ", accounts[4])

    // 1st Test
    it("Testing smart contract function makeMusic() that allows an artist to make music", async() => {
        const supplyChain = await SupplyChain.deployed();

        let tx = await supplyChain.makeMusic(sku, upc, artistID, musicID, musicNotes, { from: ownerID });
        let event = tx.logs[0].event
         // console.log(event) <--- just for testing, comment out later

        // Retrieve the just now saved item from blockchain by calling function fetchmusicBufferOnePartOne() and fetchmusicBufferOnePartTwo()
        const musicBuffer = await supplyChain.fetchmusicBufferOnePartOne.call(upc);
        const musicBuffer2 = await supplyChain.fetchmusicBufferOnePartTwo.call(upc);


        // Verify the result set
        assert.equal(musicBuffer[0], sku , "Error: Invalid SKU");
        assert.equal(musicBuffer[1], upc, "Error: Invalid UPC");
        assert.equal(musicBuffer[2], ownerID, "Error: Invalid Owner ID");
        assert.equal(musicBuffer[3], artistID, "Error: Invalid Artist ID");
        assert.equal(musicBuffer2[2], 0, "Error: Invalid Price");
        assert.equal(musicBuffer2[3], musicState, "Error: Invalid state");
        assert.equal(musicBuffer2[4], musicID, "Error: Invalid musicID");
        assert.equal(musicBuffer2[5], musicNotes, "Error: Invalid musicNotes");

        //assert.equal(eventEmitted, true, "Error: Event not emitted");
        assert.equal(event, "Made");
    });  

    // 2nd Test
    it("Testing smart contract function registerMusic() that allows an artist to register music", async() => {
        const supplyChain = await SupplyChain.deployed()
        
        // Mark the music as Registered by calling function registerMusic()
        //let art = await supplyChain.addArtist(artistID, { from: ownerID });
        let art = await supplyChain.addArtist(artistID);
        let tx = await supplyChain.registerMusic(upc, { from: artistID });
        let event = tx.logs[0].event
         // console.log(event) <--- just for testing, comment out later

        // Retrieve the just now saved item from blockchain by calling function fetchmusicBufferOnePartTwo()
        const result = await supplyChain.fetchmusicBufferOnePartTwo(upc);

        musicState++;

        // Verify the result set
        assert.equal(result[3], musicState, "Error: Invalid state");

        // Verify that the event was emitted
        assert.equal(event, "Registered");
        
    })    

    // 3rd Test
    it("Testing smart contract function verifyMusic() that allows record labels to verify music", async() => {
        const supplyChain = await SupplyChain.deployed()

        // Mark the music as Verified by calling function verifyMusic()
        let rec = await supplyChain.addRecordLabel(recordLabelID);
        let tx = await supplyChain.verifyMusic(upc, { from: recordLabelID });
        let event = tx.logs[0].event
         // console.log(event) <--- just for testing, comment out later

        // Retrieve the just now saved item from blockchain by calling function fetchmusicBufferOnePartTwo()
        const result = await supplyChain.fetchmusicBufferOnePartTwo(upc);

        musicState++;

        // Verify the result set
        assert.equal(result[3], musicState, "Error: Invalid state");

        // Verify that the event was emitted
        assert.equal(event, "Verified");
        
    })    

    // 4th Test
    it("Testing smart contract function promoteMusic() that record labels to promote music", async() => {
        const supplyChain = await SupplyChain.deployed()

        // Mark the music as Promoted by calling function promoteMusic()
        let tx = await supplyChain.promoteMusic(upc, { from: recordLabelID });
        let event = tx.logs[0].event

        // Retrieve the just now saved item from blockchain by calling function fetchmusicBufferOnePartTwo()
        const result = await supplyChain.fetchmusicBufferOnePartTwo(upc);

        musicState++;

        // Verify the result set
        assert.equal(result[3], musicState, "Error: Invalid state");

        // Verify that the event was emitted
        assert.equal(event, "Promoted");
          
    })    

    // 5th Test
    it("Testing smart contract function distributeMusic() that allows a distributor to distribute music", async() => {
        const supplyChain = await SupplyChain.deployed()

        // Mark the music as Distributed by calling function distributeMusic()
        let dist = await supplyChain.addDistributor(distributorID, { from: ownerID })
        let tx = await supplyChain.distributeMusic(upc, { from: distributorID });
        let event = tx.logs[0].event

        // Retrieve the just now saved item from blockchain by calling function fetchmusicBufferOnePartTwo()
        const result = await supplyChain.fetchmusicBufferOnePartTwo(upc);

        musicState++;

        // Verify the result set
        assert.equal(result[3], musicState, "Error: Invalid state");

        // Verify that the event was emitted
        assert.equal(event, "Distributed");

    })    

    // 6th Test
    it("Testing smart contract function sellMusic() that allows a distributor to sell music", async() => {
        const supplyChain = await SupplyChain.deployed()

        // Mark the music as ForSale by calling function sellMusic()
        let tx = await supplyChain.sellMusic(upc,musicPrice, { from: distributorID });
        let event = tx.logs[0].event

       // Retrieve the just now saved item from blockchain by calling function fetchmusicBufferOnePartTwo()
        const result = await supplyChain.fetchmusicBufferOnePartTwo(upc);

        musicState++;

        // Verify the result set
        assert.equal(result[2], musicPrice, "Error: Invalid price");
        assert.equal(result[3], musicState, "Error: Invalid state");

        // Verify that the event was emitted
        assert.equal(event, "ForSale");

    })    

    // 7th Test
    it("Testing smart contract function buyMusic() that allows a consumer to mark music as bought", async() => {
        const supplyChain = await SupplyChain.deployed()

        // Mark the music as Bought by calling function buyMusic()
        //let cons = await supplyChain.addConsumer(consumerID, { from: ownerID })
        let cons = await supplyChain.addConsumer(consumerID)
        let tx = await supplyChain.buyMusic(upc, {from: consumerID, value: musicPrice});
        let event = tx.logs[0].event

       // Retrieve the just now saved item from blockchain by calling function fetchmusicBuffer()
        const result1 = await supplyChain.fetchmusicBufferOnePartOne(upc);
        const result2 = await supplyChain.fetchmusicBufferOnePartTwo(upc);
        const result3 = await supplyChain.fetchmusicBufferOnePartThree(upc);

        musicState++;

        // Verify the result set
        //assert.equal(result1[2], distributorID, "Error: Invalid owner ID");
        assert.equal(result2[3], musicState, "Error: Invalid state");
        //assert.equal(result3[3], distributorID, "Error: Invalid distributor ID");

        // Verify that the event was emitted
        assert.equal(event, "Bought");
             
    })    

    // 8th Test
    it("Testing smart contract function listenToMusic() that allows a consumer to listen to music", async() => {
        const supplyChain = await SupplyChain.deployed()

        // Mark the music as Bought by calling function buyMusic()
        //let cons = await supplyChain.addConsumer(consumerID, { from: ownerID })
        let tx = await supplyChain.listenToMusic(upc, { from: consumerID });
        let event = tx.logs[0].event

        // Retrieve the just now saved item from blockchain by calling function fetchmusicBufferOnePartTwo()
        const result = await supplyChain.fetchmusicBufferOnePartTwo(upc);

        musicState++;

        // Verify the result set
        assert.equal(result[3], musicState, "Error: Invalid state");

        // Verify that the event was emitted
        assert.equal(event, "Listened");
        
    })    

    // 9th Test
    it("Testing smart contract function fetchmusicBufferOnePartOne() that allows anyone to fetch details from blockchain", async() => {
        const supplyChain = await SupplyChain.deployed()

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const result = await supplyChain.fetchmusicBufferOnePartOne.call(upc);
        
        // Verify the result set:
        assert.equal(result[0], sku, "Error: Invalid SKU");
        assert.equal(result[1], upc, "Error: Invalid UPC");
        //assert.equal(result[2], ownerID, "Error: Invalid Owner ID");
        assert.equal(result[3], artistID, "Error: Invalid Artist ID");
        
    })

    // 10th Test
    it("Testing smart contract function fetchmusicBufferOnePartTwo() that allows anyone to fetch details from blockchain", async() => {
        const supplyChain = await SupplyChain.deployed()

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const result = await supplyChain.fetchmusicBufferOnePartTwo(upc);
        
        // Verify the result set:
        assert.equal(result[0], sku, "Error: Invalid SKU");
        assert.equal(result[1], upc, "Error: Invalid UPC");
        assert.equal(result[2], musicPrice, "Error: Invalid music price");
        assert.equal(result[3], musicState, "Error: Invalid music state");
        assert.equal(result[4], musicID, "Error: Invalid music ID");
        assert.equal(result[5], musicNotes, "Error: Invalid music notes");
    })

    // 12th Test
    it("Testing smart contract function fetchmusicBufferOnePartThree() that allows anyone to fetch details from blockchain", async() => {
        const supplyChain = await SupplyChain.deployed()

       // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const result = await supplyChain.fetchmusicBufferOnePartThree(upc);
        
        // Verify the result set:
        assert.equal(result[0], sku, "Error: Invalid SKU");
        assert.equal(result[1], upc, "Error: Invalid UPC");
        assert.equal(result[2], artistID, "Error: Invalid artistID");
        //assert.equal(result[3], distributorID, "Error: Invalid distributorID");
        //assert.equal(result[4], recordLabelID, "Error: Invalid recordLabelID");
        //assert.equal(result[5], consumerID, "Error: Invalid consumerID");
    })

});

