class Line {
    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
    }

    show() {

        push();
        fill(0,0,255);
        translate(this.p1);
        sphere(5);
        pop();
    
        push();
        fill(255,0,0);
        translate(this.p2);
        sphere(5);
        pop();

        push();
        let h = sqrt((((this.p1.x - this.p2.x)**2) + ((this.p1.y - this.p2.y)**2) + ((this.p1.z - this.p2.z)**2)))
  
        let c = createVector(((this.p1.x+this.p2.x)/2), ((this.p1.y + this.p2.y)/2), ((this.p1.z+this.p2.z)/2))
  
       translate(c.x,c.y,c.z);
  
        let p1 = c;
        let p2 = createVector(c.x,c.y+(h*0.5), c.z);
        let p3 = this.p2;
  
        let d1 = sqrt((p2.x - p1.x)**2 + (p2.y - p1.y)**2);
        let d2 = sqrt((p3.x - p1.x)**2 + (p3.y - p1.y)**2);
        let d3 = sqrt((p3.x - p2.x)**2 + (p3.y - p2.y)**2);
  
        let zrot = acos((d1**2 + d2**2 - d3**2)/(2*d1*d2));
  
        p1 = c;
        p2 = createVector(this.p2.x,this.p2.y, c.z);
        p3 = this.p2;
  
        let a = sqrt((p2.x - p1.x)**2 + (p2.y-p1.y)**2);;
        let b = sqrt((p3.x - p1.x)**2 + (p3.y - p1.y)**2);

        c = sqrt((p3.x - p2.x)**2 + (p3.y - p2.y)**2 + (p3.z - p2.z)**2);
        let xrot =  acos((a**2 + b**2 - c**2)/(2*a*b));
  
        rotateZ(-zrot);
        rotateX(xrot);

        fill(0,150,0);
        cylinder(1,h);
  
        pop();

    }
}