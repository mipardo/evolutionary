class Vegetation{
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.vegetationSize = 20;
        this.vegetationWidth = Math.floor(canvasWidth / this.vegetationSize);
        this.vegetationHeight = Math.floor(canvasHeight / this.vegetationSize);
        this.vegetation = new Array(this.vegetationHeight).fill(null).map(() => new Array(this.vegetationWidth).fill(255));
    }

    eat(position) {
        let xMapped = Math.floor(position.x / this.vegetationSize) % this.vegetationWidth;
        let yMapped = Math.floor(position.y / this.vegetationSize) % this.vegetationHeight;
        if (this.vegetation[yMapped][xMapped] > 0) {
            this.vegetation[yMapped][xMapped]--;
            return 1;
        }
        return 0;
    }

    draw(simulationGraphics) {
        for (let y = 0; y < this.vegetationHeight; y++) {
            for (let x = 0; x < this.vegetationWidth; x++) {
                if (this.vegetation[y][x] >= 1) {
                    simulationGraphics.stroke(0, 0, 0, 0); 
                    simulationGraphics.fill(0, this.vegetation[y][x], 0, 80); 
                } else {
                    simulationGraphics.fill(128);
                }
                simulationGraphics.rect(x * this.vegetationSize, y * this.vegetationSize, this.vegetationSize, this.vegetationSize); 
            }
        }       
    }


}