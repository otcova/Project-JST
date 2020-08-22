function move_to_by_time(num, dest, time_span, smooth_fn = "sin") {
    if (num.dest != dest) {
        num.start_time = time;
        num.end_time = time + time_span;
        num.start = num.v;
        num.dest = dest;
        num.smooth_fn = animation_smooth_fns[smooth_fn];

        current_animations.add(num);
    }
}

function move_to_by_speed(num, dest, vel, smooth_fn) {
    move_to_by_time(num, dest, (dest - num.v) / vel, smooth_fn);
}

let current_animations = new Set();

requestAnimationFrame(animation_loop);

function animation_loop() {
    requestAnimationFrame(animation_loop);
    for (const num of current_animations) {
        animate(num);
    }
}

function animate(num) {
    if (num.dest != undefined) {
        if (num.end_time > time) {
            let t = ((time - num.start_time) / (num.end_time - num.start_time));
            t = num.smooth_fn(t);
            num.v = num.start + (num.dest - num.start) * t;
        } else {
            num.v = num.dest;
            current_animations.delete(num);
        }
    }
}

let animation_smooth_fns = {
    sin: t => { return sin((t * 2 - 1) * HALF_PI) / 2 + 0.5; },
    linear: t => { return t; },
    cub: t => { return t*t*t },
    inv_cub: t => { t = 1-t; return 1 - t*t*t },
    step: t => { return Math.round(t * 5) / 5; }
};