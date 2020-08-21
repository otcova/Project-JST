let start_scene = create_scene("start");

start_scene.setup = function () {
    this.button_conectar = new Button();
    this.button_pause = new Button("right", "bottom");

    this.text_server = new InputText("127.0.0.1:1224");
    this.paused = false;
    this.init_rodones();
}

<<<<<<< HEAD
scene_manager.scene_start.draw = function () {
    background(110, 100, 255);  //fondo azul  
    if (client.server == undefined || client.server == "error") {
        this.button.draw("Conectar", 612, 300); //poscicion centre
=======
start_scene.draw = function () {
    background(110, 200, 255);

    this.draw_rodones();
    this.text_server.draw(width / 2, height / 2 + 80);

    this.update_button_pause();
    this.update_button_conectar();
}

start_scene.update_button_pause = function () {
    this.button_pause.draw(this.paused? "continuar" : "pausa", width - 40, height - 40);
    if (this.button_pause.state == "click")
        this.paused = !this.paused;
}

start_scene.update_button_conectar = function () {
    if (client.server == undefined || client.server == "error") {
        this.button_conectar.draw("conectar", width / 2, height / 2);
>>>>>>> efdbce9a0825b27bb2db79f1f3169585d88bd0b8

        if (this.button_conectar.state == "click") {
            server_url = "ws://" + this.text_server.text;
            client.init();
        }
    } else if (client.server == "finding") {
<<<<<<< HEAD
        this.button.draw("Connectant...", 612, 300);
    } else if (client.server == "ok") {
        scene_manager.change("play");
=======
        this.button_conectar.draw("connectant...", width / 2, height / 2);
    } else if (client.server == "online") {
        scene_manager.change("nova_partida");
>>>>>>> efdbce9a0825b27bb2db79f1f3169585d88bd0b8
    }
}

start_scene.key_pressed = function (event) {
    if (keyCode == BACKSPACE)
        this.text_server.on_backspace_pressed();
}

start_scene.key_typed = function () {
    this.text_server.on_key_typed(key);
}