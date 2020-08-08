
scene_manager.scene_start = {};

scene_manager.scene_start.setup = function () {
    this.button = new Button();
}

scene_manager.scene_start.draw = function () {
    background(110, 200, 255);
    if (client.server == undefined || client.server == "error") {
        this.button.draw("conectar", 100, 100);

        if (this.button.state == "click") {
            client.init("ws://192.168.56.1:1224");
        }
    } else if (client.server == "finding") {
        this.button.draw("connectant...", 100, 100);
    } else if (client.server == "ok") {
        scene_manager.change("play");
    }
}

function onServerClose() {
    scene_manager.change("start");
}