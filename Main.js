function setup() {
    const width = 800;
    const height = 800;
    createCanvas(width, height); 
    predator = new Predator(width, height);
}

function draw() {
    background(220);
    predator.move(0, -1) 
    predator.draw();
}
