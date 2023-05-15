const ANIMAL = "Animal"
const MATH = "Math"
const RHYMES = "Rhymes"
const SONG = "Song"
const PALINDROME = "Palindrome"
const JOB = "Job"
const NUMBER = "Number"

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
	new Phrase("giraffe", "long neck", ANIMAL),
	new Phrase("python", "snake", ANIMAL),
	new Phrase("great horn owl", "who", ANIMAL),
	new Phrase("fox", "ding ding ding", ANIMAL),

	new Phrase("12 + 13 = 25", "math!", MATH),
	new Phrase("52 - 55 = -3", "math!", MATH),
	new Phrase("20 mod 7 = 6", "remainder", MATH),
	new Phrase("20 mod 7 = 6", "remainder", MATH),
]

let gradeOnePhrases = [
	new Phrase("dog", "woof", ANIMAL),
	new Phrase("cat", "meow", ANIMAL),
	new Phrase("pig", "oink", ANIMAL),
	new Phrase("giraffe", "long neck", ANIMAL),
	new Phrase("python", "slithers", ANIMAL),
	new Phrase("fox", "ding ding ding", ANIMAL),
	new Phrase("cow", "moo", ANIMAL),
	new Phrase("skunk", "stinky", ANIMAL),

	new Phrase("row row row your boat", "water", SONG),
	new Phrase("mary had a little lamb", "fleece was white as snow", SONG),
	new Phrase("old macdonald had a farm", "animals", SONG),
	new Phrase("twinkle twinkle little star", "how I wonder what you are", SONG),
	new Phrase("blinked by the light", "The Weekend", SONG),

	new Phrase("astronaut", "spaceman", JOB),
	new Phrase("firemen", "fights fire", JOB),
	new Phrase("teacher", "school", JOB),
	new Phrase("farmer", "grows food", JOB),
	new Phrase("dentist", "fixes teeth", JOB),

	new Phrase("one", "less than two", NUMBER),
	new Phrase("two", "even", NUMBER),
	new Phrase("three", "odd", NUMBER),
	new Phrase("four", "even", NUMBER),
	new Phrase("five", "odd", NUMBER),
	new Phrase("six", "two times three", NUMBER),
	new Phrase("seven", "odd", NUMBER),
	new Phrase("eight", "even", NUMBER),
	new Phrase("nine", "largest odd digit", NUMBER),
	new Phrase("ten", "rhymes with pen", NUMBER),

	new Phrase("2 + 3 = 5", "math!", MATH),
	new Phrase("7 + 7 = 14", "math!", MATH),
	new Phrase("2 - 2 = 0", "math!", MATH),
	new Phrase("9 + 9 = 18", "math!", MATH),
	new Phrase("2 - 5 = -3", "math!", MATH),
	new Phrase("5 - 5 = 0", "math!", MATH),
	new Phrase("1 - 5 = -4", "math!", MATH),
	new Phrase("6 + 5 = 11", "math!", MATH),
]
