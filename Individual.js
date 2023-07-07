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

        this.randomStep;
        this.randomMovingCycle = this.#getRandomMovingCycle();
        this.randomDirectionShift;
    }
    
    move() {
        if (this.age % this.randomMovingCycle == 0) {
            this.randomStep = this.#getRandomStep();
            this.randomDirectionShift = this.#getRandomDirectionShift();
        } 
        this.#move(this.randomStep, this.randomDirectionShift);
        this.age++;
    }
    
    #move(step, directionShift) {
        this.direction += directionShift;
        let xShift = sin(radians(this.direction));
        let yShift = -cos(radians(this.direction));
        this.position.x += xShift * this.speed * step;
        this.position.y += yShift * this.speed * step;
        this.#limitOverflowMovement();
    }


    #limitOverflowMovement() {
        if (this.position.x < 0) this.position.x = 0;
        if (this.position.x > this.canvasWidth) this.position.x = this.canvasWidth;
        if (this.position.y < 0) this.position.y = 0 ;
        if (this.position.y > this.canvasHeight) this.position.y = this.canvasHeight;
    }

    #getRandomDirectionShift(){
        const directions = [0, -1, 1, -2, 2];
        const randomIndex = Math.floor(Math.random() * directions.length);
        return directions[randomIndex];
    }

    #getRandomStep(){
        return Math.floor(Math.random() * 2);
    }

    #getRandomMovingCycle() {
        return Math.floor(Math.random() * 200) + 50;
    }
}
