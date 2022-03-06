var CANVAS_WIDTH = 1080;
var CANVAS_HEIGHT = 1920;

var EDGEBOARD_X = 80;
var EDGEBOARD_Y = 310;

var FPS = 60;
var FPS_TIME      = 1000/FPS;
var DISABLE_SOUND_MOBILE = false;
var GAME_NAME = "jelly_matching";
var CTL_MODE_NAME = ["story_mode", "time_attack"];

var PRIMARY_FONT = "balsamiq"

var PRIMARY_FONT_COLOR = "#ffffff";
var STROKE_COLOR       = null;
var STROKE_COLOR_STAGE = ["#ef8297", "#63e0fa"];

var SOUNDTRACK_VOLUME_IN_GAME = 0.5;

var STATE_LOADING = 0;
var STATE_MENU    = 1;
var STATE_HELP    = 1;
var STATE_GAME    = 3;

var ON_MOUSE_DOWN      = 0;
var ON_MOUSE_UP        = 1;
var ON_MOUSE_OVER      = 2;
var ON_MOUSE_OUT       = 3;
var ON_PRESS_MOVE_CELL = 4;
var ON_PRESS_UP_CELL   = 3;
var ON_SELECT_LANG     = 5;

var SWIPE_ON_DESKTOP = true;

var STORY_MODE = 0;
var TIME_ATTACK = 1;

var MAP_SENSITIVITY = 20;
var NUM_MAP_TILES = 28;
var NUM_CLOUD_SPRITE = 3;

var TYPE_STAR = 8;
var TYPE_BOMB = 9;
var TYPE_CLOCK = 10;
var TYPE_CHANGING = 11;
var TYPE_BLOCK = 12;

var PARTICLE_OFFSET = new Array();
PARTICLE_OFFSET[0] = {x: 0, y: 81};
PARTICLE_OFFSET[1] = {x: 0, y: 80};
PARTICLE_OFFSET[2] = {x: -1, y: 81};
PARTICLE_OFFSET[3] = {x: 0, y: 80};
PARTICLE_OFFSET[4] = {x: 0, y: 82};
PARTICLE_OFFSET[5] = {x: 0, y: 81};
PARTICLE_OFFSET[6] = {x: 0, y: 81};
PARTICLE_OFFSET[7] = {x: 0, y: 80};
PARTICLE_OFFSET[8] = {x: -5, y: 81};
PARTICLE_OFFSET[9] = {x: 0, y: 0};
PARTICLE_OFFSET[10] = {x: -2, y: 66};
PARTICLE_OFFSET[12] = {x: -8, y: 30};

var CELL_FILL_NULL = 0;
var CELL_FILL_FACE = 1;
var CELL_FILL_BOMB = 2;
var CELL_FILL_STAR = 3;
var CELL_FILL_BLOCK = 4;
var CELL_FILL_CLOCK = 5;
var CELL_FILL_CHANGE = 6;
var CELL_FILL_STARANDBLOCK = 7;
var CELL_FILL_TRAP = 8;

var CELL_STATE_MATCHED = -1;
var CELL_STATE_DISABLE = -2;
var CELL_STATE_INVISIBLE = -3;

var CHEF_AUDIO_STEP_0 = 0;
var CHEF_AUDIO_STEP_1 = 1;

var HAND_ANIM_NUM_FRAMES = 20;

var CELL_SIZE = 100;
var TIME_FALL = 100;
var TIME_TO_ADD = 15000;
var TIMER_CHANGING = 20000;
var TIMER_HINT = 4000;
var TIME_TO_MAKE_COMBO_FOR_HERO = 2400;
var NUM_TO_MAKE_COMBO_FOR_HERO = 20;

var MAX_SYMBOL_ROT_SPEED = 2;
var JELLY_CHANGING_SPEED = 0.05;

var JELLY_EXPLOSION_FRAMERATE = 25;
var EXPLOSION_ANIMATION_SET = [
                                { 
                                    frames: {width: CELL_SIZE, height: CELL_SIZE, regX: CELL_SIZE/2, regY: CELL_SIZE/2}, 
                                    animations: {idle: [0,8, "end"], end: [8]},
                                    framerate: JELLY_EXPLOSION_FRAMERATE
                                },
                                { 
                                    frames: {width: CELL_SIZE, height: CELL_SIZE, regX: CELL_SIZE/2, regY: CELL_SIZE/2}, 
                                    animations: {idle: [0,8, "end"], end: [8]},
                                    framerate: JELLY_EXPLOSION_FRAMERATE
                                },
                                { 
                                    frames: {width: CELL_SIZE, height: CELL_SIZE, regX: CELL_SIZE/2, regY: CELL_SIZE/2}, 
                                    animations: {idle: [0,8, "end"], end: [8]},
                                    framerate: JELLY_EXPLOSION_FRAMERATE
                                },
                                { 
                                    frames: {width: CELL_SIZE, height: CELL_SIZE, regX: CELL_SIZE/2, regY: CELL_SIZE/2}, 
                                    animations: {idle: [0,8, "end"], end: [8]},
                                    framerate: JELLY_EXPLOSION_FRAMERATE
                                },
                                { 
                                    frames: {width: CELL_SIZE, height: CELL_SIZE, regX: CELL_SIZE/2, regY: CELL_SIZE/2}, 
                                    animations: {idle: [0,8, "end"], end: [8]},
                                    framerate: JELLY_EXPLOSION_FRAMERATE
                                },
                                { 
                                    frames: {width: CELL_SIZE, height: CELL_SIZE, regX: CELL_SIZE/2, regY: CELL_SIZE/2}, 
                                    animations: {idle: [0,8, "end"], end: [8]},
                                    framerate: JELLY_EXPLOSION_FRAMERATE
                                },
                                { 
                                    frames: {width: CELL_SIZE, height: CELL_SIZE, regX: CELL_SIZE/2, regY: CELL_SIZE/2}, 
                                    animations: {idle: [0,8, "end"], end: [8]},
                                    framerate: JELLY_EXPLOSION_FRAMERATE
                                },
                                0,
                                0,
                                { 
                                    frames: {width: 352, height: 352, regX: 176, regY: 176}, 
                                    animations: {idle: [3,24, "stop"], stop:[24]},
                                    framerate: JELLY_EXPLOSION_FRAMERATE
                                },
                                { 
                                    frames: {width: 320, height: 320, regX: 160, regY: 83},
                                    animations: {idle: [0,9, "stop"], stop:[9]},
                                    framerate: JELLY_EXPLOSION_FRAMERATE
                                }
                              ];

var SCORES_FOR_SINGLE;
var SCORES_FOR_BOMB;
var SCORES_FOR_STAR;
var EXTRA_FACE_MULTIPLIER;
var ENABLE_CHECK_ORIENTATION;
var ENABLE_FULLSCREEN;

var LEVEL_MATRIX;
var CONFIG;
var TIMER_CLOCK_SPAWN;

var NUM_LANGUAGES = 7;
var LANG_EN = 0;
var LANG_ES = 1;
var LANG_FR = 2;
var LANG_DE = 3;
var LANG_PT = 4;
var LANG_IT = 5;
var LANG_RU = 6;

var LANG_CODES = {};
LANG_CODES["en"] = LANG_EN;
LANG_CODES["es"] = LANG_ES;
LANG_CODES["fr"] = LANG_FR;
LANG_CODES["de"] = LANG_DE;
LANG_CODES["pt"] = LANG_PT;
LANG_CODES["it"] = LANG_IT;
LANG_CODES["ru"] = LANG_RU;