var CANVAS_WIDTH = 870;
var CANVAS_HEIGHT = 1504;

var EDGEBOARD_X = 50;
var EDGEBOARD_Y = 240;

var FONT_GAME = "comic_sans_msregular";

var FPS_TIME      = 1000/30;
var DISABLE_SOUND_MOBILE = false;

var STATE_LOADING = 0;
var STATE_MENU    = 1;
var STATE_HELP    = 1;
var STATE_GAME    = 3;

var ON_MOUSE_DOWN = 0;
var ON_MOUSE_UP   = 1;
var ON_MOUSE_OVER = 2;
var ON_MOUSE_OUT  = 3;
var ON_DRAG_START = 4;
var ON_DRAG_END   = 5;
var ON_MSG_BOX_LEFT_BUT = 6;
var ON_MSG_BOX_CENTER_BUT = 7;
var ON_MSG_BOX_RIGHT_BUT = 8;
var ON_LEVEL_SELECTED = 9;

var NUM_LEVELS;
var BOARD_OFFSET_X;
var BOARD_OFFSET_Y = 390;
var BOARD_ROWS = 16; 
var BOARD_COLS = 12; 
var BALL_SPEED;
var NUM_BALL_COLORS = 9;
var MAX_BALL_ADJACENCY = 40;
var TIME_FOR_UPDATING_PHYSICS = 8;
var NUM_LAUNCH_FOR_EARTHQUAKE;
var EARTHQUAKE_TIME = 200;
var OFFSET_Y_GAME_OVER;
var BALL_DIM_HALF;
var BALL_DIM;

var SCORE_EXPLOSION_BALL; 
var SCORE_FALLEN_BALL;

var CODE_EXPLODING_BALL = 11;
var CODE_EXPLODING_ISLE = 44;
var CODE_EXPLODING_BOMB = 66;
var CODE_BOMB_BALL = 11;
var CODE_RAINBOW_BALL = 12;

var NUM_ROWS_PAGE_LEVEL = 5;
var NUM_COLS_PAGE_LEVEL = 3;
var SHOW_CREDITS = true;
var SOUNDTRACK_VOLUME_IN_GAME = 1;

var ENABLE_FULLSCREEN;
var ENABLE_CHECK_ORIENTATION;