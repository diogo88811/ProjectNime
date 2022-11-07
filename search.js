function setup() {
    createCanvas(windowWidth, windowHeight);
    input = createInput();
    input.position(20,65);
    input.input(typeMusicEvent);
    
    searchButton = createButton("Search");
    searchButton.position(40,40);
    searchButton.mousePressed(searchEvent);

    img = loadImage('Pictures/DJDisk.png');

  }
  
function draw() {
    image(img, 0, 0)
}

function typeMusicEvent(){
    console.log('you are typing: ', this.value());
}

function searchEvent(){
    console.log('you are clicking on search button');
}