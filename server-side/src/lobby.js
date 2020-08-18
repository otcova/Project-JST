let players_list = undefined;
let last_player_init_data;

function start(_players_list) {
    players_list = _players_list;
    last_player_init_data = Date.now();
}

function update() {
    if (players_list.length >= 1) {
        if (Date.now() - last_player_init_data > 500) {
            module.exports.on_close();
        }
    }
}

function init_new_player(player) {
    last_player_init_data = Date.now();
}

function exit_player(player) {
}

function get_player_message(player, message) {
}

module.exports = {
    init_new_player: init_new_player,
    exit_player: exit_player,
    start: start,
    update: update,
    on_close: function() {},
    get_player_message: get_player_message
};