let start_scene = create_scene("start");

start_scene.setup = function () {
    this.button_play = new Button();
    this.button_pause = new Button("right", "bottom");

    this.text_server = new InputText("localhost:1224");
    this.paused = false;
    this.init_rodones();
    
    //auto server connection
    //client.init();
}

start_scene.draw = function () {
    background(110, 200, 255);
    
    this.draw_rodones();
    this.text_server.draw(width / 2, height / 2 + 80);

    this.update_button_pause();
    this.update_button_play();
}

start_scene.update_button_pause = function() {
    if (this.paused) this.button_pause.draw("continuar", width - 40, height - 40);
    else this.button_pause.draw("pausar", width - 40, height - 40);
    if (this.button_pause.state == "click") {
        this.paused = !this.paused;
    }
}

start_scene.update_button_play = function() {
    if (client.server == undefined || client.server == "error") {
        this.button_play.draw("conectar", width / 2, height / 2);

        if (this.button_play.state == "click") {
            server_url = "ws://" + this.text_server.text;
            client.init();
        }
    } else if (client.server == "finding") {
        this.button_play.draw("connectant...", width / 2, height / 2);
    } else if (client.server == "online") {
        scene_manager.change("nova_partida");
    }
}

start_scene.keyPressed = function() {
    if (keyCode == BACKSPACE)
        this.text_server.on_backspace_pressed();
 
}

start_scene.key_typed = function() {
    this.text_server.on_key_typed(key);
}