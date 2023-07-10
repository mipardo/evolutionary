class Prey extends Individual {

    constructor(canvasWidth, canvasHeight, position) {
        super();
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.position = position;
        this.direction = 0;
        this.speed = 1;
        this.minWidth = 8;
        this.maxWidth = 16;
        this.minHeight = 10;
        this.maxHeight = 20;
        this.width = this.minWidth;
        this.height = this.minHeight;
        this.fertility = 0.6;
        this.longevity = 4000;
        this.viweingRange = 100;
        this.viweingDistance = 80;
        this.maxReproductionDesire = this.longevity / 2;
    }

    eat(vegetation) {
        if (this.energy < this.maxEnergy) {
            this.energy += vegetation.eat(this.position);
        }
    }

    reproduce(individuals) {
        let otherIndividual;
        let generateIndividual = false;
        for (let i = 0; i < individuals.length; i++) {
            otherIndividual = individuals[i];
            if (otherIndividual instanceof Prey && super.areClose(otherIndividual) 
                        && Math.random() <= this.fertility && otherIndividual !== this
                        && this.reproductionDesire >= this.maxReproductionDesire 
                        && otherIndividual.reproductionDesire >= otherIndividual.maxReproductionDesire) {
                generateIndividual = true;
                break;
            }
        }

        if (generateIndividual) {
            this.reproductionDesire = 0;
            otherIndividual.reproductionDesire = 0;
            let position = new Position(this.position.x, this.position.y);
            individuals.push(new Prey(this.canvasWidth, this.canvasHeight, position));
        }
    }

    draw() {
        // Calcula el tamaño del prey según su edad
        let ageRatio = Math.min(this.age / this.longevity, 1);
        this.width =  (ageRatio * (this.maxWidth  - this.minWidth))  + this.minWidth;
        this.height = (ageRatio * (this.maxHeight - this.minHeight)) + this.minHeight;

        // Guarda el estado de transformación actual
        push(); 

        // Translada el sistema de coordenadas al centro de la elipse y rota
        translate(this.position.x, this.position.y); 
        rotate(radians(this.direction));
        
        // Dibuja el cuerpo de la elipse
        fill(0, 0, 255);
        stroke(0, 0, 255);
        ellipse(0, 0, this.width, this.height);
        
        // Dibuja los ojos en relación a la posición (0, 0) luego de la rotación
        fill(0);
        stroke(0);
        ellipse(-4, -3, 3);
        ellipse(4, -3, 3);

        /*
        // Dibuja el campo de visión como un cono
        simulationGraphics.fill(0, 0, 255, 25);
        simulationGraphics.stroke(0, 0, 255, 0);
        simulationGraphics.beginShape();
        simulationGraphics.vertex(0, -5); // Vértice superior del cono
        let angle = this.viweingRange / 2; // Ángulo dividido a la mitad para los vértices del cono
        for (let i = -angle; i <= angle; i++) {
            let x = this.viweingDistance * sin(radians(i)); // Cálculo de la coordenada x para cada vértice
            let y = -this.viweingDistance * cos(radians(i)); // Cálculo de la coordenada y para cada vértice
            simulationGraphics.vertex(x, y);
        }
        simulationGraphics.endShape(CLOSE);
        */
       
        // Restaura el estado de transformación anterior
        pop();
    }
}