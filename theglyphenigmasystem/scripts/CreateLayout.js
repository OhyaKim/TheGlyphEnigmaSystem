import { textCombination } from "../utils/textCombination.js";

export class createlayout {
    constructor() {
        this.Combination = null;
        this.preCombination = null;
        this.prevGridJSON = null;
        this.GridJSON = null;
    }

    update() {
        this.textDataUpdate();
    }

    textDataUpdate() {
        this.Combination = textCombination();

        if (JSON.stringify(this.preCombination) !== JSON.stringify(this.Combination)) {
            this.preCombination = this.Combination;
           // console.log(JSON.stringify(this.Combination, null, 2));
        }
    }

    gridDataUpdate(gridarray) {
        this.GridJSON = JSON.stringify(gridarray);

        if (this.GridJSON !== this.prevGridJSON) {
            //console.log(JSON.stringify(gridarray, null, 2));

            this.prevGridJSON = this.GridJSON;
        }
    }

    show() {
        if (!this.GridJSON || !Array.isArray(this.Combination)) return;

        const parsedArray = JSON.parse(this.GridJSON);

        parsedArray.forEach((cell, i) => {
            // 대응하는 combination 데이터 찾기
            const combinationData = this.Combination.find(c => c.index === cell.index);

            if (!combinationData) return;

            push();
            translate(cell.x, cell.y);
            stroke(0);
            strokeWeight(2);
            noFill();

            if (combinationData.Combination === "초성" || combinationData.Combination === "중성") {
                line(cell.cellW*0.1, 0, cell.cellW*0.1, cell.cellH);
                line(cell.cellW*0.9, 0, cell.cellW*0.9, cell.cellH);
                line(0,cell.cellH*0.1, cell.cellW,cell.cellH*0.1);
                line(0,cell.cellH*0.9, cell.cellW,cell.cellH*0.9);
            }

            else if (combinationData.Combination === "초성+중성 (가로)") {
                line(cell.cellW*0.7, 0, cell.cellW*0.7, cell.cellH);
            }else if (combinationData.Combination === "초성+중성 (세로)") {
                line(0,cell.cellH*0.7, cell.cellW, cell.cellH*0.7);
            }else if (combinationData.Combination === "초성+중성 (혼합)") {
                line(cell.cellW*0.7, 0, cell.cellW*0.7, cell.cellH);
                line(0,cell.cellH*0.7, cell.cellW, cell.cellH*0.7);
            }

            else if (combinationData.Combination === "초성+중성+종성 (가로)") {
                line(cell.cellW*0.7, 0, cell.cellW*0.7, cell.cellH*0.5);
                line(0,cell.cellH*0.5, cell.cellW, cell.cellH*0.5);
            }else if (combinationData.Combination === "초성+중성+종성 (세로)") {
                line(0,cell.cellH*0.4, cell.cellW, cell.cellH*0.4);
                line(0,cell.cellH*0.7, cell.cellW, cell.cellH*0.7);
            }else if (combinationData.Combination === "초성+중성+종성 (혼합)") {
                line(cell.cellW*0.7, 0, cell.cellW*0.7, cell.cellH*0.7);
                line(0,cell.cellH*0.4, cell.cellW*0.7, cell.cellH*0.4);
                line(0,cell.cellH*0.7, cell.cellW, cell.cellH*0.7);
            }

            
            pop();
        });
    }

}
