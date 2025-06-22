import { InputTextLength } from "../../utils/InputTextLength.js";
import { DrawMatrix } from "./DrawMatrix.js";

let dataVisual = (p) => {
    let w, h;
    let cols = 36;
    let rows = 8;
    let matrixs = [];

    p.setup = () => {
        const Div = document.getElementById('data-visual');
        w = Div.clientWidth;
        h = Div.clientHeight;

        let Canvas = p.createCanvas(w, h);
        Canvas.parent('data-visual');

        Canvas.style('position', 'absolute');
        Canvas.style('top', '0px');
        Canvas.style('left', '0px');

        p.pixelDensity();
    };

    p.draw = () => {
        p.clear();
        let InputLength = p.GetInputLength();

         DrawMatrix(p, p.width * 0.04, p.height * 0.16, cols, rows, InputLength);
    };

    p.windowResized = () => {
        const Div = document.getElementById('data-visual');
        w = Div.clientWidth;
        h = Div.clientHeight;

        p.resizeCanvas(w, h);
    };


    let prelength = "";

    p.GetInputLength = () => {
        let length = InputTextLength();

        if (prelength != length) {
            console.log(length);
            prelength = length;
        }

        return length
    }
};

new p5(dataVisual);
