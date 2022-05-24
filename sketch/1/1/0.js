var s1 = function(s) {
  s.setup = function() {
    let cnv;
    if (fs) cnv = s.createCanvas(w = s.displayWidth, h = s.displayHeight);
    else cnv = s.createCanvas(w = s.windowWidth, h = s.windowHeight);
    cnv.parent("canvas");
    s.background(0);
    s.pixelDensity(1);
  }
  s.draw = function() {}

  function windowResized() {
    s.resizeCanvas(w = windowWidth, h = windowHeight);
  }
}