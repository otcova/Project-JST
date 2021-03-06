
let scene_manager = { scene_name: "", scenes: {} };
let keys = {};

scene_manager.change = function (new_scene_name) {
    if (scene_manager.scene_name != new_scene_name) {
        scene_manager.scene_name = new_scene_name;
        get_active_scene().setup();
    }   
}

function keyPressed(event) {
    keys[key] = true;
    if (get_active_scene().key_pressed != undefined) {
        get_active_scene().key_pressed(event);
    }
}

function keyReleased(event) {
    keys[key] = false;
    if (get_active_scene().key_released != undefined) {
        get_active_scene().key_released(event);
    }
}

function keyTyped(event) {
    if (get_active_scene().key_typed != undefined) {
        get_active_scene().key_typed(event);
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

function random_select(list) {
    let dau = parseInt(random(0, list.length));
    for (let i = 0; i < list.length; i++)
        if (dau == i) return list[i];
}

function normalize_angle(angle) {
    let newAngle = angle;
    while (newAngle <= -180) newAngle += 360;
    while (newAngle > 180) newAngle -= 360;
    return newAngle;
}