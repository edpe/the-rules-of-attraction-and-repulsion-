var scribble = new Scribble();
let circles = [];


class CircleAgent {
  constructor(posX, posY, accX, accY) {
    this.size = random(20) + 20;
    this.pos = createVector(posX, posY);
    this.fillColour = color(random(255), random(255), random(255));
    this.vel = p5.Vector.random2D();
    this.acc = createVector(accX, accY);
  }

  display() {
    fill(this.fillColour);
    scribble.scribbleEllipse(this.pos.x, this.pos.y, this.size, this.size);
  }

  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
  }

  checkBoundaries() {
    if (this.pos.x > windowWidth || this.pos.x < 0) {
      this.vel.x = this.vel.x * -1;
    }
    if (this.pos.y > windowHeight || this.pos.y < 0) {
      this.vel.y = this.vel.y * -1;
    }
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
  for (var i = 0; i < 2; i++) {
    circles.push(new CircleAgent(random(windowWidth), random(windowHeight)));
  }
}

function draw() {
  background(20);
  for (var i = 0; i < 2; i++) {
    circles[i].attracted(circles[(circles.length - 1) - i], 20);
    circles[i].update();
    circles[i].display();
    circles[i].checkBoundaries();
  }
}
