let axisScale = 200;
let maxIteration = 15;
let circleSize = 10;
let ox, oy;
let iterationInput, scaleSlider;

function setup() {
    createCanvas(windowWidth, windowHeight);
    pixelDensity(1);

    ox = Math.floor(width / 2);
    oy = Math.floor(height / 2);

    iterationInput = createInput()
        .position(width - 60, 10)
        .attribute("type", "number")
        .attribute("size", 3)
        .value(15)
        .input(() => (maxIteration = iterationInput.value()));

    scaleSlider = createSlider(100, 1000, 200, 20).position(width - 180, 50);

    loadPixels();

    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            const x = map(i, 0, width, -ox / axisScale, ox / axisScale);
            const y = map(j, 0, height, oy / axisScale, -oy / axisScale);

            let cx = x;
            let cy = y;
            let iteration = 0;
            let brightness;

            while (iteration < maxIteration) {
                const xx = cx * cx - cy * cy;
                const yy = 2 * cx * cy;

                cx = x + xx;
                cy = y + yy;

                if (dist(0, 0, xx, yy) > 16) {
                    inside = false;
                    break;
                }

                iteration++;
            }

            brightness = map(iteration, 0, maxIteration, 255, 0);

            const index = (i + j * width) * 4;

            pixels[index + 0] = brightness;
            pixels[index + 1] = brightness;
            pixels[index + 2] = brightness;
            pixels[index + 3] = 255;
        }
    }

    updatePixels();
}

function draw() {
    drawAxis();

    noStroke();
    fill(0);
    textSize(16);
    text("Iterations: ", width - 150, 25);
    text(
        "Click and drag the mouse to visualize iterations from a point",
        50,
        30
    );

    axisScale = scaleSlider.value();
}

function drawAxis() {
    strokeWeight(2);
    stroke("#808080");
    line(0, oy, width, oy);
    line(ox, 0, ox, height);

    stroke("#ff0178");
    for (let x = ox + axisScale; x < width; x += axisScale) {
        line(x, oy - 10, x, oy + 10);
    }

    for (let x = ox - axisScale; x > 0; x -= axisScale) {
        line(x, oy - 10, x, oy + 10);
    }

    for (let y = oy + axisScale; y < height; y += axisScale) {
        line(ox - 10, y, ox + 10, y);
    }

    for (let y = oy - axisScale; y > 0; y -= axisScale) {
        line(ox - 10, y, ox + 10, y);
    }
}

function mouseDragged() {
    clear();

    const x = map(mouseX, 0, width, -ox / axisScale, ox / axisScale);
    const y = map(mouseY, 0, height, oy / axisScale, -oy / axisScale);

    stroke("#808080");
    line(ox, oy, mouseX, mouseY);

    stroke("#ff0178");
    fill("#ffffff");
    circle(mouseX, mouseY, circleSize);

    let cx = x;
    let cy = y;

    for (let i = 0; i < maxIteration; i++) {
        const px = cx;
        const py = cy;

        const xx = cx * cx - cy * cy;
        const yy = 2 * cx * cy;

        cx = x + xx;
        cy = y + yy;

        stroke("#808080");
        line(...scaleXY(cx, cy), ...scaleXY(px, py));

        stroke("#ff0178");
        circle(...scaleXY(cx, cy), circleSize);
    }
}

function scaleXY(x, y) {
    const sx = ox + x * axisScale;
    const sy = oy - y * axisScale;

    return [sx, sy];
}
