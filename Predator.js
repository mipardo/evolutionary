class Predator extends Individual {
    
    radius = 20;
    
    draw() {
        fill(250, 0, 0);
        stroke(250, 0, 0);
        ellipse(this.position.x, this.position.y, this.radius);
    }
   
}