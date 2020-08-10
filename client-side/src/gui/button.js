
class Button {

    constructor() {
        this.state = "none";
    }

    draw(txt, x, y, w, h) {
        if (w == undefined) w = textWidth(txt) + 60;
        if (h == undefined) h = textAscent() + 40;

        if (point_rect_collision(mouseX, mouseY, x - w/2, y - h/2, w, h)) {
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

        stroke(0);
        fill(255);
        strokeWeight(1);
        if (this.state == "hover") {
            fill(50);
            stroke(255);
        } else if (this.state == "press") {
            fill(0);
            stroke(255);
        }
        rect(x + 0.5 - w/2, y + 0.5 - h/2, parseInt(w), parseInt(h));

        fill(0);
        noStroke();
        if (this.state != "none") {
            fill(255);
        }

        textAlign(CENTER, CENTER);
        text(txt, x - w/2, y - h/2, w, h);
    }
}

function point_rect_collision(px, py, rx, ry, rw, rh) {
    if (px >= rx && px <= rx + rw &&
        py >= ry && py <= ry + rh) {
        return true;
    }
    return false;
}