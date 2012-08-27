var DD = require('./deck.js');

// Test dealing cards
function testDeal(deck) {
    deck.init();
    deck.shuffle();
    var tmphand = [];
    for(var co=0; co<20; co++) {
        tmphand.push(deck.getCard());
    }
    console.log(deck.print(tmphand));
}

// Stress test
function testProcess(deck, num, show) {
    deck.init();
    deck.shuffle();
    num = num || 130000;
    show = show || false;
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
    var val = [];
    var startTime = new Date();
    for(var co=0; co<num; co++) {
        var hand = totest[co];
        var tmp = deck.eval7Hand(hand);
        done[co] = deck.print(hand)+' = '+deck.handRank(tmp);
        val[co] = tmp;
    }
    var endTime = new Date();
    if(show) {
        for(var co=0; co<num; co++) {
            if(val[co]<2468) {
                console.log(co+': '+done[co]);
            }
        }
    }
    console.log('Time: '+(endTime-startTime));
    console.log('Total processed: '+done.length);
}

var deck = DD.create();
testDeal(deck);
testProcess(deck);
