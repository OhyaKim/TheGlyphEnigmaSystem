let rain = [];

function setup() {
    const BGDiv = document.getElementById('BG');
    const BGW = BGDiv.clientWidth;
    const BGH = BGDiv.clientHeight;

    let BGCanvas = createCanvas(BGW, BGH);
    BGCanvas.parent('BG');

    BGCanvas.style('position', 'absolute');
    BGCanvas.style('top', '0px');
    BGCanvas.style('left', '0px');
    BGCanvas.style('z-index', '-1');
    pixelDensity();

    for(let i = 0 ; i < 40; i ++){
        rain.push(new Rain());
    }

}

function draw() {
    background(17,17,17);

    for(let Rain of rain){
        Rain.update();
        Rain.show();
    }
}

function windowResized() {
    const BGDiv = document.getElementById('BG');
    const BGW = BGDiv.clientWidth;
    const BGH = BGDiv.clientHeight;

    resizeCanvas(BGW, BGH);
}
window.windowResized = windowResized;

class Rain{
    constructor(){
        this.x = random(width);
        this.y = random(-200, -20);

        this.speed = random(0,2);

        this.len = map( this.speed, 0,2, 20,40);
        this.yspeed = map( this.speed, 0,10, 2,10);
    }

    update(){
        this.y += this.yspeed;
        let gravity = map(this.speed, 0, 10, 0,0.2);
        this.yspeed += gravity;

        if(this.y > height){
           this.y = random(-200, -20);
           this.yspeed = map( this.speed, 0,10, 2,10);
        }
    }

    show(){
        push();
        let thick = map(this.speed, 0, 10, 1,2);
        strokeWeight(thick);
        stroke(245,246,250,40);
        line(this.x,this.y,this.x, this.y+this.len);
        pop();
    }
}


