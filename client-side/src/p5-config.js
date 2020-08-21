function setup() {
    createCanvas(windowWidth, windowHeight);
    textSize(20);
    scene_manager.change("start");
}

function draw() {
    get_active_scene().draw();
}

document.oncontextmenu = function () {
    return false;
};

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function set_clipboard(txt) {
    var copyText = document.createElement("input");
    copyText.setAttribute("value", txt);
    document.body.appendChild(copyText);
    copyText.select();
    document.execCommand("copy");
    copyText.parentElement.removeChild(copyText);
}

function get_clipboard(after_copy) {
    var copyText = document.createElement("input");
    let c = document.getElementById("defaultCanvas0");
    c.parentElement.append(copyText);
    copyText.select();
    document.execCommand("paste");
    setTimeout(function() {
        after_copy(copyText.value);
        copyText.parentElement.removeChild(copyText);
    }, 0);
}