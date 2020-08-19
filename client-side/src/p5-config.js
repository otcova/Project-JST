function setup() {
    createCanvas(windowWidth, windowHeight);
    textSize(20);
    scene_manager.change("start");
}

function draw() {
    get_active_scene().draw();
}

document.oncontextmenu = function () {
    return false;
};

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}