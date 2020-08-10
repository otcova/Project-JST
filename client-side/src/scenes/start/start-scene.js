
scene_manager.scene_start = { };

scene_manager.scene_start.setup = function () {
    this.button = new Button();
    this.button_pause = new Button();
    this.rodones = [];
    this.paused = false;
    for (let i = 0; i < 300; i++) {
        let rodona = {
            x: random(0, width),
            y: random(-700, -10), 
            vel: random(5, 10), 
            size: random (30, 72),
            r: random(100, 255),
            g: random(100, 255),
            b: random(100, 255) };
            
        this.rodones.push(rodona);
    }

    console.log(this);
}
scene_manager.scene_start.draw = function () {
    background(110, 200, 255);
    
    start_fons(this);
    this.button_pause.draw("pausa", width - 100, height - 50);
    if (this.button_pause.state == "click") {
        if (this.paused == false) {
            for (let i = 0; i < this.rodones.length; i++) {
                this.rodones[i].vel = 0;
            }
            this.paused = true;
        } else {
            for (let i = 0; i < this.rodones.length; i++) {
                this.rodones[i].vel = random(5, 10);
            }
            this.paused = false;
        }
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