
scene_manager.scene_start = {};

scene_manager.scene_start.setup = function () {
    this.button = new Button();
}

scene_manager.scene_start.draw = function () {
    background(110, 100, 255);  //fondo azul  
    if (client.server == undefined || client.server == "error") {
        this.button.draw("Conectar", 612, 300); //poscicion centre

        if (this.button.state == "click") {
            client.init();
        }
    } else if (client.server == "finding") {
        this.button.draw("Connectant...", 612, 300);
    } else if (client.server == "ok") {
        scene_manager.change("play");
    }
}

function onServerClose() {
    scene_manager.change("start");
}