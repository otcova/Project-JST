let players_list = [];
let player_id_counter = 0;

let lobby = require("./lobby");
let game = lobby;
let games = [
    require("./games/esquiva"),
    require("./games/race")
];

const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 1224, host: '0.0.0.0' });
server.on('connection', init_player);

function init_player(socket) {
    let player = {
        id: player_id_counter,
        socket: socket,
        send: function (data) { socket.send(JSON.stringify(data)); }
    };
    players_list.push(player);
    player_id_counter++;

    socket.on('message', function (message) {
        game.get_player_message(player, JSON.parse(message));
    });
    socket.on('close', function () {
        remove_playerfrom_list(player);
        game.exit_player(player);
    });

    player.send({ type: "id", data: player.id });
    game.new_player(player);
}

function remove_playerfrom_list(player) {
    for (var i = 0; i < players_list.length; i++) {
        if (players_list[i].id == player.id) {
            players_list.splice(i, 1);
            break;
        }
    }
}

game.start(players_list);
game.on_close = game_on_close;
setInterval(update, 16);
function update() {
    game.update();
}

function game_on_close(next_game) {
    if (next_game == undefined || players_list.length == 0) game = lobby;
    else game = games[next_game];
    
    game.on_close = game_on_close;
    game.start(players_list);
}