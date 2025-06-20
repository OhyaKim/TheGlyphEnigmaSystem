import { InputTextLength } from "../utils/InputTextLength.js";
import { createlayout } from "../scripts/CreateLayout.js"

let InputLength, preInputLength;

export class createGlyph {
    constructor() {
        this.w = width * 0.48;
        this.h = width * 0.48;
        this.margin = 8;
        this.count = 0;


        this.updateLayout();  // 초기 레이아웃 설정
        //구조에 따른 레이아웃 설정
        this.CreateLayout = new createlayout();
        this.gridArray = [];

    }

    update() {
        InputLength = InputTextLength();

        if (InputLength !== preInputLength) {
            preInputLength = InputLength;
        }

        this.count = InputLength;
        this.updateLayout();
        this.CreateLayout.update();  // 텍스트 조합 관련 업데이트만 수행
    }

    updateLayout() {
        this.cols = ceil(sqrt(this.count));
        this.totalCells = this.cols * this.cols;

        this.cellW = (this.w - this.margin * (this.cols + 1)) / this.cols;
        this.cellH = (this.h - this.margin * (this.cols + 1)) / this.cols;

        this.x = (width - this.w) / 2;
        this.y = (height - this.h) / 2;
    }

    show() {
        this.gridArray = [];

        for (let i = 0; i < this.totalCells; i++) {
            const col = i % this.cols;
            const row = floor(i / this.cols);

            const x = this.x + this.margin + col * (this.cellW + this.margin);
            const y = this.y + this.margin + row * (this.cellH + this.margin);

            if (i < this.count) {
                this.gridArray.push({
                    index: i,
                    x: x,
                    y: y,
                    cellW: this.cellW,
                    cellH: this.cellH
                });
            }

            push();
            stroke(255);
            strokeWeight(0.5);
            fill(0);

            rect(x, y, this.cellW, this.cellH);
            (i < this.count) ? fill(255) : fill(0);
            rect(x + this.cellW * 0.02, y + this.cellH * 0.02, this.cellW * 0.96, this.cellH * 0.96);
            pop();
        }

        this.CreateLayout.gridDataUpdate(this.gridArray);
        this.CreateLayout.show();
    }
}
