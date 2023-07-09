class Prey extends Individual {

    constructor(canvasWidth, canvasHeight, position) {
        super(canvasWidth, canvasHeight);
        this.speed = 1;
        this.width = 16;
        this.height = 20;
        this.fertility = 5;
        this.direction = 0;
        this.longevity = 4000;
        this.viweingRange = 100;
        this.viweingDistance = 80;
        this.position = position;
    }

    eat() { }

    draw() {
        // Guarda el estado de transformación actual
        simulationGraphics.push(); 

        // Translada el sistema de coordenadas al centro de la elipse y rota
        simulationGraphics.translate(this.position.x, this.position.y); 
        simulationGraphics.rotate(radians(this.direction));
        
        // Dibuja el cuerpo de la elipse
        simulationGraphics.fill(0, 255, 0);
        simulationGraphics.stroke(0, 255, 0);
        simulationGraphics.ellipse(0, 0, this.width, this.height);
        
        // Dibuja los ojos en relación a la posición (0, 0) luego de la rotación
        simulationGraphics.fill(0);
        simulationGraphics.stroke(0);
        simulationGraphics.ellipse(-4, -3, 3);
        simulationGraphics.ellipse(4, -3, 3);

        // Dibuja el campo de visión como un cono
        simulationGraphics.fill(0, 255, 0, 25);
        simulationGraphics.stroke(0, 255, 0, 0);
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