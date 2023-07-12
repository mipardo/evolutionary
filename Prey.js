class Prey extends Individual {

    constructor(canvasWidth, canvasHeight, position) {
        super();
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.position = position;
        this.direction = 0;
        this.speed = 1;
        this.minWidth = 8;
        this.maxWidth = 20;
        this.minHeight = 8;
        this.maxHeight = 20;
        this.width = this.minWidth;
        this.height = this.minHeight;
        this.fertility = 0.6;
        this.longevity = 4000;
        this.viweingRange = 100;
        this.viweingDistance = 80;
        this.sightDistance = 5;
        this.maxReproductionDesire = this.longevity / 5;
        this.fieldVisibility = this.#createFieldVisibility();
    }

    #createFieldVisibility() {
        let fieldVisibility = [];
        for(let i = 0; i < this.sightDistance; i++) {
            fieldVisibility[i] = [];
            for(let j = 0; j < this.sightDistance; j++) {
                fieldVisibility[i][j] = -1;
            }
        }
        return fieldVisibility;
    }


    updateFieldVisibility(vegetation) {
        this.fieldVisibility = vegetation.getFieldVisibility(this.position, this.sightDistance);
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

    draw(showVisionField) {
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
        fill(58, 135, 253);
        stroke(58, 135, 253);
        ellipse(0, 0, this.width, this.height);
        
        // Dibuja los ojos en relación a la posición (0, 0) luego de la rotación
        fill(0);
        stroke(0);
        ellipse(-3, -3, 2);
        ellipse( 3, -3, 2);

        if (showVisionField) {
            // Dibuja el campo de visión como un cono
            fill(0, 0, 230, 25);
            stroke(58, 135, 253, 0);
            ellipse(0, 0, this.sightDistance * 20);
        }
       
        // Restaura el estado de transformación anterior
        pop();
    }
}