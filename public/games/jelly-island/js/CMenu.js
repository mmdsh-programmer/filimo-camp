function CMenu(){
    
    var _oBg;
    
    var _oContainerLogo;
    var _oLogo;
    var _oSun;

    var _oAudioToggle;
    var _oParent;    
    var _oCreditsBut;
    var _oButFullscreen;
    
    var _oMenuMode;
    
    var _oButTextTimeAttack;
    var _iXButTimeAttack;
    var _oButTextStoryMode;
    var _iXButStoryMode;
    
    var _pStartPosAudio;
    var _pStartPosExit;
    var _pStartPosCredits;
    var _pStartPosFullscreen;
    var _pStartPosLang;
    
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;
    
    var _oButExitMode;
    var _oButLang;
    var _oContainerLeftButtons;
    var _iXContainerAnimPoint;
    
    this._init = function(){
        fadeSound("soundtrack", s_aSounds["soundtrack"].volume(), 1, 500);
        
        _oMenuMode = null;
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_menu'));
        s_oStage.addChild(_oBg);
        
        _oContainerLogo = new createjs.Container();
        _oContainerLogo.x = CANVAS_WIDTH/2;
        _oContainerLogo.y = 920;
        _oContainerLogo.scaleX = _oContainerLogo.scaleY = 0;
        s_oStage.addChild(_oContainerLogo);
        
        var oSpriteSun = s_oSpriteLibrary.getSprite("sun"); 
        _oSun = createBitmap(oSpriteSun);
        _oSun.regX = oSpriteSun.width/2;
        _oSun.regY = oSpriteSun.height/2;
        _oSun.y = -550;
        _oSun.scaleX = _oSun.scaleY = 1.05;
        _oSun.rotation = -4;
        _oContainerLogo.addChild(_oSun);
        
        var oSprite = s_oSpriteLibrary.getSprite('logo');
        _oLogo = createBitmap(oSprite);
        _oLogo.regX = oSprite.width/2;
        _oLogo.regY = oSprite.height;
        _oContainerLogo.addChild(_oLogo);
       
        createjs.Tween.get(_oSun, {loop:true, bounce:true})
                       .to({rotation: -_oSun.rotation}, 1000, createjs.Ease.sineInOut);
        
        createjs.Tween.get(_oContainerLogo)
                      .to({scaleX: 1, scaleY: 1}, 1000, createjs.Ease.elasticOut);
        
        _oContainerLeftButtons = new createjs.Container();
        s_oStage.addChild(_oContainerLeftButtons); 
        
        var oSpriteExit = s_oSpriteLibrary.getSprite("but_exit");
        _iXContainerAnimPoint = (oSpriteExit.width) + 10;
        _pStartPosExit = {x: CANVAS_WIDTH + (oSpriteExit.width/2), y: (oSpriteExit.height/2) + 10};
        
        _oButExitMode = new CGfxButton(_pStartPosExit.x,_pStartPosExit.y,oSpriteExit, _oContainerLeftButtons);
        _oButExitMode.addEventListener(ON_MOUSE_UP, this._onExitMode, this);
        
        var oSpriteLang = s_oSpriteLibrary.getSprite("but_lang");
        _pStartPosLang = {x: CANVAS_WIDTH - oSpriteExit.width - 10, y: _pStartPosExit.y};
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = {x: CANVAS_WIDTH - (oSprite.height/2)- 10, y: _pStartPosExit.y};            
            _oAudioToggle = new CToggle(_pStartPosAudio.x,_pStartPosAudio.y,oSprite,s_bAudioActive, _oContainerLeftButtons);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);  
            _pStartPosLang = {x: _pStartPosAudio.x - oSpriteExit.width - 10, y: _pStartPosAudio.y};
        }
   
        _oButLang = new CButLang(_pStartPosLang.x, _pStartPosLang.y, NUM_LANGUAGES, s_iCurLang, oSpriteLang, _oContainerLeftButtons);
        _oButLang.addEventListener(ON_SELECT_LANG, this._onChangeLang, this);
        
        var oSprite = s_oSpriteLibrary.getSprite('but_info');
        _pStartPosCredits = {x: (oSprite.height/2)+ 10, y: _pStartPosExit.y};            
        _oCreditsBut = new CGfxButton(_pStartPosCredits.x,_pStartPosCredits.y,oSprite, s_oStage);
        _oCreditsBut.addEventListener(ON_MOUSE_UP, this._onButCreditsRelease, this);
        
        var oSpriteButText = s_oSpriteLibrary.getSprite('but_text'); 
        
        _iXButTimeAttack = CANVAS_WIDTH/2 - 240;
        
        _oButTextTimeAttack = new CTextButton(
                                                   _iXButTimeAttack,
                                                    1300,
                                                    " ",
                                                    TEXT_TIME_ATTACK,
                                                    PRIMARY_FONT,
                                                    "transparent",
                                                    60,
                                                    "center",
                                                    0,
                                                    -10,
                                                    s_oStage
                                                );
        _oButTextTimeAttack.addEventListener(ON_MOUSE_UP, null, this);
        
        _iXButStoryMode = CANVAS_WIDTH/2 + 240;
        _oButTextStoryMode = new CTextButton(
                                                    _iXButStoryMode,
                                                    1300,
                                                    oSpriteButText,
                                                    sprintf(TEXT_STORY_MODE, "\n"),
                                                    PRIMARY_FONT,
                                                    PRIMARY_FONT_COLOR,
                                                    60,
                                                    "center",
                                                    0,
                                                    -10,
                                                    s_oStage
                                                );
        
        _oButTextStoryMode.addEventListener(ON_MOUSE_UP, this._onPressUpButStoryMode, this);
        
        var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
        
        if(ENABLE_FULLSCREEN === false){
            _fRequestFullScreen = false;
        }
        
        if (_fRequestFullScreen && screenfull.isEnabled){
            oSprite = s_oSpriteLibrary.getSprite("but_fullscreen");
            _pStartPosFullscreen = {x:_pStartPosCredits.x + oSprite.width/2 + 10,y:_pStartPosCredits.y};
            _oButFullscreen = new CToggle(_pStartPosFullscreen.x,_pStartPosFullscreen.y,oSprite,s_bFullscreen, s_oStage);
            _oButFullscreen.addEventListener(ON_MOUSE_UP,this._onFullscreenRelease,this);
        }

        this.refreshButtonPos(s_iOffsetX,s_iOffsetY);
        
        if(!s_oLocalStorage.isUsed()){
            var oMsgBoxPanel = new CAreYouSurePanel();
            oMsgBoxPanel.changeMessage(TEXT_ERR_LS, -300);
            oMsgBoxPanel.setOneButton();
        }
    };
    
    this._onPressUpButTimeAttack = function(){
        s_iGameMode = TIME_ATTACK;
        
         _oMenuMode = new CMenuTimeAttack(s_oStage);

        _oMenuMode.startTimeAttack();
        
        return;
        
        var oCbEndAnimation = function(){
                                            _oMenuMode.show();
                                        };
                                        
        this._onChooseMode(oCbEndAnimation);
    };
    
    this._onPressUpButStoryMode = function(){
        s_iGameMode = STORY_MODE;
        _oMenuMode = new CMenuStoryMode(s_oStage);
        
        if(s_aLevelScore[1] === 0){
           _oMenuMode._onButContinueRelease();
           return;
        }
        
        var oCbEndAnimation = function(){
                                            _oMenuMode.show();
                                        };
                                        
        this._onChooseMode(oCbEndAnimation);
    };
    
    this._onChooseMode = function(oCbCompleted){
        var oButStoryMode = _oButTextStoryMode.getContainer();
        var oBounds = oButStoryMode.getBounds();
        
        _oButTextTimeAttack.block(true);
        _oButTextStoryMode.block(true);
        
        createjs.Tween.get(_oContainerLeftButtons)
                       .to({x: -_iXContainerAnimPoint}, 500, createjs.Ease.bounceOut);
        
        createjs.Tween.get(oButStoryMode)
                      .to({x: CANVAS_WIDTH + oBounds.width/2}, 500, createjs.Ease.cubicOut);
        
        var oButTimeAttack = _oButTextTimeAttack.getContainer();
        createjs.Tween.get(oButTimeAttack)
                      .to({x: -oBounds.width/2}, 500, createjs.Ease.cubicOut)
                      .call(oCbCompleted, null, this);
    };
    
    this._onExitMode = function(){
        _oButExitMode.block(true);
        createjs.Tween.get(_oContainerLeftButtons, {override:true})
                       .to({x: 0}, 500, createjs.Ease.bounceOut)
                       .call(function(){
                           _oButExitMode.block(false);
                       });
               
        _oMenuMode.hide(this.showMenuElements, this);
    };
    
    this.showMenuElements = function(){
        _oMenuMode.unload();
        _oMenuMode = null;
        _oButTextStoryMode.setX(_iXButStoryMode);
        _oButTextTimeAttack.setX(_iXButTimeAttack);
        
        _oButTextTimeAttack.block(false);
        _oButTextStoryMode.block(false);
        
        var oButStoryMode = _oButTextStoryMode.getContainer();
        oButStoryMode.scaleY = oButStoryMode.scaleX = 0;
        
        var oButTimeAttack = _oButTextTimeAttack.getContainer();
        oButTimeAttack.scaleY = oButTimeAttack.scaleX = 0;
        
        createjs.Tween.get(oButStoryMode).to({scaleX : 1, scaleY: 1}, 800, createjs.Ease.bounceOut);
                        
        createjs.Tween.get(oButTimeAttack).to({scaleX : 1, scaleY: 1}, 800, createjs.Ease.bounceOut);
    };
    
    this.unload = function(){
        if (_fRequestFullScreen && screenfull.isEnabled){
            _oButFullscreen.unload();
        }
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        
        _oButLang.unload();
        _oMenuMode.unload();
        
        s_oStage.removeAllChildren();
        
        _oBg = null;
        s_oMenu = null;
    };
   
    this.refreshButtonPos = function(iNewX,iNewY){
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX,iNewY + _pStartPosAudio.y);
        }
        _oCreditsBut.setPosition(_pStartPosCredits.x + iNewX, iNewY + _pStartPosCredits.y);
        if (_fRequestFullScreen && screenfull.isEnabled){
                _oButFullscreen.setPosition(_pStartPosFullscreen.x + iNewX, _pStartPosFullscreen.y + iNewY);
        }
        
        _oButLang.setPosition(_pStartPosLang.x - iNewX, _pStartPosLang.y + iNewY);
        _oButExitMode.setPosition(_pStartPosExit.x - iNewX, iNewY + _pStartPosExit.y );
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
    
    this._onButContinueRelease = function(){
        this.unload();        
        s_oMain.goToModeMenu();
        
        $(s_oMain).trigger("start_session");
    };
    
    this._onButPlayRelease = function(){
        new CWarningPanel();
    };
	
    this._onButCreditsRelease = function(){    
        new CCreditsPanel();
    };    
    
    this._onChangeLang = function(iLang){
        s_iCurLang = iLang;
        refreshLanguage();
        
        _oButTextStoryMode.changeText(sprintf(TEXT_STORY_MODE, "\n"));
        _oButTextTimeAttack.changeText(TEXT_TIME_ATTACK);
        
        if(_oMenuMode){
            _oMenuMode.refreshText(sprintf(TEXT_STORY_MODE, " "));
        }
    };
 
    
    s_oMenu = this;
    
    _oParent = this;
    this._init();
}

var s_oMenu = null;