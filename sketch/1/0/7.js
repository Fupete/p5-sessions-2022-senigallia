//LETTERA I.
//denti che si toccano bianchi

var s1 = function(s) {
  let w, h;
  let units = [];

  let p = {
    grids: [8, 12, 20],
    volSpace: 200,
    volSensitive: 22,
    minSpace: 400
  }

  s.setup = function() {
    let cnv;
    if (fs) cnv = s.createCanvas(w = s.displayWidth, h = s.displayHeight);
    else cnv = s.createCanvas(w = s.windowWidth, h = s.windowHeight);
    cnv.parent("canvas");
    s.background(0);
    s.pixelDensity(1);
    s.genGrid();
    s.frameRate(20);
    p.minSpace = h * 4 / 7;
    p.volSpace = h - p.minSpace;
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
      units.push(new Unit(s, u, u * (w - w / 4) / grid + w / 8, h, (w - w / 4) / grid, 255, p.volSensitive, p.volSpace, p.minSpace)); //posizione fascia di sotto
    }
  }

  class Unit {
    constructor(_s, _id, _x, _y, _w, _h, _vS, _vSp, _mS) {
      this.s = _s; // < our p5 instance object
      this.id = _id + 1;
      this.x = _x;
      this.y = _y;
      this.w = _w;
      this.h = _h;
      this.volSensitive = _vS;
      this.volSpace = _vSp;
      this.minSpace = _mS;

    }
    display() {
      let volume = Sound.mapSound(10, this.id * this.volSensitive, 0, this.volSpace);

      this.s.fill(255);
      this.s.noStroke();
      this.s.beginShape();
      this.s.vertex(this.x, this.y);
      this.s.vertex(this.x + this.w, this.y);
      this.s.vertex(this.x + this.w / 2, this.y - this.minSpace - volume);
      this.s.endShape();
    }
  }

  s.trigger = function() {
    s.genGrid();
  }
  s.keyPressed = function() {
    if (s.keyCode === s.RIGHT_ARROW) {
      s.genGrid();
    }
  }
}