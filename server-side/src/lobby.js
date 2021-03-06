let players_list = undefined;
let last_player_init_data;

function start(_players_list) {
    players_list = _players_list;
    last_player_init_data = Date.now();
    for (const player of players_list)
        player.send({ type: "nova partida", game_name: "race" });
}

function update() {
    if (players_list.length >= 1) {
        if (Date.now() - last_player_init_data > 500) {
            module.exports.on_close(1);
        }
    }
}

function new_player(player) {
    player.send({ type: "nova partida", game_name: "race" });
    last_player_init_data = Date.now();
}

function exit_player(player) {
}

function get_player_message(player, message) {
}

module.exports = {
    new_player: new_player,
    exit_player: exit_player,
    start: start,
    update: update,
    on_close: function(n) {},
    get_player_message: get_player_message
};