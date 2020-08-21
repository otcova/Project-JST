class InputText {
    constructor(default_text, max_len) {
        this.text = default_text;
        if (max_len != undefined) this.max_len = max_len;
        else this.max_len = 20;
    }

    draw(x, y) {
        let [w, h] = this.get_default_size();
        x -= w/2;
        y += h/2;

        fill(255);
        rect(x, y, w, h);
        
        this.text_style();
        text(this.text, x, y, w, h);
    }

    get_default_size() {
        let w = textWidth(this.text) + 60;
        let h = textAscent() + 40;
        return [Math.round(w), Math.round(h)];
    }

    text_style() {
        textAlign(CENTER, CENTER);
        noStroke();
        fill(0);
    }

    on_key_typed(key) {
        if (this.text.length < this.max_len)
            this.text += key;
    }

    on_backspace_pressed() {
        this.text = this.text.slice(0, -1);
    }
}