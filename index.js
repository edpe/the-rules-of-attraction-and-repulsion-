var scribble = new Scribble();
let circles = [];
var omniOsc1 = new Tone.OmniOscillator(0, 'pwm').toMaster();
var omniOsc2 = new Tone.OmniOscillator(0, 'pwm').toMaster();

class CircleAgent {
  constructor(posX, posY, accX, accY) {
    this.size = random(20) + 20;
    this.pos = createVector(posX, posY);
    this.fillColour = color(random(255), random(255), random(255), 255);
    this.vel = p5.Vector.random2D();
    this.acc = createVector(accX, accY);
    this.relationshipLength = random(15000) + 5000; // milliseconds
    this.attractedState = true;
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
    // boundary collisions trigger bass drum
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
    if (this.attractedState == false) {
      force.mult(-1);
    } else {
      force;
    }
    this.acc = force;
  }

  changeState = () => {
    this.acc = createVector();
    this.vel = createVector();
    return this.attractedState
      ? (this.attractedState = false)
      : (this.attractedState = true);
  };

  changeColour = () => {
    if (this.attractedState == false) {
      this.fillColour.levels[3] = 50;
    } else {
      this.fillColour.levels[3] = 255;
    }
    this.fillColour;
  };

  checkRelationshipStatus() {
    if (millis() > this.relationshipLength) {
      this.relationshipLength = this.relationshipLength + millis();
      this.changeState();
      this.changeColour();
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (var i = 0; i < 2; i++) {
    circles.push(new CircleAgent(random(windowWidth), random(windowHeight)));
      omniOsc1.start();
      omniOsc2.start();
  }
}

function draw() {
  background(20);
  for (var i = 0; i < 2; i++) {
    circles[i].attracted(circles[circles.length - 1 - i], 20);
    circles[i].update();
    circles[i].display();
    circles[i].checkBoundaries();
    circles[i].checkRelationshipStatus();

    omniOsc1.frequency.value = (circles[0].pos.x) * 0.1
    omniOsc2.frequency.value = (circles[1].pos.x) * 0.1
  }
}
