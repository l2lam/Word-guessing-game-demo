function readFile(event) {
  let file = event.target.files[0]
  
  const reader = new FileReader();
  reader.addEventListener('load', (event) => {
    //console.log(csv)
    csvToPhrase(event.target.result)
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

function csvToPhrase(result) {
  var phrases = $.csv.toArray(result, { onParseValue: $.csv.hooks.castToScalar, onPostParse: logPhrases })
  
}