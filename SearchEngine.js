const songsDatabase = []
const queue = [];
let songNumber;
const searchInput = document.getElementById("search");
const clearButton = document.getElementById('clear');
const lista = document.getElementById("list");
const visualQueue = document.getElementById("queueList");

//Preloads the songs
function preload() {
  songsDatabase[0] = loadSound('Musicas/Phoenix RDC-Dureza.mp3');
  songsDatabase[1] = loadSound('Musicas/ProfJam-Agua de Coco(Prod_Lhast).mp3');
}

//Keyboard.properties.value

//Initialize variables
function setup() {
  songNumber = 0;
  jumpButton = createButton('Skip the Song');
  jumpButton.mousePressed(jumpSong);

  playSongsInQueue = createButton('Play Songs in queue')
  playSongsInQueue.mousePressed(playSongs)
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
//Add selected song to the queue
lista.addEventListener("click", function(e) {
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
});
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
}
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