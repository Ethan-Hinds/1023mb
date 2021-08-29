class Table {
    constructor() {
        this.x = 200;
        this.y = 100;
        this.width = 600;
        this.height = this.width/2;

        this.cueBall;
        this.allStationary = true;

        this.turn = "player";

        this.holes = [];
        this.balls = [];
        this.init();
    }

    init() {

        this.balls.push(new Ball(this.x + this.width*0.2, this.y + this.height/2, "white"));
        this.cueBall = this.balls[0];

        this.balls.push(new Ball(this.x + this.width*0.75, this.y + this.height/2, "red"));

        this.balls.push(new Ball(this.x + this.width*0.75 + 20*cos(30), this.y + this.height/2 - 20*sin(30), "red"));
        this.balls.push(new Ball(this.x + this.width*0.75 + 20*cos(30), this.y + this.height/2 + 20*sin(30), "blue"));

        this.balls.push(new Ball(this.x + this.width*0.75 + 40*cos(30), this.y + this.height/2 - 40*sin(30), "red"));
        this.balls.push(new Ball(this.x + this.width*0.75 + 40*cos(30), this.y + this.height/2, "black"));
        this.balls.push(new Ball(this.x + this.width*0.75 + 40*cos(30), this.y + this.height/2 + 40*sin(30), "blue"));

        this.balls.push(new Ball(this.x + this.width*0.75 + 60*cos(30), this.y + this.height/2 - 60*sin(30), "red"));
        this.balls.push(new Ball(this.x + this.width*0.75 + 60*cos(30), this.y + this.height/2 - 20*sin(30), "blue"));
        this.balls.push(new Ball(this.x + this.width*0.75 + 60*cos(30), this.y + this.height/2 + 20*sin(30), "red"));
        this.balls.push(new Ball(this.x + this.width*0.75 + 60*cos(30), this.y + this.height/2 + 60*sin(30), "blue"));

        this.balls.push(new Ball(this.x + this.width*0.75 + 80*cos(30), this.y + this.height/2 - 80*sin(30), "blue"));
        this.balls.push(new Ball(this.x + this.width*0.75 + 80*cos(30), this.y + this.height/2 - 40*sin(30), "red"));
        this.balls.push(new Ball(this.x + this.width*0.75 + 80*cos(30), this.y + this.height/2, "blue"));
        this.balls.push(new Ball(this.x + this.width*0.75 + 80*cos(30), this.y + this.height/2 + 40*sin(30), "blue"));
        this.balls.push(new Ball(this.x + this.width*0.75 + 80*cos(30), this.y + this.height/2 + 80*sin(30), "red"));

        this.holes.push(new Hole(this.x + 10, this.y + 10));
        this.holes.push(new Hole(this.x + this.width - 10, this.y + 10));
        this.holes.push(new Hole(this.x + 10, this.y + this.height - 10));
        this.holes.push(new Hole(this.x + this.width - 10, this.y + this.height - 10));
        this.holes.push(new Hole(this.x + this.width/2, this.y + 5));
        this.holes.push(new Hole(this.x + this.width/2, this.y + this.height - 5));
        this.holes.push(new Hole(this.x + 5, this.y + this.height/2));
        this.holes.push(new Hole(this.x + this.width - 5, this.y + this.height/2));
    }

    checkStationary() {
        for (let ball of this.balls) {
            if (sqrt(ball.dx**2 + ball.dy**2) > 0) {
                this.allStationary = false;
                return;
            }
        }
        this.allStationary = true;
    }

    show() {
        stroke("#774433");
        strokeWeight(20);
        fill("#00ff00");
        rect(this.x, this.y, this.width, this.height);

        for (let hole of this.holes) {
            hole.show();
        }
    }
}