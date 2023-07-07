class Individual {

    constructor(canvasWidth, canvasHeight, position, direction, speed, longevity, fertility, viweingDistance, viweingRange) {
        this.age = 0;                                       // (0 - longevity)
        this.speed = speed;                                 // (0 - 10)
        this.position = position;
        this.direction = direction;
        this.strength = 10 - speed;                         // (0 - 10) : inverse of strength
        this.longevity = longevity;                         // (50 - 100) 
        this.fertility = fertility;                         // (0 - 9)  : probability of reproduction
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.viweingRange = viweingRange;                   // (0 - 360)
        this.viweingDistance = viweingDistance;             // (0 - 20)
        this.chromosome = [speed, longevity, fertility, viweingDistance, viweingRange]
    }
    
    move(directionShift) {
        this.direction += directionShift;
        let xShift = sin(radians(this.direction));
        let yShift = -cos(radians(this.direction));
        this.position.x += xShift * this.speed;
        this.position.y += yShift * this.speed;
        this.#limitOverflowMovement();
    }

    #limitOverflowMovement() {
        if (this.position.x < 0) this.position.x = 0;
        if (this.position.x > this.canvasWidth) this.position.x = this.canvasWidth;
        if (this.position.y < 0) this.position.y = 0 ;
        if (this.position.y > this.canvasHeight) this.position.y = this.canvasHeight;
    }
}
