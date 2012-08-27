/**
 * round value:
 * - 0 = ready to start
 * - 1 = Hole cards
 * - 2 = Flop
 * - 3 = Turn
 * - 4 = River
 * - 5 = Cleanup
 */

var Hand = function(seats, deck, big_blind, button_position) {
    this.seats = seats || [];
    this.deck = deck;
    this.deck.init();
    this.deck.shuffle();
    this.blinds = { big: big_blind, small: big_blind/2 };
    this.button_position = button_position;
    this.round = 0;
    this.board = [];
    this.burnt = [];

    this.startHand = function() {
        // Init seats, and deal hole cards
        for(var co=0; co<2; co++) {
            for(var i in this.seats) {
                this.seats[i].dealCard(this.deck);
            }
        }
    };

    this.dealToBoard = function(num) {
        this.burnt.push(this.deck.getCard());
        for(var i=0; i<num; i++) {
            this.board.push(this.deck.getCard());
        }
    };

    this.doFlop = function() {
        // Burn a card, and deal 3 cards to board
        this.dealToBoard(3);
        // Clean up seats
    };

    this.doTurnRiver = function() {
        // Burn a card and add 1 card to board
        this.dealToBoard(1);
        // Clean up seats
    };

    this.doCleanup = function() {
        // Sort out winners, pay pots etc
        var outcomes = [];
        var winner = [];
        var winval = 9999;
        for(var i=0; i<this.seats.length; i++) {
            var tmp = this.board.concat(this.seats[i].getHole());
            var val = this.deck.eval7Hand(tmp);
            outcomes.push(deck.handRank(val));
            if(val<winval) {
                winner = [];
                winval = val;
            }
            if(val<=winval) {
                winner.push(i);
            }
        }
        for(var w in winner) {
            outcomes[winner[w]] += ' **WIN**';
        }
        this.debug(outcomes);
    }
};

Hand.prototype.nextRound = function() {
    if(this.round<5) { this.round++; }
    // ?? Should this just be an array of "callback" functions and call funcs[this.round] ?
    switch(this.round) {
        case 1:
            this.startHand();
            break;
        case 2:
            this.doFlop();
            break;
        case 3:
        case 4:
            this.doTurnRiver();
            break;
        case 5:
            this.doCleanup();
            break;
        default:
            console.log('Game is over');            
    }
}

module.exports.create = function(seats, deck, big_blind, button_position) {
    return new Hand(seats, deck, big_blind, button_position);
};

// =============== Debug methods ====================

Hand.prototype.debug = function(outcomes) {
    var showOutcomes = (typeof(outcomes)!=='undefined');
    /*
    console.log("Num seats: " +this.seats.length);
    console.log("Button: " + this.button_position);
    console.log("Blinds: " + this.blinds.big + '/' + this.blinds.small);
    console.log("State: " + this.round);
    */
    console.log("Cards in deck: (" + this.deck.cardsLeft()+") " + this.deck.showAvailable());
    console.log("Board: " + this.deck.print(this.board)+', Burnt: '+this.deck.print(this.burnt));
    for(var s=0; s<this.seats.length; s++) {
        var oc = showOutcomes ? ' = '+outcomes[s] : '';
        this.seats[s].debugShort(this.deck, oc);
    }
}
