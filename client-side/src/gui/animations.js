function set_animte(num, dest, d) {
    if (num.dest != dest) {
        num.start_time = time;
        num.end_time = time + d;
        num.start = num.value;
        num.dest = dest;
    }
}

function animate(num) {
    if (num.dest != undefined) {
        if (num.end_time > time) {
            let t = ((time - num.start_time) / (num.end_time - num.start_time));
            t = sin(sin((t * 2 - 1) * HALF_PI) * HALF_PI) / 2 + 0.5
            num.value = num.start + (num.dest - num.start) * t;
        } else {
            num.value = num.dest;
        }
    }
}
