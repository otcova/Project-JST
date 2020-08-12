
scene_manager.scene_start = { rodones: [] };

scene_manager.scene_start.setup = function () {
    this.button = new Button();
    this.button_pause = new Button("right", "bottom");
    this.paused = false;
    if (this.rodones.length == 0) {
        for (let i = 0; i < 200; i++) {
            this.rodones.push({
                x: random(0, width),
                y: random(-1400, -300),
                //vel: random(5, 10), 
                a: i,
                size: 40 + i / 9,
                r: random(100, 255),
                g: random(100, 255),
                b: random(100, 255)
            });
        }
    }
}
scene_manager.scene_start.draw = function () {
    background(110, 200, 255);
    randomSeed(1);
    noStroke();
    let t = performance.now() / 2000;
    for (let i = 0; i < width * height / 70000; i++) {
        fill(100, 150, 250, random(70, 110) * sin(t + i));
        ellipse(random(0, width), random(0, height), random(300, 500));
    }
    randomSeed(performance.now());

    start_fons(this);

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
    } else if (client.server == "ok") {
        scene_manager.change("play");
    }
}

function onServerClose() {
    scene_manager.change("start");
}