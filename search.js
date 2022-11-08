var disk1;
var disk2;
var rotate1;
var rotate2;
var rotate1_speed;
var rotate2_speed;
var sliderRate1;
var sliderRate2;
var sliderVolume1;
var sliderVolume2;
var sliderTransition;

//Songs
let song1;
let song2;
let queue = [];
let songNumber;
var b;

function preload(){
    disk1 = loadImage('Pictures/DJDisk.png');
    disk2 = loadImage('Pictures/DJDisk.png');

    soundFormats('mp3', 'ogg');
    song1 = loadSound('Musicas/Phoenix_RDC_Dureza_[Video_Oficial].mp3');
    song2 = loadSound('Musicas/ProfJam_Água_de_Coco_(Prod_Lhast)[1].mp3');
    songNumber = 0;

    queue[0] = song1;
    queue[1] = song2;
}
function setup() {
    createCanvas(windowWidth, windowHeight);
    imageMode(CENTER);
    angleMode(DEGREES);  
    rotate1 = 0;
    rotate2 = 0;

    //Music
    b = createButton("PLAY")
    b.position(windowWidth/2, windowHeight/2)
    b.mousePressed(musicEvent)

    //Transition
    sliderTransition = createSlider(0, 1, 0.5, 0.01);
    sliderTransition.position((0.5*windowWidth)/8, 0.5*windowHeight);
    sliderTransition.style("width", 0.2*windowHeight);
    sliderTransition.style("transform", "rotate(90deg)")
    sliderTransition.addClass("mySliders");
    sliderTransition.mousePressed(sliderTransition)

    //DISK 1 COMPONENTS
    sliderRate1 = createSlider(0, 1.5, 1, 0.01);
    sliderRate1.position((1.5*windowWidth)/8, 0.1*windowHeight);
    sliderRate1.addClass("mySliders");

    sliderVolume1 = createSlider(0, 1,0.6, 0.01);
    sliderVolume1.position((1.5*windowWidth)/8, 0.12*windowHeight);
    sliderVolume1.addClass("mySliders");

    //DISK 2 COMPONENTS
    sliderRate2 = createSlider(0, 1.5, 1, 0.01);
    sliderRate2.position((1.5*windowWidth)/8, (1-0.1)*windowHeight);
    sliderRate2.addClass("mySliders");

    sliderVolume2 = createSlider(0, 1,0.6, 0.01);
    sliderVolume2.position((1.5*windowWidth)/8, (1-0.12)*windowHeight);
    sliderVolume2.addClass("mySliders");
    
  }
  
function draw() { 
    background(120,0,60);
    
    //UPDATE SOUND
    updateSound(sliderTransition.value(), sliderVolume1.value(),sliderVolume2.value(), sliderRate1.value(), sliderRate2.value());

    //ROTATE DISKS
    rotate1_speed = sliderRate1.value()*8;
    rotate1 += rotate1_speed;
    rotate2_speed = sliderRate2.value()*8;
    rotate2 += rotate2_speed;
    push()
        translate((2*windowWidth)/8, 0.3*windowHeight)
        rotate(rotate1);
        image(disk1, 0,0, 0.28*windowHeight, 0.28*windowHeight);
    pop()
    
    push()
        translate((2*windowWidth)/8, (1-0.3)*windowHeight)
        rotate(rotate2);
        image(disk1, 0,0, 0.28*windowHeight, 0.28*windowHeight);
        
    pop()
    
}

function typeMusicEvent(){
    console.log('you are typing: ', this.value());
}

function searchEvent(){
    console.log('you are clicking on search button');
}

function musicEvent(){
    queue[0].play();
    queue[1].play();
}

function updateSound(transaction, volume1, volume2, rate1, rate2){
    let volume_song1 = 0;
    let vomule_song2 = 0;
    
    volume_song1 = (1-transaction)*volume1;
    vomule_song2 = (transaction)*volume2;

    //Volume
    queue[0].setVolume(volume_song1);
    queue[1].setVolume(vomule_song2);

    //Rate
    queue[0].rate(rate1);
    queue[1].rate(rate2);
    
}