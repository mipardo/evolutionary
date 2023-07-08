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
   
    draw() {
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
        ellipse(-4, -3, 3);
        ellipse(4, -3, 3);

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

        // Restaura el estado de transformación anterior
        pop();
    }
   
}