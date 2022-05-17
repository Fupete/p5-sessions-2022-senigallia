var s1 = function(s) {

  let isGreen = true;

  let attractor;
  let attractors = [];
  let boxes;
  let eyeImg;

  let boxImg;

  let w, h;

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

    engine = Engine.create();
    engine.world.gravity.scale = 0;

    // create engine attractors
    let allAttractors = [];
    for (let i = 0; i < 1; i++)
      allAttractors.push(
        Bodies.circle(w / 2, h / 3, 400, {
          isStatic: true,
          plugin: {
            attractors: [
              function(bodyA, bodyB) {
                let vx = bodyA.position.x - bodyB.position.x;
                let vy = bodyA.position.y - bodyB.position.y;
                let m = Math.sqrt(vx * vx + vy * vy);
                let dx = vx / m;
                let dy = vy / m;
                let mM = 0.4
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
    for (let i = 0; i < 200; i++) {
      allBoxes.push(Bodies.rectangle(s.random(w), s.random(h), s.random(30) + 15, s.random(5) + 15, {
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

    if (s.mouseIsPressed) {
      // smoothly move the first attractor body towards the mouse if clicked
      Body.translate(attractors.bodies[0], {
        x: (s.mouseX - attractors.bodies[0].position.x) * 0.25,
        y: (s.mouseY - attractors.bodies[0].position.y) * 0.25
      });
    }

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
    if (isGreen) {
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