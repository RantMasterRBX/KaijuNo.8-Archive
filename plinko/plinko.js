const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter;

const engine = Engine.create();
const world = engine.world;

const canvas = document.getElementById('plinkoCanvas');
const render = Render.create({
  canvas: canvas,
  engine: engine,
  options: {
    width: 600,
    height: 800,
    wireframes: false,
    background: '#f0f0f0'
  }
});

Render.run(render);
Runner.run(Runner.create(), engine);

// Walls
const walls = [
  Bodies.rectangle(300, 0, 600, 20, { isStatic: true }), // top
  Bodies.rectangle(300, 800, 600, 20, { isStatic: true }), // bottom
  Bodies.rectangle(0, 400, 20, 800, { isStatic: true }), // left
  Bodies.rectangle(600, 400, 20, 800, { isStatic: true }) // right
];
World.add(world, walls);

// Pegs
const pegRadius = 10;
for (let y = 100; y < 700; y += 80) {
  for (let x = 50; x < 600; x += 50) {
    const offset = y % 160 === 0 ? 25 : 0;
    World.add(world, Bodies.circle(x + offset, y, pegRadius, {
      isStatic: true,
      render: { fillStyle: '#333' }
    }));
  }
}

// Divisions (bins)
for (let x = 0; x <= 600; x += 100) {
  World.add(world, Bodies.rectangle(x, 750, 10, 100, {
    isStatic: true,
    render: { fillStyle: '#666' }
  }));
}

// Drop a ball on click
canvas.addEventListener('click', function(event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const ball = Bodies.circle(x, 10, 12, {
    restitution: 0.6,
    render: { fillStyle: '#ff5722' }
  });
  World.add(world, ball);
});
