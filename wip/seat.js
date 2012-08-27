/**
 * State = flag bits:
 * -(1) 0 bit = In/out
 * -(2) 1 bit = Live / fold
 * -(4) 2 bit = All / in
 *
 */
var Seat = function(player, chip_count) {
    this.player = player;
    this.chips = { 
            available:chip_count,
            committed:0
            };
    this.state = 9;

    this.commitChips = function(chip_count) {
        this.chips.available -= chip_count;
        this.chips.committed += chip_count;
    };

    this.getAvailableChips = function() {
        return this.chips.available;
    };
};

Seat.Prototype.toCall = function(total) {
    var callAmt = (total-this.chips.committed);
    var canCommit = Math.min(callAmt, this.chips.available);
};

Seat.prototype.callBet = function(totalAmt) {
    var callAmt = this.toCall(totalAmt);
    if(callAmt>0) {
        this.commitChips(callAmt);
        if(this.getAvailableChips() == 0) {
            this.state |= 4;
        }
    }
}

module.exports.create = function(player, chip_count) {
    return new Seat(player, chip_count);
};
