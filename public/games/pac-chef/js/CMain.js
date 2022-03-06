function CMain(oData){
    var _bUpdate;
    var _iCurResource = 0;
    var RESOURCE_TO_LOAD = 0;
    var _iState = STATE_LOADING;
    var _oData;
    
    var _oPreloader;
    var _oMenu;
    var _oLevelMenu;
    var _oGame;

    this.initContainer = function(){
        s_oCanvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(s_oCanvas);
        createjs.Touch.enable(s_oStage, true);
        s_oStage.preventSelection = false;
		
	s_bMobile = isMobile();
        if(s_bMobile === false){
            s_oStage.enableMouseOver(20);  
        }
		
        s_iPrevTime = new Date().getTime();

	createjs.Ticker.addEventListener("tick", this._update);
        createjs.Ticker.framerate = FPS;
        
        if(navigator.userAgent.match(/Windows Phone/i)){
                DISABLE_SOUND_MOBILE = true;
        }
        
        s_oSpriteLibrary  = new CSpriteLibrary();

        //ADD PRELOADER
        _oPreloader = new CPreloader();
        
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
        s_aSoundsInfo.push({path: './sounds/',filename:'game_over',loop:false,volume:1, ingamename: 'game_over'});
        s_aSoundsInfo.push({path: './sounds/',filename:'click',loop:false,volume:1, ingamename: 'click'});
        s_aSoundsInfo.push({path: './sounds/',filename:'enemy_0_death',loop:false,volume:1, ingamename: 'enemy_0_death'});
        s_aSoundsInfo.push({path: './sounds/',filename:'enemy_1_death',loop:false,volume:1, ingamename: 'enemy_1_death'});
        s_aSoundsInfo.push({path: './sounds/',filename:'enemy_2_death',loop:false,volume:1, ingamename: 'enemy_2_death'});
        s_aSoundsInfo.push({path: './sounds/',filename:'hero_death',loop:false,volume:1, ingamename: 'hero_death'});
        s_aSoundsInfo.push({path: './sounds/',filename:'hero_eating',loop:false,volume:1, ingamename: 'hero_eating'});
        s_aSoundsInfo.push({path: './sounds/',filename:'hero_powerup',loop:false,volume:1, ingamename: 'hero_powerup'});
        s_aSoundsInfo.push({path: './sounds/',filename:'hero_powerup_off',loop:false,volume:1, ingamename: 'hero_powerup_off'});
        s_aSoundsInfo.push({path: './sounds/',filename:'ready_go',loop:false,volume:1, ingamename: 'ready_go'});
        s_aSoundsInfo.push({path: './sounds/',filename:'win_level',loop:false,volume:1, ingamename: 'win_level'});
        s_aSoundsInfo.push({path: './sounds/',filename:'soundtrack',loop:true,volume:1, ingamename: 'soundtrack'});
        
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
        s_oSpriteLibrary.init( this._onImagesLoaded,this._onAllImagesLoaded, this );

        s_oSpriteLibrary.addSprite("but_play","./sprites/but_play.png");
        s_oSpriteLibrary.addSprite("but_home","./sprites/but_home.png");
        s_oSpriteLibrary.addSprite("but_restart","./sprites/but_restart.png");
        s_oSpriteLibrary.addSprite("msg_box","./sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("bg_menu","./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("bg_game","./sprites/bg_game.jpg");
        s_oSpriteLibrary.addSprite("bg_help","./sprites/bg_help.png");
        s_oSpriteLibrary.addSprite("but_exit","./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("life","./sprites/life.png");
        s_oSpriteLibrary.addSprite("audio_icon","./sprites/audio_icon.png");   
        s_oSpriteLibrary.addSprite("but_credits","./sprites/but_credits.png");
        s_oSpriteLibrary.addSprite("but_fullscreen","./sprites/but_fullscreen.png");
        s_oSpriteLibrary.addSprite("ctl_logo","./sprites/ctl_logo.png");
        s_oSpriteLibrary.addSprite("score_bg","./sprites/score_bg.png");
        s_oSpriteLibrary.addSprite("but_yes","./sprites/but_yes.png");
        s_oSpriteLibrary.addSprite("bg_level_selection","./sprites/bg_level_selection.png");
        s_oSpriteLibrary.addSprite("but_level","./sprites/but_level.png");
        s_oSpriteLibrary.addSprite("but_next","./sprites/but_next.png");
        s_oSpriteLibrary.addSprite("but_delete","./sprites/but_delete.png");
        s_oSpriteLibrary.addSprite("exit_door_left","./sprites/exit_door_left.png");
        s_oSpriteLibrary.addSprite("exit_door_right","./sprites/exit_door_right.png");
        s_oSpriteLibrary.addSprite("hand_swipe","./sprites/hand_swipe.png");
        s_oSpriteLibrary.addSprite("keyboard","./sprites/keyboard.png");
        s_oSpriteLibrary.addSprite("swipe_trail","./sprites/swipe_trail.png");
        s_oSpriteLibrary.addSprite("coin_help","./sprites/coin_help.png");
        s_oSpriteLibrary.addSprite("enemy_bottom_0","./sprites/enemy_bottom_0.png");
        s_oSpriteLibrary.addSprite("enemy_bottom_1","./sprites/enemy_bottom_1.png");
        s_oSpriteLibrary.addSprite("enemy_bottom_2","./sprites/enemy_bottom_2.png");
        s_oSpriteLibrary.addSprite("enemy_left_0","./sprites/enemy_left_0.png");
        s_oSpriteLibrary.addSprite("enemy_left_1","./sprites/enemy_left_1.png");
        s_oSpriteLibrary.addSprite("enemy_left_2","./sprites/enemy_left_2.png");
        s_oSpriteLibrary.addSprite("enemy_right_0","./sprites/enemy_right_0.png");
        s_oSpriteLibrary.addSprite("enemy_right_1","./sprites/enemy_right_1.png");
        s_oSpriteLibrary.addSprite("enemy_right_2","./sprites/enemy_right_2.png");
        s_oSpriteLibrary.addSprite("enemy_top_0","./sprites/enemy_top_0.png");
        s_oSpriteLibrary.addSprite("enemy_top_1","./sprites/enemy_top_1.png");
        s_oSpriteLibrary.addSprite("enemy_top_2","./sprites/enemy_top_2.png");
        
        s_oSpriteLibrary.addSprite("hero_bottom","./sprites/hero_bottom.png");
        s_oSpriteLibrary.addSprite("hero_left","./sprites/hero_left.png");
        s_oSpriteLibrary.addSprite("hero_right","./sprites/hero_right.png");
        s_oSpriteLibrary.addSprite("hero_top","./sprites/hero_top.png");
        
        s_oSpriteLibrary.addSprite("walls","./sprites/walls.png");
        s_oSpriteLibrary.addSprite("item_disappear","./sprites/item_disappear.png");

        
        for(var k=0;k<NUM_LEVELS;k++){
            s_oSpriteLibrary.addSprite("recipe_"+k,"./sprites/recipe_"+k+".png");
        }
        
        for(var t=24;t<43;t++){
            s_oSpriteLibrary.addSprite("ingredients_"+t,"./sprites/ingredients/ingredients_"+t+".png");
        }
        
        RESOURCE_TO_LOAD += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites();
    };
    
    this._onImagesLoaded = function(){
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *100);
        //console.log("PERC: "+iPerc);
        _oPreloader.refreshLoader(iPerc);
    };
    
    this._onRemovePreloader = function(){
        try{
            saveItem("ls_available","ok");
        }catch(evt){
            // localStorage not defined
            s_bStorageAvailable = false;
        }

        _oPreloader.unload();

        s_oSoundTrack = playSound("soundtrack", 1,true);

        this.gotoMenu();
    };
    
    this._onAllImagesLoaded = function(){
        
    };
    
    this.onAllPreloaderImagesLoaded = function(){
        this._loadImages();
    };
    
    this.levelSelected = function(iLevel){
        if(iLevel >= s_iLastLevel){
            s_iLastLevel = iLevel;
        }
        var iScore = getScoreTillLevel(iLevel);
        var iLives = getLives(iLevel);
        
        this.gotoGame(iLevel,iScore,iLives);
    };
    
    this.gotoMenu = function(){
        _oMenu = new CMenu();
        _iState = STATE_MENU;
    }; 
    
    this.gotoLevelPanel = function(){
       _oLevelMenu = new CLevelMenu();
       _iState = STATE_LEVEL;
    };
    
    this.gotoGame = function(iLevel,iScore,iLives){
        _oGame = new CGame(iLevel,iScore,iLives);   						
        _iState = STATE_GAME;
    };

    this.stopUpdateNoBlock = function(){
        _bUpdate = false;
        createjs.Ticker.paused = true;
    };

    this.startUpdateNoBlock = function(){
        s_iPrevTime = new Date().getTime();
        _bUpdate = true;
        createjs.Ticker.paused = false; 
    };

    this.stopUpdate = function(){
        _bUpdate = false;
        createjs.Ticker.paused = true;
        $("#block_game").css("display","block");
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            Howler.mute(true);
        }
        
    };

    this.startUpdate = function(){
        s_iPrevTime = new Date().getTime();
        _bUpdate = true;
        createjs.Ticker.paused = false;
        $("#block_game").css("display","none");
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            if(s_bAudioActive){
                Howler.mute(false);
            }
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

        if(_iState === STATE_MENU){
            _oMenu.update();
        }
        
        if(_iState === STATE_GAME){
            _oGame.update();
        }

        s_oStage.update(event);
       
    };
    
    s_oMain = this;
    
    _oData = oData;
    
    NUM_LIVES = oData.lives;
    POINT_PER_ITEM = oData.point_item;
    POINT_PER_POWERUP = oData.point_powerup;
    POINT_KILL_ENEMY = oData.point_kill_enemy;
    TIME_POWERUP = oData.time_powerup;
    
    ENABLE_FULLSCREEN = oData.fullscreen;
    
    s_bAudioActive = oData.audio_enable_on_startup;
    
    this.initContainer();
}
var s_bMobile;
var s_bAudioActive = false;
var s_iCntTime = 0;
var s_iTimeElaps = 0;
var s_iPrevTime = 0;
var s_iCntFps = 0;
var s_iCurFps = 0;

var s_oDrawLayer;
var s_oStage;
var s_oMain;
var s_oSpriteLibrary;
var s_oSoundTrack = null;
var s_oCanvas;
var s_bFullscreen = false;
var s_aSounds;
var s_aSoundsInfo;
var s_bStorageAvailable = true;
var s_iBestScore = 0;
var s_bFirstPlay = true;
var s_iLastLevel = 1;