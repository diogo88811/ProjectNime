let song1;
let song2;

function preload(){
  soundFormats('mp3', 'ogg');
  song1 = loadSound('/Musicas/Phoenix_RDC_Dureza_[Video_Oficial].mp3');
  song2 = loadSound('/Musicas/ProfJam_Água_de_Coco_(Prod_Lhast)[1].mp3');
}

function setup() {
  let cnv = createCanvas(100, 100);
  cnv.mousePressed(canvasPressed);
  background(220);
  text('tap here to play', 10, 20);
}

function canvasPressed() {
  // playing a sound file on a user gesture
  // is equivalent to `userStartAudio()`
  song1.play();
}