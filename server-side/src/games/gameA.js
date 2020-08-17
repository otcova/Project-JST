let players_list = undefined;

const Matter = require('matter-js');
let engine = Matter.Engine.create();
engine.world.gravity.y = 0;
timer = { time: 0, delta: 10 };

function start(_players_list) {
    players_list = _players_list;

    for (const player of players_list) {
        player.spectator = false;
        player.vx = 0;
        player.vy = 0;
        player.body = Matter.Bodies.circle(
            Math.random() * 30 - 15,
            Math.random() * 30 - 15, 5);
        Matter.World.add(engine.world, player.body);
    }

    load_scene();
}

function update() {
    if (timer.time == 0) {
        timer.time = Date.now();
    } else {
        let now = Date.now();
        timer.delta = now - timer.time;
        timer.time = now;
    }
    //console.log("delta: ", time.delta);

    move_scene();
    move_players();
    send_players_data();
}

function send_players_data() {
    let playersArray = [];
    for (const player of players_list) {
        if (!player.spectator) {
            let playerData = { x: player.body.position.x, y: player.body.position.y, id: player.id };
            playersArray.push(playerData);
        }
    }
    let playersString = JSON.stringify({ type: "players", data: playersArray });

    for (const player of players_list) {
        player.socket.send(playersString);
    }
}

function move_players() {
    for (const player of players_list) {
        if (!player.spectator)
            Matter.Body.setVelocity(player.body, { x: player.vx, y: player.vy });
    }
    Matter.Engine.update(engine, timer.delta);
}

// player events

function init_new_player(player) {
    player.spectator = true;
}

function exit_player(player) {
    if (!player.spectator) {
        let playerCount = 0;
        for (const p of players_list) {
            if (!p.spectator) playerCount++;
        }
        console.log("playersC", players_list.length);
        if (playerCount == 0) {
            console.log("CLOSE");
            module.exports.on_close();
        }
    }
}

function get_player_message(player, message) {
    if (message.type == "set vel") {
        if (message.vx != undefined) player.vx = message.vx;
        if (message.vy != undefined) player.vy = message.vy;
    }
}

// -----------

const HALF_PI = 1.570796327;

const pals_start = [
    { x: 40, y: 40, angle: -HALF_PI, vel: 0.03 },
    { x: -40, y: 40, angle: 0, vel: 0.03 },
    { x: -40, y: -40, angle: -HALF_PI, vel: -0.03 },
    { x: 40, y: -40, angle: 0, vel: -0.03 }
];

let pals_body = [];

function load_scene() {
    for (let i = 0; i < pals_start.length; i++) {
        body = Matter.Bodies.rectangle(pals_start[i].x, pals_start[i].y, 85, 3, { isStatic: true });
        Matter.Body.rotate(body, pals_start[i].angle);
        Matter.World.add(engine.world, body);
        pals_body.push(body);
    }
}

function move_scene() {
    let angles = [];
    
    for (let i = 0; i < pals_start.length; i++) {
        angles.push(pals_body[i].angle);
        Matter.Body.rotate(pals_body[i], pals_start[i].vel);
    }
    
    let sceene = JSON.stringify({ type: "sceene", data: angles });

    for (const player of players_list) {
        player.socket.send(sceene);
    }

}

// ---------

module.exports = {
    init_new_player: init_new_player,
    exit_player: exit_player,
    start: start,
    update: update,
    on_close: function () { },
    get_player_message: get_player_message
};