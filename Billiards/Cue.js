class Cue {
    constructor() {
        this.x;
        this.y;
        this.width = 300;
        this.height = 8;
        this.angle = 10;
        this.origMouseDist;
        this.power = 0;
        this.dampingEffect = 0.15;
    }

    aim() {
        let ball = random(table.balls);
        this.angle = atan2(ball.y - table.cueBall.y, ball.x - table.cueBall.x);
        this.power = random(20, 80);   
    }

    shoot() {
        let dx = this.power * cos(this.angle) * this.dampingEffect;
        let dy = this.power * sin(this.angle) * this.dampingEffect;
        this.power = 0;
        table.cueBall.nextDx = dx;
        table.cueBall.nextDy = dy;
        table.cueBall.dx = 1;
        table.turn = table.turn == "computer" ? "player" : "computer";
    }

    show() {

        if(table.allStationary) {

            if (table.turn == "player") {
                this.angle = atan2(table.cueBall.y - mouseY, table.cueBall.x - mouseX);
            }

            this.x = table.cueBall.x - (20 + this.power)*cos(this.angle);
            this.y = table.cueBall.y - (20 + this.power)*sin(this.angle);

            rectMode(CENTER);
            push();
            translate(this.x - this.width/2*cos(this.angle), this.y - this.width/2*sin(this.angle));
            rotate(180 + this.angle);
            noStroke();
            fill("brown");
            rect(0, 0, this.width, this.height);
            pop();
            rectMode(CORNER);
        }
    }
}