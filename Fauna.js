class Fauna {
    constructor(canvasWidth, canvasHeight, nPreys, nPredators) {
        this.preys = [];
        this.predators = [];
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.spawningPositions = new Set(); 
        this.#generatePreys(nPreys);
        this.#generatePredators(nPredators);
    }

    draw() {
        this.preys.forEach(prey => prey.draw());
        this.predators.forEach(predator => predator.draw());
    }

    move() {
        this.preys.forEach(prey => prey.move(2));
        this.predators.forEach(predator => predator.move(2));
    }

    #generatePredators(size) {
        for (let i = 0; i < size; i++) {
            let position = this.#generateRandomPosition();
            let predator = new Predator(this.canvasWidth, this.canvasHeight, position);
            this.spawningPositions.add(position);
            this.predators.push(predator); 
        }
    }

    #generatePreys(size) {
        for (let i = 0; i < size; i++) {
            let position = this.#generateRandomPosition();
            let prey = new Prey(this.canvasWidth, this.canvasHeight, position);
            this.spawningPositions.add(position);
            this.preys.push(prey); 
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