var DD = require('./deck.js');

var deck = DD.create();
deck.init();
deck.shuffle();
console.log(deck.findCard(0,0x1000));
// Test hand printer
var hand = [];
for(i=0; i<5; i++) {
    hand.push(deck.getCard(i));
}
console.log(hand);
deck.print(hand);
