scene_manager.scene_esquiva = {}

scene_manager.scene_esquiva.setup = function () {
    this.plat_radi = 80;
    this.lineas = [
        { x: 40, y: 40, radi: 40, angle: -HALF_PI, vel: 0.03 },
        { x: -40, y: 40, radi: 40, angle: 0, vel: 0.03},
        { x: -40, y: -40, radi: 40, angle: -HALF_PI, vel: -0.03},
        { x: 40, y: -40, radi: 40, angle: 0, vel: -0.03}
        
    ];
}

scene_manager.scene_esquiva.draw = function () {
    background(148, 64, 41);
    moure();


    //********* SERVIDOR   ********/
    //this.plat_radi -= 0.01;


    //****************************/

    push();
    translate(width / 2, height / 2);
    let s = height / 100;
    scale(s, s);

    strokeWeight(2 / s);
    fill(50, 128, 63);
    stroke(0);
    strokeWeight(2);
    ellipse(0, 0, this.plat_radi);
    
    draw_player();
    
    for (let i = 0; i < this.lineas.length; i++) {
        this.lineas[i].angle += this.lineas[i].vel;
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
    
    pop();
}