function getTenPlusPhrases() {
  let 
}

function getPhrases() {
  
}

function readFile(file) {
  // Check if the file is an image.
  if (file.type && !file.type.endsWith('.csv')) {
    console.log('File is not a csv file.', file.type, file);
    return;
  }

  const reader = new FileReader();
  reader.addEventListener('load', (event) => {
    img.src = event.target.result;
  });
  reader.readAsText(file);
}