let server_url = "ws://localhost:1224";
let client = {};

client.init = function () {
    client.socket = new WebSocket(server_url, ['json', 'xml']);
    client.server = "finding";

    client.socket.addEventListener('open', function (event) {
        client.server = "online";
    });
    client.socket.addEventListener('message', function (event) {
        client.manage_server_data(event.data);
    });
    client.socket.addEventListener('error', function (event) {
        client.server = "error";
    });
    client.socket.addEventListener('close', function () {
        client.server = undefined;
        scene_manager.change("start");
    });
}

client.manage_server_data = function (data_str) {
    let data = JSON.parse(data_str);
    if (data.type == "frame") {
        if (get_active_scene().get_frame != undefined)
            get_active_scene().get_frame(data);
    } 
    else if (data.type == "id") {
        myID = data.data;
    }
}

function send_to_server(obj) {
    client.socket.send(JSON.stringify(obj));
}