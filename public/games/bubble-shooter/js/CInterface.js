function CInterface(iScore,oBallSpriteSheet){
    var _pStartPosExit;
    var _pStartPosAudio;
    var _pStartPosFullscreen;
    
    var _oContainerGUI;
    var _oBgGUI;
    var _oButExit;
    var _oHitArea;
    var _oNextBall;
    var _oNext;
    var _oNextBack;
    var _oScoreTextBack;
    var _oScoreText;
    var _oLevelText;
    var _oLevelTextBack;
    var _oCongratsText;
    var _oCongratsTextBack;
    var _oNextLevelPanel;
    var _oAudioToggle;
    var _oButFullscreen;
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;
    
    this._init = function(iScore,oBallSpriteSheet){
        var oParent = this;
        
        _oContainerGUI = new createjs.Container();
        s_oStage.addChild(_oContainerGUI);
		
        _oBgGUI = new createjs.Shape();
        _oBgGUI.graphics.beginFill("rgba(0,0,0,0.5)").drawRect(0,0,CANVAS_WIDTH,110);
        _oContainerGUI.addChild(_oBgGUI);
        
	_oScoreTextBack = new createjs.Text(TEXT_SCORE +": "+iScore,"40px "+FONT_GAME, "#000000");
        _oScoreTextBack.x = CANVAS_WIDTH/2 +2;
        _oScoreTextBack.y = CANVAS_HEIGHT - 254;
        _oScoreTextBack.textAlign = "center";
        _oScoreTextBack.textBaseline = "alphabetic";
        s_oStage.addChild(_oScoreTextBack);
		
	_oScoreText = new createjs.Text(TEXT_SCORE +": "+iScore,"40px "+FONT_GAME, "#ffffff");
        _oScoreText.x = CANVAS_WIDTH/2;
        _oScoreText.y = CANVAS_HEIGHT - 256;
        _oScoreText.textAlign = "center";
        _oScoreText.textBaseline = "alphabetic";
        s_oStage.addChild(_oScoreText);
        
        _oNextBack = new createjs.Text(TEXT_NEXT,"34px "+FONT_GAME, "#000000");
        _oNextBack.x = CANVAS_WIDTH/2 - 31;
        _oNextBack.y = 92;
        _oNextBack.textAlign = "center";
        _oNextBack.textBaseline = "alphabetic";
        _oContainerGUI.addChild(_oNextBack);
		
	_oNext = new createjs.Text(TEXT_NEXT ,"34px "+FONT_GAME, "#ffffff");
        _oNext.x = (CANVAS_WIDTH/2) - 30;
        _oNext.y = 90;
        _oNext.textAlign = "center";
        _oNext.textBaseline = "alphabetic";
        _oContainerGUI.addChild(_oNext);
        
        _oNextBall = createSprite(oBallSpriteSheet,"ball_0",0,0,BALL_DIM,BALL_DIM);
        _oNextBall.stop();
        _oNextBall.x = (CANVAS_WIDTH/2) + 26;
        _oNextBall.y = 56;
        _oContainerGUI.addChild(_oNextBall);
        
        _oLevelTextBack = new createjs.Text(TEXT_LEVEL +" "+s_iLastLevel,"34px "+FONT_GAME, "#000000");
        _oLevelTextBack.x = CANVAS_WIDTH/2 + 1;
        _oLevelTextBack.y = 47;
        _oLevelTextBack.textAlign = "center";
        _oLevelTextBack.textBaseline = "alphabetic";
        _oContainerGUI.addChild(_oLevelTextBack);
        
        _oLevelText = new createjs.Text(TEXT_LEVEL +" "+s_iLastLevel,"34px "+FONT_GAME, "#ffffff");
        _oLevelText.x = CANVAS_WIDTH/2;
        _oLevelText.y = 45;
        _oLevelText.textAlign = "center";
        _oLevelText.textBaseline = "alphabetic";
        _oContainerGUI.addChild(_oLevelText);

        _oCongratsTextBack = new createjs.Text(TEXT_VERYGOOD ,"60px "+FONT_GAME, "#000000");
        _oCongratsTextBack.x = CANVAS_WIDTH/2 + 4;
        _oCongratsTextBack.y = -76;
        _oCongratsTextBack.textAlign = "center";
        _oCongratsTextBack.textBaseline = "alphabetic";
        s_oStage.addChild(_oCongratsTextBack);
        
        _oCongratsText = new createjs.Text(TEXT_VERYGOOD ,"60px "+FONT_GAME, "#ffffff");
        _oCongratsText.x = CANVAS_WIDTH/2;
        _oCongratsText.y = -80;
        _oCongratsText.textAlign = "center";
        _oCongratsText.textBaseline = "alphabetic";
        s_oStage.addChild(_oCongratsText);
        
        

        var oParent = this;
        _oHitArea = createBitmap(s_oSpriteLibrary.getSprite('hit_area'));
        s_oStage.addChild(_oHitArea);
        _oHitArea.on("pressup",function(e){oParent._onTapScreen(e.stageX/s_iScaleFactor,e.stageY/s_iScaleFactor)});  
        
        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = {x:CANVAS_WIDTH - (oSprite.width/2) -20,y:60};
        _oButExit = new CGfxButton(_pStartPosExit.x,_pStartPosExit.y,oSprite,s_oStage);
        _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);
		
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = {x:_pStartPosExit.x - (oSprite.width/2)-10,y:60};
            _oAudioToggle = new CToggle(_pStartPosAudio.x,_pStartPosAudio.y,oSprite,s_bAudioActive,s_oStage);
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
            _pStartPosFullscreen = {x: oSprite.width/4 + 10,y:60};

            _oButFullscreen = new CToggle(_pStartPosFullscreen.x,_pStartPosFullscreen.y,oSprite,s_bFullscreen,s_oStage);
            _oButFullscreen.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this);
        }

        this.refreshButtonPos(s_iOffsetX,s_iOffsetY);
    };
    
    this.unload = function(){
        _oButExit.unload();
        _oButExit = null;
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
	
        if (_fRequestFullScreen && screenfull.isEnabled){
            _oButFullscreen.unload();
        }
        
        var oParent = this;
        _oHitArea.off("pressup",function(e){oParent._onTapScreen(e.stageX,e.stageY)});
        s_oStage.removeChild(_oHitArea);
		
		s_oInterface = null;
    };
    
    this.refreshButtonPos = function(iNewX,iNewY){
        _oButExit.setPosition(_pStartPosExit.x - iNewX,iNewY + _pStartPosExit.y);
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX,iNewY + _pStartPosAudio.y);
        }
        
        if (_fRequestFullScreen && screenfull.isEnabled){
            _oButFullscreen.setPosition(_pStartPosFullscreen.x + iNewX,_pStartPosFullscreen.y + iNewY);
        }

	_oContainerGUI.y = iNewY;
    };

    this.refreshScore = function(iScore){
        _oScoreTextBack.text = TEXT_SCORE +": "+iScore;
        _oScoreText.text = TEXT_SCORE +": "+iScore;
    };
    
    this.setNextBall = function(iCodeColor){
        _oNextBall.gotoAndStop("ball_"+iCodeColor);
    };
    
    this.showCongrats = function(szText){
        _oCongratsText.text = szText;
        _oCongratsTextBack.text = szText;
        
        createjs.Tween.get(_oCongratsText).to({y:CANVAS_HEIGHT/2} , CANVAS_HEIGHT/2,createjs.Ease.quintOut).call(function() {
                                                    createjs.Tween.get(_oCongratsText).to({y:-60} , 700,createjs.Ease.quintIn);
                                                });
                                                
        createjs.Tween.get(_oCongratsTextBack).to({y:CANVAS_HEIGHT/2} , CANVAS_HEIGHT/2 + 2,createjs.Ease.quintOut).call(function() {
                                                    createjs.Tween.get(_oCongratsTextBack).to({y:-56} , 700,createjs.Ease.quintIn);
                                                });
    };
    
    this.showNextLevel = function(iLevel,iScore){
        $(s_oMain).trigger("end_level",iLevel);
        _oNextLevelPanel = new CNextLevelPanel(iLevel,iScore);
    };
    
    this.refreshLevelText = function(iLevel){
        _oLevelText.text = TEXT_LEVEL +" "+iLevel;
        _oLevelTextBack.text = TEXT_LEVEL +" "+iLevel;
    };
    
    this._onExit = function(){
        s_oGame.onExit();  
    };
    
    this._onTapScreen = function(iX,iY){
        s_oGame.tapScreen(iX,iY);
    };
	
    this._onAudioToggle = function(){
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
    
    s_oInterface = this;
    
    this._init(iScore,oBallSpriteSheet);
    
    
}

var s_oInterface = null;