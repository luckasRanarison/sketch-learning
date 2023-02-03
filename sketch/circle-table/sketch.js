let points, size, multiplier, step;

function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSL);

    points = createInput()
        .position(width - 60, 10)
        .attribute("type", "number")
        .attribute("size", 3)
        .attribute("min", 0)
        .attribute("value", 0)
        .input(clear);

    size = createInput()
        .position(width - 60, 40)
        .attribute("type", "number")
        .attribute("size", 3)
        .attribute("min", 0)
        .attribute("value", 0)
        .input(clear);

    step = createInput()
        .position(width - 60, 100)
        .attribute("type", "number")
        .attribute("size", 3)
        .attribute("min", 0)
        .attribute("value", 1)
        .attribute("step", 0.1)
        .input(clear);

    multiplier = createInput()
        .position(width - 60, 70)
        .attribute("type", "number")
        .attribute("size", 3)
        .attribute("min", 2)
        .attribute("value", 2)
        .input(clear);
}

function draw() {
    noStroke();
    fill("#ff0178");
    textSize(16);
    text("Points:", width - 150, 25);
    text("Size:", width - 150, 55);
    text("Multiplier:", width - 150, 85);
    text("Step:", width - 150, 115);
    multiplier.attribute("step", step.value());

    const x = Math.floor(width / 2);
    const y = Math.floor(height / 2);
    const r = 150;
    const lineColor = (map(multiplier.value(), 0, 100, 0, 360) + 330) % 360; // fancy stuff

    strokeWeight(2);
    stroke(lineColor, 100, 50);
    noFill();
    circle(x, y, r * 2);

    const max = points.value();
    const angle = (2 * Math.PI) / max;

    for (let i = 0; i < max; i++) {
        const cx = x + r * Math.cos(i * angle - Math.PI);
        const cy = y + r * Math.sin(i * angle - Math.PI);

        noStroke();
        fill(0);
        circle(cx, cy, size.value());

        const resultAngle = i * multiplier.value() * angle - Math.PI;
        const px = x + r * Math.cos(resultAngle);
        const py = y + r * Math.sin(resultAngle);

        stroke(lineColor, 100, 50);
        line(cx, cy, px, py);
    }
}
