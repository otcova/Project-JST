function start_fons(sceene) {
    stroke(0);
    strokeWeight(3);
    for (let i = 0; i < sceene.rodones.length; i++) {
        let d = dist(mouseX, mouseY, sceene.rodones[i].x, sceene.rodones[i].y);
        if ((sceene.paused == false && d < 50) || (sceene.paused == true && d < 50 && mouseIsPressed)) {
            sceene.rodones[i].r = 0;
            sceene.rodones[i].g = 0;
            sceene.rodones[i].b = 0;
        }
        fill(sceene.rodones[i].r, sceene.rodones[i].g, sceene.rodones[i].b);

        ellipse(sceene.rodones[i].x, sceene.rodones[i].y, sceene.rodones[i].size);

        if (!sceene.paused && !(sceene.rodones[i].y < -60 && client.server == "finding"))
            sceene.rodones[i].y += (sceene.rodones[i].size / 200) * Math.min(100, deltaTime) + (i % 10 == 0? 4 : 1);

        if (sceene.rodones[i].y > height + sceene.rodones[i].size / 2 && client.server != "finding") {
            sceene.rodones[i].y = -random(sceene.rodones[i].size / 2, height * 0.8);
            sceene.rodones[i].x = random(0, width);
            sceene.rodones[i].r = random(100, 255);
            sceene.rodones[i].g = random(100, 255);
            sceene.rodones[i].b = random(100, 255);
        }
    }
}