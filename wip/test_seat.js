var S = require('./seat.js');
var D = require('./deck.js');

function testNewSeat() {
    var s = S.create("Test",5000);
    s.debug();
}

function testGetAvailable() {
    var s = S.create("Test",5432);
    console.log('Available: '+s.getAvailableChips());
}

function testDealHoleCards() {
    var s = S.create("Test",5000);
    var d = D.create();
    d.init();
    d.shuffle();

    for(var i=0; i<2; i++) {
        s.dealCard(d);
    }

    s.debug(d);
}

testNewSeat();
testGetAvailable();
testDealHoleCards();
