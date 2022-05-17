var s1 = function(s) {
  let w, h;
  let attractor;
  let attractors = [];
  let boxes, eyeImg, boxImg;

  let p = {
    noAttractors: 3,
    xAttractor: 100, //** < connesso a quale è i...
    yAttractor: 100, //*
    sizeAttractor: 200, //*
    isGreen: false,
  }

  s.preload = function() {
    let imgLoc = artFolder + '/' + current_set + '/' + current_bank + '/';
    eyeImg = s.loadImage(imgLoc + "eye_02.gif");
  }

  s.setup = function() {
    let cnv;
    if (fs) cnv = s.createCanvas(w = s.displayWidth, h = s.displayHeight);
    else cnv = s.createCanvas(w = s.windowWidth, h = s.windowHeight);
    cnv.parent("canvas");
    s.noStroke();
    s.pixelDensity(1);

    p.yAttractor = h / 2;
    p.sizeAttractor = 100;

    engine = Engine.create();
    engine.world.gravity.scale = 0;

    // create engine attractors
    let allAttractors = [];
    for (let i = 0; i < p.noAttractors; i++)
      allAttractors.push(
        Bodies.circle(w / 3 * i + w / 6, p.yAttractor, p.sizeAttractor, {
          isStatic: true,
          plugin: {
            attractors: [
              function(bodyA, bodyB) {
                let vx = bodyA.position.x - bodyB.position.x;
                let vy = bodyA.position.y - bodyB.position.y;
                let m = Math.sqrt(vx * vx + vy * vy);
                let dx = vx / m;
                let dy = vy / m;
                let mM = 0.1
                var force = {
                  x: (dx * mM) / m,
                  y: (dy * mM) / m,
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
    for (let i = 0; i < 400; i++) {
      allBoxes.push(Bodies.rectangle(s.random(w), s.random(h), s.random(30) + 15, s.random(10) + 5, {
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
      let particleSize = boxes.bodies[i].mass * 100;
      s.translate(boxes.bodies[i].position.x, boxes.bodies[i].position.y)
      s.rotate(boxes.bodies[i].angle)
      s.image(eyeImg, 0, 0, particleSize, particleSize)
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