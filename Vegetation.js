class Vegetation {
    constructor(canvasWidth, canvasHeight, startingVegetaton) {
        this.vegetationSize = 2;
        this.vegetationQuantity = startingVegetaton;
        this.vegetation = RandomGenerator.generateVegetation(this.vegetationQuantity, canvasWidth, canvasHeight);
    }

    eat(preyPos) {
        let energyAcquired = 0;
        this.vegetation.forEach((energy, vegetationPos) => {
            if (this.#isCloseToEat(preyPos, vegetationPos)) {
                energyAcquired += energy;
                this.vegetation.delete(vegetationPos);
            }
        });
        return energyAcquired;
    }

    #isCloseToEat(preyPos, vegetationPos) {
        return (this.vegetationSize > Math.abs(preyPos.x - vegetationPos.x)) && 
               (this.vegetationSize > Math.abs(preyPos.y - vegetationPos.y));
    }

    draw() {
        this.vegetation.forEach((energy, position) => {
            fill(0, energy, 0);
            stroke(0, energy, 0);
            ellipse(position.x, position.y, this.vegetationSize);
        });
    }

}