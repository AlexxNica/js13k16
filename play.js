// Game loop
var play = () => {

  // Reset canvas
  a.width ^= 0;
  
  // Draw exit button
  c.font = "bold 30px arial";
  c.fillStyle = "#000";
  c.fillText("×", 1255, 25);
  
  // First levels: add text
  if(last_screen == 1){
    c.font = "bold 30px arial";
    c.fillStyle = "black";
    c.textAlign = "center";
    
    if(level == 1){
      c.fillText("Move with arrow keys or WASD or ZQSD.", 640, 80);
      c.fillText("Pick and drop cubes with [space]. Restart with R.", 640, 120);
      c.fillText("Collect all coins and reach the flag.", 640, 160);
    }
    
    if(level == 2){
      c.fillText("Let's add some mechanisms...", 640, 80);
    }
    
    if(level == 3){
      c.fillText("And now, you're thinking with portals!", 640, 80);
      c.fillText("Use mouse to aim and [left click] / [right click] to shoot.", 640, 120);
    }
    
    if(level == 4){
      c.fillText("Don't forget the momentum!", 640, 80);
      c.fillText("(And be careful, ice is slippy if you're not standing still)", 640, 120);
    }
  }
  
  // Save keys being pressed (for latest hero only)
  if(current_mario.keyleft){
    current_mario.left[frame] = true;
  }
  if(current_mario.keyright){
    current_mario.right[frame] = true;
  }
  if(current_mario.keyup){
    current_mario.up[frame] = true;
  }
  
  // Pixelize graphics
  c.mozImageSmoothingEnabled = false;
  c.imageSmoothingEnabled = false;
  
  // On first frame:
  // ---------------
  if(frame == 0){
    
    // Init states of pipes, cubes, balances...
    first_frame();
  }
  
  // Then, at each frame:
  // --------------------
  
  // Move and draw pipes
  move_draw_pipes();
  
  // Draw map
  parse_draw_map();
  
  // Reset all mechanisms
  reset_mechanisms();
  
  // Replay previous heros inputs
  for(h in heros){
    
    // TODO
    
  }
  
  // Play current hero
  
  play_hero(current_mario);
  
  // Move cubes
  // =====
  
  for(i in level_data.cubes){
    
    // If cube is not in a #4 solid tile, assume it's not in a portal
    if(
      tile_at(level_data.cubes[i].x + 1, level_data.cubes[i].y + 1) != 4
      &&
      tile_at(level_data.cubes[i].x + 32 - 1, level_data.cubes[i].y + 1) != 4
      &&
      tile_at(level_data.cubes[i].x + 1, level_data.cubes[i].y + 31) != 4
      &&
      tile_at(level_data.cubes[i].x + + 32 - 1, level_data.cubes[i].y + 31) != 4
    ){
      level_data.cubes[i].in_portal = false;
    }
    
    // Decrement teleportation idle delay
    if(level_data.cubes[i].teleport_idle){
      level_data.cubes[i].teleport_idle--;
    }  
    
    // Apply gravity and collsions if the cube is not held
    if(level_data.cubes[i].mario === null){
      level_data.cubes[i].vx = 0;
      gravity_and_collisions(level_data.cubes[i], 32, 1);
    }
  }
  
  // Draw
  // ====

  // Draw cubes
  for(i in level_data.cubes){
    c.drawImage(tileset, 12 * 16, 0, 16, 16, level_data.cubes[i].x, 40 + level_data.cubes[i].y, 32, 32);
  }
    
  // Draw previous heros
  for(hero in heros){
    
    // TODO
    
  }
  
  // Draw current hero
  draw_hero(current_mario);
  
  // Draw tiles that have portals, and portals in foreground
  draw_portals();
  
  // Mechanisms
  // ==========
  
  // Update mechanisms (yellow toggles / balances)
  update_mechanisms();
  
  // Next frame
  frame++;
  
  //document.title = frame + " " + current_mario.weight + " " + balances_state[0].weight1 + " " + balances_state[0].weight2 + " " + level_data.cubes[1].weight;
  //document.title = current_mario.x + " " + current_mario.y;
  
  // Victoty animation (if we won)
  victory();
}
