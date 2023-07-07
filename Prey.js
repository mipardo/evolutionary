class Prey extends Individual {

    radius = 20;

    draw() {
        fill(0, 230, 0);
        stroke(0, 230, 0);
        ellipse(this.position.x, this.position.y, this.radius);
    }
}