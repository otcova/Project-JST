const Matter = require('matter-js');
const WebSocket = require('ws');

// Server ----------------------------------------------------------
const server = new WebSocket.Server({ port: 1224 });

let client_id_count = 0;
let players = new Map();

server.on('connection', function (socket) {
    socket.id = client_id_count;
    let player = { x: Math.random() * 700, y: Math.random() * 400, vx: 0, vy: 0, id: socket.id };
    initPlayer(player);
    players.set(socket.id, player);

    socket.on('message', function (message) {
        getClientData(socket.id, JSON.parse(message));
    });
    socket.on('close', function () {
        players.delete(socket.id);
    });

    socket.send(JSON.stringify({ type: "me", data: socket.id }));
    client_id_count++;
});

setInterval(update, 16);

function update() {
    move_players();

    //console.log(players);
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

function getClientData(client_id, data) {
    if (data.type == "me") {
        console.log("Set player", data.data);
        players.set(client_id, data.data);
        console.log(players);
    } else if (data.type == "set vel") {
        let player = players.get(client_id);
        if (data.vx != undefined) player.vx = data.vx;
        if (data.vy != undefined) player.vy = data.vy;
    }
}

// Matter js -------------------------------------------------------------------

let pastDate = undefined;
let engine = Matter.Engine.create();
engine.world.gravity.y = 0;

function initPlayer(player) {
    player.body = Matter.Bodies.rectangle(player.x, player.y, 80, 80)
    Matter.World.add(engine.world, player.body);
}

function move_players() {
    for (const [id, player] of players) {
        Matter.Body.setVelocity(player.body, { x: player.vx, y: player.vy });
    }
    if (pastDate == undefined) {
        pastDate = Date.now();
        Matter.Engine.update(engine, 16);
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