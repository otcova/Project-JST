
class Button {

    constructor(alignx, aligny) {
        this.state = "none";
        this.align = { x: "center", y: "center" }; // { [top / center / bottom], [left / center / right]}
        if (alignx != undefined) this.align.x = alignx;
        if (aligny != undefined) this.align.y = aligny;
    }

    draw(txt, x, y, w, h) {
        if (w == undefined) w = textWidth(txt) + 60;
        if (h == undefined) h = textAscent() + 40;

        if (this.align.x == "center") x -= w / 2;
        else if (this.align.x == "right") x -= w;
        if (this.align.y == "center") y -= h / 2;
        else if (this.align.y == "bottom") y -= h;

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

        stroke(0);
        fill(255);
        strokeWeight(1);
        if (this.state == "over") {
            fill(50);
            stroke(255);
        } else if (this.state == "press") {
            fill(0);
            stroke(255);
        }
        rect(x + 0.5, y + 0.5, Math.round(w), Math.round(h));

        fill(0);
        noStroke();
        if (this.state != "none") {
            fill(255);
        }

        textAlign(CENTER, CENTER);
        text(txt, x, y, w, h);
    }
}

function point_rect_collision(px, py, rx, ry, rw, rh) {
    if (px >= rx && px <= rx + rw &&
        py >= ry && py <= ry + rh) {
        return true;
    }
    return false;
}