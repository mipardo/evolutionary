class Individual {

    constructor() {
        this.age = 0;                                       
        this.maxEnergy = 1000;
        this.energy = this.maxEnergy;
        this.reproductionDesire = 0;
        
        this.randomStep = this.#getRandomStep();
        this.randomMovingCycle = this.#getRandomMovingCycle();
        this.randomDirectionShift = this.#getRandomDirectionShift();
    }
    
    move() {
        if (this.age % this.randomMovingCycle == 0) {
            this.randomStep = this.#getRandomStep();
            this.randomDirectionShift = this.#getRandomDirectionShift();
        } 
        this.#move(this.randomStep, this.randomDirectionShift);
    }

    areClose(otherIndividual) {
        return (this.width  > Math.abs(otherIndividual.position.x - this.position.x)) && 
               (this.height > Math.abs(otherIndividual.position.y - this.position.y));
    }
    
    #move(step, directionShift) {
        this.energy -= step;
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
        const directions = [0, -1, 1];
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
