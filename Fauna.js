class Fauna {
    constructor(canvasWidth, canvasHeight, nPreys, nPredators) {
        this.individuals = [];
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.spawningPositions = new Set(); 
        this.#generatePreys(nPreys);
        this.#generatePredators(nPredators);
    }

    draw() {
        this.individuals.forEach(individual => individual.draw());
    }

    
    interact() {
        this.#killElderlyIndividualsRandomly();
        this.#killIndividualsWithNoEnergy();
        this.#move();
        this.#getOlder();
    }
    
    #killIndividualsWithNoEnergy() {
        for (let i = this.individuals.length - 1; i >= 0; i--) {
            let individual = this.individuals[i];
            if (individual.energy <= 0) {
                this.individuals.splice(i, 1);
            }
        }
    }

    #killElderlyIndividualsRandomly() {
        for (let i = this.individuals.length - 1; i >= 0; i--) {
            let individual = this.individuals[i];
            let diyingProbability = random() * (individual.age / individual.longevity);
            if (diyingProbability >= 0.6) {
                this.individuals.splice(i, 1);
            }
        }
    }

    #getOlder() {
        this.individuals.forEach(individual => individual.age += 1);
    }
    
    #move() {
        this.individuals.forEach(individual => individual.move());
    }

    #generatePredators(size) {
        for (let i = 0; i < size; i++) {
            let position = this.#generateRandomPosition();
            let predator = new Predator(this.canvasWidth, this.canvasHeight, position);
            this.spawningPositions.add(position);
            this.individuals.push(predator);
        }
    }

    #generatePreys(size) {
        for (let i = 0; i < size; i++) {
            let position = this.#generateRandomPosition();
            let prey = new Prey(this.canvasWidth, this.canvasHeight, position);
            this.spawningPositions.add(position);
            this.individuals.push(prey); 
        }
    }

    #generateRandomPosition() {
        let x = Math.floor(Math.random() * (this.canvasWidth + 1));
        let y = Math.floor(Math.random() * (this.canvasHeight + 1));
        let position = new Position(x, y);

        while (position in this.spawningPositions) {
            x = Math.floor(Math.random() * (this.canvasWidth + 1));
            y = Math.floor(Math.random() * (this.canvasHeight + 1));
            position = new Position(x, y);        
        }

        return position;
    }


}