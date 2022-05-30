var s1 = function(s) {
  let w, h;
  let pyramids;
  let isb;

  let p = {
    pyramidBase: [1],
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

    // create engine pyramids
    let allPyramids = [];
    let base = random(p.pyramidBase);
    let dim = w / 2 / base;
    let shift = base / 2;
    for (let row = 0; row < base; row++) {
      for (let column = 0; column < base - row; column++) {
        allPyramids.push(Bodies.polygon(w / 2 - dim / 2 - column * dim + shift * dim, -h + row * dim, 3, dim * 2 / 3, {
          isStatic: false,
          angle: PI / 6,
          frictionAir: 0,
          friction: 0.0001,
          restitution: 0.8
        }));
        if (column != 0)
          allPyramids.push(Bodies.polygon(w / 2 - dim / 2 - column * dim + (shift + .5) * dim, -h + row * dim + .5 * dim, 3, dim * 2 / 3, {
            isStatic: false,
            angle: -PI / 6,
            frictionAir: 0,
            friction: 0.0001,
            restitution: 0.8
          }));
      }
      shift -= .5;
    }
    pyramids = Composite.create();
    Composite.add(pyramids, allPyramids);
    World.add(engine.world, pyramids);

    let ground = Bodies.rectangle(w / 2, h, w, 10, {
      isStatic: true
    });
    World.add(engine.world, ground);

    let left = Bodies.rectangle(w / 8, h / 2, 10, h, {
      isStatic: true
    });
    World.add(engine.world, left);

    let right = Bodies.rectangle(w - w / 8, h / 2, 10, h, {
      isStatic: true
    });
    World.add(engine.world, right);

    // let's start the engine
    Runner.run(engine);
  }

  s.draw = function() {
    s.clear();
    if (isB) {
      s.background(255, 0, 0);
      s.fill(0)
    } else s.fill(255, 0, 0);

    for (let i = 0; i < pyramids.bodies.length; i++) {
      s.beginShape();
      s.vertex(pyramids.bodies[i].vertices[0].x, pyramids.bodies[i].vertices[0].y);
      s.vertex(pyramids.bodies[i].vertices[1].x, pyramids.bodies[i].vertices[1].y);
      s.vertex(pyramids.bodies[i].vertices[2].x, pyramids.bodies[i].vertices[2].y);
      s.endShape();
    }
  }

  s.keyPressed = function() {
    if (s.keyCode === s.RIGHT_ARROW) {
      //
    }
  }
}