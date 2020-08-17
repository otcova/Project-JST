let myID = undefined;
let players = [];

scene_manager.scene_play = {}

scene_manager.scene_play.setup = function () {
    players = [];
}

scene_manager.scene_play.draw = function () {
}

client.scene_play_get_data = function (data) {
    if (data.type == "players") {
        players = data.data;
    } else if (data.type == "me") {
        myID = data.data;
        scene_manager.change("esquiva");
    }
}