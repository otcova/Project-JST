let players_list = [];
let player_id_counter = 0;

let lobby = require("./lobby");
let game = lobby;
let games = [
    require("./games/gameA")
];

const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 1224, host: '0.0.0.0' });
server.on('connection', init_player);

function init_player(socket) {
    let player = { 
        x: Math.random() * 700 + 50, 
        y: Math.random() * 400 + 50, 
        vx: 0, 
        vy: 0, 
        id: player_id_counter,
        socket: socket,
        send: function(data) { this.socket.send(JSON.stringify(data)); }
    };
    players_list.push(player);
    player_id_counter++;

    socket.on('message', function (message) {
        game.get_player_message(player, JSON.parse(message));
    });
    socket.on('close', function () {
        for (var i = 0; i < players_list.length; i++) { 
            if (players_list[i].id == player.id) { 
                players_list.splice(i, 1);
                break;
            }
        }
        game.exit_player(player);
        console.log("players: ", players_list.length);
    });
    
    
    player.send({ type: "me", data: player.id });
    console.log("players: ", players_list.length);
    
    game.init_new_player(player);
}

game.start(players_list);
setInterval(update, 16);
function update() {
    game.update();
}

game.on_close = game_on_close;
function game_on_close() {
    console.log("on-close - ", players_list.length);
    if (players_list.length == 0) game = lobby;
    else game = games[Math.floor(Math.random() * games.length)];

    game.start(players_list);
    game.on_close = game_on_close;
}
