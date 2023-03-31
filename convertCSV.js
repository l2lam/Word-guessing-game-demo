class CsvPhraseImporter {

  phrases = []

  fileName = ""
  
  constructor(event) {
    this.readFile(event)
  }
  
  readFile(event) {
    let file = event.target.files[0]
    this.fileName = event.target.files[0].name
    
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      //console.log(csv)
      this.csvToPhrase(event.target.result)
    });
    reader.readAsText(file);
  }
  
  csvToPhrase(result) {
    let rawParseResults = Papa.parse(result)
    rawParseResults.data.forEach((column) => {
      this.phrases.push(new Phrase(column[0], column[1], column[2]))
    })
  }
}

let phraseImporters = []

function addNewCsvPhraseList(event) {
  let importer = new CsvPhraseImporter(event)
  let option = document.createElement("option")
  option.text = importer.fileName
  file_selector.add(option)
  phraseImporters.push(importer.phrases)
  console.log("phrase importers: ", phraseImporters)
}