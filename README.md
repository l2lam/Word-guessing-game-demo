# What is this project about?

This is a demonstration project used to teach programming by iteratively building a simple **phrase-guessing game** from scratch using the `P5.js` libraries.

# Who is this project for?

Students who are being introduced to these computer programming concepts:

- variables
- arrays
- loops
- classes

# Game design and psuedocode

## Overview

- There are `n` phrases to choose from
- The game ends when all the phrases have been played
- Phrases are choosen at random in each round (level), without repeating
- Phrases can be a `word`, `phrase`, `equation`
- One player only
- Player guesses one letter/character at a time
- Player starts with `k` lives per level/puzzle
- A life is lost everytime an incorrect character is guessed
- When all lives are lost, the level is considered unsuccessful and the game moves to the next puzzle

## Scoring

- A per-character score is awarded to each correct letter/character guessed
- A per-character score is deducted from the score for each incorrect letter/character guessed
- When a level is unsuccessful, the score is reset to zero
- Player can spin for a new (random) per-character score before each guess

# How to play the game

Players try to guess the hidden phrase by guessing one letter/character at a time by typing the character on the keyboard.
Special characters and their functions:

- `F2` - Restart the game
- `F4` - Spin for points

# Features

- [x] Basic phrase guessing, revealing correct guesses
- [x] Game over state
  - [x] End game when too many penalties
- [x] Levels scheme
  - [ ] Rewards for points milestones
- [x] Scoring/points scheme
- [x] Points selection scheme
- [x] Sound effects
- [x] Penalties scheme
  - [x] Unlucky spin penalties
- [ ] Game modes
  - [x] General mode
  - [x] Grade One mode
  - [ ] Unlockable hidden mode
  - [ ] Multi-player mode
- [ ] Touchscreen-only support
