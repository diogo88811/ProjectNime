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
var button1_pressed = false;
var button2_pressed = false;
var button3_pressed = false;

//Lights
var light1;
var light2;
var light3;

//Songs
let diskSongs = [];
let songNumber;
var b;
var amp;
var img;
var particles = [];
var fft;

//Cenas Sobras
const songsDatabaseSobras = []
const queueSobras = [];
let songNumberSobras;
const searchInput = document.getElementById("search");
const clearButton = document.getElementById("clear");
const lista = document.getElementById("list");
const visualQueue = document.getElementById("queueList");

function preload() {
  disk1 = loadImage('Pictures/DJDisk.png');
  disk2 = loadImage('Pictures/DJDisk.png');

  soundFormats('mp3', 'ogg');

  songNumber = 0;

  img = loadImage('Pictures/backgroundMiddle.png');

  //Cenas Sobras
  songsDatabaseSobras[0] = loadSound('Musicas/Phoenix RDC-Dureza.mp3');
  songsDatabaseSobras[1] = loadSound('Musicas/ProfJam-Agua de Coco(Prod_Lhast).mp3');
  songsDatabaseSobras[2] = loadSound('Musicas/Deu_Onda.mp3');
  songsDatabaseSobras[3] = loadSound('Musicas/Love_Tonight.mp3');

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
  b.position(windowWidth / 2, windowHeight / 2 + 50)
  b.mousePressed(musicEvent)



  //Change Music
  changeBtn1 = createButton("1>>");
  changeBtn1.position(windowWidth / 2, 0.05 * windowHeight);
  changeBtn1.mousePressed(button1Pressed);
  changeBtn1.mouseReleased(button1Released);

  changeBtn2 = createButton("2>>");
  changeBtn2.position(0.05, 220);
  changeBtn2.mousePressed(button2Pressed);
  changeBtn2.mouseReleased(button2Released);

  changeBtn3 = createButton("3>>");
  changeBtn3.position(windowWidth / 2, 0.95 * windowHeight);
  changeBtn3.mousePressed(button3Pressed);
  changeBtn3.mouseReleased(button3Released);

  light1 = new Light(20);
  light2 = new Light(20);
  light3 = new Light(20);

  //Transition
  sliderTransition = createSlider(0, 1, 0.5, 0.01);
  sliderTransition.position((0.5 * windowWidth) / 8, 0.5 * windowHeight);
  sliderTransition.style("width", 0.2 * windowHeight);
  sliderTransition.style("transform", "rotate(90deg)")
  sliderTransition.addClass("mySliders");
  sliderTransition.mousePressed(sliderTransition)

  //DISK 1 COMPONENTS
  sliderRate1 = createSlider(0, 2, 1, 0.01);
  sliderRate1.position((1.5 * windowWidth) / 8, 0.1 * windowHeight);
  sliderRate1.addClass("mySliders");

  sliderVolume1 = createSlider(0, 1, 1, 0.01);
  sliderVolume1.position((1.5 * windowWidth) / 8, 0.12 * windowHeight);
  sliderVolume1.addClass("mySliders");

  //DISK 2 COMPONENTS
  sliderRate2 = createSlider(0, 2, 1, 0.01);
  sliderRate2.position((1.5 * windowWidth) / 8, (1 - 0.1) * windowHeight);
  sliderRate2.addClass("mySliders");

  sliderVolume2 = createSlider(0, 1, 1, 0.01);
  sliderVolume2.position((1.5 * windowWidth) / 8, (1 - 0.12) * windowHeight);
  sliderVolume2.addClass("mySliders");

  //Cenas Sobras
  //songNumberSobras = 0;
  //jumpButton = createButton('Skip the Song');
  //jumpButton.mousePressed(jumpSong);

  //playSongsInQueue = createButton('Play Songs in queueSobras')
  //playSongsInQueue.mousePressed(playSongs)

}

function draw() {
  stroke(200);
  background(100);


  //Middle Animation
  push();
  middleSection();
  pop();

  //UPDATE SOUND
  if (diskSongs.length > 0)
    updateSound(sliderTransition.value(), sliderVolume1.value(), sliderVolume2.value(), sliderRate1.value(), sliderRate2.value());

  //Lights
  push();
  translate(width / 2, height / 10);
  light1.draw();
  pop();
  push();
  translate(width / 2, 8 * height / 10);
  light1.draw();
  pop();
  push();
  translate(width / 10, height / 2);
  rotate(90);
  light1.draw();
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

}

function typeMusicEvent() {
  console.log('you are typing: ', this.value());
}

function searchEvent() {
  console.log('you are clicking on search button');
}

function musicEvent() {
  if (queueSobras.length < 2)
    console.log("Two songs needed")
  else {
    if (diskSongs.length != 0) {
      diskSongs[0].pause();
      diskSongs[1].pause();
      queueSobras.splice(0, 1);
      queueSobras.splice(0, 1);
      diskSongs[0] = queueSobras[0];
      diskSongs[1] = queueSobras[1];
      diskSongs[0].play();
      diskSongs[1].play();


      visualQueue.removeChild(visualQueue.firstChild);
      visualQueue.removeChild(visualQueue.firstChild);
    } else {
      diskSongs[0] = queueSobras[0];
      diskSongs[1] = queueSobras[1];
      diskSongs[0].play();
      diskSongs[1].play();
      visualQueue.removeChild(visualQueue.firstChild);
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

  //Volume
  diskSongs[0].setVolume(volume_song1);
  diskSongs[1].setVolume(vomule_song2);

  //Rate
  diskSongs[0].rate(rate1);
  diskSongs[1].rate(rate2);

}


function middleSection() {

  stroke(255);
  noFill();
  translate(windowWidth / 2, height / 2)

  push();
  if (amp > 230) {
    rotate(random(-0.9, 0.9));
  }
  image(img, 0, 0, windowWidth / 3, height);
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
    if (!button1_pressed) {
      fill(0);
      circle(this.x - 40, this.y, this.r);
    } else {
      fill(0, 255, 255);
      circle(this.x - 40, this.y, this.r);
    }

    if (!button2_pressed) {
      fill(0);
      circle(this.x, this.y, this.r);
    } else {
      fill(0, 255, 255);
      circle(this.x, this.y, this.r);
    }

    if (!button3_pressed) {
      fill(0);
      circle(this.x + 40, this.y, this.r);
    } else {
      fill(0, 255, 255);
      circle(this.x + 40, this.y, this.r);
    }
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
    //Does a verification if the queueSobras contains a song with name equal to the searxhed text
    setList(songsDatabaseSobras.filter(song => {
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

//Clear button clears input and results from search
clearButton.addEventListener("click", function(e) {
  document.getElementById("search").value = "";
  clearList();
});

//Clean results from search
function clearList() {
  //looping through each child of the search results list and remove each child
  while (lista.firstChild) {
    lista.removeChild(lista.firstChild)
  }
}
////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////QUEUE//////////////////////////////////////
//Add selected song to the queueSobras
lista.addEventListener("click", function(e) {
  let songName = e.target.textContent;
  for (const song of songsDatabaseSobras) {
    if (song.url.split('\/')[1] === songName) {
      //Adds song to the queueSobras
      queueSobras[queueSobras.length] = loadSound(song.url);

      //Adds song to the  the visual queueSobras
      const songInQueue = document.createElement('li');
      songInQueue.classList.add('queue-item');
      let text = document.createTextNode(songName);
      songInQueue.appendChild(text);
      visualQueue.appendChild(songInQueue);

    }
  }
  if (queueSobras.length == 0) {
    console.log("Music does not exist")
  }
});
//Jumps song to the next in queueSobras
function jumpSong() {
  if (queueSobras.length > 1) {
    queueSobras[0].stop();
    queueSobras.splice(0, 1);
    visualQueue.removeChild(visualQueue.firstChild);
    if (queueSobras.length == 0)
      console.log("Queue reached the end")
    else {
      queueSobras[0].play();
    }
  } else if (queueSobras.length == 1) {
    queueSobras[0].stop();
    queueSobras.splice(0, 1);
    console.log("Queue reached the end")
  } else {
    console.log("Queue is empty")
  }
}
/*
//Plays current songs in queueSobras
function playSongs() {
  if (queueSobras.length == 0)
    console.log("Queue is empty")
  else if (queueSobras[0].isPlaying()) {
    console.log("Music is already playing")
  } else {
    queueSobras[0].play();
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


// this prevent dragging the screen around 
function touchMoved() {
  return false;
}


//test commit