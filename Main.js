function setup() {
    const blockSize = 20;

    const leftSectionDiv = document.getElementById("leftSection");
    let simulationCanvasWidth = leftSectionDiv.offsetWidth;
    let simulationCanvasHeight = leftSectionDiv.offsetHeight;
    simulationCanvasWidth -= leftSectionDiv.offsetWidth % blockSize;
    simulationCanvasHeight -= leftSectionDiv.offsetHeight % blockSize;

    const simulationCanvas = createCanvas(simulationCanvasWidth, simulationCanvasHeight);
    simulationCanvas.parent('leftSection');
    
    vegetation = new Vegetation(simulationCanvasWidth, simulationCanvasHeight, blockSize);
    fauna = new Fauna(simulationCanvasWidth, simulationCanvasHeight, vegetation, 20, 10);
}

function draw() {
    background(220)
    vegetation.draw();
    fauna.interact();
    fauna.draw();
    fauna.drawStatistics();
}