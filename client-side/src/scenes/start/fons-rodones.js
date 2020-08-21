start_scene.init_rodones = function() {
    this.rodones = [];
    for (let i = 0; i < 200; i++) {
        this.rodones.push({
            x: random(0, width),
            y: random(-1400, -300),
            a: i,
            size: 40 + i / 9,
            r: random(100, 255),
            g: random(100, 255),
            b: random(100, 255)
        });
    }
}


start_scene.draw_rodones = function () {
    
    randomSeed(1);
    noStroke();
    let t = performance.now() / 2000;
    for (let i = 0; i < width * height / 70000; i++) {
        fill(100, 150, 250, random(70, 110) * sin(t + i));
        ellipse(random(0, width), random(0, height), random(300, 500));
    }

    stroke(0);
    strokeWeight(3);
    randomSeed(performance.now());

    for (let i = 0; i < this.rodones.length; i++) {
        let d = dist(mouseX, mouseY, this.rodones[i].x, this.rodones[i].y);
        if ((this.paused == false && d < 50) || (this.paused == true && d < 50 && mouseIsPressed)) {
            this.rodones[i].r = 0;
            this.rodones[i].g = 0;
            this.rodones[i].b = 0;
        }
        fill(this.rodones[i].r, this.rodones[i].g, this.rodones[i].b);

        if (i % 8 == 0) {
            push();
            translate(this.rodones[i].x, this.rodones[i].y);
            if (!this.paused) this.rodones[i].a += deltaTime * 0.00012 * (noise(i / 20) * 20 - 10)
            rotate(this.rodones[i].a);
            let halfSize = this.rodones[i].size / 2;
            rect(-halfSize, -halfSize, this.rodones[i].size, this.rodones[i].size + (noise(i * 2) * 20 - 10));
            pop();
        }
        else ellipse(this.rodones[i].x, this.rodones[i].y, this.rodones[i].size);

        if (!this.paused && !(this.rodones[i].y < -60 && client.server == "finding")) {
            this.rodones[i].y += (this.rodones[i].size / 200) * Math.min(100, deltaTime) + (i % 10 == 0 ? noise(i) * 4 + 2 : 1);
            this.rodones[i].x += (i % 10 == 0 ? noise(i) * 2 - 1 : 0);
        }
        if (this.rodones[i].y > height + this.rodones[i].size / 2 && client.server != "finding") {
            this.rodones[i].y = -random(this.rodones[i].size / 2, height * 0.8);
            this.rodones[i].x = random(0, width);
            this.rodones[i].r = random(100, 255);
            this.rodones[i].g = random(100, 255);
            this.rodones[i].b = random(100, 255);
        }
    }
}