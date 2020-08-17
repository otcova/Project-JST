let server_url = "ws://localhost:1224";
let client = {};

client.init = function () {
    client.socket = new WebSocket(server_url, ['json', 'xml']);
    client.server = "finding";

    client.socket.addEventListener('open', function (event) {
        client.server = "ok";
    });
    client.socket.addEventListener('message', function (event) {
        client.get_server_data(event.data);
    });
    client.socket.addEventListener('error', function (event) {
        client.server = "error";
    });
    client.socket.addEventListener('close', function () {
        client.server = undefined;
        onServerClose();
    });
}

client.get_server_data = function (data) {
    client.scene_scene_get_data(JSON.parse(data));
}

function sendServer(obj) {
    client.socket.send(JSON.stringify(obj));
}