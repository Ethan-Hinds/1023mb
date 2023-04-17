class Particle extends VerletParticle2D {
    constructor(x, y) {
      super(x, y);
      this.r = 2;
      physics.addParticle(this);
    }
  
    show() {
      strokeWeight(5);
      stroke(0);
      point(this.x, this.y);
    }
  }
  