function CInterface(iMode) {
    var _oAudioToggle;
    var _iMode = iMode;
    
    var _pStartPosAudio;
    var _pStartPosExit;
    var _pStartPosRestart;
    var _pStartPosFullscreen;
    
    var _oButFullscreen;
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;
    var _oButExit;
    var _oButRestart;
    var _oTimeText;
    var _oBestScore;
    var _oAreYouSurePanel;

    this._init = function () {
        var oSpriteExit = s_oSpriteLibrary.getSprite('but_exit');
        
        _oTimeText = new createjs.Text(TEXT_TIME + " 0", "40px " + PRIMARY_FONT, "#ffffff");
        _oTimeText.textAlign = "left";
        _oTimeText.textBaseline = "alphabetic";
	_oTimeText.x = 40;
        _oTimeText.y = 1100;
	s_oStage.addChild(_oTimeText);
    
        _oBestScore = new createjs.Text(TEXT_BEST_SCORE + " " + s_aBestScore[_iMode], "40px " + PRIMARY_FONT, "#ffffff");
        _oBestScore.textAlign = "right";
        _oBestScore.textBaseline = "alphabetic";
	_oBestScore.x = CANVAS_WIDTH - 40;
        _oBestScore.y =  1100;
	s_oStage.addChild(_oBestScore);
        
        _pStartPosExit = {x: CANVAS_WIDTH - oSpriteExit.width/2 - 20, y: (oSpriteExit.height / 2) + 10};
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSpriteExit,s_oStage);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);

        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            
            _pStartPosAudio = {x: _pStartPosExit.x - oSpriteExit.width/2 - oSprite.width/4, y: _pStartPosExit.y};
            _oAudioToggle = new CToggle(_pStartPosAudio.x, _pStartPosAudio.y, oSprite, s_bAudioActive,s_oStage);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
            _pStartPosFullscreen = {x:20 + oSprite.width/4,y:(oSprite.height / 2) + 10};
            _pStartPosRestart = {x: _pStartPosAudio.x - oSprite.width/2, y:_pStartPosAudio.y};
        }else{
            _pStartPosFullscreen = {x: _pStartPosExit.x - oSpriteExit.width - 10, y: _pStartPosExit.y};
            _pStartPosRestart = {x: _pStartPosFullscreen.x, y: _pStartPosFullscreen.y};
        }

        var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
        
        if(ENABLE_FULLSCREEN === false){
            _fRequestFullScreen = false;
        }
        
        if (_fRequestFullScreen && screenfull.isEnabled){
            oSprite = s_oSpriteLibrary.getSprite('but_fullscreen');

            _oButFullscreen = new CToggle(_pStartPosFullscreen.x,_pStartPosFullscreen.y,oSprite,s_bFullscreen,s_oStage);
            _oButFullscreen.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this);
        }
        
        
        _oButRestart = new CGfxButton(_pStartPosRestart.x, _pStartPosRestart.y, s_oSpriteLibrary.getSprite("but_restart_small"),s_oStage);
        _oButRestart.addEventListener(ON_MOUSE_UP, this._onRestart, this);
        
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
    };

    this.refreshButtonPos = function (iNewX, iNewY) {
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX, _pStartPosAudio.y + iNewY);
        }
        if (_fRequestFullScreen && screenfull.isEnabled){
            _oButFullscreen.setPosition(_pStartPosFullscreen.x + iNewX,_pStartPosFullscreen.y + iNewY);
        }
        
        _oButExit.setPosition(_pStartPosExit.x - iNewX, _pStartPosExit.y + iNewY);
        _oButRestart.setPosition(_pStartPosRestart.x - iNewX, _pStartPosRestart.y + iNewY);
    };

    this.refreshTimer = function (iTimer) {
        if (iTimer < 0) {
            iTimer = 0;
        };
        
       _oTimeText.text = TEXT_TIME + " " + iTimer;
    };
    
    this.refreshBestScore = function () {
       _oBestScore.text = TEXT_BEST_SCORE+" "+s_aBestScore[_iMode];
    };
    
    this.unload = function () {
        
        if (DISABLE_SOUND_MOBILE === false || s_bMobile === false) {
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        
        if (_fRequestFullScreen && screenfull.isEnabled){
            _oButFullscreen.unload();
        }
        
        _oButRestart.unload();
        _oButExit.unload();
        s_oInterface = null;
        s_oGame._bDisableEvents = false;
    };
    
    this.gameOver = function(iScore){
        new CEndPanel(iScore);
    };
    
    this.showWin = function(){
        new CWinPanel(_iMode);
    };
    
    this._onExit = function () {
        _oAreYouSurePanel = new CAreYouSurePanel(s_oStage);
        s_oGame._bDisableEvents = true;
    };

    this._onAudioToggle = function () {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    
    this.resetFullscreenBut = function(){
	if (_fRequestFullScreen && screenfull.isEnabled){
		_oButFullscreen.setActive(s_bFullscreen);
	}
    };

    this._onFullscreenRelease = function(){
        if(s_bFullscreen) { 
		_fCancelFullScreen.call(window.document);
	}else{
		_fRequestFullScreen.call(window.document.documentElement);
	}
	
	sizeHandler();
    };
    
    this._onRestart = function(){
        s_oGame.restart();
    };
    
    s_oInterface = this;

    this._init();

    return this;
}

var s_oInterface = null;