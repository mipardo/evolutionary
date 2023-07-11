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
        this.spawningPositions = new Set();
        this.#generatePreys(nPreys);
        this.#generatePredators(nPredators);
        //this.#createPopulationChart();
    }

    draw() {
        let showVisionField = document.getElementById('showVisionField').checked;
        this.individuals.forEach(individual => individual.draw(showVisionField));
    }

    drawStatistics() {
        let { preys, predators } = this.#getNumberOfPreysAndPredators();

        document.getElementById('years').textContent = Math.floor(this.days / 365);
        document.getElementById('population').textContent = this.individuals.length;
        document.getElementById('preys').textContent = preys;
        document.getElementById('predators').textContent = predators;
        document.getElementById('newborns').textContent = this.newBorns;
        //this.#drawPopulationChart(preys, predators);
    }

    #createPopulationChart() {
        const data = {

            datasets: [{
                label: "predators",
                borderColor: "red",
                fill: true
            },
            {
                label: "preys",
                borderColor: "blue",
                fill: true
            }]
        };
        const options = {
            legend: { display: false },

        };

        this.populationChart = new Chart("populationChart", {
            type: "line",
            data: data,
            options: options
        });
    }

    #drawPopulationChart(currentPreys, currentPredators) {
        this.populationChart.data.datasets.forEach((dataset) => {
            if (dataset.label === "preys") {
                dataset.data.push(currentPreys);
            } else {
                dataset.data.push(currentPredators);
            }
        });
        this.populationChart.update();
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

    #getNumberOfPreysAndPredators() {
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