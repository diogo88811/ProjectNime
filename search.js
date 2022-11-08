var disk1;
var disk2;
var irotate;

function preload(){
    disk1 = loadImage('Pictures/DJDisk.png');
    disk2 = loadImage('Pictures/DJDisk.png');
}
function setup() {
    createCanvas(windowWidth, windowHeight);

    imageMode(CENTER);
    angleMode(DEGREES);  
    irotate = 0;
    


  }
  
function draw() { 
    background(220);  
    push()
    translate((6*windowWidth)/8, 0.3*windowHeight)
    irotate++;
    rotate(irotate);
    image(disk1, 0,0, 0.28*windowHeight, 0.28*windowHeight);
    pop()
    
    translate((6*windowWidth)/8, (1-0.3)*windowHeight)
    irotate++;
    rotate(irotate);
    image(disk2, 0, 0, 0.28*windowHeight, 0.28*windowHeight);
    
}

function typeMusicEvent(){
    console.log('you are typing: ', this.value());
}

function searchEvent(){
    console.log('you are clicking on search button');
}