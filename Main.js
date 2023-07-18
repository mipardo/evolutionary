function setup() {
    const nPreys = 60;
    const nPredators = 20;
    const startingVegetaton = 1000;

    const leftSectionDiv = document.getElementById("leftSection");
    let simulationCanvasWidth = leftSectionDiv.offsetWidth;
    let simulationCanvasHeight = leftSectionDiv.offsetHeight;

    const simulationCanvas = createCanvas(simulationCanvasWidth, simulationCanvasHeight);
    simulationCanvas.parent('leftSection');
    
    vegetation = new Vegetation(simulationCanvasWidth, simulationCanvasHeight, startingVegetaton);
    fauna = new Fauna(simulationCanvasWidth, simulationCanvasHeight, vegetation, nPreys, nPredators);
}

function draw() {
    background(220)
    vegetation.draw();
    fauna.interact();
    fauna.draw();
    fauna.drawStatistics();
}