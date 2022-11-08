var disk;
var irotate;
function preload(){
    disk = loadImage('Pictures/DJDisk.png');
}
function setup() {
    createCanvas(windowWidth, windowHeight);
    input = createInput();
    input.position(20,65);
    input.input(typeMusicEvent);
    
    searchButton = createButton("Search");
    searchButton.position(40,40);
    searchButton.mousePressed(searchEvent);

    imageMode(CENTER);
    angleMode(CENTER);
    irotate = 0;


  }
  
function draw() {
    image(disk, (6*windowWidth)/8, 0.3*windowHeight, 0.28*windowHeight, 0.28*windowHeight);
    image(disk, (6*windowWidth)/8, (1-0.3)*windowHeight, 0.28*windowHeight, 0.28*windowHeight);
    
    irotate++;
    rotate(irotate);
}

function typeMusicEvent(){
    console.log('you are typing: ', this.value());
}

function searchEvent(){
    console.log('you are clicking on search button');
}