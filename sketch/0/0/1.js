var s1 = function(s) {
  let w, h;
  let attractor;
  let attractors = [];
  let boxes, eyeImg, boxImg;
  let occhio1, occhio2, occhio3;

  let p = {
    noAttractors: 1,
    xAttractor: 100, //*
    yAttractor: 100, //*
    sizeAttractor: 200, //*
    isGreen: false,
    mM:0.3,
    nBoxes:100,



  }

  s.preload = function() {
    let imgLoc = artFolder + '/' + current_set + '/' + current_bank + '/';
    occhio1 = s.loadImage(imgLoc + "eye_01.gif");
    occhio2 = s.loadImage(imgLoc + "eye_02.gif");
    occhio3 = s.loadImage(imgLoc + "eye_03.gif");
  }

  s.setup = function() {
    let cnv;
    if (fs) cnv = s.createCanvas(w = s.displayWidth, h = s.displayHeight);
    else cnv = s.createCanvas(w = s.windowWidth, h = s.windowHeight);
    cnv.parent("canvas");
    s.noStroke();
    s.pixelDensity(1);

    p.xAttractor = w / 2;
    p.yAttractor = h / 2;
    p.sizeAttractor = h / 6;

    engine = Engine.create();
    engine.world.gravity.scale = 0;

    // create engine attractors
    let allAttractors = [];
    for (let i = 0; i < p.noAttractors; i++)
      allAttractors.push(
        Bodies.circle(p.xAttractor, p.yAttractor, p.sizeAttractor, {
          isStatic: true,
          plugin: {
            attractors: [
              function(bodyA, bodyB) {
                let vx = bodyA.position.x - bodyB.position.x;
                let vy = bodyA.position.y - bodyB.position.y;
                let m = Math.sqrt(vx * vx + vy * vy);
                let dx = vx / m;
                let dy = vy / m;
                // let mM = 0.3
                var force = {
                  x: (dx * p.mM) / m,
                  y: (dy * p.mM) / m,
                };
                Body.applyForce(bodyA, bodyA.position, Matter.Vector.neg(force));
                Body.applyForce(bodyB, bodyB.position, force);
              }
            ]
          }
        })
      )
    attractors = Composite.create();
    Composite.add(attractors, allAttractors);
    World.add(engine.world, attractors);

    // create engine particles
    let allBoxes = [];
    for (let i = 0; i < p.nBoxes; i++) {
      allBoxes.push(Bodies.rectangle( s.random(w / 2 - w / 4, w / 2 + w / 4), s.random(h / 2 - h / 4, h / 2 + h / 4), s.random(20) + 25, s.random(5) + 15, {
        isStatic: false
      }));
    }
    boxes = Composite.create();
    Composite.add(boxes, allBoxes);
    World.add(engine.world, boxes);

    // let's start the engine
    Runner.run(engine);
  }

  s.draw = function() {
    s.clear();
    s.background(0);

    for (let i = 0; i < boxes.bodies.length; i++) {
      s.push();
      // same mass
      let particleSize = boxes.bodies[i].mass * 120;
      s.translate(boxes.bodies[i].position.x, boxes.bodies[i].position.y)
      s.rotate(boxes.bodies[i].angle)
      s.image(occhio1, 0, 0, particleSize, particleSize)
      s.pop();
}
      for (let i = 0; i < boxes.bodies.length/2; i++) {
        s.push();
        // same mass
        let particleSize = boxes.bodies[i].mass * 120;
        s.translate(boxes.bodies[i].position.x, boxes.bodies[i].position.y)
        s.rotate(boxes.bodies[i].angle)
        s.image(occhio2, 0, 0, particleSize, particleSize)
        s.pop();
}
        for (let i = 0; i < boxes.bodies.length/3; i++) {
          s.push();
          // same mass
          let particleSize = boxes.bodies[i].mass * 120;
          s.translate(boxes.bodies[i].position.x, boxes.bodies[i].position.y)
          s.rotate(boxes.bodies[i].angle)
          s.image(occhio3, 0, 0, particleSize, particleSize)
          s.pop();
          }

    s.filter(s.THRESHOLD);
    if (p.isGreen) {
      s.blendMode(s.MULTIPLY);
      s.fill(0, 255, 0);
      s.rect(0, 0, w, h);
      s.blendMode(s.BLEND);
    }
}

  s.keyPressed = function() {
    if (s.keyCode === s.RIGHT_ARROW) {
      for (let i = 0; i < attractors.bodies.length; i++) {
        Body.translate(attractors.bodies[i], {
          x: (s.random(w) - attractors.bodies[i].position.x) * 1,
          y: (s.random(h) - attractors.bodies[i].position.y) * 1
        });
      }
    }
  }
  }
