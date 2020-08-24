function init_players(players_list, Matter, engine) {
    for (const player of players_list) {
        player.spectator = false;
        player.vx = 0;
        player.vy = 0;
        if (engine != undefined) {
            player.body = Matter.Bodies.circle(
                Math.random() * 30 - 15,
                Math.random() * 30 - 15, 2.5);
            Matter.World.add(engine.world, player.body);
        }
    }
    log_players(players_list);
}

function init_players_pos_fix(players_list, Matter, engine, x, y, d) {
    for (const player of players_list) {
        player.spectator = false;
        player.vx = 0;
        player.vy = 0;
        if (engine != undefined) {
            player.body = Matter.Bodies.circle(
                x,
                y, d);
            Matter.World.add(engine.world, player.body);
        }
    }
    log_players(players_list);
}

function init_engine(Matter, engine) {
    Matter.World.clear(engine.world);
    Matter.Engine.clear(engine);
}

function create_timer() {
    return { start: Date.now(), time: 0, delta: 10 };
}

function update_timer(timer) {
    if (timer.time == 0) {
        timer.time = Date.now() - timer.start;
    } else {
        let now = Date.now()  - timer.start;
        timer.delta = now - timer.time;
        timer.time = now;
    }
}

function get_players_frame(players_list) {
    let players_array = [];
    for (const player of players_list) {
        if (!player.spectator) {
            let player_data = { x: player.body.position.x, y: player.body.position.y, id: player.id };
            players_array.push(player_data);
        }
    }
    return players_array;
}

function send_to_players(players_list, data) {
    let playersString = JSON.stringify(data);
    for (const player of players_list) {
        player.socket.send(playersString);
    }
}

function move_players(players_list, Matter) {
    for (const player of players_list) {
        if (!player.spectator)
            Matter.Body.setVelocity(player.body, { x: player.vx, y: player.vy });
    }
}

function update_engine(Matter, engine, timer) {
    Matter.Engine.update(engine, timer.delta);
}

function count_players(players_list) {
    let players_count = 0;
    let spectators_count = 0;
    for (const p of players_list) {
        if (p.spectator) spectators_count++;
        else players_count++;
    }
    return { players: players_count, spectators: spectators_count };
}

function log_players(players_list) {
    let count = count_players(players_list);
    console.log("players: ", count.players, "|", count.spectators);
}

module.exports = {
    init_engine: init_engine,
    init_players: init_players,
    create_timer: create_timer,
    update_timer: update_timer,
    get_players_frame: get_players_frame,
    send_to_players: send_to_players,
    move_players: move_players,
    update_engine: update_engine,
    log_players: log_players,
    count_players: count_players,
    init_players_pos_fix: init_players_pos_fix
};