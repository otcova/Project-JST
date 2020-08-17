
const Matter = require('matter-js');

let players = new Map();
let pastDate = undefined;
let engine = Matter.Engine.create();
engine.world.gravity.y = 0;

function update(server) {
    move_players();
    send_players_data(server);
}

function send_players_data(server) {
    let playersArray = [];
    for (const [id, player] of players) {
        let playerData = { x: player.x, y: player.y, id: id };
        playersArray.push(playerData);
    }
    let playersString = JSON.stringify({ type: "players", data: playersArray });

    for (const client of server.clients) {
        client.send(playersString);
    }
}

function move_players() {
    for (const [id, player] of players) {
        Matter.Body.setVelocity(player.body, { x: player.vx, y: player.vy });
    }
    if (pastDate == undefined) {
        pastDate = Date.now();
        Matter.Engine.update(engine, 10);
    } else {
        let dateNow = Date.now();
        Matter.Engine.update(engine, dateNow - pastDate);
        pastDate = dateNow;
    }
    for (const [id, player] of players) {
        player.x = player.body.position.x;
        player.y = player.body.position.y;
    }
}

function init_player(player_id) {
    let player = { x: Math.random() * 700 + 50, y: Math.random() * 400 + 50, vx: 0, vy: 0, id: player_id };
    player.body = Matter.Bodies.circle(player.x, player.y, 15)
    Matter.World.add(engine.world, player.body);
    players.set(player_id, player);
}

function get_client_message(client_id, message) {
    if (message.type == "me") {
        console.log("Set player", message.data);
        players.set(client_id, message.data);
        console.log(players);
    } else if (message.type == "set vel") {
        let player = players.get(client_id);
        if (message.vx != undefined) player.vx = message.vx;
        if (message.vy != undefined) player.vy = message.vy;
    }
}

module.exports = {
    init_player: init_player,
    update: update,
    get_client_message: get_client_message,
    players: players
};