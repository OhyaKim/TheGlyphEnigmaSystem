import { textCombination } from "../../utils/TextCombination.js";
import { ExpansionToBinary } from "../../utils/ConvertToBinary.js";

// 애니메이션 상태 유지 변수
let disappearingDots = [];
let disappearingStarted = false;
let preLength = 0;

let visibleBitPoints = [];
let allGridPoints = [];

export function DrawMatrix(p, StartX, StartY, cols, rows, length) {
    const rectCols = [0, 9, 18, 27];
    const rectSize = 16;
    const combination = GetTextCombination();
    const BinaryData = GetBinaryData();

    const spacingX = p.width * 0.025;
    const spacingY = p.height * 0.1;

    // 점 위치 초기화
    visibleBitPoints = [];
    allGridPoints = [];

    // 기본 그리드 그리기 및 allGridPoints 저장
    for (let row = 0; row < rows; row++) {
        const y = StartY + row * spacingY;

        for (let col = 0; col < cols; col++) {
            const x = StartX + col * spacingX;

            allGridPoints.push({ x, y });

            p.noFill();
            p.stroke(245, 246, 250);
            if (rectCols.includes(col)) {
                p.strokeWeight(0.5);
                p.rectMode(p.CENTER);
                p.rect(x, y, rectSize, rectSize);
            } else {
                p.strokeWeight(2);
                p.point(x, y);
            }
        }
    }

    // length가 0이 되어 사라지는 시점에 전체 점 흩어지기 시작
    if (length === 0 && preLength > 0 && !disappearingStarted) {
        disappearingDots = allGridPoints.map(pt => ({
            x: pt.x,
            y: pt.y,
            vx: p.random(-1.5, 1.5),
            vy: p.random(-1.5, 1.5),
            alpha: 255,
            life: 120
        }));
        disappearingStarted = true;
    }

    // 흩어지는 점 애니메이션 처리
    if (disappearingStarted && disappearingDots.length > 0) {
        for (const dot of disappearingDots) {
            dot.x += dot.vx;
            dot.y += dot.vy;
            dot.alpha -= 2;
            dot.life--;

            if (dot.alpha > 0) {
                p.stroke(245, 246, 250, dot.alpha);
                p.strokeWeight(2);
                p.point(dot.x, dot.y);
            }
        }

        disappearingDots = disappearingDots.filter(dot => dot.life > 0);

        if (disappearingDots.length === 0) {
            disappearingStarted = false;
        }

        preLength = length;
        return; // 애니메이션 중 그리기 중단
    }

    preLength = length;

    // 글자별 표시 (사각형 내부 그리드 + 비트 점)
    for (let j = 0; j < length; j++) {
        const groupIndex = Math.floor(j / 9);
        const groupStartCol = rectCols[groupIndex];
        const rowInGroup = j % 9;
        if (rowInGroup >= rows) continue;

        const y = StartY + rowInGroup * spacingY;

        for (let i = 0; i < cols; i++) {
            const x = StartX + i * spacingX;

            if (rectCols.includes(i)) {
                let rectIndex = rectCols.indexOf(i) * 9 + rowInGroup;

                if (rectIndex === j) {
                    const combiItem = combination.find(c => c.index === j);
                    if (combiItem) {
                        p.fill(245, 246, 250);
                        p.stroke(245, 246, 250);
                        p.strokeWeight(0.5);
                        p.rectMode(p.CENTER);
                        p.rect(x, y, rectSize, rectSize);
                        DrawGrid(p, x, y, rectSize, combiItem.Combination);
                    }
                }
            } else if (i >= groupStartCol + 1 && i < groupStartCol + 9) {
                const bitIndex = i - (groupStartCol + 1);

                if (j < BinaryData.length && bitIndex < 8) {
                    const data = BinaryData[j];

                    visibleBitPoints.push({ x, y });

                    DrawBitVisualization(p, x, y, bitIndex, data, 255);
                }
            }
        }
    }
}

// 비트 시각화 (점, 원, 회전 사각형)
function DrawBitVisualization(p, x, y, bitIndex, data, alpha = 255) {
    if (data.Chosung && typeof data.Chosung[bitIndex] === "number") {
        const bit = data.Chosung[bitIndex];
        const size = bit === 0 ? 2 : 4;

        p.noFill();
        p.stroke(245, 246, 250, alpha);
        p.strokeWeight(size);
        p.point(x, y);
    }

    if (data.Jungsung && typeof data.Jungsung[bitIndex] === "number") {
        const bit = data.Jungsung[bitIndex];
        if (bit === 1) {
            p.noFill();
            p.stroke(245, 246, 250, alpha);
            p.strokeWeight(1);
            p.circle(x, y, 8);
        }
    }

    if (data.Jongsung && typeof data.Jongsung[bitIndex] === "number") {
        const bit = data.Jongsung[bitIndex];
        const size = bit === 0 ? 10 : 12;

        if (bit === 1) {
            p.push();
            p.noFill();
            p.angleMode(p.DEGREES);
            p.translate(x, y);
            p.rotate(45);
            p.stroke(245, 246, 250, alpha);
            p.strokeWeight(1);
            p.rect(0, 0, size, size);
            p.pop();
        }
    }
}

function DrawGrid(p, cx, cy, size, type) {
    let half = size * 0.48;
    p.stroke(17);
    p.strokeWeight(2);

    if (type === "초성+중성 (가로)") {
        p.line(cx + half * 0.3, cy - half, cx + half * 0.3, cy + half);
    } else if (type === "초성+중성 (세로)") {
        p.line(cx - half, cy + half * 0.3, cx + half, cy + half * 0.3);
    } else if (type === "초성+중성 (혼합)") {
        p.line(cx + half * 0.3, cy - half, cx + half * 0.3, cy + half);
        p.line(cx - half, cy + half * 0.3, cx + half, cy + half * 0.3);
    }

    if (type === "초성+중성+종성 (가로)") {
        p.line(cx + half * 0.3, cy - half, cx + half * 0.3, cy + half * 0.2);
        p.line(cx - half, cy + half * 0.2, cx + half, cy + half * 0.2);
    } else if (type === "초성+중성+종성 (세로)") {
        p.line(cx - half, cy - half * 0.2, cx + half, cy - half * 0.2);
        p.line(cx - half, cy + half * 0.4, cx + half, cy + half * 0.4);
    } else if (type === "초성+중성+종성 (혼합)") {
        p.line(cx + half * 0.3, cy - half, cx + half * 0.3, cy + half * 0.5);
        p.line(cx - half, cy - half * 0.2, cx + half * 0.3, cy - half * 0.2);
        p.line(cx - half, cy + half * 0.5, cx + half, cy + half * 0.5);
    }
}

function GetTextCombination() {
    const Combi = textCombination();
    return Array.isArray(Combi) ? Combi : [];
}

let preBinary = "";
function GetBinaryData() {
    const Binary = ExpansionToBinary();
    const currentBinaryStr = JSON.stringify(Binary);

    if (preBinary !== currentBinaryStr) {
        preBinary = currentBinaryStr;
    }

    return Binary;
}
