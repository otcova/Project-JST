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
    this.draw_timer();
}

race_scene.draw_wall = function () {
    fill(255);
    rect(-60, -50, -60, 100);
    rect(60, -50, 60, 100);
}

//let conter = utils.create_timer();

//utils.update_timer(utils.create_timer());

race_scene.draw_timer = function() {
    fill(0);
    rect(65, 30, 35, 15);

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

