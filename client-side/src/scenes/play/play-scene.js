let myID = undefined;
let players = [];

play_scene = create_scene("play");

play_scene.setup = function () {
    players = [];
    scene_manager.change("esquiva");
}

play_scene.draw = function () {
}
