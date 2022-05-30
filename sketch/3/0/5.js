var s1 = function(s) {
  let w, h;
  let letters = [];
  let rows, cols, letterW, letterH;
  let testoLength;
  let scrollIndex = 0;
  let isB;


  let p = {
    testo: "MI INCONTRARONO NEL GIORNO DELLA VITTORIA HO APPRESO CHE ESSE HANNO IN SE UNA CONOSCENZA PIU CHE MORTALE SARAI QUEL CHE TI E STATO PROMESSO MA LA TUA NATURA E TROPPO PIENA DEL LATTE DELL UMANA BONTA TU VORRESTI ESSERE GRANDE MA NON VUOI CHE IL MALE L ACCOMPAGNI",
    gridWidth: 400, //* per tutto schermo vedi fine setup (righe commentate)
    gridHeight: 400,
    gridColumns: [4, 8, 12, 16],
    gridRows: [1],
    showRect: false,
    autoScroll: true,
    scrollVel: 45, // >= 25!!! < 60 = 1sec, 10 = 1/6sec, 120 = 2sec, 1 = 1/60sec
    isBlack: [true, false],

  }

  let fontRegular;
  s.preload = function() {
    fontRegular = loadFont('assets/fonts/Macbeth-Regular.otf');
  }

  s.setup = function() {
    let cnv;
    if (fs) cnv = s.createCanvas(w = s.displayWidth, h = s.displayHeight);
    else cnv = s.createCanvas(w = s.windowWidth, h = s.windowHeight);
    cnv.parent("canvas");
    s.background(0);
    s.pixelDensity(1);
    s.textFont(fontRegular);
    //s.fill (255);
    isB = random(p.isBlack);




    p.gridWidth = w; // < griglie tutto schermo
    p.gridHeight = h;

    s.genGrid();
    testoLength = p.testo.length;
    //console.log(testoLength);
  }
  s.draw = function() {
    s.clear();


    if (isB) {
      s.background(0);
      s.fill("#4D0AFF")
    } else s.background("#4D0AFF");
    //  s.fill(0)


    //  if (p.isBackgroundViolet) s.background(255, 0, 150);
    for (let l = 0; l < letters.length; l++) {
      let charIndex = (l + scrollIndex) % testoLength;
      letters[l].letter = p.testo[charIndex];
      letters[l].display();
    }
    if (p.autoScroll)
      if (s.frameCount % p.scrollVel == 1) scrollIndex++;
  }
  s.genGrid = function() {
    if (letters.length > 0) letters = [];
    rows = s.random(p.gridRows);
    cols = s.random(p.gridColumns);
    letterW = p.gridWidth / cols;
    letterH = p.gridHeight / rows;
    // console.log("rows:" + rows + "\ncolumns:" + columns + "\nletter:" + letterW + "x" + letterH);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        letters.push(new Letter(s, r * cols + c, r, c)); // < 2d to 1d index...
      }
    }
    // console.log(letters.length);
    if (cols > rows) s.textSize(letterW * .8)
    else if (rows > cols) s.textSize(letterH * .8)
    else if (cols == rows) s.textSize(letterH * .8)
    // console.log(s.textSize());
  }

  class Letter {
    constructor(_s, _id, _row, _col, ) {
      this.s = _s; // < our p5 instance object
      this.id = _id;
      // console.log(this.id);
      this.row = _row;
      this.col = _col;
      this.letter = " "; // XXX
    }
    display() {
      this.s.push();
      this.s.translate(w / 2 - p.gridWidth / 2, h / 2 - p.gridHeight / 2);
      if (p.showRect) {
        this.s.fill(143, 0, 255);
        this.s.rect(this.col * letterW, this.row * letterH, letterW, letterH);
      }

      //if (p.isBlack) this.s.fill(255, 0, 150);


      this.s.translate(this.col * letterW, this.row * letterH);
      let letterWidth = this.s.textWidth(this.letter);
      this.s.translate(letterW / 2 - letterWidth / 2, letterH / 2 + s.textSize() / 3);
      this.s.text(this.letter, 0, 0);
      // console.log(this.letter);
      this.s.pop();
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
