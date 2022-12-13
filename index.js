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

//icons
var icons =  [];
var volumeIcon;
var queueIcon;

//Change music buttons
var changeBtn1;
var changeBtn2;
var changeBtn3;
var button1_pressed = false;
var button2_pressed = false;
var button3_pressed = false;
var changeBtnSize = [];

//Lights
var light;

//Songs
let diskSongs = [];
let songNumber;
var b;
var amp;
var img;
var particles = [];
var fft;

var count = 0;

//Cenas Sobras
const songsDatabase = []
const soundEffectsDatabase = []
//Names of the songs
let songNameDisk1 = "";
let songNameDisk2 = "";
let songNameNextQueue = "";
const queue = [];
const searchInput = document.getElementById("search");
const lista = document.getElementById("list");
const visualQueue = document.getElementById("queueList");

let isSkipping = false;
let preventSkip = true;

function preload() {
  disk1 = loadImage('Pictures/DJDisk.png');
  disk2 = loadImage('Pictures/DJDisk.png');
  icons[0] = loadImage('Pictures/volume_icon.png');
  icons[1] = loadImage('Pictures/Metronomopng.png');
  volumeIcon = loadImage('Pictures/volume_icon.png');
  queueIcon = loadImage('Pictures/queueIcon.png')

  soundFormats('mp3', 'ogg');

  songNumber = 0;

  img = loadImage('Pictures/backgroundMiddle.png');

  //Load songs in local data base
  songsDatabase[0] = loadSound('Musicas/Phoenix RDC-Dureza.mp3');
  songsDatabase[1] = loadSound('Musicas/ProfJam-Agua de Coco.mp3');
  songsDatabase[2] = loadSound('Musicas/Deu_Onda.mp3');
  songsDatabase[3] = loadSound('Musicas/Love_Tonight.mp3');
  songsDatabase[4] = loadSound('Musicas/Test.mp3');
  songsDatabase[5] = loadSound('Musicas/Test copy.mp3');
  songsDatabase[6] = loadSound('Musicas/Test copy 2.mp3');
  songsDatabase[7] = loadSound('Musicas/Test copy 3.mp3');
  songsDatabase[8] = loadSound('Musicas/Test copy 4.mp3');

  //load sound effects in local database
  soundEffectsDatabase[0] = loadSound('SoundEffects/Beat.mp3');
  soundEffectsDatabase[1] = loadSound('SoundEffects/Beat2.mp3');
  soundEffectsDatabase[2] = loadSound('SoundEffects/Kick.mp3');
  soundEffectsDatabase[3] = loadSound('SoundEffects/Siren.mp3');

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

  changeBtnSize = [0.1 * windowWidth, 0.1 * windowHeight];

  //Change Music
  changeBtn1 = createButton("");
  changeBtn1.position(windowWidth/2 - changeBtnSize[0]/2 ,0.01 * windowHeight);
  changeBtn1.style("background-image", "url('/Pictures/skipIcon3.png')")
  changeBtn1.style("background-size", "40%")
  changeBtn1.style("background-position", "center center")
  changeBtn1.style("background-repeat", "no-repeat")
  changeBtn1.size(changeBtnSize[0], changeBtnSize[1]);
  //changeBtn1.mousePressed(button1Pressed);
  //changeBtn1.mouseReleased(button1Released);
  changeBtn1.touchStarted(button1Pressed);
  changeBtn1.touchEnded(button1Released);
  changeBtn1.addClass("skipButton1");

  changeBtn2 = createButton("");
  changeBtn2.position(0.01 * windowHeight, windowHeight/2 - changeBtnSize[1]/2);
  changeBtn2.style("background-image", "url('/Pictures/skipIcon3.png')")
  changeBtn2.style("background-size", "40%")
  changeBtn2.style("background-position", "center center")
  changeBtn2.style("background-repeat", "no-repeat")
  changeBtn2.size(changeBtnSize[0], changeBtnSize[1]);
  //changeBtn2.mousePressed(button2Pressed);
  //changeBtn2.mouseReleased(button2Released);
  changeBtn2.touchStarted(button2Pressed);
  changeBtn2.touchEnded(button2Released);
  changeBtn2.addClass("skipButton2");

  changeBtn3 = createButton("");
  changeBtn3.position(windowWidth/2 - changeBtnSize[0]/2, windowHeight - changeBtnSize[1] - 0.01 * windowHeight);
  changeBtn3.style("background-image", "url('/Pictures/skipIcon3.png')")
  changeBtn3.style("background-size", "40%")
  changeBtn3.style("background-position", "center center")
  changeBtn3.style("background-repeat", "no-repeat")
  changeBtn3.size(changeBtnSize[0], changeBtnSize[1]);
  //changeBtn3.mousePressed(button3Pressed);
  //changeBtn3.mouseReleased(button3Released);
  changeBtn3.touchStarted(button3Pressed);
  changeBtn3.touchEnded(button3Released);
  changeBtn3.addClass("skipButton3");

  light = new Light(20);

  //Transition
  sliderTransition = createSlider(0, 1, 0.5, 0.01);
  sliderTransition.style("width", 0.2 * windowHeight);
  sliderTransition.style("transform", "rotate(90deg)");
  sliderTransition.position(0.1*windowWidth, 0.5*windowHeight);
  sliderTransition.addClass("slider");
  sliderTransition.mousePressed(sliderTransition)

  //DISK 1 COMPONENTS
  sliderRate1 = createSlider(0, 2, 1, 0.01);
  sliderRate1.style("width", 0.2 * windowHeight);
  sliderRate1.position(0.2 * windowWidth, 0.06 * windowHeight);
  sliderRate1.addClass("slider");

  sliderVolume1 = createSlider(0, 1, 1, 0.01);
  sliderVolume1.style("width", 0.2 * windowHeight);
  sliderVolume1.position(0.2 * windowWidth, 0.12 * windowHeight);
  sliderVolume1.addClass("slider");

  //DISK 2 COMPONENTS
  sliderRate2 = createSlider(0, 2, 1, 0.01);
  sliderRate2.style("width", 0.2 * windowHeight);
  sliderRate2.position(0.2 * windowWidth, windowHeight - 0.06 * windowHeight);
  sliderRate2.addClass("slider");

  sliderVolume2 = createSlider(0, 1, 1, 0.01);
  sliderVolume2.style("width", 0.2 * windowHeight);
  sliderVolume2.position(0.2 * windowWidth , windowHeight - 0.12 * windowHeight);
  sliderVolume2.addClass("slider");

  //SOUND EFFECTS
  beat1Button= createButton("")
  beat1Button.position(0.26 * windowWidth, 0.5*windowHeight - windowHeight*0.05 -windowHeight*0.05/4);
  beat1Button.touchStarted(beat1Play);
  beat1Button.size(windowHeight*0.05, windowHeight*0.05)
  beat1Button.addClass("beat1");

  
  beat2Button= createButton("")
  beat2Button.position(0.26 * windowWidth, 0.5*windowHeight + windowHeight*0.05/4);
  beat2Button.touchStarted(beat2Play);
  beat2Button.size(windowHeight*0.05, windowHeight*0.05)
  beat2Button.addClass("beat2");

  kickButton= createButton("")
  kickButton.position(0.22 * windowWidth, 0.5*windowHeight + windowHeight*0.05/4);
  kickButton.touchStarted(kickPlay);
  kickButton.size(windowHeight*0.05, windowHeight*0.05)
  kickButton.addClass("kick");


  SirenButton= createButton("")
  SirenButton.position(0.22 * windowWidth, 0.5*windowHeight - windowHeight*0.05 -windowHeight*0.05/4);
  SirenButton.touchStarted(sirenPlay);
  SirenButton.addClass("sirene");
  SirenButton.size(windowHeight*0.05, windowHeight*0.05)

}

function draw() {
  stroke(0);
  background(60, 64, 72);

  //drawBase();

  //Next song in queue
  if(queue.length>0){
    songNameNextQueue = queue[0].url.split('\/')[1];
    push();
    translate(0.32* windowWidth, 0.43 * windowHeight);
    rotate(90);
    fill(255,255,255)
    text(songNameNextQueue,0,0);
    pop();
  }
  
  //Middle Animation
  push();
  middleSection();
  pop();

  //UPDATE SOUND
  if (diskSongs.length > 0 && diskSongs[0]!="" && diskSongs[1]!="")
    updateSound(sliderTransition.value(), sliderVolume1.value(), sliderVolume2.value(), sliderRate1.value(), sliderRate2.value());

  //Lights
  push();
  translate(windowWidth/2, windowHeight*0.01 + changeBtnSize[1]*1.2);
  light.draw();
  pop();
  push();
  translate(windowWidth / 2, windowHeight - windowHeight*0.01 - changeBtnSize[1]*1.2);
  light.draw();
  pop();
  push();
  translate(windowHeight*0.01 + changeBtnSize[1]*2,windowHeight/2);
  rotate(90);
  light.draw();
  pop();

  //ROTATE DISKS
  rotate1_speed = sliderRate1.value() * 3;
  rotate1 += rotate1_speed;
  rotate2_speed = sliderRate2.value() * 3;
  rotate2 += rotate2_speed;
  push()
  translate((2 * windowWidth) / 8, 0.3 * windowHeight)
  rotate(rotate1);
  image(disk1, 0, 0, 0.25 * windowHeight, 0.25 * windowHeight);
  pop()

  push()
  translate((2 * windowWidth) / 8, (1 - 0.3) * windowHeight)
  rotate(rotate2);
  image(disk1, 0, 0, 0.25 * windowHeight, 0.25 * windowHeight);
  pop()

  let angleBetweenLetters = 270 / songNameDisk1.length;
  let radius = 70;
  push();
  translate((2 * windowWidth) / 8, 0.3 * windowHeight)        // move to circle's center
  rotate(rotate1);
  rotate(radians(0));  
  textSize(28)       // rotate to where text starts
  for (let i=0; i<songNameDisk1.length; i++) {   // go through each letter in the text
    push();
    rotate(i * angleBetweenLetters);//rotate to angle
    translate(0,-radius);              // and translate to edge of circle
    fill(255);
    noStroke();
    text(songNameDisk1[i], 0,0);                 // draw character at location
    pop();
  }
  pop();


angleBetweenLetters = 270 / songNameDisk2.length;
  push();
  translate((2 * windowWidth) / 8, (1 - 0.3) * windowHeight)        // move to circle's center
  rotate(rotate2);
  rotate(radians(0));  
  textSize(28)       // rotate to where text starts
  for (let i=0; i<songNameDisk2.length; i++) {   // go through each letter in the text
    push();
    rotate(i * angleBetweenLetters);// rotate to angle
    translate(0,-radius);              // and translate to edge of circle
    fill(255);
    noStroke();
    text(songNameDisk2[i], 0,0);                 // draw character at location
    pop();
  }
  pop();



  //ICONS
  //Volume1
  push();
  translate(0.19 * windowWidth, 0.06 * windowHeight + 3);
  rotate(90);
  image(icons[1], 0, 0, 16,16);
  pop();

  //Volume2
  push();
  translate(0.19 * windowWidth, 0.12 * windowHeight + 2);
  rotate(90);
  image(icons[0], 0, 0, 15,15);
  pop();

  //Volume2
  push();
  translate(0.19 * windowWidth, windowHeight - 0.06 * windowHeight + 3);
  rotate(90);
  image(icons[1], 0, 0, 16,16);
  pop();

  //Volume2
  push();
  translate(0.19 * windowWidth, windowHeight - 0.12 * windowHeight + 2);
  rotate(90);
  image(icons[0], 0, 0, 15,15);
  pop();
  //queue Icon
  push();
  translate((windowWidth - (windowWidth / 3) + 20) , windowHeight * 0.29);
  rotate(-90);
  image(queueIcon,0,0,40,40);
  pop();
  

}


function typeMusicEvent() {
  console.log('you are typing: ', this.value());
}

function searchEvent() {
  console.log('you are clicking on search button');
}

function sirenPlay(){
  soundEffectsDatabase[3].play();
}

function kickPlay(){
  soundEffectsDatabase[2].play();
}

function beat1Play(){
  soundEffectsDatabase[0].play();
}

function beat2Play(){
  soundEffectsDatabase[1].play();
}

//Automatic skip for when the song ends
function timeout(millisecondsDuration)
{
  return new Promise((resolve) => {
    setTimeout(resolve, millisecondsDuration);
  })
}
async function sleep(){
  await timeout(4000);
}
function playNext(song) {
  songName = song.url.split('\/')[1];
  if (queue.length == 0) {
    console.log("Queue is empty")
    songNameNextQueue = ""
    if(diskSongs[0]!="" && diskSongs[0].url.split('\/')[1] == songName){
      diskSongs[0]=""
      songNameDisk1 = ""
    }
    else if(diskSongs[1]!="" && diskSongs[1].url.split('\/')[1] == songName){
      diskSongs[1]=""
      songNameDisk2 = ""
    }
  }
  else if(isSkipping && count <= 0){
    count = 3;
    console.log("skipping");
    isSkipping = false;
    if (sliderTransition.value()<=0.5) {
      console.log("< " + song.url)
      diskSongs[0].stop();
      diskSongs[0] = song;
      queue.splice(0, 1);
      diskSongs[0].play();
      diskSongs[0].onended(playNext);
      songNameDisk1 = diskSongs[0].url.split('\/')[1];
      visualQueue.removeChild(visualQueue.firstChild);
      sleep().then((message)=>console.log("sleep1"));
    } 
    else if(sliderTransition.value()>0.5){
      console.log("> " + song.url)
      diskSongs[1].stop();
      diskSongs[1] = song;
      queue.splice(0, 1);
      diskSongs[1].play();
      diskSongs[1].onended(playNext);
      songNameDisk2 = diskSongs[1].url.split('\/')[1];
      visualQueue.removeChild(visualQueue.firstChild);
      sleep().then((message)=>console.log("sleep2"));
    } 
  }
  else{
    if (diskSongs[0].url.split('\/')[1] == songName) {
      diskSongs[0] = queue[0];
      queue.splice(0, 1);
      diskSongs[0].play();
      diskSongs[0].onended(playNext);
      songNameDisk1 = diskSongs[0].url.split('\/')[1]
      visualQueue.removeChild(visualQueue.firstChild);
    } 
    else if (diskSongs[1].url.split('\/')[1] == songName){
      diskSongs[1] = queue[0];
      queue.splice(0, 1);
      diskSongs[1].play();
      diskSongs[1].onended(playNext);
      songNameDisk2 = diskSongs[1].url.split('\/')[1]
      visualQueue.removeChild(visualQueue.firstChild);
    }
  }

}


function button1Pressed() {
  console.log("Button1 Pressed")
  button1_pressed = true;
  if(button2_pressed && button3_pressed && button1_pressed){
    if(queue.length > 0){
      isSkipping = true
      console.log("playNext called from button 1");
      playNext(queue[0]);
      
    }
    else{
      console.log("queue is fucked up")
    }
  }
}

function button1Released() {
  button1_pressed = false;
  count--;
  console.log(count);
}

function button2Pressed() {
  button2_pressed = true;
  if(button1_pressed && button3_pressed && button2_pressed){
    if(queue.length > 0){
      isSkipping = true
      console.log("playNext called from button 2");
      playNext(queue[0]);
    }
    else{
      console.log("queue is fucked up")
    }
  }
}

function button2Released() {
  button2_pressed = false;
  count--;
  console.log(count);
}

function button3Pressed() {
  button3_pressed = true;
  if(button1_pressed && button2_pressed && button3_pressed){
    if(queue.length > 0){
      isSkipping = true
      console.log("playNext called from button 1");
      playNext(queue[0]);
    }
    else{
      console.log("queue is fucked up")
    }
  }
}

function button3Released() {
  button3_pressed = false;
  count--;
  console.log(count);
}

function updateSound(transaction, volume1, volume2, rate1, rate2) {
  let volume_song1 = 0;
  let vomule_song2 = 0;

  volume_song1 = (1 - transaction) * volume1;
  vomule_song2 = (transaction) * volume2;
  //Volume and Rate
  if(diskSongs.length == 1){
    diskSongs[0].setVolume(volume_song1);
    diskSongs[0].rate(rate1);
  }
  else if (diskSongs.length == 2){
    diskSongs[0].setVolume(volume_song1);
    diskSongs[0].rate(rate1);
    diskSongs[1].setVolume(vomule_song2);
    diskSongs[1].rate(rate2);
  }
}

function drawBase(){

  push();
  square = color(0,0,0);
  square.setAlpha(50);
  fill(square);
  //rect(0.2 * windowWidth, 0.09 * windowHeight - 50,  0.2 * windowHeight + 8, 100);
  //rect(0,0, 0.2 * windowHeight, 60);
  rect(0.1*windowWidth + 60 ,0.5*windowHeight - (0.2 * windowHeight)/2 , 60, 0.21 * windowHeight);
  pop();
}

function middleSection() {

  stroke(255);
  noFill();
  translate(windowWidth / 2, height / 2)

  push();
  if (amp > 230) {
    rotate(random(-0.9, 0.9));
  }
  //image(img, 0, 0, windowWidth / 3, height);
  pop();

  fft.analyze();
  amp = fft.getEnergy(20, 200);

  var wave = fft.waveform();
  for (var t = -1; t <= 1; t += 2) {
    beginShape();
    for (var i = 0; i < 180; i += 0.5) {
      var index = floor(map(i, 0, 180, 0, (wave.length - 1)));
      var r = map(wave[index], -1, 1, 100, 200);
      var x = r * sin(i) * t;
      var y = r * cos(i);
      vertex(x, y);
    }
    endShape();
  }
  var p = new Particle();
  particles.push(p);

  for (var i = 0; i < particles.length; i++) {
    particles[i].update(amp)
    particles[i].show();

    if(particles[i].pos.x > windowWidth /2 || particles[i].pos.x <  (-windowWidth /2) || particles[i].pos.y > windowHeight /2 || particles[i].pos.y <  (-windowHeight) /2){
      particles.splice(i,1)
    }
  }
}

class Particle {
  constructor() {
    this.pos = p5.Vector.random2D().mult(150)
    this.vel = createVector(0, 0);
    this.acc = this.pos.copy().mult(random(0.0001, 0.00001));
    this.color = color(random(255), random(255), random(255));

    this.w = random(3, 5);
  }
  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    if (amp > 230) {
      this.pos.add(this.vel);
      this.pos.add(this.vel);
      this.pos.add(this.vel);
    }
  }
  show() {
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

  draw() {
    //if button pressed
    push();
    if (!button1_pressed) {
      fill(0);
      circle(this.x - 40, this.y, this.r);
    } else {
      drawingContext.shadowBlur = 30;
      drawingContext.shadowColor = 'red';
      fill(255, 0, 0);
      stroke(255,0,0);
      circle(this.x - 40, this.y, this.r);
    }
    pop();

    push();
    if (!button2_pressed) {
      fill(0);
      circle(this.x, this.y, this.r);
    } else {
      fill(0, 255, 255);
      drawingContext.shadowBlur = 30;
      drawingContext.shadowColor = 'red';
      fill(255, 0, 0);
      stroke(255,0,0);
      circle(this.x, this.y, this.r);
    }
    pop();

    push();
    if (!button3_pressed) {
      fill(0);
      circle(this.x + 40, this.y, this.r);
    } else {
      drawingContext.shadowBlur = 30;
      drawingContext.shadowColor = 'red';
      fill(255, 0, 0);
      stroke(255,0,0);
      circle(this.x + 40, this.y, this.r);
    }
    pop();
  }
}
////////////////////////////////////////////////////////////////////////////////
//////////////////////////////SEARCH RESULTS////////////////////////////////////
//Search for the input text in the database of songs
function searchForInput(currentValue) {
  //Declare and assign the value of the event's target to a variable AKA whatever is typed in the search bar
  let value = currentValue;
  clearList();
  //Check: if input exists and if input is larger than 0
  if (value && value.trim().length > 0) {
    //Redefine 'value' to exclude white space in the beggining and end of the text
    value = value.trim().toLowerCase();
    //Does a verification if the queue contains a song with name equal to the searxhed text
    setList(songsDatabase.filter(song => {
      let splittedString = song.url.split('\/')[1].toLowerCase();
      return splittedString.includes(value)
    }))
    // we need to write code (a function for filtering through our data to include the search input value)
  } else {
    //If input dont exist clears list of results
    clearList();
  }
}

// Creates List based on current text in input
function setList(results) {
  for (const song of results) {
    const resultItem = document.createElement('li')
    resultItem.classList.add('result-item')
    const splittedText = (song.url.split('\/'))[1]
    let text = document.createTextNode(splittedText)

    resultItem.appendChild(text)
    lista.appendChild(resultItem)
  }
  if (results.length === 0) {
    noResults()
  }
}

//Function used when thre is no results from search
function noResults() {
  // create an element for the error; a list item ("li")
  const error = document.createElement('li')
  // adding a class name of "error-message" to our error element
  error.classList.add('error-message')

  // creating text for our element
  const text = document.createTextNode('No results found. Sorry!')
  // appending the text to our element
  error.appendChild(text)
  // appending the error to our list element
  lista.appendChild(error)
}

//Clean results from search
function clearList() {
  //looping through each child of the search results list and remove each child
  while (lista.firstChild) {
    lista.removeChild(lista.firstChild)
  }
}
////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////QUEUE//////////////////////////////////////
//Add selected song to the queue or the disks
lista.addEventListener ("click", function(e) {
  let songName = e.target.textContent;
  for (const song of songsDatabase) {
    if (song.url.split('\/')[1] === songName) {
      //Adds song to the disk 0
      if(diskSongs.length == 0 || diskSongs[0] == ""){
        diskSongs[0] = song;
        diskSongs[0].play();
        songNameDisk1=songName
        diskSongs[0].onended(playNext);
      }
      //Adds song to disk1
      else if (diskSongs.length == 1 || diskSongs[1] == ""){
        diskSongs[1] = song;
        diskSongs[1].play();
        songNameDisk2=songName
        diskSongs[1].onended(playNext);
      }
      //Adds song to the queue
      else{
        queue[queue.length] = loadSound(song.url);
        //Adds song to the  the visual queue
        const songInQueue = document.createElement('li');
        songInQueue.classList.add('queue-item');
        let text = document.createTextNode(songName);
        songInQueue.appendChild(text);
        visualQueue.appendChild(songInQueue);
      }
    }
  }
  if (queue.length == 0 && diskSongs.length == 0) {
    console.log("Music does not exist")
  }
});
////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////KEYBOARD/////////////////////////////////////

const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: []
  },

  eventHandlers: {
    oninput: null,
    onclose: null
  },

  properties: {
    value: "",
    capsLock: false
  },

  init() {
    // Create main elements
    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");

    // Setup main elements
    this.elements.main.classList.add("keyboard", "keyboard--hidden");
    this.elements.keysContainer.classList.add("keyboard__keys");
    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

    // Add to DOM
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    // Automatically use keyboard for elements with .use-keyboard-input
    document.querySelectorAll(".use-keyboard-input").forEach(element => {
      element.addEventListener("focus", () => {
        this.open(element.value, currentValue => {
          element.value = currentValue;
          searchForInput(currentValue);
        });
      });
    });
  },

  _createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = [
      "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
      "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
      "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
      "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
      "space"
    ];

    // Creates HTML for an icon
    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`;
    };

    keyLayout.forEach(key => {
      const keyElement = document.createElement("button");
      const insertLineBreak = ["backspace", "p", "enter", "?"].indexOf(key) !== -1;

      // Add attributes/classes
      keyElement.setAttribute("type", "button");
      keyElement.classList.add("keyboard__key");

      switch (key) {
        case "backspace":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("backspace");

          keyElement.addEventListener("click", () => {
            this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
            this._triggerEvent("oninput");
          });

          break;

        case "caps":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
          keyElement.innerHTML = createIconHTML("keyboard_capslock");

          keyElement.addEventListener("click", () => {
            this._toggleCapsLock();
            keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
          });

          break;

        case "enter":
          keyElement.classList.add("keyboard__key--wide");
          keyElement.innerHTML = createIconHTML("keyboard_return");

          keyElement.addEventListener("click", () => {
            this.properties.value += "\n";
            this._triggerEvent("oninput");
          });

          break;

        case "space":
          keyElement.classList.add("keyboard__key--extra-wide");
          keyElement.innerHTML = createIconHTML("space_bar");

          keyElement.addEventListener("click", () => {
            this.properties.value += " ";
            this._triggerEvent("oninput");
          });

          break;

        case "done":
          keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
          keyElement.innerHTML = createIconHTML("check_circle");

          keyElement.addEventListener("click", () => {
            this.close();
            this._triggerEvent("onclose");
          });

          break;

        default:
          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener("click", () => {
            this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();

            this._triggerEvent("oninput");
          });

          break;
      }

      fragment.appendChild(keyElement);

      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });

    return fragment;
  },

  _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },

  _toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
      }
    }
  },

  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove("keyboard--hidden");
  },

  close() {
    this.properties.value = "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add("keyboard--hidden");
  }
};

window.addEventListener("DOMContentLoaded", function() {
  Keyboard.init();
});


