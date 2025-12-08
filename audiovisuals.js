let mic, fft;

function setup() {
    const c = createCanvas(windowWidth, windowHeight);
    c.position(0, 0);
    c.style("position", "fixed");
    c.style("z-index", "-1");
    c.style("pointer-events", "none");  
  
  noFill();

  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT();
  fft.setInput(mic);
}

function draw() {
  background(0);

  let spectrum = fft.analyze();

stroke(255);
  beginShape();
  for (i = 0; i < spectrum.length; i++) {
    vertex(i, map(spectrum[i], 0, 255, height, 0));
  }
  endShape();
}
