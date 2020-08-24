const utils = require('./game-utils');
const Matter = require('matter-js');

let players_list = undefined;
let engine = Matter.Engine.create();
engine.world.gravity.y = 0;
let timer;

function start(_players_list) {
    players_list = _players_list;
    timer = utils.create_timer();
    utils.init_engine(Matter, engine);
    utils.init_players_pos_fix(players_list, Matter, engine, 0, 0, 2.5);
    //utils.init_players(players_list, Matter, engine);

    init_scene();
    
}

// function boom(player) {
//     let d = 0;

//     for (let i = timer.time; i < (timer.time + 2000);i++) {
//         d += .01;
//     }
//     utils.init_players_pos_fix(player, Matter, engine, player.x, player.y, d)
    
// }


function update() {
    utils.update_timer(timer);

    update_scene();
    utils.move_players(players_list, Matter);
    utils.update_engine(Matter, engine, timer);

    send_frame();
    game_over(players_list);
    
}
function game_over(players_list) {
    let players_array = [];
    for (const player of players_list) {
        if (!player.spectator) {
            let player_data = { x: player.body.position.x, y: player.body.position.y, id: player.id };
            players_array.push(parseInt(player_data.y));
            
            let cont = utils.count_players(players_list);
            let cont2 = cont.players;
            if(cont2 == 1){
                if(players_array[0] < -50) {
                    //boom(player);
                } 
                
            } else{
                if(players_array[0] < -50) {
                    player.spectator = true;
                } 
            }
            
        }
    }
}





function send_frame() {
    utils.send_to_players(players_list, {
        type: "frame",
        players: utils.get_players_frame(players_list),
        scene: get_scene_frame()
    });
}

function new_player(player) {
    player.send({ type: "nova partida", game_name: "race" });
    player.spectator = true;
    utils.log_players(players_list);
}

function exit_player(player) {
    if (!player.spectator) {
        let count = utils.count_players(players_list);
        if (count.players == 0) {
            close_game();
        }
    }
    utils.log_players(players_list);
}

function close_game() {
    Matter.World.clear(engine.world, false);
    Matter.Engine.clear(engine);
    module.exports.on_close();
}

function get_player_message(player, message) {
    if (message.type == "set vel") {
        if (message.vx != undefined) player.vx = message.vx;
        if (message.vy != undefined) player.vy = -message.vy;
    } 
}


let obstacles;
let last_obstacle_time;


function init_scene() {
    obstacles = new Set();
    last_obstacle_time = 0;
    create_walls();
}

function update_scene() {
    let t = 1000;
    let n = 0;
        // if(parseInt(timer.time/1000) == 10) {
            
        //     console.log('hola');
        // }
    let last = 0;
    if((timer.time - last) > 5000){
        last  = timer.time;
        n += 1;
        console.log(n);
        
    }
    t =  1000 - (n *100);
    
    
    if (timer.time - last_obstacle_time > t) {
        last_obstacle_time = timer.time;
        create_obtacle();
    }

    move_obstacles();
}



function create_walls() {
    Matter.World.add(engine.world, Matter.Bodies.rectangle(-120, 0, 120, 200, { isStatic: true }));
    Matter.World.add(engine.world, Matter.Bodies.rectangle(120, 0, -120, 200, { isStatic: true }));
}

function move_obstacles() {
    obstacles.forEach(obstacle => {
        Matter.Body.setPosition(obstacle.body, { x: obstacle.body.position.x,  y: obstacle.body.position.y - 0.5 })
        if (obstacle.y < -60) {
            Matter.World.remove(engine.world, obstacle.body);
            obstacles.delete(obstacle);
        }
    });
}

function get_scene_frame() {
    let obstacles_list = [];
    obstacles.forEach(obstacle => {
        if (obstacle.type == "rodona") {
            obstacles_list.push({ 
                x: obstacle.body.position.x,
                y: obstacle.body.position.y,
                type: "rodona",
                d: obstacle.d
                });
        } else if (obstacle.type == "rectangle") {
            obstacles_list.push({ 
                x: obstacle.body.position.x - obstacle.w/2,
                y: obstacle.body.position.y - obstacle.h/2,
                w: obstacle.w,
                h: obstacle.h,
                type: "rectangle"
            });
        }
    });
    return { obstacles: obstacles_list };
}

function create_obtacle() {
    let dau = Math.round(Math.random() * 2);
    let obj = undefined;

    if (dau == 0) {
        obj = {
            w: random_range(20, 34),
            h: 7,
            body: undefined,
            type: "rectangle"
        };
        obj.body = Matter.Bodies.rectangle(random_range(-50, 50), 60, obj.w, obj.h, { isStatic: true });

    } else {
        obj = {
            d: random_range(10, 15),
            body: undefined,
            type: "rodona"
        };
        obj.body = Matter.Bodies.circle(random_range(-50, 50), 60, obj.d/2, { isStatic: true });
    }
    
    Matter.World.add(engine.world, obj.body);

    obstacles.add(obj);
}

function random_range(min, max) {
    return Math.random() * (max - min) + min;
}

module.exports = {
    new_player: new_player,
    exit_player: exit_player,
    start: start,
    update: update,
    on_close: function () { },
    get_player_message: get_player_message
};

