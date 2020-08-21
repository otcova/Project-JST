
class Button {

    constructor(alignx, aligny) {
        this.state = "none";
        this.align = { x: "center", y: "center" }; // { [top / center / bottom], [left / center / right]}
        if (alignx != undefined) this.align.x = alignx;
        if (aligny != undefined) this.align.y = aligny;
    }

    draw(txt, x, y, w, h) {
        [w, h] = this.get_default_size(txt, w, h);
        [x, y] = this.apply_align(x, y, w, h);

        this.calc_mouse_events(x, y, w, h);
        
        this.rect_style();
        rect(x + 0.5, y + 0.5, w, h);

        this.text_style();
        text(txt, x, y, w, h);
    }

    get_default_size(txt, w, h) {
        if (w == undefined) w = textWidth(txt) + 60;
        if (h == undefined) h = textAscent() + 40;
        return [Math.round(w), Math.round(h)];
    }

    apply_align(x, y, w, h) {
        if (this.align.x == "center") x -= w / 2;
        else if (this.align.x == "right") x -= w;
        if (this.align.y == "center") y -= h / 2;
        else if (this.align.y == "bottom") y -= h;
        return [x, y];
    }

    calc_mouse_events(x, y, w, h) {
        if (point_rect_collision(mouseX, mouseY, x, y, w, h)) {
            if (mouseIsPressed) {
                this.state = "press";
            } else if (this.state == "press") {
                this.state = "click";
            } else {
                this.state = "over";
            }
        } else {
            this.state = "none";
        }
<<<<<<< HEAD
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
            
=======
    }

    rect_style() {
        stroke(0);
        fill(255);
        strokeWeight(1);
        if (this.state == "over") {
            fill(50);
            stroke(255);
>>>>>>> efdbce9a0825b27bb2db79f1f3169585d88bd0b8
        } else if (this.state == "press") {
            fill(0);
            stroke(0);
        }
<<<<<<< HEAD
        var r = 15; //border-radius

        rect(x - a/2, y - a/2 , parseInt(w) + a, parseInt(h) + a, r); //botton tamaño background
=======
    }
>>>>>>> efdbce9a0825b27bb2db79f1f3169585d88bd0b8

    text_style() {
        fill(0);
        noStroke();
        if (this.state != "none") {
            fill(255);
        }

        textAlign(CENTER, CENTER);
<<<<<<< HEAD
        text(txt, x, y, w, h, );
=======
>>>>>>> efdbce9a0825b27bb2db79f1f3169585d88bd0b8
    }
}

function point_rect_collision(px, py, rx, ry, rw, rh) {
    if (px >= rx && px <= rx + rw &&
        py >= ry && py <= ry + rh) {
        return true;
    }
    return false;
}
