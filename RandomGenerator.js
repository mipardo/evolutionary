class RandomGenerator {

    static spawningPositions = new Set();

    static generatePredators(size, canvasWidth, canvasHeight) {
        const predators = []
        for (let i = 0; i < size; i++) {
            let position = this.generateRandomPosition();
            while (position in this.spawningPositions) {
                position = this.generateRandomPosition(canvasWidth, canvasHeight);
            }
            let predator = new Predator(canvasWidth, canvasHeight, position);
            this.spawningPositions.add(position);
            predators.push(predator);
        }
        return predators;
    }

    static generatePreys(size, canvasWidth, canvasHeight) {
        const preys = []
        for (let i = 0; i < size; i++) {
            let position = this.generateRandomPosition();
            while (position in this.spawningPositions) {
                position = this.generateRandomPosition(canvasWidth, canvasHeight);
            }
            let prey = new Prey(canvasWidth, canvasHeight, position);
            this.spawningPositions.add(position);
            preys.push(prey);
        }
        return preys;
    }

    static generateVegetation(size, canvasWidth, canvasHeight) {
        const vegetation = new Map();
        for (let i = 0; i < size; i++) {
            let position = this.generateRandomPosition();
            while (this.spawningPositions.has(position)) {
                position = this.generateRandomPosition(canvasWidth, canvasHeight);
            }
            this.spawningPositions.add(position);
            vegetation.set(position, this.generateRandomEnergy());
        }
        return vegetation;
    }

    static generateRandomEnergy() {
        return Math.floor(Math.random() * (255 - 150 + 1)) + 150;
    }

    static generateRandomPosition(canvasWidth, canvasHeight) {
        let x = Math.floor(Math.random() * (Math.floor(canvasWidth) + 1));
        let y = Math.floor(Math.random() * (Math.floor(canvasHeight) + 1));
        return new Position(x, y);
    }

    static getRandomDirectionShift() {
        const directions = [0, -1, 1];
        const randomIndex = Math.floor(Math.random() * directions.length);
        return directions[randomIndex];
    }

    static getRandomStep() {
        return Math.floor(Math.random() * 2);
    }

    static getRandomMovingCycle() {
        return Math.floor(Math.random() * 200) + 50;
    }
}

