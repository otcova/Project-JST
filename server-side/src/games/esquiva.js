const utils = require('./game-utils');
const Matter = require('matter-js');
const HALF_PI = 1.570796327;

let players_list = undefined;
let engine = Matter.Engine.create();
engine.world.gravity.y = 0;
let timer;

function start(_players_list) {
    players_list = _players_list;
    timer = utils.create_timer();
    utils.init_engine(Matter, engine);
    utils.init_players(players_list, Matter, engine);
    init_scene();
}

function new_player(player) {
    player.send({ type: "nova partida", game_name: "esquiva" });
    player.spectator = true;
    utils.log_players(players_list);
}

function update() {
    utils.update_timer(timer);
    
    move_scene();
    utils.move_players(players_list, Matter);
    utils.update_engine(Matter, engine, timer);

    send_frame();
}

function send_frame() {
    utils.send_to_players(players_list, {
        type: "frame",
        players: utils.get_players_frame(players_list),
        scene: get_scene_frame()
    });
}

function exit_player(player) {
    if (!player.spectator) {
        let count = utils.count_players(players_list);
        if (count.players == 0) {
            close_game();
        }
    }
    utils.log_players(players_list);
}

function close_game() {
    Matter.World.clear(engine.world);
    Matter.Engine.clear(engine);
    module.exports.on_close();
}

function get_player_message(player, message) {
    if (message.type == "set vel") {
        if (message.vx != undefined) player.vx = message.vx;
        if (message.vy != undefined) player.vy = message.vy;
    }
}


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
    for (let i = 0; i < pals_start.length; i++) {
        Matter.Body.rotate(pals_body[i], pals_start[i].vel * 0.0000005 * (20000 + Math.min(140000, timer.time)));
    }
}

function get_scene_frame() {
    let angles = [];
    
    for (let i = 0; i < pals_start.length; i++) {
        angles.push(pals_body[i].angle);
    }
    return { pals: angles };
}

// ---------

module.exports = {
    new_player: new_player,
    exit_player: exit_player,
    start: start,
    update: update,
    on_close: function () { },
    get_player_message: get_player_message
};