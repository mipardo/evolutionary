class Predator extends Individual {
    
    constructor(canvasWidth, canvasHeight, position) {
        super(canvasWidth, canvasHeight);
        this.speed = 2;
        this.width = 16;
        this.height = 20;
        this.fertility = 5;
        this.direction = 0;
        this.longevity = 3000;
        this.viweingRange = 60;
        this.viweingDistance = 100;
        this.position = position;
    }
   
    eat(individuals) {
        for (let i = individuals.length - 1; i >= 0; i--) {
            let individual = individuals[i];
            if (individual instanceof Prey && this.#areClose(individual)) {
                this.energy = this.maxEnergy;
                individuals.splice(i, 1);
            }
        }
    }

    #areClose(otherIndividual) {
        return (10 > Math.abs(otherIndividual.position.x - this.position.x)) && 
               (10 > Math.abs(otherIndividual.position.y - this.position.y));
    }

    draw(simulationGraphics) {
        // Guarda el estado de transformación actual
        simulationGraphics.push(); 

        // Translada el sistema de coordenadas al centro de la elipse y rota
        simulationGraphics.translate(this.position.x, this.position.y); 
        simulationGraphics.rotate(radians(this.direction));
        
        // Dibuja el cuerpo de la elipse
        simulationGraphics.fill(250, 0, 0);
        simulationGraphics.stroke(250, 0, 0);
        simulationGraphics.ellipse(0, 0, this.width, this.height);
        
        // Dibuja los ojos en relación a la posición (0, 0) luego de la rotación
        simulationGraphics.fill(0);
        simulationGraphics.stroke(0);
        simulationGraphics.ellipse(-4, -3, 3);
        simulationGraphics.ellipse(4, -3, 3);

        // Dibuja el campo de visión como un cono
        simulationGraphics.fill(250, 0, 0, 20);
        simulationGraphics.stroke(250, 0, 0, 0);
        simulationGraphics.beginShape();
        simulationGraphics.vertex(0, -5); // Vértice superior del cono
        let angle = this.viweingRange / 2; // Ángulo dividido a la mitad para los vértices del cono
        for (let i = -angle; i <= angle; i++) {
            let x = this.viweingDistance * sin(radians(i)); // Cálculo de la coordenada x para cada vértice
            let y = -this.viweingDistance * cos(radians(i)); // Cálculo de la coordenada y para cada vértice
            simulationGraphics.vertex(x, y);
        }
        simulationGraphics.endShape(CLOSE);

        // Restaura el estado de transformación anterior
        simulationGraphics.pop();
    }
   
}