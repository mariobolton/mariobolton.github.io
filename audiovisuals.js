let mic, fft;
let started = false;
let angle = 0;

function setup() {
  const c = createCanvas(windowWidth, windowHeight);
  c.position(0, 0);
  c.style("position", "fixed");
  c.style("z-index", "-1");
  c.style("pointer-events", "none");
  noStroke();

  mic = new p5.AudioIn();
  fft = new p5.FFT(0.8, 64);
  fft.setInput(mic);
}

function draw() {
  background(0, 40);

  if (!started) {
    // show a little hint so you know p5 is alive
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(12);
    text("click to start mic", width / 2, height / 2);
    return;
  }

  const spectrum = fft.analyze();
  const bass = fft.getEnergy("bass");
  const mid = fft.getEnergy("mid");
  const treble = fft.getEnergy("treble");

  const cx = width / 2;
  const cy = height / 2;

  // orbit radius reacts to bass
  const r = map(bass, 0, 255, 50, min(width, height) * 0.4);

  const x = cx + cos(angle) * r;
  const y = cy + sin(angle) * r;

  // main orbiting blob
  fill(255, 40);
  ellipse(x, y, 40 + mid * 0.2, 40 + mid * 0.2);

  // treble sparkles
  const sparkCount = int(map(treble, 0, 255, 2, 15));
  for (let i = 0; i < sparkCount; i++) {
    const a = random(TWO_PI);
    const rr = random(20, r);
    const sx = cx + cos(a) * rr;
    const sy = cy + sin(a) * rr;
    fill(255, 120);
    ellipse(sx, sy, 4, 4);
  }

  angle += 0.02;
}

// first click starts audio (browser requirement)
function mousePressed() {
  if (!started) {
    userStartAudio().then(() => {
      mic.start();
      started = true;
    });
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}