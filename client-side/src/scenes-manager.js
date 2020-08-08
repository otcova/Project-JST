
let scene_manager = { scene_name: "" };

scene_manager.change = function (new_scene_name) {
    if (scene_manager["scene_" + new_scene_name].setup != undefined) {
        scene_manager["scene_" + new_scene_name].setup();
    }
    scene_manager.scene_name = new_scene_name;
}

function draw() {
    scene_manager["scene_" + scene_manager.scene_name].draw();
}

function keyPressed() {
    if (scene_manager["scene_" + scene_manager.scene_name].keyPressed != undefined) {
        scene_manager["scene_" + scene_manager.scene_name].keyPressed();
    }
}

function keyReleased() {
    if (scene_manager["scene_" + scene_manager.scene_name].keyReleased != undefined) {
        scene_manager["scene_" + scene_manager.scene_name].keyReleased();
    }
}