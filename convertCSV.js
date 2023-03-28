function getTenPlusPhrases() {
  let
}

function getPhrases() {

}

let phrase
function readFile(event) {
  let file = event.target.files[0]

  const reader = new FileReader();
  reader.addEventListener('load', (event) => {
    phrase = event.target.result;
    console.log(phrase)
  });
  reader.readAsText(file);
}