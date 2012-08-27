var Seat = function(player, chip_count) {
    this.player = player;
    this.chips = { 
            available:chip_count,
            committed:0
            };
    this.hole = [];
    this.active = true;
    this.folded = false;
    this.allIn = false;

    this.commitChips = function(chip_count) {
        this.chips.available -= chip_count;
        this.chips.committed += chip_count;
    };

};

Seat.prototype.setActive = function(state) { this.active = state; };
Seat.prototype.isActive = function() { return this.active; };
Seat.prototype.setFolded = function(state) { this.folded = state; };
Seat.prototype.isFolded = function() { return this.folded; };
Seat.prototype.setAllIn = function() { this.allIn = true; };
Seat.prototype.isAllIn = function() { return this.allIn; };

Seat.prototype.prepareToPlay = function() {
    this.active = (this.chips.available>0);
    this.folded = false;
    this.allIn = false;
    this.hole = [];
};

Seat.prototype.getAvailableChips = function() {
    return this.chips.available;
};

Seat.prototype.toCall = function(total) {
    var callAmt = (total-this.chips.committed);
    var canCommit = Math.min(callAmt, this.chips.available);
};

Seat.prototype.winChips = function(amt) {
    this.chips.available += amt;
};

Seat.prototype.takeCommittedChips = function() {
    var tmp = this.chips.committed;
    this.chips.committed = 0;
    return tmp;
};

Seat.prototype.callBet = function(totalAmt) {
    var callAmt = this.toCall(totalAmt);
    if(callAmt>0) {
        this.commitChips(callAmt);
        if(this.getAvailableChips() === 0) {
            this.setAllIn();
        }
    }
};

Seat.prototype.dealCard = function(deck) {
    this.hole.push(deck.getCard());
};

Seat.prototype.getHole = function() {
    return this.hole;
};

module.exports.create = function(player, chip_count) {
    return new Seat(player, chip_count);
};

// ================ Debug methods =====================

Seat.prototype.debug = function(deck) {
    console.log('================');
    console.log('Player: '+this.player);
    console.log('Chips: ');
    console.log('  Available: '+this.chips.available);
    console.log('  Committed: '+this.chips.committed);
    if(this.hole.length > 0) {
        console.log('Hole: '+deck.print(this.hole));
    } else {
        console.log('Hole: NONE');
    }
    console.log('Folded: '+this.folded+', Active: '+this.active+', All-in: '+this.allIn);
};

Seat.prototype.debugShort = function(deck, outcome) {
    var out = [ 
        this.player+': ' + ((this.hole.length>0) ? deck.print(this.hole) : 'NONE'),
        '('+this.chips.committed+'/'+this.chips.available+')'+outcome
    ];
    console.log(out.join(', '));
};
