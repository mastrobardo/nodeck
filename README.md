nodeck
======

Node version of Cactus Kev Poker algorithm

WIP:
====

So far running "node test_hand.js" simulates 5 players in a hand, through the hand states of "init", "hole cards", "flop", "turn", "river" and "showdown"

Right now it does not handle betting mechanics, although some initial methods are in place. It also only handles a full showdown with river, and assumes all 5 players are in.

Next stages will be to allow folding, and betting, and adding gameplay mechanics to the cleanup method, before wrapping it all in a game runner.

Once that is done, some form of networking will come next, with a player client that shows their hand, the hand status (pot, bets etc)
