function setup() {
    const width = 800;
    const height = 800;
    createCanvas(width, height); 
    
    fauna = new Fauna(width, height, 10, 10);
}

function draw() {
    background(220);

    fauna.move();
    fauna.draw();
}
