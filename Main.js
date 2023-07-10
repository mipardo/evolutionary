function setup() {
    const canvasWidth = Math.floor(windowWidth * 0.99);
    const canvasHeight = Math.floor(windowHeight * 0.97);
    const simulationCanvasWidth = Math.floor(canvasWidth * 0.8);
    const simulationCanvasHeight = Math.floor(canvasHeight * 0.98);
    
    simulationGraphics = createCanvas(simulationCanvasWidth, simulationCanvasHeight);
    simulationGraphics.parent('simulationCanvas');
    document.getElementById('simulationCanvas').style.cssFloat = 'left';
    
    vegetation = new Vegetation(simulationCanvasWidth, simulationCanvasHeight);
    fauna = new Fauna(simulationCanvasWidth, simulationCanvasHeight, vegetation, 400, 300);
}

function draw() {
    background(220)
    vegetation.draw(simulationGraphics);
    fauna.interact();
    fauna.draw(simulationGraphics);
    fauna.drawStatistics();
}