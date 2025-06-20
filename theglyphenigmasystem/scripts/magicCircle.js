function MagicCircle() {

    //원 요소_01
    push();
    noFill();
    stroke(0);
    strokeWeight(1);
    ellipse(width * 0.5, height * 0.5, width * 0.9);

    ellipse(width*0.49,height*0.05,28);
    ellipse(width*0.51,height*0.05,28);
    ellipse(width*0.49,height*0.95,28);
    ellipse(width*0.51,height*0.95,28);
    pop();

    //원 요소_02
    push();
    noFill();
    stroke(0);
    strokeWeight(4);
    ellipse(width * 0.5, height * 0.5, width * 0.8);
    pop();

    //삼각형 요소
    push();
    let x1 = width * 0.5 - (width * 0.8 / 2);
    let x2 = width * 0.5 + (width * 0.8 / 2);
    let x3 = width * 0.5;

    let y1 = height * 0.55 - (height * 0.7 / 2);
    let y2 = height * 0.55 + (height * 0.7 / 2);
    let y3 = height * 0.45 - (height * 0.7 / 2);
    let y4 = height * 0.45 + (height * 0.7 / 2);

    noFill();
    stroke(0);
    strokeWeight(1);
    triangle(x1, y1, x2, y1, x3, y2);
    triangle(x3, y3, x2, y4, x1, y4);
    pop();

    //사각형 요소
    push();
    noFill();
    stroke(0);
    strokeWeight(1);
    rectMode(CENTER);
    translate(width*0.5,height*0.5);
    angleMode(DEGREES);
    rotate(45);
    rect(0, 0, width * 0.64);
    pop();

    push();
    fill(2);
    noStroke();
    rectMode(CENTER);
    rect(width * 0.5, height * 0.5, width * 0.48);
    pop();

    //선 요소
    push();
    beginShape(LINES);
    vertex(width*0.23, height*0.27);
    vertex(width*0.23, height*0.24);
    vertex(width*0.23, height*0.24);
    vertex(width*0.26, height*0.24);
    endShape();

    beginShape(LINES);
    vertex(width*0.77, height*0.27);
    vertex(width*0.77, height*0.24);
    vertex(width*0.77, height*0.24);
    vertex(width*0.74, height*0.24);
    endShape();

    beginShape(LINES);
    vertex(width*0.23, height*0.73);
    vertex(width*0.23, height*0.76);
    vertex(width*0.23, height*0.76);
    vertex(width*0.26, height*0.76);
    endShape();

    beginShape(LINES);
    vertex(width*0.77, height*0.73);
    vertex(width*0.77, height*0.76);
    vertex(width*0.77, height*0.76);
    vertex(width*0.74, height*0.76);
    endShape();
    pop();

    //Diamond();
}

function Diamond(){
    push();
    angleMode(DEGREES);
    translate(width*0.5,height*0.5);
    rotate(45);

    fill(0);
    rect(0,-height*0.2,32);
    pop();
}