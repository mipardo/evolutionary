class Predator extends Individual {
    
    constructor(canvasWidth, canvasHeight, position) {
        super();
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.position = position;
        this.minWidth = 8;
        this.maxWidth = 20;
        this.minHeight = 8;
        this.maxHeight = 20;
        this.speed = 2;
        this.width = this.minWidth;
        this.height = this.minHeight;
        this.fertility = 0.4;
        this.direction = 0;
        this.longevity = 3000;
        this.viweingRange = 60;
        this.viweingDistance = 100;
        this.maxReproductionDesire = this.longevity / 10;
    }

    move() {
        super.moveRondomly();
    }
   
    eat(individuals) {
        for (let i = individuals.length - 1; i >= 0; i--) {
            let otherIndividual = individuals[i];
            if (otherIndividual instanceof Prey && super.areClose(otherIndividual)) {
                this.energy = this.maxEnergy;
                individuals.splice(i, 1);
            }
        }
    }

    reproduce(individuals) {
        let otherIndividual;
        let generateIndividual = false;
        for (let i = 0; i < individuals.length; i++) {
            otherIndividual = individuals[i];
            if (otherIndividual instanceof Predator && super.areClose(otherIndividual) 
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
            individuals.push(new Predator(this.canvasWidth, this.canvasHeight, position));
        }
    }


    draw(showVisionField) {
        // Calcula el tamaño del predator según su edad
        let ageRatio = Math.min(this.age / this.longevity, 1);
        this.width =  (ageRatio * (this.maxWidth  - this.minWidth))  + this.minWidth;
        this.height = (ageRatio * (this.maxHeight - this.minHeight)) + this.minHeight;
        
        // Guarda el estado de transformación actual
        push(); 

        // Translada el sistema de coordenadas al centro de la elipse y rota
        translate(this.position.x, this.position.y); 
        rotate(radians(this.direction));
        
        // Dibuja el cuerpo de la elipse
        fill(250, 0, 0);
        stroke(250, 0, 0);
        ellipse(0, 0, this.width, this.height);
        
        // Dibuja los ojos en relación a la posición (0, 0) luego de la rotación
        fill(0);
        stroke(0);
        ellipse(-3, -3, 2);
        ellipse( 3, -3, 2);

        if (showVisionField) {
            // Dibuja el campo de visión como un cono
            fill(250, 0, 0, 20);
            stroke(250, 0, 0, 0);
            beginShape();
            vertex(0, -5); // Vértice superior del cono
            let angle = this.viweingRange / 2; // Ángulo dividido a la mitad para los vértices del cono
            for (let i = -angle; i <= angle; i++) {
                let x = this.viweingDistance * sin(radians(i)); // Cálculo de la coordenada x para cada vértice
                let y = -this.viweingDistance * cos(radians(i)); // Cálculo de la coordenada y para cada vértice
                vertex(x, y);
            }
            endShape(CLOSE);
        }

        // Restaura el estado de transformación anterior
        pop();
    }
   
}