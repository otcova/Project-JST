let myID = undefined;
let players = [];

nova_partida_scene = create_scene("nova_partida");

nova_partida_scene.setup = function () {
    players = [];
}

nova_partida_scene.draw = function () {
    background(255);
    text(this.game_name, 0, 0, width, height);
}

nova_partida_scene.get_frame = function (data) {
    if (this.game_name != undefined && myID != undefined) {
        scene_manager.change(this.game_name);
        if (get_active_scene().get_frame != undefined)
                get_active_scene().get_frame(data);
    }
}

nova_partida_scene.get_nova_partida = function (data) {
    this.game_name = data.game_name;
}