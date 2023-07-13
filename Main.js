function setup() {
    const nPreys = 20;
    const nPredators = 10;

    const leftSectionDiv = document.getElementById("leftSection");
    let simulationCanvasWidth = leftSectionDiv.offsetWidth;
    let simulationCanvasHeight = leftSectionDiv.offsetHeight;

    const simulationCanvas = createCanvas(simulationCanvasWidth, simulationCanvasHeight);
    simulationCanvas.parent('leftSection');
    
    vegetation = new Vegetation(simulationCanvasWidth, simulationCanvasHeight);
    fauna = new Fauna(simulationCanvasWidth, simulationCanvasHeight, vegetation, nPreys, nPredators);
}

function draw() {
    background(220)
    vegetation.draw();
    fauna.interact();
    fauna.draw();
    fauna.drawStatistics();
}