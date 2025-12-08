let angle = 0;

function setup() {
  const c = createCanvas(windowWidth, windowHeight);
  c.position(0, 0);
  c.style("position", "fixed");
  c.style("z-index", "-1");          // behind html
  c.style("pointer-events", "none"); // don't block clicks
  noStroke();
}

function draw() {
  // slightly transparent black so you get trails
  background(0, 40);

  const cx = width / 2;
  const cy = height / 2;
  const r = min(width, height) * 0.3;

  // white circle orbiting
  const x = cx + cos(angle) * r;
  const y = cy + sin(angle) * r;

  fill(255);
  ellipse(x, y, 40, 40);

  angle += 0.02;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}