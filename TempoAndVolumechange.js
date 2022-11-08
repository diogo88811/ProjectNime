var song;
var sliderRate;
var sliderPan;
var play;

function preload() {
  song = loadSound('/Musicas/ProfJam   Água de Coco (Prod Lhast)[1].mp3', loaded)
}

function setup() {
  createCanvas(400, 400);
  song.setVolume(1);
  sliderRate = createSlider(0, 1.5, 1, 0.01);
  sliderVolume = createSlider(0, 1, 0.66, 0.01);
  play = createButton('play');
  play.mousePressed(playmousePressed)
}


function draw() {
  background(255, 0, 0);
  song.setVolume(sliderVolume.value());
  song.rate(sliderRate.value());

}

function loaded() {
  song.play()
}


function playmousePressed() {
  if (song.isPlaying()) {
    // .isPlaying() returns a boolean
    song.stop();
  } else {
    song.play();

  }
}