function CMenuMode() {
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;

    var _oContainer;
    var _oBg;
    var _oFade;
    var _oAudioToggle;
    var _oButExit;
    var _oButFullscreen;
    var _oTextTitle;
    var _oTextTitleBack;
    var _oButPlayEasy;
    var _oButPlayMedium;
    var _oButPlayHard;
    var _oButPlayExtreme;
    
    var _pStartPosExit;
    var _pStartPosAudio;
    var _pStartPosFullscreen;

    this._init = function () {
        _oContainer = new createjs.Container();
        s_oStage.addChild(_oContainer);
        
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_menu'));
        _oContainer.addChild(_oBg);

        var iWidth = 600;
        var iHeight = 60;
        _oTextTitle = new CTLText(_oContainer, 
                    CANVAS_WIDTH/2-iWidth/2, -200 + CANVAS_HEIGHT/2 - iHeight/2, iWidth, iHeight, 
                    48, "center", PRIMARY_FONT_COLOUR, PRIMARY_FONT, 1,
                    2, 2,
                    TEXT_SELECT,
                    true, true, true,
                    false );
        
        var iButtonXPos = CANVAS_WIDTH_HALF;
        var iButtonYPosEasy = CANVAS_HEIGHT_HALF - 80;
        var iButtonYPosMedium = CANVAS_HEIGHT_HALF + 50;
        var iButtonYPosHard = CANVAS_HEIGHT_HALF + 180;
        var iButtonYPosExtreme = CANVAS_HEIGHT_HALF + 310;
        var iFontSize = 36;

        var oSpritePlayButton = s_oSpriteLibrary.getSprite('but_menu_bg');
        _oButPlayEasy = new CTextButton(iButtonXPos, iButtonYPosEasy, oSpritePlayButton, TEXT_EASY, PRIMARY_FONT, PRIMARY_FONT_COLOUR, iFontSize, _oContainer);
        _oButPlayEasy.addEventListenerWithParams(ON_MOUSE_UP, this._onButPlayRelease, this, MODE_EASY);
        
        _oButPlayMedium = new CTextButton(iButtonXPos, iButtonYPosMedium, oSpritePlayButton, TEXT_MEDIUM, PRIMARY_FONT, PRIMARY_FONT_COLOUR, iFontSize, _oContainer);
        _oButPlayMedium.addEventListenerWithParams(ON_MOUSE_UP, this._onButPlayRelease, this, MODE_MEDIUM);
        
        _oButPlayHard = new CTextButton(iButtonXPos, iButtonYPosHard, oSpritePlayButton, TEXT_HARD, PRIMARY_FONT, PRIMARY_FONT_COLOUR, iFontSize, _oContainer);
        _oButPlayHard.addEventListenerWithParams(ON_MOUSE_UP, this._onButPlayRelease, this, MODE_HARD);
        
        _oButPlayExtreme = new CTextButton(iButtonXPos, iButtonYPosExtreme, oSpritePlayButton, TEXT_EXTREME, PRIMARY_FONT, PRIMARY_FONT_COLOUR, iFontSize, _oContainer);
        _oButPlayExtreme.addEventListenerWithParams(ON_MOUSE_UP, this._onButPlayRelease, this, MODE_EXTREME);
        
        var oSpriteExit = s_oSpriteLibrary.getSprite('but_exit');
	_pStartPosExit = {x: CANVAS_WIDTH - oSpriteExit.width/2 - 20, y: (oSpriteExit.height / 2) + 10};
        _oButExit = new CGfxButton(_pStartPosExit.x,_pStartPosExit.y,oSpriteExit,_oContainer);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);
        
        _iHeightToggle = oSpriteExit.height;
        
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            
            _pStartPosAudio = {x: _pStartPosExit.x - oSpriteExit.width/2 - oSprite.width/4, y: _pStartPosExit.y};
            _oAudioToggle = new CToggle(_pStartPosAudio.x, _pStartPosAudio.y, oSprite, s_bAudioActive,_oContainer);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
            _pStartPosFullscreen = {x:20 + oSprite.width/4,y:(oSprite.height / 2) + 10};
        }else{
            _pStartPosFullscreen = {x: _pStartPosExit.x - oSpriteExit.width - 10, y: _pStartPosExit.y};
        }
        
        var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
        
        if(ENABLE_FULLSCREEN === false){
            _fRequestFullScreen = false;
        }
        
        if (_fRequestFullScreen &&  screenfull.enabled){
            oSprite = s_oSpriteLibrary.getSprite('but_fullscreen');

            _oButFullscreen = new CToggle(_pStartPosFullscreen.x,_pStartPosFullscreen.y,oSprite,s_bFullscreen,_oContainer);
            _oButFullscreen.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this);
        }
                
        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        s_oStage.addChild(_oFade);

        createjs.Tween.get(_oFade).to({alpha: 0}, 1000).call(function () {
            _oContainer.removeChild(_oFade);
        });
        
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    };

    this.unload = function () {
        _oButPlayEasy.unload();
        _oButPlayMedium.unload();
        _oButPlayHard.unload();
        _oButPlayExtreme.unload();
        _oButPlayEasy = null;
        _oButPlayMedium = null;
        _oButPlayHard = null;
        _oButPlayExtreme = null;

        _oContainer.removeChild(_oBg);
        _oBg = null;

        _oButExit.unload();
        _oButExit = null;

        s_oStage.removeChild(_oContainer);

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        if (_fRequestFullScreen &&  screenfull.enabled){
            _oButFullscreen.unload();
        }
        s_oMenuMode = null;
    };

    this.refreshButtonPos = function (iNewX, iNewY) {
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX, _pStartPosAudio.y + iNewY);
        }
        if (_fRequestFullScreen &&  screenfull.enabled){
            _oButFullscreen.setPosition(_pStartPosFullscreen.x - iNewX,_pStartPosFullscreen.y + iNewY);
        }
        
        _oButExit.setPosition(_pStartPosExit.x - iNewX, _pStartPosExit.y + iNewY);
    };
    
    this._onAudioToggle = function () {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    
    this._onButPlayRelease = function (iMode) {
        this.unload();
        s_oMain.gotoLevelSelect(iMode);
    };
    
    this._onExit = function(){
        this.unload();
        s_oMain.gotoMenu();
    };
    
    this._onFullscreenRelease = function(){
	if(s_bFullscreen) { 
            _fCancelFullScreen.call(window.document);
	}else{
            _fRequestFullScreen.call(window.document.documentElement);
	}
	
	sizeHandler();
    };
    
    this.resetFullscreenBut = function(){
	if (_fRequestFullScreen &&  screenfull.enabled){
            _oButFullscreen.setActive(s_bFullscreen);
	};
    };
    
    s_oMenuMode = this;

    this._init();
}

var s_oMenuMode = null;