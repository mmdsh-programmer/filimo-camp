function CMain(oData){
    var _bUpdate;
    var _iCurResource = 0;
    var RESOURCE_TO_LOAD = 0;
    var _iState = STATE_LOADING;
    var _oData;
    
    var _oPreloader;
    var _oMenu;
    var _oModeMenu;
    var _oHelp;
    var _oGame;
    

    this.initContainer = function(){
        s_oCanvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(s_oCanvas);
        createjs.Touch.enable(s_oStage, true);
        Howler.html5PoolSize = 1;
	s_bMobile = isMobile();
        
        $("body").css('background-image', 'url("./css/bg_desktop.jpg"');
        
        if(s_bMobile === false){
            s_oStage.enableMouseOver(20);  
        }
		
        s_iPrevTime = new Date().getTime();

	createjs.Ticker.addEventListener("tick", this._update);
        createjs.Ticker.framerate = FPS
        
        if(navigator.userAgent.match(/Windows Phone/i)){
                DISABLE_SOUND_MOBILE = true;
        }
        
        s_oSpriteLibrary  = new CSpriteLibrary();
        
        //ADD PRELOADER
        _oPreloader = new CPreloader();
        
        s_oLocalStorage = new CLocalStorage(GAME_NAME);
        s_oSoundMatching = new CSoundMatching();
    };
    
    this.updateTotalScore = function(){
        var iScore = 0;
        for(var i=1; i<26; i++){
            iScore += s_aLevelScore[i];
        }
        s_iTotalScore = iScore;  
        
        s_oLocalStorage.saveDataStoryMode();
    };
    
    this.preloaderReady = function(){
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            this._initSounds();
        }
        
        this._loadImages();
        _bUpdate = true;
    };
    
    this.soundLoaded = function(){
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *100);
        _oPreloader.refreshLoader(iPerc);

    };
    
    this._initSounds = function(){
        
        Howler.mute(!s_bAudioActive);
        
        s_aSoundsInfo = new Array();
        
        s_aSoundsInfo.push({path: './sounds/',filename:'soundtrack',loop:true,volume:1, ingamename: 'soundtrack'});
        s_aSoundsInfo.push({path: './sounds/',filename:'click',loop:false,volume:1, ingamename: 'click'});
        s_aSoundsInfo.push({path: './sounds/',filename:'game_over',loop:false,volume:1, ingamename: 'game_over'});

        s_aSoundsInfo.push({path: './sounds/',filename:'bomb_explosion',loop:false,volume:1, ingamename: 'bomb_explosion'});
        s_aSoundsInfo.push({path: './sounds/',filename:'hourglass_explosion',loop:false,volume:1, ingamename: 'hourglass_explosion'});
        s_aSoundsInfo.push({path: './sounds/',filename:'stage_clear',loop:false,volume:1, ingamename: 'stage_clear'});
        s_aSoundsInfo.push({path: './sounds/',filename:'star',loop:false,volume:1, ingamename: 'chime'});
        s_aSoundsInfo.push({path: './sounds/',filename:'swoosh',loop:false,volume:1, ingamename: 'swoosh'});
        s_aSoundsInfo.push({path: './sounds/',filename:'tictac',loop:false,volume:1, ingamename: 'tictac'});
        s_aSoundsInfo.push({path: './sounds/',filename:'wood',loop:false,volume:1, ingamename: 'wood'});
        s_aSoundsInfo.push({path: './sounds/',filename:'break_changing',loop:false,volume:1, ingamename: 'break_changing'});
        s_aSoundsInfo.push({path: './sounds/',filename:'fall_0',loop:false,volume:1, ingamename: 'fall_0'});
        s_aSoundsInfo.push({path: './sounds/',filename:'level_up', loop:false, volume:1, ingamename: 'level_up'});

        
        for(var i = 0; i < NUM_BREAK_SOUNDS; i++){
             s_aSoundsInfo.push({path: './sounds/',filename:'break_' + i,loop:false,volume:1, ingamename: 'break_'+i});
        }

        RESOURCE_TO_LOAD += s_aSoundsInfo.length;

        s_aSounds = new Array();
        for(var i=0; i<s_aSoundsInfo.length; i++){
            this.tryToLoadSound(s_aSoundsInfo[i], false);
        }
    };
    
    this.tryToLoadSound = function(oSoundInfo, bDelay){
       setTimeout(function(){        
            s_aSounds[oSoundInfo.ingamename] = new Howl({ 
                                                            src: [oSoundInfo.path+oSoundInfo.filename+'.mp3'],
                                                            autoplay: false,
                                                            preload: true,
                                                            loop: oSoundInfo.loop, 
                                                            volume: oSoundInfo.volume,
                                                            onload: s_oMain.soundLoaded,
                                                            onloaderror: function(szId,szMsg){
                                                                                for(var i=0; i < s_aSoundsInfo.length; i++){
                                                                                     if ( szId === s_aSounds[s_aSoundsInfo[i].ingamename]._sounds[0]._id){
                                                                                         s_oMain.tryToLoadSound(s_aSoundsInfo[i], true);
                                                                                         break;
                                                                                     }
                                                                                }
                                                                        },
                                                            onplayerror: function(szId) {
                                                                for(var i=0; i < s_aSoundsInfo.length; i++){
                                                                                     if ( szId === s_aSounds[s_aSoundsInfo[i].ingamename]._sounds[0]._id){
                                                                                          s_aSounds[s_aSoundsInfo[i].ingamename].once('unlock', function() {
                                                                                            s_aSounds[s_aSoundsInfo[i].ingamename].play();
                                                                                            if(s_aSoundsInfo[i].ingamename === "soundtrack" && s_oGame !== null){
                                                                                                
                                                                                                setVolume("soundtrack",SOUNDTRACK_VOLUME_IN_GAME);
                                                                                            }

                                                                                          });
                                                                                         break;
                                                                                     }
                                                                                 }
                                                                       
                                                            } 
                                                        });

            
        }, (bDelay ? 200 : 0) );
    };

    this._loadImages = function(){
        s_oSpriteLibrary.init( this._onImagesLoaded,this._onAllImagesLoaded, this);
        
        //MENU
        s_oSpriteLibrary.addSprite("bg_menu","./sprites/menu_anim/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("logo","./sprites/menu_anim/logo.png");
        s_oSpriteLibrary.addSprite("sun","./sprites/menu_anim/sun.png");
        //
        s_oSpriteLibrary.addSprite("but_continue","./sprites/but_continue.png");
        s_oSpriteLibrary.addSprite("but_continue_small","./sprites/but_continue_small.png");
        s_oSpriteLibrary.addSprite("but_check","./sprites/but_check.png");
        s_oSpriteLibrary.addSprite("but_exit_big","./sprites/but_exit_big.png");
        s_oSpriteLibrary.addSprite("but_home","./sprites/but_home.png");
        s_oSpriteLibrary.addSprite("but_settings","./sprites/but_settings.png");
        s_oSpriteLibrary.addSprite("but_lang","./sprites/but_lang.png");
        
        for(var i=0; i<4; i++){
            s_oSpriteLibrary.addSprite("rays_"+i,"./sprites/end_anim/rays_"+i+".jpg");
        }
        s_oSpriteLibrary.addSprite("but_home","./sprites/but_home.png");
        
        s_oSpriteLibrary.addSprite("but_info","./sprites/but_info.png");
        s_oSpriteLibrary.addSprite("logo_ctl","./sprites/logo_ctl.png");
        s_oSpriteLibrary.addSprite("but_play","./sprites/but_play.png");
        s_oSpriteLibrary.addSprite("but_fullscreen","./sprites/but_fullscreen.png");
        s_oSpriteLibrary.addSprite("msg_box","./sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("end_panel","./sprites/end_panel.png");
        s_oSpriteLibrary.addSprite("stars","./sprites/stars.png");
        s_oSpriteLibrary.addSprite("star_filled","./sprites/star_filled.png");
        s_oSpriteLibrary.addSprite("star_empty","./sprites/star_empty.png");
        
        for(var i = 0; i < NUM_CLOUD_SPRITE; i++){
            s_oSpriteLibrary.addSprite("cloud_"+i,"./sprites/map/clouds/cloud_"+i+".png");
        }
        
        for(var i = 0; i < NUM_MAP_TILES; i++){
            s_oSpriteLibrary.addSprite("jm_"+i,"./sprites/map/tiles/jm_"+i+".jpg");
        }
        
        s_oSpriteLibrary.addSprite("bg_game_0","./sprites/bg_game_0.jpg");
        s_oSpriteLibrary.addSprite("but_restart","./sprites/but_restart.png");
        s_oSpriteLibrary.addSprite("but_restart_big","./sprites/but_restart_big.png");
        s_oSpriteLibrary.addSprite("but_pause","./sprites/but_pause.png");
        s_oSpriteLibrary.addSprite("but_text","./sprites/but_text.png");

        s_oSpriteLibrary.addSprite("but_exit","./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("audio_icon","./sprites/audio_sprites.png");
        s_oSpriteLibrary.addSprite("level_button","./sprites/level_button.png");
        s_oSpriteLibrary.addSprite("lock_level","./sprites/lock_level.png");
        s_oSpriteLibrary.addSprite("time_bar","./sprites/time_bar.png");
        s_oSpriteLibrary.addSprite("time_bar_fill","./sprites/time_bar_fill.png");
        s_oSpriteLibrary.addSprite("score_panel","./sprites/score_panel.png");
        s_oSpriteLibrary.addSprite("score_icon", "./sprites/score_icon.png");
        s_oSpriteLibrary.addSprite("best_score_icon", "./sprites/best_score_icon.png");
        
        s_oSpriteLibrary.addSprite("bottom_panel","./sprites/bottom_panel.png");        
        
        s_oSpriteLibrary.addSprite("balloon_1","./sprites/balloon_1.png");
        s_oSpriteLibrary.addSprite("cell","./sprites/cell.png");
        s_oSpriteLibrary.addSprite("bg_symbol","./sprites/bg_symbol.png");
        s_oSpriteLibrary.addSprite("block","./sprites/block.png");
        s_oSpriteLibrary.addSprite("trap","./sprites/trap.png");
        s_oSpriteLibrary.addSprite("jelly","./sprites/jelly.png");
        s_oSpriteLibrary.addSprite("arrow","./sprites/arrow.png");
        
        s_oSpriteLibrary.addSprite("level_up","./sprites/level_up.png"); 
        s_oSpriteLibrary.addSprite("time_is_up","./sprites/time_is_up.png"); 
        
        for(var i=0; i<13; i++){
            if(i===7 ||i===8 || i === 11){
                continue;
            }
            s_oSpriteLibrary.addSprite("explosion_"+i,"./sprites/explosion_"+i+".png");
        }

        s_oSpriteLibrary.addSprite("target","./sprites/target.png");
        
        for(var i = 0; i < HAND_ANIM_NUM_FRAMES; i++){
            s_oSpriteLibrary.addSprite("hand_anim_" + i, "./sprites/hand_anim/hand_anim_" + i + ".png");
        }
        
        RESOURCE_TO_LOAD += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites();
    };
    
    this._onImagesLoaded = function(){
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *100);

        _oPreloader.refreshLoader(iPerc);

    };
    
    this._onRemovePreloader = function(){
        _oPreloader.unload();
        
        if(_oMenu){
            return;
        }
        
        playSound("soundtrack",1,true);

        s_oMain.gotoMenu();
    };

    this._onAllImagesLoaded = function(){
        
    };
    
    this.gotoMenu = function(){        
        _oMenu = new CMenu();
        _iState = STATE_MENU;
    };
    
    this.goToModeMenu = function(){
        LEVEL_MATRIX = LEVEL_MATRIX_STORY_MODE;
        CONFIG = CONFIG_STORY_MODE;
        TIMER_CLOCK_SPAWN = TIMER_CLOCK_SPAWN_STORY_MODE;
        
        _oModeMenu = new CMapStoryMode();
        _iState = STATE_MENU;
    };
    
    this.gotoGameStoryMode = function(iLevel){
        s_iCurLevel = iLevel;
        
        _oGame = new CGameStoryMode(_oData, iLevel);   						
        _iState = STATE_GAME;
    };
    
    this.gotoGameTimeAttack = function(){
        s_iCurLevel = 1;
        _iState = STATE_GAME;
        
        LEVEL_MATRIX = LEVEL_MATRIX_TIME_ATTACK;
        CONFIG = CONFIG_TIME_ATTACK;
        TIMER_CLOCK_SPAWN = TIMER_CLOCK_SPAWN_TIME_ATTACK;
        
        _oGame = new CGameTimeAttack(_oData, s_iCurLevel);   						
        _iState = STATE_GAME;    
    };
    
    this.gotoHelp = function(){
        _oHelp = new CHelp();
        _iState = STATE_HELP;
    };
	
    this.stopUpdate = function(){
        _bUpdate = false;
        createjs.Ticker.paused = true;
        $("#block_game").css("display","block");
        Howler.mute(true);
     };

    this.startUpdate = function(){
        s_iPrevTime = new Date().getTime();
        _bUpdate = true;
        createjs.Ticker.paused = false;
        $("#block_game").css("display","none");

        if(s_bAudioActive){
            Howler.mute(false);
        }
    };
    
    this._update = function(event){
        if(_bUpdate === false){
                return;
        }
        
        var iCurTime = new Date().getTime();
        s_iTimeElaps = iCurTime - s_iPrevTime;
        s_iCntTime += s_iTimeElaps;
        s_iCntFps++;
        s_iPrevTime = iCurTime;
        
        if ( s_iCntTime >= 1000 ){
            s_iCurFps = s_iCntFps;
            s_iCntTime-=1000;
            s_iCntFps = 0;
        }
         
        if(s_oMapStoryMode !== null){
            s_oMapStoryMode.update();
        }
        
        if(_iState === STATE_GAME){
            _oGame.update();
        }
        
        s_oStage.update(event);

    };
    
    s_oMain = this;
    
    _oData = oData;
    ENABLE_CHECK_ORIENTATION = oData.check_orientation;
    ENABLE_FULLSCREEN = oData.fullscreen;
    
    var iLang = navigator.language.split("-")[0];
    if(LANG_CODES[iLang] === undefined){
        iLang = "en";
    }
    s_iCurLang = LANG_CODES[iLang];
    console.log("LANG_CODES["+navigator.language+"] "+s_iCurLang);
    refreshLanguage();
    
    s_bAudioActive = oData.audio_enable_on_startup;
	
    this.initContainer();
}

var s_bMobile;
var s_bAudioActive;
var s_iCntTime = 0;
var s_iTimeElaps = 0;
var s_iPrevTime = 0;
var s_iCntFps = 0;
var s_iCurFps = 0;
var s_iCurLevel;
var s_bFullscreen = false;
var s_iGameMode = TIME_ATTACK;
var s_oGame = null;

var s_oDrawLayer;
var s_oStage;
var s_oMain;
var s_oSpriteLibrary;
var s_oCanvas;
var s_aSounds;
var s_aSoundsInfo;
var s_oLocalStorage;
var s_oSoundMatching;
var s_bHelpTimeAttack = true;
var s_iCurLang = LANG_EN;