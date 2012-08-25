var DD = require('./deck.js');

var deck = DD.create();
deck.init();
deck.shuffle();
deck.debug();
console.log(deck.findCard(0,0x1000));
