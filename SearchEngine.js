const songsDatabase = []
const queue = [];
let songNumber;
const searchInput = document.getElementById("search");
const clearButton = document.getElementById('clear');
const lista = document.getElementById("list");

//Preloads the songs
function preload() {
  songsDatabase[0] = loadSound('Musicas/Phoenix RDC-Dureza.mp3');
  songsDatabase[1] = loadSound('Musicas/ProfJam-Agua de Coco(Prod_Lhast).mp3');
}

//Initialize variables
function setup() {
  songNumber = 0;
  jumpButton = createButton('Skip the Song');
  jumpButton.mousePressed(jumpSong);

  playSongsInQueue = createButton('Play Songs in queue')
  playSongsInQueue.mousePressed(playSongs)

}

//Add selected song to the queue
lista.addEventListener("click", function(e) {
  let songName = e.target.textContent;
  for (const song of songsDatabase) {
    if (song.url.split('\/')[1] === songName) {
      queue[queue.length] = loadSound(song.url)
    }
  }
  if (queue.length == 0) {
    console.log("Music does not exist")
  }
});

//Search for the input text in the database of songs
searchInput.addEventListener("input", (e) => {
  //Declare and assign the value of the event's target to a variable AKA whatever is typed in the search bar
  let value = e.target.value
  clearList();
  //Check: if input exists and if input is larger than 0
  if (value && value.trim().length > 0) {
    //Redefine 'value' to exclude white space in the beggining and end of the text
    value = value.trim()
    //Does a verification if the queue contains a song with name equal to the searxhed text
    setList(songsDatabase.filter(song => {
      let splittedString = song.url.split('\/')[1];
      return splittedString.includes(value)
    }))
    // we need to write code (a function for filtering through our data to include the search input value)
  } else {
    //If input dont exist clears list of results
    clearList();
  }
})


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

//Jumps song to the next in queue
function jumpSong() {
  queue[0].stop();
  queue.splice(0, 1);
  if (queue.length == 0)
    console.log("Queue reached the end")
  else {
    queue[0].play();
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
  }
}
//Clear button clears input and tips
clearButton.addEventListener("click", function(e) {
  document.getElementById("search").value = "";
  clearList();
});

//Clean tips from search
function clearList() {
  //looping through each child of the search results list and remove each child
  while (lista.firstChild) {
    lista.removeChild(lista.firstChild)
  }
}