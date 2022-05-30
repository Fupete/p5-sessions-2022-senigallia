var s1 = function(s) {
  let gialloNero;
  let w, h, // < canvas width, canvas height
    vidW, vidH // < video width, video height
  let xScan = 0;

  let p = {
    gridScan: 0.6,
    playSpeed: .7,
    duoTone: true,
    isYellow: true,
    deleteAtTheEnd: false,
    threeshold: .40,
    invert: false,
    wCopia: 8, // *
    wDestinazione: 20 // *
  }

  // s.preload = function() {
  //   }

  s.setup = function() {
    let cnv;
    if (fs) cnv = s.createCanvas(w = s.displayWidth, h = s.displayHeight);
    else cnv = s.createCanvas(w = s.windowWidth, h = s.windowHeight);
    cnv.parent("canvas");
    s.noStroke();
    s.pixelDensity(1);

    let vidLoc = artFolder + '/' + current_set + '/' + current_bank + '/';
    video = s.createVideo(vidLoc + "/" + "macbeth-banquo_mod.mp4 ", s.vidLoad);

    vidW = video.width;
    vidH = video.height;

    p.wDestinazione = w;
    p.wCopia = vidW;

    xScan = w / 8;

    gialloNero = s.createGraphics(w, h);
    // gialloNero.background(0);
  }

  s.draw = function() {

    s.translate(0, h);
    s.scale(1, -1);

    if (!p.duoTone) s.copy(video, vidW / 2, 0, p.wCopia, vidH * 2, xScan, 0, p.wDestinazione, h);
    else {
      gialloNero.copy(video, vidW / 2, 0, p.wCopia, vidH * 2, xScan, 0, p.wDestinazione, h);
      gialloNero.filter(s.THRESHOLD, p.threeshold);
      if (p.invert) gialloNero.filter(s.INVERT);
      s.image(gialloNero, 0, 0);
      gialloNero.clear();
    }
    if (p.isYellow) {
      s.blendMode(s.MULTIPLY);
      s.fill(255, 255, 0);
      s.rect(0, 0, w, h);
      s.blendMode(s.BLEND);
    }
    xScan += p.gridScan;
    if (xScan > w - w / 8) {
      xScan = w / 8;
      if (p.deleteAtTheEnd) {
        s.background(0);
        gialloNero.background(0);
      }
    }
  }

  s.vidLoad = function() {
    // console.log("video loaded")
    video.volume(0);
    // video.play();
    video.loop();
    video.speed(p.playSpeed);
    // video.position(0, 0);
    video.hide();
  }

}