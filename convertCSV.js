class CsvPhraseImporter {
  constructor(event) {
    this.readFile(event)
  }
  
  readFile(event) {
    let file = event.target.files[0]
    
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      //console.log(csv)
      this.phrase = this.csvToPhrase(event.target.result)
    });
    reader.readAsText(file);
  }
  
  toPhrase = function(value, state) {
    console.log("hello?")
    switch (state.colNum) {
      case 1:
        var word = value
        return false
      case 2:
        var hint = value
        return false
      case 3:
        var category = value
        return new Phrase(word, hint, category)
      default:
        console.log("entered default of toPhrase function")
        return false
    }
  }
  logPhraseEntries = function(data) {
    data.forEach((phrase) => {
      phrase = new Phrase(phrase[0], phrase[1], phrase[2])
    })
    console.log(data)
  }
  csvToPhrase(result) {
    var phrases = $.csv.toArray(result, { onParseValue: this.toPhrase })
  }
  
}

let phraseImporters = []

function addNewCsvPhraseList(event) {
  setOfPhraseImporters.push(new CsvPhraseList(event))
}