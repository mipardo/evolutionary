function setup() {
    const canvasWidth = Math.floor(windowWidth * 0.99);
    const canvasHeight = Math.floor(windowHeight * 0.97);
    const simulationCanvasWidth = Math.floor(canvasWidth * 0.8);
    const simulationCanvasHeight = Math.floor(canvasHeight * 0.98);
    const statisticsCanvasWidth = Math.floor(canvasWidth * 0.2);
    const statisticsCanvasHeight = Math.floor(canvasHeight * 0.98);

    createCanvas(canvasWidth, canvasHeight);
    simulationGraphics = createGraphics(simulationCanvasWidth, simulationCanvasHeight);
    statisticsGraphics = createGraphics(statisticsCanvasWidth, statisticsCanvasHeight);

    vegetation = new Vegetation(simulationCanvasWidth, simulationCanvasHeight);
    fauna = new Fauna(simulationCanvasWidth, simulationCanvasHeight, vegetation, 400, 300);
}

function draw() {
    simulationGraphics.background(220)
    vegetation.draw(simulationGraphics);
    fauna.interact();
    fauna.draw(simulationGraphics);
    
    statisticsGraphics.background(255);
    fauna.drawStatistics(statisticsGraphics);
 
    image(simulationGraphics, 0, 0); 
    image(statisticsGraphics, simulationGraphics.width, 0);
}