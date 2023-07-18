class RandomGenerator {

    static spawningPositions = new Set();

    static generateFauna(nPreys, nPredators, canvasWidth, canvasHeight) {
        const individuals = []
        for (let i = 0; i < nPreys; i++) {
            const position = this.generateUnspawnedPosition(canvasWidth, canvasHeight);
            const prey = new Prey(canvasWidth, canvasHeight, position);
            this.spawningPositions.add(position);
            individuals.push(prey);
        }
        for (let i = 0; i < nPredators; i++) {
            const position = this.generateUnspawnedPosition(canvasWidth, canvasHeight);
            const predator = new Predator(canvasWidth, canvasHeight, position);
            this.spawningPositions.add(position);
            individuals.push(predator);
        }
        return individuals;
    }

    static generateVegetation(size, canvasWidth, canvasHeight) {
        const vegetation = new Map();
        for (let i = 0; i < size; i++) {
            const position = this.generateUnspawnedPosition(canvasWidth, canvasHeight);
            this.spawningPositions.add(position);
            vegetation.set(position, this.generateRandomEnergy());
        }
        return vegetation;
    }

    
    static generateUnspawnedPosition(canvasWidth, canvasHeight) {
        let position = this.generateRandomPosition(canvasWidth, canvasHeight);
        while (this.spawningPositions.has(position)) {
            position = this.generateRandomPosition(canvasWidth, canvasHeight);
        }
        return position;
    }
    
    static generateRandomEnergy() {
        return Math.floor(Math.random() * (255 - 150 + 1)) + 150;
    }

    static generateRandomPosition(canvasWidth, canvasHeight) {
        const x = Math.floor(Math.random() * (Math.floor(canvasWidth) + 1));
        const y = Math.floor(Math.random() * (Math.floor(canvasHeight) + 1));
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

