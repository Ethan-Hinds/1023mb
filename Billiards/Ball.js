class Ball {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 0;
        this.color = color;
        this.r = 10;

        this.nextDx = 0;
        this.nextDy = 0;

        this.justCollided = [];
        this.allStationary = true;
    }

    checkHole() {
        for (let hole of table.holes) {
            if (dist(this.x, this.y, hole.x, hole.y) < (this.r + hole.r) * 0.75) {
                if (this === table.cueBall) {
                    this.x = table.x + table.width*0.2;
                    this.y = table.y + table.height/2;
                    this.nextDx = 0;
                    this.nextDy = 0;
                } else {
                    table.balls.splice(table.balls.indexOf(this), 1);
                }
            }
        }
    }

    checkBounce() {
        if (this.x - table.x < this.r + 10) {
            if (this.justCollided.indexOf("Left") < 0) {
                this.nextDx *= -1;
                this.justCollided.push("Left");
            }
        } else {
            if (this.justCollided.indexOf("Left") >= 0) {
                this.justCollided.splice(this.justCollided.indexOf("Left"), 1);
            }
        }
        
        if (table.x + table.width - this.x < this.r + 10) {
            if (this.justCollided.indexOf("Right") < 0) {
                this.nextDx *= -1;
                this.justCollided.push("Right");
            }
        } else {
            if (this.justCollided.indexOf("Right") >= 0) {
                this.justCollided.splice(this.justCollided.indexOf("Right"), 1);
            }
        }

        if (this.y - table.y < this.r + 10) {
            if (this.justCollided.indexOf("Top") < 0) {
                this.nextDy *= -1;
                this.justCollided.push("Top");
            }
        } else {
            if (this.justCollided.indexOf("Top") >= 0) {
                this.justCollided.splice(this.justCollided.indexOf("Top"), 1);
            }
        }
        
        if (table.y + table.height - this.y < this.r + 10) {
            if (this.justCollided.indexOf("Bottom") < 0) {
                this.nextDy *= -1;
                this.justCollided.push("Bottom");
            }
        } else {
            if (this.justCollided.indexOf("Bottom") >= 0) {
                this.justCollided.splice(this.justCollided.indexOf("Bottom"), 1);
            }
        }
    }

    checkCollision() {
        for (let ball of this.justCollided) {
            if (dist(this.x, this.y, ball.x, ball.y) > this.r + ball.r) {
                this.justCollided.splice(this.justCollided.indexOf(ball), 1);
            }
        }

        for (let ball of table.balls) {
            if (dist(this.x, this.y, ball.x, ball.y) < this.r + ball.r && ball != this && this.justCollided.indexOf(ball) < 0) {
                this.collide(ball);
                this.justCollided.push(ball);
            }
        }
    }

    collide(ball) {
        let v1 = sqrt(this.dx**2 + this.dy**2);
        let v2 = sqrt(ball.dx**2 + ball.dy**2);

        let theta1 = atan2(this.dy, this.dx);
        let theta2 = atan2(ball.dy, ball.dx);

        let phi = atan2(ball.y - this.y, ball.x - this.x);

        this.nextDx = v2*cos(theta2 - phi) * cos(phi) + v1*sin(theta1 - phi)*cos(phi + PI/2);
        this.nextDy = v2*cos(theta2 - phi) * sin(phi) + v1*sin(theta1 - phi)*sin(phi + PI/2);
    }

    move() {
        this.x += this.dx;
        this.y += this.dy;

        this.dx = this.nextDx;
        this.dy = this.nextDy;

        this.nextDx *= 0.98875;
        this.nextDy *= 0.98875;

        if (sqrt(this.dx**2 + this.dy**2) < 0.25) {
            this.nextDx = 0;
            this.nextDy = 0;
        }
    }

    show() {
        noStroke();
        fill(this.color);
        ellipse(this.x, this.y, 2*this.r, 2*this.r);
    }
}