let player = { vx: 0, vy: 0 };

function draw_players() {
    strokeWeight(2 / (height / 100));
    if (myID != undefined) {
        stroke(0);
        for (const player of players) {
            if (player.id == myID) {
                fill(100, 255, 100);
            } else {
                fill(255, 100, 100);
            }
            ellipse(player.x, player.y, 5);
        }
    }
}    
function send_player_vel() {
    let vx = 0;
    let vy = 0;
    let speed = 0.8;

    if (keys["w"]) vy += -speed;
    if (keys["s"]) vy += speed;
    if (keys["a"]) vx += -speed;
    if (keys["d"]) vx += speed;


    if (vy != player.vy || vx != player.vx) {
        player.vx = vx;
        player.vy = vy;
        send_to_server({ type: "set vel", vx: vx, vy: vy });
    }
}