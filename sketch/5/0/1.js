var s1 = function(s) {
  let w, h;
  let icon;
  let isb;
  let g;

  let p = {
    gridX: 5,
    gridY: 2,
    isBlack: [true, false],
  }

  s.setup = function() {
    let cnv;
    if (fs) cnv = s.createCanvas(w = s.displayWidth, h = s.displayHeight);
    else cnv = s.createCanvas(w = s.windowWidth, h = s.windowHeight);
    cnv.parent("canvas");
    s.noStroke();
    s.pixelDensity(1);

    engine = Engine.create();
    engine.world.gravity.scale = random(0.0001, 0.0005);

    isB = random(p.isBlack);

    // create engine icon
    let allParts = [];
    g = w * 2 / 3 / p.gridX;
    let bodyProporties = {
      isStatic: false,
      // frictionAir: 0,
      // friction: 0.0001,
      // restitution: 0.8
    }
    // icon grid
    allParts.push(Bodies.rectangle(g * 0, g * 0, g, g, bodyProporties));
    allParts.push(Bodies.rectangle(g * 0, g * 1, g, g, bodyProporties));
    allParts.push(Bodies.rectangle(g * 1, g * 1, g, g, bodyProporties));
    allParts.push(Bodies.rectangle(g * 2, g * 1, g, g, bodyProporties));
    allParts.push(Bodies.rectangle(g * 2, g * 0, g, g, bodyProporties));
    allParts.push(Bodies.rectangle(g * 4, g * 0, g, g, bodyProporties));
    allParts.push(Bodies.rectangle(g * 4, g * 1, g, g, bodyProporties));
    allParts.push(Bodies.rectangle(g * 3, g * 1, g, g, bodyProporties));
    //
    icon = Composite.create();
    Composite.add(icon, allParts);
    World.add(engine.world, icon);

    // let ground = Bodies.rectangle(w / 2, h, w, 10, {
    //   isStatic: true
    // });
    // World.add(engine.world, ground);
    //
    // let left = Bodies.rectangle(0, h / 2, 10, h, {
    //   isStatic: true
    // });
    // World.add(engine.world, left);
    //
    // let right = Bodies.rectangle(w, h / 2, 10, h, {
    //   isStatic: true
    // });
    // World.add(engine.world, right);

    // let's start the engine
    // Runner.run(engine);
  }

  s.draw = function() {
    s.clear();
    if (isB) {
      s.background(255, 0, 0);
      s.fill(0)
    } else s.fill(255, 0, 0);

    s.translate(g / 2, g / 2);
    let iconWidth = g * p.gridX;
    let iconHeight = g * p.gridY;
    let shiftX = (w - iconWidth) / 2;
    let shiftY = (h - iconHeight) / 2;
    s.translate(shiftX, shiftY);

    for (let i = 0; i < icon.bodies.length; i++) {
      s.beginShape();
      s.vertex(icon.bodies[i].vertices[0].x, icon.bodies[i].vertices[0].y);
      s.vertex(icon.bodies[i].vertices[1].x, icon.bodies[i].vertices[1].y);
      s.vertex(icon.bodies[i].vertices[2].x, icon.bodies[i].vertices[2].y);
      s.vertex(icon.bodies[i].vertices[3].x, icon.bodies[i].vertices[3].y);
      s.endShape();
    }
  }

  s.keyPressed = function() {
    if (s.keyCode === s.RIGHT_ARROW) {
      Runner.run(engine);
    }
  }
}