let myID = undefined;
let players = [];

scene_manager.scene_play = {}

scene_manager.scene_play.setup = function () {
    players = [];
}

scene_manager.scene_play.draw = function () {
    background(200, 255, 110);

    if (myID != undefined) {
        stroke(0);
        for (const player of players) {
            if (player.id == myID) {
                fill(100, 255, 100);
            } else {
                fill(255, 100, 100);
            }
            ellipse(player.x, player.y, 30);
        }
    }
}

scene_manager.scene_play.keyPressed = function () {
    if (key == "w" || key == "W")
        client.socket.send(JSON.stringify({ type: "set vel", vx: 3 }));
}

scene_manager.scene_play.keyReleased = function () {
    if (key == "w" || key == "W")
        client.socket.send(JSON.stringify({ type: "set vel", vx: 0 }));
}

client.scene_play_get_data = function (data) {
    if (data.type == "players") {
        players = data.data;
    } else if (data.type == "me") {
        myID = data.data;
    }
}