const ANIMAL = "Animal";
const MATH = "Math";
const RHYMES = "Rhymes";
const SONG = "Song";
const PALINDROME = "Palindrome";

let standardPhrases = [
  new Phrase("kayak", "water", PALINDROME),
  new Phrase("rotator", "circular", PALINDROME),
  new Phrase("wow", "impressed", PALINDROME),
  new Phrase("racecar", "wroom wroom", PALINDROME),
  new Phrase("step on no pets", "", PALINDROME),
  new Phrase("never odd or even", "", PALINDROME),
  
  new Phrase("fox in a box", "starts with f", RHYMES),
  new Phrase("cat in the hat", "Dr. Seuss", RHYMES),
  new Phrase("all you need is love", "Beatles", SONG),
  new Phrase("what does the fox say?", "Ylvis", SONG),
  new Phrase("don't worry be happy", "Bobby McFerrin", SONG),
  new Phrase("all i want for christmas", "Mariah Carey", SONG),
  new Phrase("zombie", "Cranberries", SONG),
  new Phrase("dog", "woof", ANIMAL),
  new Phrase("cat", "meow", ANIMAL),
  new Phrase("pig", "oink", ANIMAL),
  new Phrase("giraffe", "???", ANIMAL),
  new Phrase("python", "???", ANIMAL),
  new Phrase("great horn owl", "who", ANIMAL),
  new Phrase("fox", "ding ding ding", ANIMAL),
  new Phrase("2 + 3 = 5", "math!", MATH),
  new Phrase("2 - 2 = 0", "math!", MATH),
  new Phrase("9 + 9 = 18", "math!", MATH),
  new Phrase("2 - 5 = -3", "math!", MATH),];
