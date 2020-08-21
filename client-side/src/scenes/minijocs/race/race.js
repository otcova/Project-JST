let race_scene = create_scene("race");

race_scene.setup = function () {
    this.create_carratera();
}

race_scene.draw = function () {
    background(48);
    default_transforms();

    this.draw_carratera();
}

race_scene.draw_carratera = function () {
    let posA, posB;
    for (let i = 0; i < this.carratera.length - 1; i++) {
        stroke(0);
        strokeWeight(2);
        linea(this.carratera[i], this.carratera[i + 1]);
        stroke(255);
        strokeWeight(1);
        linea(this.carratera[i], this.carratera[i + 1]);
    }
    //stroke(0);
    //fill(255);
    //strokeWeight(2.5);
    //for (let i = 0; i < this.carratera.length; i++) {
    //    rodona(this.carratera[i], 12.5);
    //}
}
race_scene.create_carratera = function () {
    this.carratera = [];
    this.carratera.push({ x: 0, y: 0 });
    let angle = PI;
    let state = "dreta"; // recte, dreta, esquerra;
    let i;

    for (i = 0; i < 100; i++) {
        if (i % 5 == 0) {
            if (state == "recte") state = random_select(["dreta", "esquerra"]);
            else state = random_select(["recte", "dreta", "esquerra"]);
        }

        if (state == "recte") angle += random(-0.01, 0.01);
        else if (state == "dreta") angle += random(0.1, 0.5);
        else if (state == "esquera") angle -= random(0.1, 0.5);

        let dot = { x: this.carratera[i].x, y: this.carratera[i].y };
        dot.x += sin(angle + random(-.5, .5)) * 2;
        dot.y += cos(angle + random(-.5, .5)) * 2;
        this.carratera.push(dot);
    }
    
    
    
    for (; i < 160; i++) {
        let dot = { x: this.carratera[i].x, y: this.carratera[i].y };
        let angle_retorn = atan2(dot.y, dot.x);
        angle = normalize_angle(angle);
        
        if (angle < angle_retorn) angle += .01;
        else if (angle > angle_retorn) angle -= .01;

        dot.x -= cos(angle_retorn + random(-.5, .5)) * 2;
        dot.y -= sin(angle_retorn + random(-.5, .5)) * 2;
        
        this.carratera.push(dot);

        if (dist(dot.x, dot.y, 0, 0) < 1.1){
            this.carratera.push({ x: 0, y: 0 });
            return;
        }

    }
}