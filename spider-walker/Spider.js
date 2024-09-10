class Spider {

    constructor(floor) {
        this.floor = floor;
        this.position = createVector(floor.position.x - floor.size/4, floor.position.y, floor.position.z + 50);
        this.size = createVector(150, 50, 20);

        this.legs = [];

        this.numLegsPerSide = 3;

        this.joints = [];
        this.initJoints();
        this.setJoints();

        this.xoff = 0;
    }

    initJoints() {
        for (let i = 0; i < this.numLegsPerSide; i += 1) {
            this.joints.push(createVector(0, 0, 0));
            this.joints.push(createVector(0, 0, 0));
        }
    }

    setJoints() {

        let dx = this.size.x / (this.numLegsPerSide-1);

        for (let i = 0; i < 2*this.numLegsPerSide; i += 2) {
            this.joints[i].x = this.position.x + this.size.x/2 - (dx * i/2);
            this.joints[i].y = this.position.y - this.size.y * 0.5;
            this.joints[i].z = this.position.z - this.size.z * 0.5;
            
            this.joints[i+1].x = this.position.x + this.size.x/2 - dx * (i/2);
            this.joints[i+1].y = this.position.y + this.size.y * 0.5;
            this.joints[i+1].z = this.position.z - this.size.z * 0.5;
        }

        // this.joints[0].x = this.position.x - this.size.x * 0.5;
        // this.joints[0].y = this.position.y - this.size.y * 0.5;
        // this.joints[0].z = this.position.z - this.size.z * 0.5;

        // this.joints[1].x = this.position.x - this.size.x * 0.5;
        // this.joints[1].y = this.position.y + this.size.y * 0.5;
        // this.joints[1].z = this.position.z - this.size.z * 0.5;

        // this.joints[2].x = this.position.x + this.size.x * 0.5;
        // this.joints[2].y = this.position.y - this.size.y * 0.5;
        // this.joints[2].z = this.position.z - this.size.z * 0.5;

        // this.joints[3].x = this.position.x + this.size.x * 0.5;
        // this.joints[3].y = this.position.y + this.size.y * 0.5;
        // this.joints[3].z = this.position.z - this.size.z * 0.5;

        // this.joints[4].x = this.position.x;
        // this.joints[4].y = this.position.y - this.size.y * 0.5;
        // this.joints[4].z = this.position.z - this.size.z * 0.5;

        // this.joints[5].x = this.position.x;
        // this.joints[5].y = this.position.y + this.size.y * 0.5;
        // this.joints[5].z = this.position.z - this.size.z * 0.5;

    }

    move() {
        this.position.x += 2;
        this.setJoints();

        this.position.z = map(noise(this.xoff), 0, 1, 50, 50);
        this.xoff += 0.05;
    }

    show() {
        push();
        translate(this.position);
        fill(0);
        box(this.size);
        pop();

        for (let joint of this.joints) {
            push();
            translate(joint);
            normalMaterial();
            sphere(5);
            pop();
        }

        for (let leg of this.legs) {
            leg.show();
            leg.solve();
        }
    }

}