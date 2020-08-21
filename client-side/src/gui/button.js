
class Button {

    constructor() {
        this.state = "none";
    }

    draw(txt, x, y, w, h) {
        if (w == undefined) w = textWidth(txt) + 60;
        if (h == undefined) h = textAscent() + 40;

        if (point_rect_collision(mouseX, mouseY, x, y, w, h)) {
            if (mouseIsPressed) {
                this.state = "press";
            } else if (this.state == "press") {
                this.state = "click";
            } else {
                this.state = "hover";
            }
        } else {
            this.state = "none";
        }
        var a = 0; //ancho
        stroke(0);  //color borde negro
        fill(110, 200, 255);    //color button
        strokeWeight(3);    //tamaño boder
       
        if (this.state == "hover") {
            // fill(50);   //color gris
            // stroke(255);    //color borde
            fill(0, 0, 100)
            strokeWeight(10);
            a = 20; //hacer grande el button
            
        } else if (this.state == "press") {
            fill(0);
            stroke(0);
        }
        var r = 15; //border-radius

        rect(x - a/2, y - a/2 , parseInt(w) + a, parseInt(h) + a, r); //botton tamaño background

        fill(0);
        noStroke();
        if (this.state != "none") {
            fill(255);
        }

        textAlign(CENTER, CENTER);
        text(txt, x, y, w, h, );
    }
}

function point_rect_collision(px, py, rx, ry, rw, rh) {
    if (px >= rx && px <= rx + rw &&
        py >= ry && py <= ry + rh) {
        return true;
    }
    return false;
}
