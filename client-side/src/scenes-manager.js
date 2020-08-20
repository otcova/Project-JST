
let scene_manager = { scene_name: "", scenes: {} };
let keys = {};

scene_manager.change = function (new_scene_name) {
    if (scene_manager.scene_name != new_scene_name) {
        scene_manager.scene_name = new_scene_name;
        get_active_scene().setup();
    }
}

function keyPressed() {
    keys[key] = true;
    if (get_active_scene().keyPressed != undefined) {
        get_active_scene().keyPressed();
    }
}

function keyReleased() {
    keys[key] = false;
    if (get_active_scene().keyReleased != undefined) {
        get_active_scene().keyReleased();
    }
}

function keyTyped() {
    if (get_active_scene().key_typed != undefined) {
        get_active_scene().key_typed();
    }
    return false;
}

function get_active_scene() {
    return scene_manager.scenes[scene_manager.scene_name];
}

function create_scene(name) {
    scene_manager.scenes[name] = {
        setup: function () {},
        draw: function () {}
    }
    return scene_manager.scenes[name];
}