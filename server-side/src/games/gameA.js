const utils = require('./game-utils');
const Matter = require('matter-js');
const HALF_PI = 1.570796327;

let players_list = undefined;
let engine = Matter.Engine.create();
engine.world.gravity.y = 0;
let timer = { start: Date.now(), time: 0, delta: 10 };

function start(_players_list) {
    timer.start = Date.now();
    Matter.World.clear(engine.world);
    Matter.Engine.clear(engine);
    
    players_list = _players_list;
    utils.default_init_players(players_list, Matter, engine);
    init_scene();
}

function init_new_player(player) {
    player.spectator = true;
}

function update() {
    utils.update_timer(timer);
    
    let scene_inst = move_scene();
    utils.move_players_body(players_list, Matter, engine, timer);
    let players_inst = utils.get_players_pos(players_list);

    utils.send_to_players(players_list, { 
        type: "frame", 
        players: players_inst, 
        scene: scene_inst 
    });
}

function exit_player(player) {
    if (!player.spectator) {
        let playerCount = 0;
        for (const p of players_list) {
            if (!p.spectator) playerCount++;
        }
        if (playerCount == 0) {
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


// ------------ scene stuf ----------------


const pals_start = [
    { x: 40, y: 40, angle: -HALF_PI, vel: 1 },
    { x: -40, y: 40, angle: 0, vel: 1 },
    { x: -40, y: -40, angle: -HALF_PI, vel: -1 },
    { x: 40, y: -40, angle: 0, vel: -1 }
];

let pals_body;

function init_scene() {
    pals_body = [];
    for (let i = 0; i < pals_start.length; i++) {
        body = Matter.Bodies.rectangle(pals_start[i].x, pals_start[i].y, 87, 8, { isStatic: true });
        Matter.Body.rotate(body, pals_start[i].angle);
        Matter.World.add(engine.world, body);
        pals_body.push(body);
    }
}

function move_scene() {
    let angles = [];
    
    for (let i = 0; i < pals_start.length; i++) {
        angles.push(pals_body[i].angle);
        Matter.Body.rotate(pals_body[i], pals_start[i].vel * 0.0000005 * (20000 + Math.min(140000, timer.time)));
    }

    return { bars: angles };
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