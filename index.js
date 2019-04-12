var scribble = new Scribble();

var circle1;
var circle2;

class CircleAgent {
  constructor(posX, posY, accX, accY) {
    this.size = random(20) + 20;
    this.pos = createVector(posX, posY);
    this.fillColour = color(random(255),random(255),random(255));
    // this.lineColour = random(50) + 190;
    // this.lineThickness = random(6);
    this.vel = p5.Vector.random2D();
    this.acc = createVector(accX, accY);
  }

  display() {
    // stroke(this.lineColour);
    // strokeWeight(this.lineThickness);
    fill(this.fillColour);
    scribble.scribbleEllipse(this.pos.x, this.pos.y, this.size, this.size)
  }

  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
  }

  attracted(target, gravity) {
    let force = p5.Vector.sub(target.pos, this.pos);
    let distSquared = force.magSq();
    distSquared = constrain(distSquared, 25, 500);
    let strength = gravity / distSquared;
    force.setMag(strength);
    // repel if in repel state
    // add state to CircleAgent
    // force.mult(-1);
    this.acc = force;
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  circle1 = new CircleAgent(random(windowWidth), random(windowHeight));
  circle2 = new CircleAgent(random(windowWidth), random(windowHeight));
}

function draw() {
  background(20);
  circle1.attracted(circle2, 20);
  circle1.update();
  circle1.display();
  circle2.attracted(circle1, 20);
  circle2.update();
  circle2.display();
}
