let myID = undefined;
let players = [];

scene_manager.scene_play = {}

scene_manager.scene_play.setup = function () {
    players = [];
    this.player_speed = 3;  //velocidad
    this.keys = {};
}

scene_manager.scene_play.draw = function () {
    background(200, 255, 110); 

    if (myID != undefined) {
        strokeWeight(1);    
        stroke(0);  //borde color
        for (const player of players) {
            if (player.id == myID) {
                fill(100, 255, 100);    //verde color
            } else {
                fill(255, 100, 100);    //rojo  color
            }
            ellipse(player.x, player.y, 30);
            // square(player.x, player.y, 50);
            
        }
    }
    
    



    //move
    if(this.keys["w"]){
        client.socket.send(JSON.stringify({ type: "set vel", vy: -this.player_speed}));
    }
    else if (this.keys["a"]){
        client.socket.send(JSON.stringify({ type: "set vel", vx: -this.player_speed}));
    }
    else if (this.keys["s"]){
        client.socket.send(JSON.stringify({ type: "set vel", vy: this.player_speed}));
    }
    else if (this.keys["d"]){
        client.socket.send(JSON.stringify({ type: "set vel", vx: this.player_speed}));
    }   
}



scene_manager.scene_play.keyPressed = function () {
    //adalt, baix, detra, esquera
    this.keys[key] = true;
    if (key == "w" || key == "W")
        client.socket.send(JSON.stringify({ type: "set vel", vy: -this.player_speed }));
    else if (key == "a" || key == "A")
        client.socket.send(JSON.stringify({ type: "set vel", vx: -this.player_speed }));
    else if (key == "s" || key == "S")
        client.socket.send(JSON.stringify({ type: "set vel", vy: this.player_speed }));
    else if (key == "d" || key == "D")
        client.socket.send(JSON.stringify({ type: "set vel", vx: this.player_speed }));
}

scene_manager.scene_play.keyReleased = function () {
    this.keys[key] = false;
    if (key == "w" || key == "W")
        client.socket.send(JSON.stringify({ type: "set vel", vy: 0 }));
    else if (key == "a" || key == "A")
        client.socket.send(JSON.stringify({ type: "set vel", vx: 0, }));
    else if (key == "s" || key == "S")
        client.socket.send(JSON.stringify({ type: "set vel",  vy: 0 }));
    else if (key == "d" || key == "D")
        client.socket.send(JSON.stringify({ type: "set vel", vx: 0 }));
}


client.scene_play_get_data = function (data) {
    if (data.type == "players") {
        players = data.data;
    } else if (data.type == "me") {
        myID = data.data;
    }
}