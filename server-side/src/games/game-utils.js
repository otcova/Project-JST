function default_init_players(players_list, Matter, engine) {
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

function get_players_pos(players_list) {
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

function move_players_body(players_list, Matter, engine, timer) {
    for (const player of players_list) {
        if (!player.spectator)
            Matter.Body.setVelocity(player.body, { x: player.vx, y: player.vy });
    }
    Matter.Engine.update(engine, timer.delta);
}

module.exports = {
    default_init_players: default_init_players,
    update_timer: update_timer,
    get_players_pos: get_players_pos,
    send_to_players: send_to_players,
    move_players_body: move_players_body,
};