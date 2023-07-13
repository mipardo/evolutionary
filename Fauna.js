class Fauna {
    constructor(canvasWidth, canvasHeight, vegetation, nPreys, nPredators) {
        this.days = 0;
        this.newBorns = 0;
        this.individuals = [];
        this.maxPreys = nPreys;
        this.vegetation = vegetation;
        this.maxPredators = nPredators;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.preys = RandomGenerator.generatePreys(nPreys, canvasWidth, canvasHeight);
        this.predators = RandomGenerator.generatePredators(nPredators, canvasWidth, canvasHeight);   
    }

    draw() {
        const showVisionField = document.getElementById('showVisionField').checked;
        this.individuals.forEach(individual => individual.draw(showVisionField));
    }

    drawStatistics() {
        const { preys, predators } = this.#getCurrentNumberOfPreysAndPredators();
        document.getElementById('years').textContent = Math.floor(this.days / 365);
        document.getElementById('population').textContent = this.individuals.length;
        document.getElementById('preys').textContent = preys;
        document.getElementById('predators').textContent = predators;
        document.getElementById('newborns').textContent = this.newBorns;
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

    #getCurrentNumberOfPreysAndPredators() {
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