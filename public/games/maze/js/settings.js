var CANVAS_WIDTH = 768;
var CANVAS_HEIGHT = 1400;

var EDGEBOARD_X = 40;
var EDGEBOARD_Y = 260;

var FPS = 30;
var FPS_TIME = 1000 / FPS;
var DISABLE_SOUND_MOBILE = false;

var SOUNDTRACK_VOLUME_IN_GAME = 0.2;

var PRIMARY_FONT = "comfortaa";

var STATE_LOADING = 0;
var STATE_MENU = 1;
var STATE_MENU_MODE = 2;
var STATE_HELP = 1;
var STATE_GAME = 3;

var ON_MOUSE_DOWN = 0;
var ON_MOUSE_UP = 1;
var ON_MOUSE_OVER = 2;
var ON_MOUSE_OUT = 3;

var MODE_EASY = 0;
var MODE_MEDIUM = 1;
var MODE_HARD = 2;

var NUM_COLS;
var NUM_ROWS;
var CELL_WIDTH;
var TIME;

var ENABLE_FULLSCREEN;
var ENABLE_CHECK_ORIENTATION;

var PLAYER_ACCELERATION = 5;
var PLAYER_FRICTION = 0;
var MAX_PLAYER_SPEED = 10;