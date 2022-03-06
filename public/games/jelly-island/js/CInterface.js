function CInterface(iCurLevel){
    var _aGoals;
    
    var _oAudioToggle;
    var _oButExit;
    var _oContainerLevelInfo;
    var _oScoreText;
    var _oBestScoreText;
    var _oButRestart;
    var _oButPause;
    var _oButFullscreen;
    var _oTimeNum;
    var _oHelpPanel=null;
    var _oContainerBottom;
    var _oLevel;
    var _oContainerTimer;
    var _oGUIExpandible;
    var _oContainerRight;
    var _oContainerBestScore;

    var _oMask;
        
    var _pStartPosExit;
    var _pStartPosAudio;
    var _pStartPosPause;
    var _pStartPosRestart;
    var _pStartPosFullScreen;
    
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;
    
    this._init = function(iCurLevel){  
        
        _oContainerLevelInfo = new createjs.Container();
        _oContainerLevelInfo.x = 47;
        _oContainerLevelInfo.y = 380;
        s_oStage.addChild(_oContainerLevelInfo);
        
        var oScorePanel = createBitmap(s_oSpriteLibrary.getSprite('score_panel'));
        oScorePanel.x = 60;
        oScorePanel.y = 10;
        _oContainerLevelInfo.addChild(oScorePanel);
        
        var oSpriteScoreIcon = s_oSpriteLibrary.getSprite("score_icon");
        var oScoreIcon = createBitmap(oSpriteScoreIcon);
        oScoreIcon.x = oScorePanel.x + 26;
        oScoreIcon.y = oScorePanel.y + 26;
        oScoreIcon.regX = oScoreIcon.width/2;
        oScoreIcon.regY = oScoreIcon.height/2;
        _oContainerLevelInfo.addChild(oScoreIcon);
        
        _oScoreText = new CFormatText(423, 92, "0", PRIMARY_FONT_COLOR, _oContainerLevelInfo, STROKE_COLOR, 50, "right");

        _oLevel = new CLevelButton(530, 75, iCurLevel, _oContainerLevelInfo);
        _oLevel.setForInfo();
                
        _oContainerBottom = new createjs.Container();
        _oContainerBottom.y = 20;
        s_oStage.addChild(_oContainerBottom);
        
        var oSprite = s_oSpriteLibrary.getSprite('bottom_panel');
        var oBottomPanel = createBitmap(oSprite);
        oBottomPanel.regX = oSprite.width/2;
        oBottomPanel.x = CANVAS_WIDTH/2;
        oBottomPanel.y = 1420;
        _oContainerBottom.addChild(oBottomPanel);
        
        this._setGoals();
        
        _oContainerTimer = new createjs.Container();
        s_oStage.addChild(_oContainerTimer);
        
        oSprite = s_oSpriteLibrary.getSprite('time_bar_fill');
        _oContainerTimer.x = CANVAS_WIDTH/2 - oSprite.width/2;
        _oContainerTimer.y = 1340;
        
        var oTimePos = {x: 0, y: 0};
        var oEnergyBarFill = createBitmap(oSprite);
        oEnergyBarFill.x=oTimePos.x + 10;
        oEnergyBarFill.y=oTimePos.y + 7;
        _oContainerTimer.addChild(oEnergyBarFill);
        
        oSprite = s_oSpriteLibrary.getSprite('time_bar');
        var oEnergyBarBg = createBitmap(oSprite);
        oEnergyBarBg.x=oTimePos.x;
        oEnergyBarBg.y=oTimePos.y;
        _oContainerTimer.addChild(oEnergyBarBg);
        
        oSprite = s_oSpriteLibrary.getSprite('time_bar_fill');
        _oMask = new createjs.Shape();
        _oMask.graphics.beginFill("rgba(255,0,0,0.01)").drawRect(0, 0, oSprite.width,oSprite.height);
        _oMask.x= oEnergyBarFill.x;
        _oMask.y= oEnergyBarFill.y;

        _oContainerTimer.addChild(_oMask);
        oEnergyBarFill.mask = _oMask;
        
        _oTimeNum = new CFormatText(oSprite.width/2, oTimePos.y + 60, "0:00", PRIMARY_FONT_COLOR, _oContainerTimer, STROKE_COLOR, 50, "center");
        
        var iOffsetButtons = 10;
        
        _oContainerRight = new createjs.Container();
        s_oStage.addChild(_oContainerRight);
         var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = {x: CANVAS_WIDTH - (oSprite.width/2)- iOffsetButtons, y: (oSprite.height/2) + iOffsetButtons};
        var oSpriteSettings = s_oSpriteLibrary.getSprite('but_settings');
        _oGUIExpandible = new CGUIExpandible(_pStartPosExit.x, _pStartPosExit.y, oSpriteSettings, _oContainerRight);
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
           
            _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite, _oContainerRight);
            _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);
            
            var oExitX = _pStartPosExit.x  - iOffsetButtons - (oSprite.width);
            
             _oGUIExpandible.addButton(_oButExit);
 
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = {x: oExitX, y: (oSprite.height/2) + iOffsetButtons};        
            _oAudioToggle = new CToggle(_pStartPosAudio.x,_pStartPosAudio.y,oSprite,s_bAudioActive, _oContainerRight);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
            
            _oGUIExpandible.addButton(_oAudioToggle);
            
            oExitX = _pStartPosAudio.x  - iOffsetButtons - (oSprite.width/2);
            
            var oSprite = s_oSpriteLibrary.getSprite('but_pause');
            _pStartPosPause = {x: oExitX, y: (oSprite.height/2) + iOffsetButtons};        
            _oButPause = new CGfxButton(_pStartPosPause.x, _pStartPosPause.y, oSprite, _oContainerRight);
            _oButPause.addEventListener(ON_MOUSE_UP, this._onButPauseRelease);
            
            _oGUIExpandible.addButton(_oButPause);
            
            oExitX = _pStartPosPause.x  - iOffsetButtons - (oSprite.width);
            
            var oSprite = s_oSpriteLibrary.getSprite('but_restart');
            _pStartPosRestart = {x: oExitX, y: (oSprite.height/2) + iOffsetButtons}; 
            _oButRestart = new CGfxButton(_pStartPosRestart.x, _pStartPosRestart.y, oSprite, _oContainerRight);
            _oButRestart.addEventListener(ON_MOUSE_UP, this._onButRestartRelease);
            _oGUIExpandible.addButton(_oButRestart);
            
        } else {
            
            var oSprite = s_oSpriteLibrary.getSprite('but_exit');
            _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite, _oContainerRight);
            _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);
            _oGUIExpandible.addButton(_oButExit);
            
            var oExitX = CANVAS_WIDTH - (oSprite.width/2) - 150;
            
            var oSprite = s_oSpriteLibrary.getSprite('but_pause');
            _pStartPosPause = {x: oExitX, y: (oSprite.height/2) + iOffsetButtons};        
            _oButPause = new CGfxButton(_pStartPosPause.x, _pStartPosPause.y, oSprite, _oContainerRight);
            _oButPause.addEventListener(ON_MOUSE_UP, this._onButPauseRelease);
            _oGUIExpandible.addButton(_oButPause);
            
            oExitX = CANVAS_WIDTH - (oSprite.width/2) - 270;
            
            var oSprite = s_oSpriteLibrary.getSprite('but_restart');
            _pStartPosRestart = {x: oExitX, y: (oSprite.height/2) + iOffsetButtons}; 
            _oButRestart = new CGfxButton(_pStartPosRestart.x, _pStartPosRestart.y, oSprite, _oContainerRight);
            _oButRestart.addEventListener(ON_MOUSE_UP, this._onButRestartRelease);
            _oGUIExpandible.addButton(_oButRestart);
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
            _pStartPosFullScreen = {x: _pStartPosRestart.x - oSprite.width/2, y: _pStartPosRestart.y};
            _oButFullscreen = new CToggle(_pStartPosFullScreen.x,_pStartPosFullScreen.y,oSprite, s_bFullscreen, _oContainerRight);
            _oButFullscreen.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this);
            _oGUIExpandible.addButton(_oButFullscreen);
        }
        
        this.refreshButtonPos(s_iOffsetX,s_iOffsetY);
    };
    
    this.unload = function(){   

        _oScoreText.unload();
        _oScoreText = null;

        _oButRestart.unload();
        _oButRestart = null;
        _oButPause.unload();
        _oButPause = null;
        
        _oTimeNum.unload();
        _oTimeNum = null;
        
        _oLevel.unload();
        _oLevel = null;
        
        for(var i=0; i<_aGoals.length; i++){
            s_oStage.removeChild(_aGoals[i].image);
        }
        
        _oButExit.unload();
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        
        s_oInterface = null;
        
    };
    
    this.refreshButtonPos = function(iNewX,iNewY){
        _oContainerRight.x = -iNewX;
        _oContainerRight.y = iNewY;
        
        //_oContainerLevelInfo.y = iNewY;
    };
    
    this.getPanelContainer = function(){
        return _oContainerBottom;
    };

    this.refreshScore = function(iValue){
        _oScoreText.setText(iValue);
    };

    this.refreshTime = function(iTime, iBarLength){        
        var iNum = formatTime(iTime);
        _oTimeNum.setText(iNum);
        
        _oMask.scaleX = iBarLength;
    };

    this.setTimerColor = function(szColor){
        _oTimeNum.setColor(szColor, STROKE_COLOR);
    };

    this._setGoals = function(){
        _aGoals = new Array();
        
        if(GOALS[iCurLevel].type0 > 0){
            _aGoals.push({type: 0, num:GOALS[iCurLevel].type0, image:null, text:null});
        }
        
        if(GOALS[iCurLevel].type1 > 0){
            _aGoals.push({type: 1, num:GOALS[iCurLevel].type1, image:null, text:null});
        }
        
        if(GOALS[iCurLevel].type2 > 0){
            _aGoals.push({type: 2, num:GOALS[iCurLevel].type2, image:null, text:null});
        }
        
        if(GOALS[iCurLevel].type3 > 0){
            _aGoals.push({type: 3, num:GOALS[iCurLevel].type3, image:null, text:null});
        }
        
        if(GOALS[iCurLevel].type4 > 0){
            _aGoals.push({type: 4, num:GOALS[iCurLevel].type4, image:null, text:null});
        }
        
        if(GOALS[iCurLevel].type5 > 0){
            _aGoals.push({type: 5, num:GOALS[iCurLevel].type5, image:null, text:null});
        }
        
        if(GOALS[iCurLevel].type6 > 0){
            _aGoals.push({type: 6, num:GOALS[iCurLevel].type6, image:null, text:null});
        }
        
        if(GOALS[iCurLevel].type7 > 0){
            _aGoals.push({type: 7, num:GOALS[iCurLevel].type7, image:null, text:null});
        }
        
        if(GOALS[iCurLevel].star > 0){
            _aGoals.push({type: TYPE_STAR, num:GOALS[iCurLevel].star, image:null, text:null});
        }
        
        if(GOALS[iCurLevel].block > 0){
            _aGoals.push({type: TYPE_BLOCK, num:GOALS[iCurLevel].block, image:null, text:null});
        }
        var oSprite = s_oSpriteLibrary.getSprite('jelly');
        var oData = {   
                        images: [oSprite], 
                        // width, height & registration point of each sprite
                        frames: {width: CELL_SIZE, height: CELL_SIZE, regX: CELL_SIZE/2, regY: CELL_SIZE/2}, 
                        animations: {type_0:[0], type_1:[1], type_2:[2], type_3:[3], type_4:[4], type_5:[5], type_6:[6], type_7:[7], star:[8]}
                   };
        
        var pPos = {x: 250, y: 1464};
        
        var iOffset = CELL_SIZE + 130;
        
        var oSpriteSheet = new createjs.SpriteSheet(oData);        
        for(var i=0; i<_aGoals.length; i++){
            if(_aGoals[i].type === TYPE_BLOCK){
                var oSprite = s_oSpriteLibrary.getSprite('block');
                _aGoals[i].image = createBitmap(oSprite);
                _aGoals[i].image.x = pPos.x+i*iOffset;
                _aGoals[i].image.y = pPos.y + CELL_SIZE/4;
                _aGoals[i].image.regX = oSprite.width/2;
                _aGoals[i].image.regY = oSprite.height/2;
                _aGoals[i].image.scaleX = 0.75;
                _aGoals[i].image.scaleY = 0.75;
                _oContainerBottom.addChild(_aGoals[i].image);
            } else {
                _aGoals[i].image = createSprite(oSpriteSheet, _aGoals[i].type,CELL_SIZE/2,CELL_SIZE/2,CELL_SIZE,CELL_SIZE);
                _aGoals[i].image.gotoAndStop(_aGoals[i].type);
                _aGoals[i].image.x = pPos.x+i*iOffset;
                _aGoals[i].image.y = pPos.y + CELL_SIZE/4;
                _aGoals[i].image.scaleX = 0.75;
                _aGoals[i].image.scaleY = 0.75;
                _oContainerBottom.addChild(_aGoals[i].image);
            }
            
            _aGoals[i].text = new CFormatText(pPos.x + CELL_SIZE/2 +i*iOffset, pPos.y, "0 / "+_aGoals[i].num, "#ffffff", _oContainerBottom, STROKE_COLOR, 35);
            _aGoals[i].text.setOutline(3);
        }
    };
    
    this.timeAttackMode = function(){
        _oContainerTimer.y = 1400;
        _oContainerBottom.visible = false;
        _oLevel.setVisible(false);
        
        _oContainerBestScore = new createjs.Container();
        _oContainerBestScore.x = 520;
        _oContainerBestScore.y = 380;
        s_oStage.addChildAt(_oContainerBestScore, s_oStage.getChildIndex(_oContainerRight));
        
        var oScorePanel = createBitmap(s_oSpriteLibrary.getSprite('score_panel'));
        oScorePanel.x = 60;
        oScorePanel.y = 10;
        _oContainerBestScore.addChild(oScorePanel);
        
        var oSpriteScoreIcon = s_oSpriteLibrary.getSprite("best_score_icon");
        var oScoreIcon = createBitmap(oSpriteScoreIcon);
        oScoreIcon.x = oScorePanel.x + 26;
        oScoreIcon.y = oScorePanel.y + 24;
        oScoreIcon.regX = oScoreIcon.width/2;
        oScoreIcon.regY = oScoreIcon.height/2;
        _oContainerBestScore.addChild(oScoreIcon);
        
        _oBestScoreText = new CFormatText(423, 92, s_iBestScore, PRIMARY_FONT_COLOR, _oContainerBestScore, STROKE_COLOR, 50, "right");
    };

    this.refreshGoals = function(iType, iNum){
        for(var i=0; i<_aGoals.length; i++){
            if(_aGoals[i].type === iType){                
                _aGoals[i].text.setText(iNum + " / " + _aGoals[i].num);
                if(iNum >= _aGoals[i].num){
                    _aGoals[i].text.setColor("#f974af", STROKE_COLOR);
                }
            }            
        }               
    };

    this._onButHelpRelease = function(){
        _oHelpPanel = new CHelpPanel();
    };
    
    this._onButRestartRelease = function(){
        //s_oGame.restartGame();
        s_oGame.pauseGame();
        new CAreYouSurePanel(s_oGame.restartGame, s_oGame.resumeGame);
    };
    
    this._onButPauseRelease = function(){
        new CPausePanel();
        s_oGame.pauseGame();
    };
    
    this._onButLevelMenuRelease = function(){
        s_oGame.unload();
        
        s_oMain.goToModeMenu();
    };
    
    this.onExitFromHelp = function(){
        _oHelpPanel.unload();
    };
    
    this._onAudioToggle = function(){
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
        
    this._onExit = function(){

        s_oGame.pauseGame();
        new CAreYouSurePanel(s_oGame.onExit, s_oGame.resumeGame);
        
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
    
    this._init(iCurLevel);
    
    return this;
}

var s_oInterface = null;