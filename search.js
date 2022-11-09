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

//Change music buttons
var changeBtn1;
var changeBtn2;
var changeBtn3;
var button1_pressed= false;
var button2_pressed = false;
var button3_pressed = false;

//Lights
var light1;
var light2;
var light3;

//Songs
let song1;
let song2;
let queue = [];
let songNumber;
var b;
var amp;
var img;
var particles = [];
var fft;


function preload(){
    disk1 = loadImage('Pictures/DJDisk.png');
    disk2 = loadImage('Pictures/DJDisk.png');

    soundFormats('mp3', 'ogg');
    song1 = loadSound('Musicas/Deu_Onda.mp3');
    song2 = loadSound('Musicas/Love_Tonight.mp3');
    songNumber = 0;

    img = loadImage('Pictures/backgroundMiddle.png');

    queue[0] = song1;
    queue[1] = song2;
}
function setup() {
    createCanvas(windowWidth, windowHeight);
    imageMode(CENTER);
    angleMode(DEGREES);
    rotate1 = 0;
    rotate2 = 0;
    imageMode(CENTER);
    img.filter(BLUR, 12);
    fft = new p5.FFT();

    //Music
    b = createButton("PLAY")
    b.position(windowWidth/2, windowHeight/2+50)
    b.mousePressed(musicEvent)

    

    //Change Music
    changeBtn1 = createButton("1>>");
    changeBtn1.position(windowWidth/2 ,0.05*windowHeight);
    changeBtn1.mousePressed(button1Pressed);
    changeBtn1.mouseReleased(button1Released);

    changeBtn2 = createButton("2>>");
    changeBtn2.position(0.05,220);
    changeBtn2.mousePressed(button2Pressed);
    changeBtn2.mouseReleased(button2Released);

    changeBtn3 = createButton("3>>");
    changeBtn3.position(windowWidth/2, 0.95*windowHeight);
    changeBtn3.mousePressed(button3Pressed);
    changeBtn3.mouseReleased(button3Released);

    light1 = new Light(20);
    light2 = new Light(20);
    light3 = new Light(20);

    //Transition
    sliderTransition = createSlider(0, 1, 0.5, 0.01);
    sliderTransition.position((0.5*windowWidth)/8, 0.5*windowHeight);
    sliderTransition.style("width", 0.2*windowHeight);
    sliderTransition.style("transform", "rotate(90deg)")
    sliderTransition.addClass("mySliders");
    sliderTransition.mousePressed(sliderTransition)

    //DISK 1 COMPONENTS
    sliderRate1 = createSlider(0, 2, 1, 0.01);
    sliderRate1.position((1.5*windowWidth)/8, 0.1*windowHeight);
    sliderRate1.addClass("mySliders");

    sliderVolume1 = createSlider(0, 1,1, 0.01);
    sliderVolume1.position((1.5*windowWidth)/8, 0.12*windowHeight);
    sliderVolume1.addClass("mySliders");

    //DISK 2 COMPONENTS
    sliderRate2 = createSlider(0, 2, 1, 0.01);
    sliderRate2.position((1.5*windowWidth)/8, (1-0.1)*windowHeight);
    sliderRate2.addClass("mySliders");

    sliderVolume2 = createSlider(0, 1,1, 0.01);
    sliderVolume2.position((1.5*windowWidth)/8, (1-0.12)*windowHeight);
    sliderVolume2.addClass("mySliders");
    
  }
  
function draw() { 
    stroke(200);
    background(100);
    
    
    //Middle Animation
    push();
    middleSection();
    pop();
    
    //UPDATE SOUND
    updateSound(sliderTransition.value(), sliderVolume1.value(),sliderVolume2.value(), sliderRate1.value(), sliderRate2.value());

    //Lights
    push();
    translate(width/2, height/10);
    light1.draw();
    pop();
    push();
    translate(width/2, 8*height/10);
    light1.draw();
    pop();
    push();
    translate(width/10, height/2);
    rotate(90);
    light1.draw();
    pop();

    //ROTATE DISKS
    rotate1_speed = sliderRate1.value()*3;
    rotate1 += rotate1_speed;
    rotate2_speed = sliderRate2.value()*3;
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
    if(queue[0].isPlaying()){
        queue[0].pause();
        queue[1].pause();
    }
    else{
        queue[0].play();
        queue[1].play();
    }
    
}

function button1Pressed(){
    button1_pressed = true;
}

function button1Released(){
    button1_pressed = false;
}

function button2Pressed(){
    button2_pressed = true;
}

function button2Released(){
    button2_pressed = false;
}

function button3Pressed(){
    button3_pressed = true;
}

function button3Released(){
    button3_pressed = false;
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


function middleSection(){

    stroke(255);
    noFill();
    translate(windowWidth/2, height/2)

    push();
    if(amp > 230) {
      rotate(random(-0.9, 0.9));
    }
    image(img, 0, 0, windowWidth/3, height);
    pop();

    fft.analyze();
    amp = fft.getEnergy(20,200);

    var wave = fft.waveform();
    for(var t= -1; t <= 1; t+= 2){
      beginShape();
      for(var i = 0; i < 180; i+= 0.5){
        var index = floor(map(i, 0, 180, 0, (wave.length -1)));
        var r = map(wave[index], -1 , 1, 100, 200);
        var x = r * sin(i) * t;
        var y = r * cos(i);
        vertex(x,y);
      }
      endShape();
    }
    var p = new Particle();
    particles.push(p);

    for(var i =0;i < particles.length; i++){
      particles[i].update(amp)
      particles[i].show();
    }
}

class Particle {
    constructor(){
      this.pos = p5.Vector.random2D().mult(150)
      this.vel = createVector(0,0);
      this.acc = this.pos.copy().mult(random(0.0001, 0.00001));
      this.color = color(random(255),random(255), random(255));
  
      this.w = random(3, 5);
    }
    update(){
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      if(amp > 230){
        this.pos.add(this.vel);
        this.pos.add(this.vel);
        this.pos.add(this.vel);
      }
    }
    show(){
      noStroke();
      fill(this.color)
      ellipse(this.pos.x, this.pos.y, 4);
    }
}

class Light {
    constructor(r) {
        this.x = 0;
        this.y = 0;
        this.r = r;
    }

    draw(){
        //if button pressed
        if(!button1_pressed){
            fill(0);
            circle(this.x -40,this.y,this.r);
        }
        else{
            fill(0,255,255);
            circle(this.x -40,this.y,this.r);
        }

        if(!button2_pressed){
            fill(0);
            circle(this.x,this.y,this.r);
        }
        else{
            fill(0,255,255);
            circle(this.x,this.y,this.r);
        }

        if(!button3_pressed){
            fill(0);
            circle(this.x + 40,this.y,this.r);
        }
        else{
            fill(0,255,255);
            circle(this.x + 40,this.y,this.r);
        }
    }
}