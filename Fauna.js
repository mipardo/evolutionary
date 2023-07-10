class Fauna {
    constructor(canvasWidth, canvasHeight, vegetation, nPreys, nPredators) {
        this.days = 0;
        this.newBorns = 0;
        this.individuals = [];
        this.vegetation = vegetation;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.spawningPositions = new Set();
        this.#generatePreys(nPreys);
        this.#generatePredators(nPredators);
    }

    draw(simulationGraphics) {
        this.individuals.forEach(individual => individual.draw(simulationGraphics));
    }

    drawStatistics(statisticsGraphics) {
        let { preys, predators } = this.#getNumberOfPreysAndPredators();
        statisticsGraphics.textSize(15);
        statisticsGraphics.text('Simulation years: ' + Math.floor(this.days / 365), 10, 20);
        statisticsGraphics.text('Population: ' + this.individuals.length, 10, 40);
        statisticsGraphics.text('Preys: ' + preys, 10, 60);
        statisticsGraphics.text('Predators: ' + predators, 10, 80);
        statisticsGraphics.text('Newborns: ' + this.newBorns, 10, 100);
    }


    interact() {
        //this.#killElderlyIndividualsRandomly();
        this.#killIndividualsWithNoEnergy();
        this.#move();
        this.#eat();
        this.#reproduce();
        this.#getOlder();
        this.#increseReproductionDesire();
        this.days++;
    }

    #reproduce() {
        let populationLen = this.individuals.length;
        this.individuals.forEach(individual => individual.reproduce(this.individuals));
        this.newBorns += this.individuals.length - populationLen;
    }

    #eat() {
        for (let i = 0; i < this.individuals.length; i++) {
            let individual = this.individuals[i];
            if (individual instanceof Prey) {
                individual.eat(this.vegetation);
            } else {
                individual.eat(this.individuals);
            }
        }
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
        this.individuals.forEach(individual => individual.age++);
    }

    #move() {
        this.individuals.forEach(individual => individual.move());
    }

    #increseReproductionDesire() {
        this.individuals.forEach(individual => individual.reproductionDesire++);
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
        let x = Math.floor(Math.random() * (Math.floor(this.canvasWidth) + 1));
        let y = Math.floor(Math.random() * (Math.floor(this.canvasHeight) + 1));
        let position = new Position(x, y);

        while (position in this.spawningPositions) {
            x = Math.floor(Math.random() * (Math.floor(this.canvasWidth) + 1));
            y = Math.floor(Math.random() * (Math.floor(this.canvasHeight) + 1));
            position = new Position(x, y);
        }

        return position;
    }

    #getNumberOfPreysAndPredators(){
        let preys = 0;
        let predators = 0;
        for (let i = 0; i < this.individuals.length; i++) {
            let individual = this.individuals[i];
            if (individual instanceof Prey) preys++;
            else predators++;
        }
        return { preys, predators };
    }


}