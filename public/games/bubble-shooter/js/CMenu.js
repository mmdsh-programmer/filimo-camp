function CMenu(){
    var _pStartPosAudio;
    var _pStartPosCredits;
    var _pStartPosFullscreen;
    
    var _oBg;
    var _oButPlay;
    var _oButContinue;
    var _oButCredits;
    var _oAudioToggle;
    var _oButFullscreen;
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;
    var _oFade;
    var _oCreditsPanel;
    
    this._init = function(){
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_menu'));
        s_oStage.addChild(_oBg);

        var oSprite = s_oSpriteLibrary.getSprite('but_play');
        if(s_iLastLevel === 1){
            _oButPlay = new CTextButton((CANVAS_WIDTH/2),CANVAS_HEIGHT - 300,oSprite,TEXT_PLAY,FONT_GAME,"#ffffff",44,s_oStage);
            _oButPlay.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
        }else{
            _oButPlay = new CTextButton((CANVAS_WIDTH/2) + 250,CANVAS_HEIGHT - 300,oSprite,TEXT_PLAY,FONT_GAME,"#ffffff",44,s_oStage);
            _oButPlay.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
            
            _oButContinue = new CTextButton((CANVAS_WIDTH/2)-250,CANVAS_HEIGHT - 300,oSprite,TEXT_CONTINUE,FONT_GAME,"#ffffff",38,s_oStage);
            _oButContinue.addEventListener(ON_MOUSE_UP, this._onButContinueRelease, this);
        }
        
        if(SHOW_CREDITS){
            var oSprite = s_oSpriteLibrary.getSprite('but_credits');
            _pStartPosCredits = {x:(oSprite.height/2) + 10,y:(oSprite.height/2) + 10};
            _oButCredits = new CGfxButton(_pStartPosCredits.x,_pStartPosCredits.y,oSprite,s_oStage);
            _oButCredits.addEventListener(ON_MOUSE_UP, this._onButCreditsRelease, this);
        }
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = {x: CANVAS_WIDTH - (oSprite.height/2)- 10, y: (oSprite.height/2) + 10};  
            _oAudioToggle = new CToggle(CANVAS_WIDTH - 60,60,oSprite,s_bAudioActive,s_oStage);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
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
            _pStartPosFullscreen = {x:_pStartPosCredits.x + oSprite.width/2 + 10,y:_pStartPosCredits.y};

            _oButFullscreen = new CToggle(_pStartPosFullscreen.x,_pStartPosFullscreen.y,oSprite,s_bFullscreen,s_oStage);
            _oButFullscreen.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this);
        }
        
        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        s_oStage.addChild(_oFade);
        
        if(!s_bStorageAvailable){
            new CAlertSavingBox(TEXT_ERR_LS,s_oStage);
        }
        
        createjs.Tween.get(_oFade).to({alpha:0}, 400).call(function(){_oFade.visible = false;});  
        
        this.refreshButtonPos(s_iOffsetX,s_iOffsetY);
    };
    
    this.unload = function(){
        _oButPlay.unload(); 
        _oButPlay = null;
        
        if(SHOW_CREDITS){
            _oButCredits.unload();
        }
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        
        if (_fRequestFullScreen && screenfull.isEnabled){
            _oButFullscreen.unload();
        }
        
        s_oStage.removeAllChildren();
        s_oMenu = null;
    };
    
    this.refreshButtonPos = function(iNewX,iNewY){
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX,iNewY + _pStartPosAudio.y);
        }
        
        if (_fRequestFullScreen && screenfull.isEnabled){
            _oButFullscreen.setPosition(_pStartPosFullscreen.x + iNewX,_pStartPosFullscreen.y + iNewY);
        }
        
        if(SHOW_CREDITS){
            _oButCredits.setPosition(_pStartPosCredits.x + iNewX,_pStartPosCredits.y + iNewY);
        }
        
    };
    
    
    this._exitFromMenu = function(){
        this.unload();
        s_oMain.gotoLevelMenu();
        $(s_oMain).trigger("start_session");
    };
    
    this._onButContinueRelease = function(){
        s_oMenu._exitFromMenu();
    };
    
    this._onButCreditsRelease = function(){
        _oCreditsPanel = new CCreditsPanel();
    };
    
    this._onButPlayRelease = function(){
        if(s_iLastLevel > 1){
            var oMsgBox = new CMsgBox(TEXT_DELETE_SAVINGS,TEXT_NO,"",TEXT_YES);
            oMsgBox.addEventListener(ON_MSG_BOX_LEFT_BUT,function(){oMsgBox.hide();}, this);
            oMsgBox.addEventListener(ON_MSG_BOX_RIGHT_BUT,function(){oMsgBox.hide();s_oSavings.clearLocalStorage();s_oMenu._exitFromMenu();}, this);
        }else{
            s_oMenu._exitFromMenu();
        }
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
    
    this._onAudioToggle = function(){
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    
    s_oMenu = this;
    
    this._init();
}

var s_oMenu = null;