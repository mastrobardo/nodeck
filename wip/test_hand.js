var H = require('./hand.js');
var D = require('./deck.js');
var S = require('./seat.js');

var deck = D.create();
var NUM_PLAY = 5;
var START_CHIPS = 5000;

var start = new Date();
var i, seats = [];
for(i=1; i<=NUM_PLAY; i++) {
    seats.push(S.create("Player "+i, START_CHIPS));
}

var h = H.create(seats, deck, 100, 1);
console.log('Start state:');
for(var i=0; i<5; i++) {
    h.debug();
    console.log('Round '+(i+1));
    h.nextRound();
}
var end = new Date();
console.log('Time: '+(end-start)+'ms');
