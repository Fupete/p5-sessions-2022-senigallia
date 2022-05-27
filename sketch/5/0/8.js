//FIAMMA

var s1 = function(s) {
  let w, h;
  let icon;
  let isb;
  let g;

  let p = {
    gridX: 7,
    gridY: 7,
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
    engine.world.gravity.scale = 0.001; //random(0.0001, 0.0005);

    isB = random(p.isBlack);

    // create engine icon
    let allParts = [];
    g = w * 2 / 5 / p.gridX;
    let bodyProporties = {
      isStatic: false,
      frictionAir: 0,
      friction: 0.0001,
      restitution: 0.8
    }
    // icon grid
    allParts.push(Bodies.rectangle(g * 2, g * 0, g, g, bodyProporties));
    allParts.push(Bodies.rectangle(g * 2, g * 1, g, g, bodyProporties));
    allParts.push(Bodies.rectangle(g * 3, g * 1, g, g, bodyProporties));
    allParts.push(Bodies.rectangle(g * 1, g * 2, g, g, bodyProporties));
    allParts.push(Bodies.rectangle(g * 2, g * 2, g, g, bodyProporties));
    allParts.push(Bodies.rectangle(g * 3, g * 2, g, g, bodyProporties));
    allParts.push(Bodies.rectangle(g * 4, g * 2, g, g, bodyProporties));
    allParts.push(Bodies.rectangle(g * 1, g * 3, g, g, bodyProporties));
    allParts.push(Bodies.rectangle(g * 2, g * 3, g, g, bodyProporties));
    allParts.push(Bodies.rectangle(g * 4, g * 3, g, g, bodyProporties));
    allParts.push(Bodies.rectangle(g * 5, g * 3, g, g, bodyProporties));
    allParts.push(Bodies.rectangle(g * 1, g * 4, g, g, bodyProporties));
    allParts.push(Bodies.rectangle(g * 5, g * 4, g, g, bodyProporties));
    allParts.push(Bodies.rectangle(g * 1, g * 5, g, g, bodyProporties));
    allParts.push(Bodies.rectangle(g * 5, g * 5, g, g, bodyProporties));
    allParts.push(Bodies.rectangle(g * 2, g * 6, g, g, bodyProporties));
    allParts.push(Bodies.rectangle(g * 3, g * 6, g, g, bodyProporties));
    allParts.push(Bodies.rectangle(g * 4, g * 6, g, g, bodyProporties));
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
      let body = icon.bodies[i];
      s.beginShape();
      s.vertex(body.vertices[0].x, body.vertices[0].y);
      s.vertex(body.vertices[1].x, body.vertices[1].y);
      s.vertex(body.vertices[2].x, body.vertices[2].y);
      s.vertex(body.vertices[3].x, body.vertices[3].y);
      s.endShape();
    }
  }

  s.keyPressed = function() {
    if (s.keyCode === s.RIGHT_ARROW) {
      console.log("explode");
      // let bodies = Composite.allBodies(engine.world);
      for (var i = 0; i < icon.bodies.length; i++) {
        // icon.bodies[i].isStatic = false;
        // if (bodies[i].isStatic /*&& body.position.y >= 500*/ ) {
        var forceMagnitude = 0.02 * icon.bodies[i].mass;

        Body.applyForce(icon.bodies[i], icon.bodies[i].position, {
          x: (forceMagnitude + Common.random() * forceMagnitude) * Common.choose([1, -1]),
          y: (forceMagnitude + Common.random() * forceMagnitude) * Common.choose([1, -1]),
        });
        // }
      }
      Runner.run(engine);
    }
  }
}
