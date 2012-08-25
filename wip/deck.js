var Deck = function() {
    this.deck = [];
    this.primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41];

    // Gets a rank (0-12) for a specific card format
    this.rank = function(x) {
        return ((x >> 8) & 0xF); 
    };
};

// Initialise deck with formatted cards
Deck.prototype.init = function() {
    var i, j, n=0, suit = 0x8000;

    for(var i=0; i<4; i++, suit >>= 1) {
        for(var j=0; j<13; j++, n++) {
            this.deck[n] = this.primes[j] | (j << 8) | suit | (1 << (16+j));
        }
    }
};

// Given a rank/suit, give index in deck of that card
Deck.prototype.findCard = function(rank, suit) {
    for(var i=0; i<52; i++) {
        var c = this.deck[i];
        if( (c & suit) && this.rank(c)==rank)
            return i;
    }
    return -1;
};

// Shuffle Deck
Deck.prototype.shuffle = function() {
    var num = 52*4;
    for(var i=0; i<num; i++) {
        var a = Math.floor(Math.random()*52);
        do {
            var b = Math.floor(Math.random()*52);
        } while( a == b );
        var tmp = this.deck[a];
        this.deck[a] = this.deck[b];
        this.deck[b] = tmp;
    }
};

Deck.prototype.debug = function() {
    console.log(this.deck);
};

module.exports.create = function() {
    return new Deck();
};
