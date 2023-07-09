function setup() {
    const canvasWidth = windowWidth * 0.99;
    const canvasHeight = windowHeight * 0.97;
    const simulationCanvasWidth = canvasWidth * 0.8;
    const simulationCanvasHeight = canvasHeight * 0.98;
    const statisticsCanvasWidth = canvasWidth * 0.2;
    const statisticsCanvasHeight = canvasHeight * 0.98;

    createCanvas(canvasWidth, canvasHeight);
    simulationGraphics = createGraphics(simulationCanvasWidth, simulationCanvasHeight);
    statisticsGraphics = createGraphics(statisticsCanvasWidth, statisticsCanvasHeight);

    fauna = new Fauna(simulationCanvasWidth, simulationCanvasHeight, 20, 20);
}

function draw() {

    simulationGraphics.background(220);
    fauna.interact();
    fauna.draw(simulationGraphics);
    
    statisticsGraphics.background(255);
    fauna.drawStatistics(statisticsGraphics);
 
    image(simulationGraphics, 0, 0); 
    image(statisticsGraphics, simulationGraphics.width, 0);
}