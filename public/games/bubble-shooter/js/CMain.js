function CMain(oData){
    var _bUpdate = true;
    var _iCurResource = 0;
    var RESOURCE_TO_LOAD = 0;
    var _iState = STATE_LOADING;
    var _oGameData;
	
    var _oPreloader;
    var _oMenu;
    var _oLevelMenu;
    var _oHelp;
    var _oGame;

    this.initContainer = function(){
        var canvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(canvas);
        createjs.Touch.enable(s_oStage,true);
        
        s_bMobile = isMobile();

        
        if(s_bMobile === false){
            s_oStage.enableMouseOver(20);  
        }
        
        s_iPrevTime = new Date().getTime();
        
	
	createjs.Ticker.addEventListener("tick", this._update);
        createjs.Ticker.framerate = 30;
        if(navigator.userAgent.match(/Windows Phone/i)){
                DISABLE_SOUND_MOBILE = true;
        }
	
        s_oSpriteLibrary  = new CSpriteLibrary();
        
        s_oSavings = new CSavingManager("bubble_shooter");
        s_oSavings.addEventListener(ON_LEVEL_SELECTED,this.gotoGame);
        
        //ADD PRELOADER
        _oPreloader = new CPreloader();
    };
    
    this.preloaderReady = function(){
        this._loadImages();
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            this._initSounds();
        }

        _bUpdate = true;
    };
    
    this._initSounds = function(){
        Howler.mute(!s_bAudioActive);

        s_aSoundsInfo = new Array();
        s_aSoundsInfo.push({path: './sounds/',filename:'explosion',loop:false,volume:1, ingamename: 'explosion'});
        s_aSoundsInfo.push({path: './sounds/',filename:'game_over',loop:false,volume:1, ingamename: 'game_over'});
        s_aSoundsInfo.push({path: './sounds/',filename:'launch',loop:false,volume:1, ingamename: 'launch'});
        s_aSoundsInfo.push({path: './sounds/',filename:'win',loop:false,volume:1, ingamename: 'win'});
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


    this.soundLoaded = function(){
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *100);

        _oPreloader.refreshLoader(iPerc);
    };
    
    this._loadImages = function(){
		
        s_oSpriteLibrary.init( this._onImagesLoaded,this._onAllImagesLoaded, this );

        s_oSpriteLibrary.addSprite("but_play","./sprites/but_play.png");
        s_oSpriteLibrary.addSprite("but_exit","./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("bg_menu","./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("bg_game","./sprites/bg_game.jpg");
        s_oSpriteLibrary.addSprite("msg_box","./sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("bg_help","./sprites/bg_help.png");
        s_oSpriteLibrary.addSprite("balls","./sprites/balls.png");
        s_oSpriteLibrary.addSprite("ball_explosion","./sprites/ball_explosion.png");
        s_oSpriteLibrary.addSprite("wall_tile","./sprites/wall_tile.jpg");
        s_oSpriteLibrary.addSprite("audio_icon","./sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("hit_area","./sprites/hit_area.png");
        s_oSpriteLibrary.addSprite("but_credits","./sprites/but_credits.png");
        s_oSpriteLibrary.addSprite("logo_ctl","./sprites/logo_ctl.png");
        s_oSpriteLibrary.addSprite("bg_credits","./sprites/bg_credits.png");
        s_oSpriteLibrary.addSprite("bg_menu_level","./sprites/bg_menu_level.jpg");
        s_oSpriteLibrary.addSprite("arrow_left","./sprites/arrow_left.png");
        s_oSpriteLibrary.addSprite("arrow_right","./sprites/arrow_right.png");
        s_oSpriteLibrary.addSprite("but_level","./sprites/but_level.png");
        s_oSpriteLibrary.addSprite("but_fullscreen","./sprites/but_fullscreen.png");
        
        RESOURCE_TO_LOAD += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites();
    };
    
    this._onImagesLoaded = function(){
        _iCurResource++;
        var iPerc = Math.floor(_iCurResource/RESOURCE_TO_LOAD *100);

        _oPreloader.refreshLoader(iPerc);
    };
    
    this._onAllImagesLoaded = function(){
        
    };
    
    this._onRemovePreloader = function(){
        _oPreloader.unload();
        
        
        s_oSoundTrack = playSound("soundtrack", 1, true);
        
        NUM_LEVELS = s_aLevelsData.length;
            
        s_oMain.gotoMenu(); 
    };

    this.gotoMenu = function(){
        _oMenu = new CMenu();
        _iState = STATE_MENU;
    };
    
    this.gotoLevelMenu = function(){
        _oLevelMenu = new CLevelMenu();
    };
    
    this.gotoGame = function(iLevel,iScore){
        _oGame = new CGame(_oGameData,iLevel-1,iScore);     
							
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
                
        if(_iState === STATE_GAME){
            _oGame.update();
        }
        
        
        s_oStage.update(event);
    };
    
    s_oMain = this;

    _oGameData = oData;
    ENABLE_FULLSCREEN = oData.fullscreen;
    ENABLE_CHECK_ORIENTATION = oData.check_orientation;
    
    this.initContainer();
}

var s_iCntTime = 0;
var s_iTimeElaps = 0;
var s_iPrevTime = 0;
var s_iCntFps = 0;
var s_iCurFps = 0;

var s_bMobile;
var s_bAudioActive = false;
var s_oSoundTrack = null;
var s_oDrawLayer;
var s_oStage;
var s_oMain;
var s_oSpriteLibrary;
var s_bFullscreen = false;

var s_aLevelsData;
var s_oSavings;
var s_aSounds;
var s_aSoundsInfo;