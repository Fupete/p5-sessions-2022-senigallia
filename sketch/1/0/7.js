//LETTERA H.

var s1 = function(s) {
  let w, h;
  let units = [];

  let p = {
    grids: [12, 36],
  }

  s.setup = function() {
    let cnv;
    if (fs) cnv = s.createCanvas(w = s.displayWidth, h = s.displayHeight);
    else cnv = s.createCanvas(w = s.windowWidth, h = s.windowHeight);
    cnv.parent("canvas");
    s.background(0);
    s.pixelDensity(1);
    s.genGrid();
  }
  s.draw = function() {
    s.clear();
    for (let u = 0; u < units.length; u++) {
      units[u].display();
    }
  }
  s.genGrid = function() {
    if (units.length > 0) units = [];
    let grid = s.random(p.grids);
    for (let u = 0; u < grid; u++) {
      units.push(new Unit(s, u, u * w / grid, h, w / grid, 255));
    }
    // console.log(units.length);
  }

  class Unit {
    constructor(_s, _id, _x, _y, _w, _h) {
      this.s = _s; // < our p5 instance object
      this.id = _id + 1;
      this.x = _x;
      this.y = _y;
      this.w = _w;
      this.h = _h;
    }
    display() {
      let volume = Sound.mapSound(10, this.id * 22, 0, 150);
      this.s.fill(255);
      this.s.noStroke();
      this.s.beginShape();
      this.s.vertex(this.x, this.y);
      this.s.vertex(this.x + this.w, this.y);
      this.s.vertex(this.x + this.w/2, this.y - 500 - volume);
      this.s.endShape();
      //this.s.rect(this.x, this.y, this.w, -100 - volume);
      // this.s.push();
      // this.s.fill(255, 0, 0);
      // this.s.text(this.id, this.x, this.y);
      // this.s.pop();
    }
  }

  s.keyPressed = function() {
    if (s.keyCode === s.RIGHT_ARROW) {
      s.genGrid();
    }
  }
}
