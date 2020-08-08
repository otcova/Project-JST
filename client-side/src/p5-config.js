function setup() {
    createCanvas(windowWidth, windowHeight);
    textSize(20);
    scene_manager.change("start");
}

document.oncontextmenu = function () {
    return false;
};

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}