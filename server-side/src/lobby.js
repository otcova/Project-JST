let players_list = undefined;

function start(_players_list) {
    console.log("lobby");
    players_list = _players_list;
}

function update() {
}

function init_new_player(player) {
    if (players_list.length >= 1) {
        module.exports.on_close();
    }
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