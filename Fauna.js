class Fauna {
    constructor(canvasWidth, canvasHeight, nPreys, nPredators) {
        this.days = 0;
        this.individuals = [];
        this.populationHistory = [];
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
        /*
        statisticsGraphics.background(255);
    
        let xScale = statisticsGraphics.width / this.days;
        let yScale = statisticsGraphics.height / Math.max(...this.populationHistory);
        
        statisticsGraphics.stroke(0);
        for (let i = 1; i < this.populationHistory.length; i++) {
            statisticsGraphics.line((i - 1) * xScale, this.populationHistory[i - 1] * yScale,
                                   i * xScale, this.populationHistory[i] * yScale);
        }
        
        statisticsGraphics.stroke(0);
        statisticsGraphics.line(0, 0, 0, statisticsGraphics.height); // Eje y
        statisticsGraphics.line(0, statisticsGraphics.height, statisticsGraphics.width, statisticsGraphics.height); // Eje x
        */

        let preys, predators = this.#getNumberOfPreysAndPredators();
        statisticsGraphics.textSize(15);
        statisticsGraphics.text('Population: ' + this.individuals.length + '\n', 10, 30);
        //statisticsGraphics.text('Preys: ' + preys + '\n', 10, 30);
        //statisticsGraphics.text('Predators: ' + predators + '\n', 10, 30);
    }


    interact() {
        //this.#killElderlyIndividualsRandomly();
        this.#killIndividualsWithNoEnergy();
        this.#move();
        this.#eat();
        this.#getOlder();
        this.populationHistory.push(this.individuals.length);
        this.days++;
    }

    #eat() {
        this.individuals.forEach(individual => individual.eat(this.individuals));
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

    #getNumberOfPreysAndPredators(){
        let preys = 0;
        let predators = 0;
        for (let i = 0; i < this.individuals.length; i++) {
            let individual = this.individuals[i];
            if (individual instanceof Prey) preys++;
            else predators++;
        }
        return preys, predators;
    }


}