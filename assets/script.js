const container = document.querySelector("section");

const params = {
  width: 500,
  height: 500,
};

const two = new Two(params);
two.appendTo(container);

const loopDuration = 60 * 4;
const numberOfShapes = 40;
const ShapeIncr = 20;
const aDelay = 1 / 120;
const shapes = [];

for (let i = 0; i < numberOfShapes; i++) {
  const size = (numberOfShapes - i) * ShapeIncr;
  const shape = two.makeRectangle(250, 250, size, size);
  shape.noStroke();

  if (i % 2 == 0) {
    shape.fill = "#f9d2cd";
  } else {
    shape.fill = "#f55745";
  }

  shapes.push(shape);
}

two.bind("update", (frameCount) => {
  const currentFrame = frameCount % loopDuration;
  const t = currentFrame / loopDuration;

  shapes.forEach((shape, i) => {
    const aStart = aDelay * (numberOfShapes - i);
    const aEnd = aDelay * i;
    const u = mapAndClamp(t, aStart, 1 - aEnd, 0, 1);
    // shape.rotation = easeInOutCubic(u) * Math.PI;
    if (i % 2 == 0) {
      shape.rotation = easeInOutCubic(u) * Math.PI;
    } else {
      shape.rotation = -1 * easeInOutCubic(u) * Math.PI;
    }
  });
});

two.play();
