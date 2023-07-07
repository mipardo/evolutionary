class Individual {

    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.position = new Position(10, 10);
    }

    draw() { }
    
    move(xShift, yShift) {
        this.position.x += xShift;
        this.position.y += yShift;
        this.wrapPosition();
    }

    wrapPosition() {
        // Handling position overflows width canvas
        if (this.position.x < 0) {
            this.position.x = this.canvasWidth + this.position.x;
        } else if (this.position.x > this.canvasWidth) {
            this.position.x = this.position.x - this.canvasWidth;
        }
        
        // Handling position overflows height canvas
        if (this.position.y < 0) {
            this.position.y = this.canvasHeight + this.position.y;
        } else if (this.position.y > this.canvasHeight) {
            this.position.y = this.position.y - this.canvasHeight;
        }
    }
}
