function setup() {
  createCanvas(windowWidth, windowHeight);
  input = createInput();
  input.position(20, 65);
  searchButton = createButton("pesquisa");
  searchButton.position(40, 40);
  searchButton.mousePressed(searchEvent);
}

function searchEvent() {
  console.log("valor: ", input.value())
  valorPesquisa = input.value();
}