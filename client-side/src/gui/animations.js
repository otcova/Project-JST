function animate_all(env) {
    if (env.numbers != undefined) {
        if (env.numbers_params == undefined) env.numbers_params = {};
        for (let num in numbers) {
            if (env.numbers_params[num] != undefined)
                animate(numbers[num], env.numbers_params[num]);
        }
    }
} 

function set_animte(env, num_name, dest, duration) {
    if (env.numbers_params == undefined) env.numbers_params = {};
    if (env.numbers_params[num_name] == undefined) env.numbers_params[num_name] = {};
    
    if (env.numbers_params[num_name].dest != dest) {
        env.numbers_params[num_name].start_time = time;
        env.numbers_params[num_name].end_time = time + duration;
        env.numbers_params[num_name].start = num.value;
        env.numbers_params[num_name].dest = dest;
    }
}

function animate(num, params) {
    if (params.dest != undefined) {
        if (params.end_time > time) {
            let t = ((time - params.start_time) / (params.end_time - params.start_time));
            t = sin(sin((t * 2 - 1) * HALF_PI) * HALF_PI) / 2 + 0.5;
            num = params.start + (params.dest - params.start) * t;
        } else {
            num = params.dest;
        }
    }
}
