let esquiva_scene = create_scene("esquiva");

esquiva_scene.setup = function () {
    this.plat_radi = 80;
    this.lineas = [
        { x: 40, y: 40, radi: 40, angle: -HALF_PI },
        { x: -40, y: 40, radi: 40, angle: 0 },
        { x: -40, y: -40, radi: 40, angle: -HALF_PI },
        { x: 40, y: -40, radi: 40, angle: 0 }
    ];
}

esquiva_scene.draw = function () {
    send_player_vel();
    
    this.draw_enviroment();
    this.draw_plataforma();
    draw_players();
    this.draw_pals();
}

esquiva_scene.draw_enviroment = function() {
    background(148, 64, 41);
    translate(width / 2, height / 2);
    scale(height / 100);
}

esquiva_scene.draw_plataforma = function() {
    fill(50, 128, 63);
    stroke(0);
    strokeWeight(2);
    ellipse(0, 0, this.plat_radi);
}

esquiva_scene.draw_pals = function () {
    for (let i = 0; i < this.lineas.length; i++) {
        push();
        translate(this.lineas[i].x, this.lineas[i].y);
        
        fill(118 - 50, 94 - 50, 224 - 50);
        stroke(0);
        strokeWeight(1);
        
        ellipse(0, 0, 15);
        
        
        rotate(this.lineas[i].angle);
        stroke(0);
        strokeWeight(9);
        line(this.lineas[i].radi, 0, -this.lineas[i].radi, 0);
        stroke(118, 94, 224);
        strokeWeight(7);
        line(this.lineas[i].radi, 0, -this.lineas[i].radi, 0);
        
        fill(0);
        noStroke();
        ellipse(0, 0, 3);
        
        pop();
    }
}

esquiva_scene.get_frame = function (frame_data) {
    players = frame_data.players;
    this.load_pals(frame_data.scene.pals);
}

esquiva_scene.load_pals = function(pals) {
    for (let i = 0; i < pals.length; i++)
        this.lineas[i].angle = pals[i];
}
