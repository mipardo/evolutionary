function setup() {
    const width = windowWidth * 0.8;
    const height = windowHeight * 0.98;
    createCanvas(width, height); 
    
    fauna = new Fauna(width, height, 20, 20);
}

function draw() {
    background(220);

    fauna.interact();
    fauna.draw();
}
