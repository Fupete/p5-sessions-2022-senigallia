//LETTERA J.
//denti ad incastro rossi


var s1 = function(s) {
  let w, h;
  let units = [];
  let inverso = [];

  let p = {
    volSensitivity: 22,
    volSpace: 210, // 0-100
    volSpaceMin: 20,
    volSpaceMax: 400,
    grids: [12, 20, 32],
    isBlack: [true, false],
    minSpace: 100
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
    //s.frameRate(20);

    isB = random(p.isBlack);

  }
  s.draw = function() {
    s.clear();

    if (isB) {
      s.background(255, 0, 0);
    } else {
      s.background(0);
    }
    for (let u = 0; u < units.length; u++) {
      units[u].display();
    }

    for (let u = 0; u < inverso.length; u++) {
      inverso[u].display();
    }
  }
  s.genGrid = function() {
    if (units.length > 0) units = [];
    if (inverso.length > 0) inverso = [];
    let grid = s.random(p.grids);
    for (let u = 0; u < grid; u++) {
      units.push(new Unit(s, u, u * w / grid, h, w / grid, 255, p.volSensitivity, p.volSpace, p.minSpace)); //posizione fascia di sotto
    }
    for (let u = 0; u < grid + 1; u++) {
      inverso.push(new Unit(s, u, u * w / grid - ((w / grid) / 2), 0, w / grid, 255, p.volSensitivity, -p.volSpace, -p.minSpace)); //posizione fascia di sopra rovesciata
    }
  }

  class Unit {
    constructor(_s, _id, _x, _y, _w, _h, _vS, _vSp, _mSp) {
      this.s = _s; // < our p5 instance object
      this.id = _id + 1;
      this.x = _x;
      this.y = _y;
      this.w = _w;
      this.h = _h;
      this.volSensitivity = _vS;
      this.volSpace = _vSp;
      this.minSpace = _mSp;
    }
    display(cv = 250, m = 22) {
      let volume = Sound.mapSound(10, this.id * this.volSensitivity, 0, this.volSpace);
      if (isB) {
        //this.s.background(255, 0, 0);
        this.s.fill(0)
      } else {
        //this.s.background(0);
        this.s.fill(255, 0, 0);
      }
      //se tolgo 10 tutti salgono contemporaneamente
      //this.s.fill("red");
      this.s.noStroke();
      this.s.beginShape();
      this.s.vertex(this.x, this.y);
      this.s.vertex(this.x + this.w, this.y);
      this.s.vertex(this.x + this.w / 2, this.y - this.minSpace - volume);
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