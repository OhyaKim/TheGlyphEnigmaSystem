let magicCircle = (p) => {
    let w, h;
    let angle = 0;  // 회전 각도

    p.setup = () => {
        const Div = document.getElementById('magic-circle');
        w = Div.clientWidth;
        h = Div.clientHeight;

        let Canvas = p.createCanvas(w, h);
        Canvas.parent('magic-circle');

        Canvas.style('position', 'absolute');
        Canvas.style('top', '0px');
        Canvas.style('left', '0px');

        p.pixelDensity();
    };

    p.draw = () => {
        p.clear();

        angle += 0.01;  // 각도 증가로 회전 효과

        p.MagicCircle(angle);
    };

    p.windowResized = () => {
        const Div = document.getElementById('magic-circle');
        w = Div.clientWidth;
        h = Div.clientHeight;

        p.resizeCanvas(w, h);
    };

    p.MagicCircle = (angle) => {
        // 큰 원 중심 좌표
        const cx = w * 0.5;
        const cy = h * 0.5;

        // 큰 원 반지름 (지름 w*0.9 이므로 반지름은 절반)
        const bigRadius = w * 0.9;

        // 큰 원 (기본 원)
        p.push();
        p.noFill();
        p.stroke(245, 246, 250);
        p.strokeWeight(0.5);
        p.ellipse(cx, cy, w * 0.9);
        p.pop();

        // 회전하는 작은 원들


        const smallCircleRadius = 4;

        for (let i = 0; i < 3; i++) {
            // 4개의 위치는 90도 간격으로, angle에 따라 회전
            const a = angle + i * PI;

            // 큰 원 반지름 절반 거리에서 회전
            const x = cx + Math.cos(a) * bigRadius * 0.5;
            const y = cy + Math.sin(a) * bigRadius * 0.5;
            const x2 = cx - Math.cos(a) * bigRadius * 0.5;
            const y2 = cy - Math.sin(a) * bigRadius * 0.5;
            p.push();
            p.fill(245, 246, 250);
            p.noStroke();
            p.ellipse(x, y, smallCircleRadius * 2);

            p.noFill();
            p.stroke(245, 246, 250);
            p.strokeWeight(0.5);
            p.ellipse(x2, y, smallCircleRadius * 4);

        }
        p.pop();

        // 원 요소_02
        p.push();
        p.noFill();
        p.stroke(245, 246, 250);
        p.strokeWeight(3);
        p.ellipse(cx, cy, w * 0.8);
        p.pop();

        // 삼각형 요소
        p.push();
        let x1 = cx - (w * 0.8 / 2);
        let x2 = cx + (w * 0.8 / 2);
        let x3 = cx;

        let y1 = h * 0.55 - (h * 0.7 / 2);
        let y2 = h * 0.55 + (h * 0.7 / 2);
        let y3 = h * 0.45 - (h * 0.7 / 2);
        let y4 = h * 0.45 + (h * 0.7 / 2);

        p.noFill();
        p.stroke(245, 246, 250);
        p.strokeWeight(1);
        p.triangle(x1, y1, x2, y1, x3, y2);
        p.triangle(x3, y3, x2, y4, x1, y4);
        p.pop();

        // 사각형 요소
        p.push();
        p.noFill();
        p.stroke(245, 246, 250);
        p.strokeWeight(0.5);
        p.rectMode(p.CENTER);
        p.translate(cx, cy);
        p.angleMode(p.DEGREES);
        p.rotate(45);
        p.rect(0, 0, w * 0.64);
        p.rect(0, 0, w * 0.32);
        p.pop();

        p.push();
        p.stroke(245, 246, 250);
        p.strokeWeight(0.5);
        p.noFill();
        p.rectMode(p.CENTER);
        p.rect(cx, cy, w * 0.48);
        p.pop();

        p.push();
        p.fill(110);
        p.stroke(245, 246, 250);
        p.strokeWeight(0.5);
        p.rectMode(p.CENTER);
        p.translate(cx, cy);
        p.angleMode(p.DEGREES);
        p.rotate(45);
        p.rect(0, 0, w * 0.08);
        p.pop();

        // 다이아몬드
        p.push();
        p.rectMode(p.CENTER);
        p.translate(cx, cy);
        p.angleMode(p.DEGREES);
        p.rotate(45);
        p.noFill();
        p.stroke(245, 246, 250);
        p.strokeWeight(0.5);
        p.rect(-(w * 0.25), (h * 0.25), w * 0.04);
        p.rect((w * 0.25), -(h * 0.25), w * 0.04);
        p.rect(-(w * 0.21), (h * 0.21), w * 0.04);
        p.rect((w * 0.21), -(h * 0.21), w * 0.04);
        p.fill(110);
        p.stroke(245, 246, 250);
        p.strokeWeight(0.5);
        p.rect(-(w * 0.23), (h * 0.23), w * 0.04);
        p.rect((w * 0.23), -(h * 0.23), w * 0.04);
        p.pop();

        // 선 요소
        p.push();
        p.stroke(245, 246, 250);

        p.beginShape(p.LINES);
        p.vertex(w * 0.23, h * 0.27);
        p.vertex(w * 0.23, h * 0.24);
        p.vertex(w * 0.23, h * 0.24);
        p.vertex(w * 0.26, h * 0.24);
        p.endShape();

        p.beginShape(p.LINES);
        p.vertex(w * 0.77, h * 0.27);
        p.vertex(w * 0.77, h * 0.24);
        p.vertex(w * 0.77, h * 0.24);
        p.vertex(w * 0.74, h * 0.24);
        p.endShape();

        p.beginShape(p.LINES);
        p.vertex(w * 0.23, h * 0.73);
        p.vertex(w * 0.23, h * 0.76);
        p.vertex(w * 0.23, h * 0.76);
        p.vertex(w * 0.26, h * 0.76);
        p.endShape();

        p.beginShape(p.LINES);
        p.vertex(w * 0.77, h * 0.73);
        p.vertex(w * 0.77, h * 0.76);
        p.vertex(w * 0.77, h * 0.76);
        p.vertex(w * 0.74, h * 0.76);
        p.endShape();
        p.pop();
    }
};

new p5(magicCircle);
