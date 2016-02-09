var game = new Phaser.Game(800, 600, Phaser.WEBGL, 'phaser-creature', { preload: preload, create: create, update:update});

var texture = null;
var new_creature = null;
var new_animation_1 = null;
var new_animation_2 = null;
var new_manager = null;
var creaturePhaserObject = null;
var cursors = null;

function preload () {
  game.load.text('boneco', 'assets/test2.json');
  // create a texture from an image path
  texture = PIXI.Texture.fromImage("assets/test.png");
}

function create () {
  // Core Creature Objects
  var actual_JSON = JSON.parse(game.cache.getText('boneco'));

  new_creature = new Creature(actual_JSON);

  new_animation_1 = new CreatureAnimation(actual_JSON, "running", new_creature);
  new_animation_2 = new CreatureAnimation(actual_JSON, "standing", new_creature);

  new_manager = new CreatureManager(new_creature);
  new_manager.AddAnimation(new_animation_1);
  new_manager.AddAnimation(new_animation_2);
  new_manager.SetActiveAnimationName("running", false);
  new_manager.SetShouldLoop(true);
  new_manager.SetIsPlaying(true);
  new_manager.RunAtTime(0);

  // Phaser Creature Object
  creaturePhaserObject = new Phaser.CreatureDraw(game.world,
                                          game.world.centerX,
                                          game.world.centerY,
                                          new_manager,
                                          texture);
  creaturePhaserObject.scale.set(15.0);
  game.world.add(creaturePhaserObject);

  cursors = game.input.keyboard.createCursorKeys();
}

function update(){
  // Move to the Right
  if(cursors.right.isDown){
    new_manager.SetActiveAnimationName("running", true);
    // game.camera.x += 4;
  } else {
    new_manager.SetActiveAnimationName("standing", true);
  }
}
