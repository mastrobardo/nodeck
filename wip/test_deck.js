var DD = require('./deck.js');

var deck = DD.create();
deck.init();
deck.shuffle();
//console.log(deck.findCard(0,0x1000));
// Test hand printer

// Stress test
var num = 130000;
var show = false;
var totest = [];
for(var co=0; co<num; co++) {
    deck.init();
    deck.shuffle();
    var hand = [];
    for(i=0; i<7; i++) {
        hand.push(deck.getCard(i));
    }
    totest.push(hand);
}

console.log('Starting to process '+num+' hands');
var done = [];
var startTime = new Date();
for(var co=0; co<num; co++) {
    var hand = totest[co];
    var tmp = deck.eval7Hand(hand);
    done[co] = deck.print(hand)+' = '+deck.handRank(tmp);
}
var endTime = new Date();
if(show) {
    for(var co=0; co<num; co++) {
        console.log(co+': '+done[co]);
    }
}
console.log('Time: '+(endTime-startTime));
console.log('Total processed: '+done.length);