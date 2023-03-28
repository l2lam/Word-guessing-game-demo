function getTenPlusPhrases() {
  let
}

function getPhrases() {

}

function readFile(event) {
  let csv
  let file = event.target.files[0]
  
  const reader = new FileReader();
  reader.addEventListener('load', (event) => {
    csv = event.target.result;
    //console.log(csv)
    csvToPhrase(csv)
  });
  reader.readAsText(file);
}

let toPhrase = function(value, state) {
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

let logPhrases = function(data) {
  data.forEach((phrase) => {
    phrase = new Phrase(phrase[0], phrase[1], phrase[2])
  })
  console.log(data)
}

function csvToPhrase(csv) {
  var phrases = $.csv.toArray(csv, { onPostParse: logPhrases })
  
}