
let start_scene = create_scene("start");

start_scene.setup = function () {
    this.button = new Button();
    this.button_pause = new Button("right", "bottom");
    this.paused = false;
    this.init_rodones();

    //auto server connection
    client.init();
}

start_scene.draw = function () {
    background(110, 200, 255);
    
    this.draw_rodones();

    if (this.paused) this.button_pause.draw("continuar", width - 40, height - 40);
    else this.button_pause.draw("pausar", width - 40, height - 40);
    if (this.button_pause.state == "click") {
        this.paused = !this.paused;
    }

    if (client.server == undefined || client.server == "error") {
        this.button.draw("conectar", width / 2, height / 2);

        if (this.button.state == "click") {
            client.init();
        }
    } else if (client.server == "finding") {
        this.button.draw("connectant...", width / 2, height / 2);
    } else if (client.server == "online") {
        scene_manager.change("play");
    }
}