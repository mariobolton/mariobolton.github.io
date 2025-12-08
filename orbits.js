let cursorImg;
let sounds = [];

function preload() {
  cursorImg = loadImage("cursor.png");

  const soundFiles = [
    "sound1.mp3",
    "sound2.mp3",
    "sound3.mp3"
  ];

  for (let i = 0; i < soundFiles.length; i++) {
    sounds[i] = loadSound("sounds/" + soundFiles[i]);
  }
}

function setup() {
  const c = createCanvas(windowWidth, windowHeight);
  c.position(0, 0);
  c.style("z-index", "-1");

  noCursor();
}

function draw() {
  background(0);

  if (cursorImg) {
    imageMode(CENTER);
    image(cursorImg, mouseX, mouseY, 64, 64);	
  }
}

function mousePressed() {
  if (sounds.length > 0) {
    const s = random(sounds);
    if (s.isPlaying()) s.stop();
    s.play();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
