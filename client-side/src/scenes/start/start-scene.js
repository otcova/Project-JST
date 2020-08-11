
scene_manager.scene_start = { rodones: [] };

scene_manager.scene_start.setup = function () {
    this.button = new Button();
    this.button_pause = new Button();
    this.paused = false;
    if (this.rodones.length == 0) {
        for (let i = 0; i < 260; i++) {
            this.rodones.push({
                x: random(0, width),
                y: random(-1000, -300), 
                //vel: random(5, 10), 
                size: 40 + i / 9,
                r: random(100, 255),
                g: random(100, 255),
                b: random(100, 255) });
        }
    }
}
scene_manager.scene_start.draw = function () {
    background(110, 200, 255);

    start_fons(this);

    this.button_pause.draw("pausa", width - 100, height - 50);
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
    } else if (client.server == "ok") {
        scene_manager.change("play");
    }
}

function onServerClose() {
    scene_manager.change("start");
}