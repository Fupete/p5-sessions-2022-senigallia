//LETTERA H.
//foresta dal basso

var s1 = function(s) {
  let w, h;
  let units = [];
  let inverso = [];

  let p = {
    volSensitivity: 22,
    volSpace: 250, // 0-100
    volSpaceMin: 150,
    volSpaceMax: 400,
    grids: [12, 20, 32],
    isBlack: [true, false],
    minSpace: 400
  }

  s.setMicGain = function(g) {
    p.volSpace = s.map(g, 0, 100, p.volSpaceMin, p.volSpaceMax);
    s.genGrid();
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
      inverso[u].display();
    }
  }
  s.genGrid = function() {
    if (units.length > 0) units = [];
    if (inverso.length > 0) inverso = [];
    let grid = s.random(p.grids);
    for (let u = 0; u < grid; u++) {
      units.push(new Unit(s, u, u * w / grid, h, w / grid, 255, p.volSensitivity, p.volSpace, p.minSpace)); //posizione fascia di sotto
      inverso.push(new Unit(s, u, u * w / grid, 0, w / grid, 255, p.volSensitivity, -p.volSpace, -p.minSpace)); //posizione fascia di sopra rovesciata
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
      this.volSensitivity = _vS;
      this.volSpace = _vSp;
      this.minSpace = _mS;
    }
    display(cv = 250, m = 22) {
      let volume = Sound.mapSound(10, this.id * this.volSensitivity, 0, this.volSpace);

      //se tolgo 10 tutti salgono contemporaneamente
      this.s.fill(255);
      this.s.noStroke();
      this.s.beginShape();
      this.s.vertex(this.x, this.y);
      this.s.vertex(this.x + this.w, this.y);
      let dif = (h / 2) - (this.y - this.minSpace - volume);
      if (volume >= h / 2) {
        this.s.vertex(this.x + this.w / 2, this.y - this.minSpace - volume - dif);
      } else {
        this.s.vertex(this.x + this.w / 2, this.y - this.minSpace - volume);
      }
      this.s.endShape();
      //this.s.rect(this.x, this.y, this.w, -100 - volume);
      // this.s.push();
      // this.s.fill(255, 0, 0);
      // this.s.text(this.id, this.x, this.y);
      // this.s.pop();
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