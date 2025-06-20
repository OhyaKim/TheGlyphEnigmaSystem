import { createGlyph } from "./CreateGlyph.js";

let CreateGlyph ;


function setup() {
    const p5jsContainer = document.getElementById('p5js');
    const w = p5jsContainer.offsetWidth;
    const h = p5jsContainer.offsetHeight;

    let canvas = createCanvas(w, h);
    canvas.parent('p5js');
    pixelDensity();

    CreateGlyph = new createGlyph();
}

function draw() {


    MagicCircle();

     CreateGlyph.update();
    CreateGlyph.show();
}

function windowResized() {
    const p5jsContainer = document.getElementById('p5js');
    const w = p5jsContainer.offsetWidth;
    const h = p5jsContainer.offsetHeight;
    resizeCanvas(w, h);
}
window.windowResized = windowResized;


window.setup = setup;
window.draw = draw;