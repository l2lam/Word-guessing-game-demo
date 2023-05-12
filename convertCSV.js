class CsvPhraseImporter {
	phrases = []

	fileName = ""

	constructor(file) {
		this.readFile(file)
	}

	readFile(file) {
		// Since there is only one file able to be inputted at a time, index 0 is the only array index
		// let file = event.target.files[0]
		this.fileName = file.name //event.target.files[0].name

		const reader = new FileReader()
		reader.addEventListener("load", (event) => {
			this.csvToPhrase(event.target.result)
		})
		reader.readAsText(file)
	}

	csvToPhrase(result) {
		let rawParseResults = Papa.parse(result)

		/*
      Note: gets each *column* from each *row*
    */
		rawParseResults.data.forEach((row) => {
			this.phrases.push(new Phrase(row[0], row[1], row[2]))
		})
	}
}
