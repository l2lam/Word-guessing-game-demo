class CsvPhraseImporter {

  phrases = []

  fileName = ""
  
  constructor(event) {
    this.readFile(event)
  }
  
  readFile(event) {

    // Since there is only one file able to be inputted at a time, index 0 is the only array index
    let file = event.target.files[0]
    this.fileName = event.target.files[0].name
    
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      this.csvToPhrase(event.target.result)
    });
    reader.readAsText(file);
  }
  
  csvToPhrase(result) {
    let rawParseResults = Papa.parse(result)

    /*
      Note: gets each *column* from each *row*
    */
    rawParseResults.data.forEach((column) => {
      this.phrases.push(new Phrase(column[0], column[1], column[2]))
    })
  }
}

let phraseImporters = [standardPhrases]

function addNewCsvPhraseList(event) {
  let importer = new CsvPhraseImporter(event)

  // Creates an option in the html document and adds it to the selector
  let option = document.createElement("option")
  option.text = importer.fileName
  file_selector.add(option)
  
  phraseImporters.push(importer.phrases)
}