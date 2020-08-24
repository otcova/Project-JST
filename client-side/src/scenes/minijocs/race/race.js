let race_scene = create_scene("race");

race_scene.setup = function () {
    this.obstacles = [];
}

race_scene.draw = function () {
    background(48);
    default_transforms();
    scale(1, -1);

    
    send_player_vel();
    draw_players();
    
    for (const obstacle of this.obstacles) {
        this.draw_obstacle(obstacle);
    }

    this.draw_wall();
}




race_scene.draw_wall = function () {
    fill(255);
    rect(-60, -50, -60, 100);
    rect(60, -50, 60, 100);
}

race_scene.draw_obstacle = function (obstacle) {
    fill(255);

    if (obstacle.type == "rodona") ellipse(obstacle.x, obstacle.y, obstacle.d);
    else rect(obstacle.x, obstacle.y, obstacle.w, obstacle.h);
}

race_scene.get_frame = function (frame_data) {
    players = frame_data.players;
    this.obstacles = frame_data.scene.obstacles;
    //console.log(this.obstacles);
}

