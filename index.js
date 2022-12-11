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
var volumeIcon;

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

function preload() {
  disk1 = loadImage('Pictures/DJDisk.png');
  disk2 = loadImage('Pictures/DJDisk.png');
  volumeIcon = loadImage('Pictures/volume_icon.png');

  soundFormats('mp3', 'ogg');

  songNumber = 0;

  img = loadImage('Pictures/backgroundMiddle.png');

  //Load songs in local data base
  songsDatabase[0] = loadSound('Musicas/Phoenix RDC-Dureza.mp3');
  songsDatabase[1] = loadSound('Musicas/ProfJam-Agua de Coco(Prod_Lhast).mp3');
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
  changeBtn1 = createButton("SKIP1");
  changeBtn1.position(windowWidth/2 - changeBtnSize[0]/2 ,0.01 * windowHeight);
  changeBtn1.size(changeBtnSize[0], changeBtnSize[1]);
  changeBtn1.mousePressed(button1Pressed);
  changeBtn1.mouseReleased(button1Released);
  changeBtn1.addClass("skipButton1");

  changeBtn2 = createButton("SKIP2");
  changeBtn2.position(0.01 * windowHeight, windowHeight/2 - changeBtnSize[1]/2);
  changeBtn2.size(changeBtnSize[0], changeBtnSize[1]);
  changeBtn2.mousePressed(button2Pressed);
  changeBtn2.mouseReleased(button2Released);
  changeBtn2.addClass("skipButton2");

  changeBtn3 = createButton("SKIP3");
  changeBtn3.position(windowWidth/2 - changeBtnSize[0]/2, windowHeight - changeBtnSize[1] - 0.01 * windowHeight);
  changeBtn3.size(changeBtnSize[0], changeBtnSize[1]);
  changeBtn3.mousePressed(button3Pressed);
  changeBtn3.mouseReleased(button3Released);
  changeBtn3.addClass("skipButton3");

  light = new Light(20);

  //Transition
  sliderTransition = createSlider(0, 1, 0.5, 0.01);
  sliderTransition.position((0.5 * windowWidth) / 8, 0.5 * windowHeight);
  sliderTransition.style("width", 0.2 * windowHeight);
  sliderTransition.style("transform", "rotate(90deg)")
  sliderTransition.addClass("slider");
  sliderTransition.mousePressed(sliderTransition)

  //DISK 1 COMPONENTS
  sliderRate1 = createSlider(0, 2, 1, 0.01);
  sliderRate1.position((1.5 * windowWidth) / 8, 0.1 * windowHeight);
  sliderRate1.style("width", 0.2 * windowHeight);
  sliderRate1.addClass("slider");

  sliderVolume1 = createSlider(0, 1, 1, 0.01);
  sliderVolume1.position((1.5 * windowWidth) / 8, 0.12 * windowHeight);
  sliderVolume1.style("width", 0.2 * windowHeight);
  sliderVolume1.addClass("slider");

  //DISK 2 COMPONENTS
  sliderRate2 = createSlider(0, 2, 1, 0.01);
  sliderRate2.position((1.5 * windowWidth) / 8, (1 - 0.1) * windowHeight);
  sliderRate2.style("width", 0.2 * windowHeight);
  sliderRate2.addClass("slider");

  sliderVolume2 = createSlider(0, 1, 1, 0.01);
  sliderVolume2.position((1.5 * windowWidth) / 8, (1 - 0.12) * windowHeight);
  sliderVolume2.style("width", 0.2 * windowHeight);
  sliderVolume2.addClass("slider");

  //SOUND EFFECTS
  beat1Button= createButton("")
  beat1Button.position(0.28 * windowWidth, 0.45 * windowHeight)
  beat1Button.mousePressed(beat1Play)
  beat1Button.style("transform", "rotate(90deg)")
  beat1Button.style("background-image", "url('/Pictures/Beat.png')")
  beat1Button.style("background-size", "60%")
  beat1Button.style("background-position", "center center")
  beat1Button.style("background-repeat", "no-repeat")
  beat1Button.size(windowHeight*0.05, windowHeight*0.05)
  
  beat2Button= createButton("")
  beat2Button.position(0.28 * windowWidth, 0.51 * windowHeight)
  beat2Button.mousePressed(beat2Play)
  beat2Button.style("transform", "rotate(90deg)")
  beat2Button.style("background-image", "url('/Pictures/Beat.png')")
  beat2Button.style("background-size", "60%")
  beat2Button.style("background-position", "center center")
  beat2Button.style("background-repeat", "no-repeat")
  beat2Button.size(windowHeight*0.05, windowHeight*0.05)

  kickButton= createButton("")
  kickButton.position(0.26 * windowWidth, 0.45 * windowHeight)
  kickButton.mousePressed(kickPlay)
  kickButton.style("transform", "rotate(90deg)")
  kickButton.style("background-image", "url('Pictures/Kick.png')")
  kickButton.style("background-size", "80%")
  kickButton.style("background-position", "center center")
  kickButton.style("background-repeat", "no-repeat")
  kickButton.size(windowHeight*0.05, windowHeight*0.05)

  SirenButton= createButton("")
  SirenButton.position(0.26 * windowWidth, 0.51 * windowHeight)
  SirenButton.mousePressed(sirenPlay)
  SirenButton.style("transform", "rotate(90deg)")
  SirenButton.style("background-image", "url('Pictures/airHorn.png')")
  SirenButton.style("background-size", "50%")
  SirenButton.style("background-position", "center center")
  SirenButton.style("background-repeat", "no-repeat")
  SirenButton.size(windowHeight*0.05, windowHeight*0.05)


  //Cenas Sobras
  //songNumberSobras = 0;
  //jumpButton = createButton('Skip the Song');
  //jumpButton.mousePressed(jumpSong);

  //playSongsInQueue = createButton('Play Songs in queue')
  //playSongsInQueue.mousePressed(playSongs)

}

function draw() {
  stroke(0);
  background(60, 64, 72);

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
  

  //Song name under disk1
  push();
  translate(windowWidth *0.15, windowHeight*0.20);
  rotate(90);
  fill(255,255,255)
  text(songNameDisk1,0,0);
  pop();
  
  //Song name under disk 2
  push();
  translate(windowWidth *0.15, windowHeight*0.65);
  rotate(90);
  fill(255,255,255)
  text(songNameDisk2,0,0);
  pop()

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
  image(disk1, 0, 0, 0.28 * windowHeight, 0.28 * windowHeight);
  pop()

  push()
  translate((2 * windowWidth) / 8, (1 - 0.3) * windowHeight)
  rotate(rotate2);
  image(disk1, 0, 0, 0.28 * windowHeight, 0.28 * windowHeight);
  pop()

  //ICONS
  //Volume1
  push();
  translate((1.4 * windowWidth) / 8, 0.12 * windowHeight);
  rotate(90);
  image(volumeIcon, 0, 0, 15,15);
  pop();

  //Volume2
  push();
  translate((1.4 * windowWidth) / 8, (1 - 0.12) * windowHeight);
  rotate(90);
  image(volumeIcon, 0, 0, 15,15);
  pop();

  drawBase();


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

  else {
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
  button1_pressed = true;
}

function button1Released() {
  button1_pressed = false;
}

function button2Pressed() {
  button2_pressed = true;
}

function button2Released() {
  button2_pressed = false;
}

function button3Pressed() {
  button3_pressed = true;
}

function button3Released() {
  button3_pressed = false;
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
  square.setAlpha(0.25);
  fill(square);
  rect(30, 20, 55, 55);
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


/*lista.addEventListener("click", function(e) {
  let songName = e.target.textContent;
  for (const song of songsDatabase) {
    if (song.url.split('\/')[1] === songName) {
      //Adds song to the queue
      queue[queue.length] = loadSound(song.url);

      //Adds song to the  the visual queue
      const songInQueue = document.createElement('li');
      songInQueue.classList.add('queue-item');
      let text = document.createTextNode(songName);
      songInQueue.appendChild(text);
      visualQueue.appendChild(songInQueue);

    }
  }
  if (queue.length == 0) {
    console.log("Music does not exist")
  }
});*/
//Jumps song to the next in queue
function jumpSong() {
  if (queue.length > 1) {
    queue[0].stop();
    queue.splice(0, 1);
    visualQueue.removeChild(visualQueue.firstChild);
    if (queue.length == 0)
      console.log("Queue reached the end")
    else {
      queue[0].play();
    }
  } else if (queue.length == 1) {
    queue[0].stop();
    queue.splice(0, 1);
    console.log("Queue reached the end")
  } else {
    console.log("Queue is empty")
  }
}
/*
//Plays current songs in queue
function playSongs() {
  if (queue.length == 0)
    console.log("Queue is empty")
  else if (queue[0].isPlaying()) {
    console.log("Music is already playing")
  } else {
    queue[0].play();
    visualQueue.removeChild(visualQueue.firstChild);
  }
}*/
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


