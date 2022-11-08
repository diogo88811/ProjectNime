let disk;
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


  }
  
function draw() {
    image(disk, (5*windowWidth)/7, windowHeight/4, windowHeight/5, windowHeight/5);
    image(disk, (5*windowWidth)/6, (3*windowHeight)/4, windowHeight/5, windowHeight/5);

}

function typeMusicEvent(){
    console.log('you are typing: ', this.value());
}

function searchEvent(){
    console.log('you are clicking on search button');
}