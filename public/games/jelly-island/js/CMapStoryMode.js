function CMapStoryMode(){
    
    var _bStartUpdate = false;
    var _bMapCorrectionActive = false;
    var _bPlaneScaled = false;
    
    var _iTimeElapse = 0;
    
    var _iVectLength = 0;
    var _iVectAngleX = 0;
    var _iVectAngleY = 0;
    
    var _aLevel;
    var _oTitle;
    
    var _oParent;
    var _oAudioToggle;
    var _oButExit;
    var _aClouds;
    var _oMapContainer;
    var _oButFullscreen;
    
    var _pStartPosAudio;
    var _pStartPosExit;
    var _pStartPosTitle;
    
    var _pMapMoveStartPoint;
    var _pNewMapPoint;
    var _pStartPosFullscreen;
    
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;
    
    var _aMapPiece;
    var _rMainRect;
    var _aPieceRect;
    
    var _oMapDimension;
    
    var _oContainerLevelsTrack;
    
    var _oListenerMouseDown;
    var _oListenerPressMove;
    var _oListenerPressUp;
    
    this._init = function(){
        
        _iTimeElapse = 0;
        
        _pMapMoveStartPoint = {x:0, y:0};
        _oMapContainer = new createjs.Container();
        s_oStage.addChild(_oMapContainer);
        
        _pStartPosTitle = {x: CANVAS_WIDTH/2 - 60, y: 60};
        _oTitle = new CFormatText(_pStartPosTitle.x, _pStartPosTitle.y, TEXT_SELECT_LEVEL, PRIMARY_FONT_COLOR, s_oStage, "#ef8297", 90, "center", PRIMARY_FONT, 135,600);
        _oTitle.setOutline(10);
        
        _rMainRect = new createjs.Rectangle(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
        
        _aPieceRect = new Array();
        _aMapPiece = new Array();
        
        _oMapDimension = {width:0, height:0};
        
        var iYOffset = 0;
        var iXOffset = 0;
        for(var i = 0; i < NUM_MAP_TILES; i++){
            var oSprite = s_oSpriteLibrary.getSprite('jm_'+i);
            var pOffset = {x: oSprite.width, y: oSprite.height};
            
            _aMapPiece[i] = createBitmap(oSprite);
            _aMapPiece[i].y = iYOffset;
            _aMapPiece[i].x = iXOffset;
            if(i%4 < 3){
                iXOffset += oSprite.width;
            } else{
                _oMapDimension.width = iXOffset + oSprite.width;
                iXOffset = 0;
                iYOffset += oSprite.height;
            }
            
            _aPieceRect.push(new createjs.Rectangle(_aMapPiece[i].x, _aMapPiece[i].y, pOffset.x, pOffset.y));
            _oMapContainer.addChild(_aMapPiece[i]);
        }
        
        _oMapDimension.height = iYOffset;
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            
            var oSprite = s_oSpriteLibrary.getSprite('but_exit');
            _pStartPosExit = {x: CANVAS_WIDTH - (oSprite.height/2)- 10, y: (oSprite.height/2) + 10};
            _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite, s_oStage);
            _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);
            
            var oExitX = _pStartPosExit.x - (oSprite.width) - 10;
            _pStartPosAudio = {x: oExitX, y: _pStartPosExit.y};
            
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');            
            _oAudioToggle = new CToggle(_pStartPosAudio.x,_pStartPosAudio.y,oSprite,s_bAudioActive, s_oStage);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
                     
        } else {
            
            var oSprite = s_oSpriteLibrary.getSprite('but_exit');
            _pStartPosExit = {x: CANVAS_WIDTH - (oSprite.height/2) - 10, y: _pStartPosExit.y};
            _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite, s_oStage);
            _oButExit.addEventListener(ON_MOUSE_UP, this._onExit, this);
        }
        
        var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
        
        if(ENABLE_FULLSCREEN === false){
            _fRequestFullScreen = false;
        }
        
        if (_fRequestFullScreen && screenfull.isEnabled){
            oSprite = s_oSpriteLibrary.getSprite("but_fullscreen");
            _pStartPosFullscreen = {x:(oSprite.height/2)+ 10,y:_pStartPosExit.y};
            _oButFullscreen = new CToggle(_pStartPosFullscreen.x,_pStartPosFullscreen.y,oSprite,s_bFullscreen, s_oStage);
            _oButFullscreen.addEventListener(ON_MOUSE_UP,this._onFullscreenRelease,this);
        }
        
        _oListenerMouseDown = _oMapContainer.on("mousedown", this._mapMoveStartPoint);
        _oListenerPressMove = _oMapContainer.on("pressmove", this._mapMove);
        _oListenerPressUp   = _oMapContainer.on("pressup", this._mapMoveStop);
        
        //Add levels        
        _oContainerLevelsTrack = new createjs.Container();
        _oMapContainer.addChild(_oContainerLevelsTrack);
        
        _aLevel = new Array();
        var iCurLevelActive = 0; 
        for(var i = 0; i < LEVEL_MATRIX.length - 1; i++){ 
            _aLevel[i+1] = new CLevelButton(0, 0, i + 1, _oMapContainer);            
            _aLevel[i+1].addEventListenerWithParams(ON_MOUSE_UP, this._startLevel, this, i + 1);

            var bEnable =  s_aLevelEnabled[i+1];
            _aLevel[i+1].setActive(bEnable);
            
            if(bEnable){
                var iScore = s_aLevelScore[i+1];
              
                
                if(iScore > 0){
                    _aLevel[i+1].addTextOn(sprintf(TEXT_SCORE, iScore), "bottom", PRIMARY_FONT_COLOR, '#000', 50);
                    if(i+1 === 2){
                        _aLevel[i+1].setTextPosition(0, -120);
                    }
                    s_aHelpPanelEnabled[i+1] = false;
                }
                iCurLevelActive = i+1;
            }
            _aLevel[i+1].setStars(iScore);
        };
        
        var iScore = s_aLevelScore[iCurLevelActive];
        if(iScore === 0){
            _aLevel[iCurLevelActive].pulseAnimation();
        }
        
        this._setLevelPosition();
        
        this._centerMapToLevel(iCurLevelActive);
        
        this.refreshButtonPos(s_iOffsetX,s_iOffsetY);
        
        this._activeMapPiece();
        
        _aClouds = new Array();
        for(var i = 0; i < NUM_CLOUD_SPRITE; i++){
            for(var j = 0; j < 3; j++){
                var oSpriteCloud = s_oSpriteLibrary.getSprite('cloud_'+i);
                var oCloud = createBitmap(oSpriteCloud);
                _oMapContainer.addChild(oCloud);        
                this._animCloud(oCloud);
                _aClouds.push(oCloud);
            }
        }
    };
    
    this.unload = function(){
        _oMapContainer.off("mousedown", _oListenerMouseDown);
        _oMapContainer.off("pressmove", _oListenerPressMove);
        _oMapContainer.off("pressup", _oListenerPressUp);
        
        if (_fRequestFullScreen && screenfull.isEnabled){
            _oButFullscreen.unload();
        }
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        
        for(var i = 0; i < _aClouds.length; i++){
            createjs.Tween.removeTweens(_aClouds[i]);
        }
        
        for(var i=1; i<26; i++){
            _aLevel[i].unload();
        }
        s_oStage.removeAllChildren();

        s_oMapStoryMode = null;
    };
    
    this._setLevelPosition = function(){
        //ORIGINAL MAP COORDINATES BASED ON MATRIX 4x6 (TILES 600x600)
        var iXOffset = 0;
        var iYOffset = 600;
        
        _aLevel[1].setPosition(1250, 3163);
        _aLevel[2].setPosition(1012, 3201);
        _aLevel[3].setPosition(880, 3047);
        _aLevel[4].setPosition(636, 3096);
        
        _aLevel[5].setPosition(600, 2828);
        
        _aLevel[6].setPosition(1050, 2504);
        _aLevel[7].setPosition(1371, 2664);
        _aLevel[8].setPosition(1782, 2763);
        _aLevel[9].setPosition(1908, 2511);
        _aLevel[10].setPosition(1565, 2399); 
        _aLevel[11].setPosition(1211, 2277);
        _aLevel[12].setPosition(1030, 2012);
        
        _aLevel[13].setPosition(920, 1820);
        _aLevel[14].setPosition(1184, 1715);
        _aLevel[15].setPosition(1514, 1664);
        _aLevel[16].setPosition(1764, 1499); 
        _aLevel[17].setPosition(1914, 1229);
        _aLevel[18].setPosition(1364, 1340);
        _aLevel[19].setPosition(944, 1425);
        _aLevel[20].setPosition(650, 1150);
        
        _aLevel[21].setPosition(686, 758);
        _aLevel[22].setPosition(852, 929);
        _aLevel[23].setPosition(1388, 941);
        
        _aLevel[24].setPosition(1533, 458);
        _aLevel[25].setPosition(1202, 380);

        for(var i = 1; i < _aLevel.length; i++){
            var iNewX = _aLevel[i].getX() + iXOffset;
            var iNewY = _aLevel[i].getY() + iYOffset;
            
            _aLevel[i].setPosition(iNewX, iNewY);            
        }
             
        var iX = _aLevel[1].getX();
        var iY = _aLevel[1].getY();
        var oPath = new createjs.Shape();
        var oPathCommand = oPath.graphics
                                .setStrokeDash([20,10], 0)
                                .setStrokeStyle(5)
                                .beginStroke("#fff").moveTo(iX, iY);
        
        for(var i = 2; i < _aLevel.length; i++){
            iX = _aLevel[i].getX();
            iY = _aLevel[i].getY();
            oPathCommand = oPathCommand.lineTo(iX, iY);
        }
        oPathCommand.endStroke();
        _oContainerLevelsTrack.addChild(oPath);
        _oContainerLevelsTrack.cache(0, 0, _oMapDimension.width, _oMapDimension.height);
    };
    
    this._centerMapToLevel = function(iLevelIndex){
        if(iLevelIndex === 1){
            this._setMapPosition(CANVAS_WIDTH/2 - _aLevel[1].getX(), CANVAS_HEIGHT/2 -_aLevel[1].getY());
        } else{
            this._setMapPosition(CANVAS_WIDTH/2 - _aLevel[iLevelIndex-1].getX(), CANVAS_HEIGHT/2 -_aLevel[iLevelIndex-1].getY());
            this._autoShiftMap(iLevelIndex);
        }  
    };
    
    this._activeMapPiece = function(){
        for(var i = 0; i < NUM_MAP_TILES; i++){ 

            _aPieceRect[i].x = _aMapPiece[i].x + _oMapContainer.x;
            _aPieceRect[i].y = _aMapPiece[i].y + _oMapContainer.y;
            
            var rIntersect = calculateIntersection(_rMainRect, _aPieceRect[i]);
            if(rIntersect === null){
                _aMapPiece[i].visible = false;
            } else {
                _aMapPiece[i].visible = true;
            }
        }
    };
    
    this._mapMoveStartPoint = function(event){
        createjs.Tween.removeTweens(_oMapContainer);
        
        _pMapMoveStartPoint = {x:event.stageX, y:event.stageY};

    };
    
    this._mapMove = function(event){
       
       _bStartUpdate = true;
       _iTimeElapse = 0;
       
        var vStartVect = new CVector2(_pMapMoveStartPoint.x, _pMapMoveStartPoint.y);
        var vEndVect = new CVector2(event.stageX, event.stageY);
        
        vEndVect.subV(vStartVect);
        
        _iVectLength = vEndVect.length();
        _iVectAngleX = Math.acos(vEndVect.getX() / _iVectLength);
        _iVectAngleY = Math.asin(vEndVect.getY() / _iVectLength);
        
        _pNewMapPoint = {x:event.stageX - _pMapMoveStartPoint.x, y:event.stageY - _pMapMoveStartPoint.y};
        _pMapMoveStartPoint = {x:event.stageX,y:event.stageY};
        
        _oParent._setMapPosition(_pNewMapPoint.x, _pNewMapPoint.y);
    };
    
    this._mapMoveStop = function(){
        if(!_bStartUpdate){
            return;
        }
        
        _bMapCorrectionActive = true;
        
        var pProjection = {x: _oMapContainer.x + _iVectLength*MAP_SENSITIVITY*Math.cos(_iVectAngleX), y: _oMapContainer.y + _iVectLength*MAP_SENSITIVITY*Math.sin(_iVectAngleY)};
        
        if(isNaN(pProjection.x) || isNaN(pProjection.y)){
            _iVectLength = 0;
            _bMapCorrectionActive = false;
            return;
        }
        
        s_oMapStoryMode._checkLimitMapCoordinates(pProjection);
        
        createjs.Tween.get(_oMapContainer, {override:  true})
                      .to({x:pProjection.x, y:pProjection.y}, 500, createjs.Ease.cubicOut)
                      .call(function(){ _bMapCorrectionActive = false; _iVectLength = 0; _oParent._activeMapPiece();});
        
    };
    
    this._checkLimitMapCoordinates = function(pProjection){
        if(pProjection.y > 0){
            pProjection.y = 0;
        } else if(pProjection.y < CANVAS_HEIGHT - _oMapDimension.height){
            pProjection.y = CANVAS_HEIGHT - _oMapDimension.height;
        }
        
        if(pProjection.x > 0){
            pProjection.x = 0;
        } else if(pProjection.x < CANVAS_WIDTH - _oMapDimension.width){
            pProjection.x = CANVAS_WIDTH - _oMapDimension.width;
        }
    };
    
    this._autoShiftMap = function(iIndex){
        _bMapCorrectionActive = true;
        
        var oProjections ={
                            x:CANVAS_WIDTH/2 - _aLevel[iIndex].getX(),
                            y:CANVAS_HEIGHT/2 -_aLevel[iIndex].getY()
                           };
        
        this._checkLimitMapCoordinates(oProjections);
        
        createjs.Tween.get(_oMapContainer)
                       .to(oProjections,
                            1000, 
                           createjs.Ease.cubicOut).call(function(){
                                _bMapCorrectionActive = false;
                            });
    };
    
    this._setMapPosition = function(iXPos, iYPos){
        
        _oMapContainer.x += iXPos;
        _oMapContainer.y += iYPos;
        
        if(_oMapContainer.y > 0){
            _oMapContainer.y = 0;
        } else if(_oMapContainer.y < CANVAS_HEIGHT - _oMapDimension.height){
            _oMapContainer.y = CANVAS_HEIGHT - _oMapDimension.height;
        }
        
        if(_oMapContainer.x > 0){
            _oMapContainer.x = 0;
        } else if(_oMapContainer.x < CANVAS_WIDTH - _oMapDimension.width){
            _oMapContainer.x = CANVAS_WIDTH - _oMapDimension.width;
        }    
        
        this._activeMapPiece();
        
    };
    
    this._animCloud = function(oCloud){
        var oSprite = {width: oCloud.image.width, height: oCloud.image.height};
        var iRandomStartY = Math.random()*_oMapDimension.height;
        var iRandomEndY = iRandomStartY;
        oCloud.y = iRandomStartY;
        
        var iRandTimeAnim = randomIntBetween(15000, 40000);
        var iRandWaitAnim = randomIntBetween(0, 5000);
        
        var iRandomDir = Math.random();
        if(iRandomDir<0.5){
            oCloud.x = -oSprite.width;
            oCloud.scaleX = -1;
            _bPlaneScaled = true;
            createjs.Tween.get(oCloud).wait(iRandWaitAnim)
                          .to({x:_oMapDimension.width + oSprite.width, y:iRandomEndY}, iRandTimeAnim)
                          .call(function(e){
                                                _oParent._animCloud(e.target);
                                            });
        }else {
            if(_bPlaneScaled){
                oCloud.scaleX *= -1;
                _bPlaneScaled = false;
            }
            oCloud.x = _oMapDimension.width;
            createjs.Tween.get(oCloud).wait(iRandWaitAnim)
                           .to({x:-oSprite.width, y:iRandomEndY}, iRandTimeAnim)
                           .call(function(e){
                                                _oParent._animCloud(e.target);
                                            });
        }
    }; 
    
    this.refreshButtonPos = function(iNewX,iNewY){
        _oButExit.setPosition(_pStartPosExit.x - iNewX,iNewY + _pStartPosExit.y);
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.setPosition(_pStartPosAudio.x - iNewX,iNewY + _pStartPosAudio.y);
        }
        if (_fRequestFullScreen && screenfull.isEnabled){
                _oButFullscreen.setPosition(_pStartPosFullscreen.x + iNewX, _pStartPosFullscreen.y + iNewY);
        }
        
        _oTitle.setPosition(_pStartPosTitle.x, _pStartPosTitle.y + iNewY);
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
    
    this._onButPlayRelease = function(){
        this.unload();
        
        if( (DISABLE_SOUND_MOBILE === false || s_bMobile === false) && s_bAudioActive === true){
            createjs.Sound.play("click");
        }
        
        s_oMain.gotoGameStoryMode();
    };

    this._onExit = function(){
        this.unload();
        s_oMain.gotoMenu();
        
        $(s_oMain).trigger("end_session");
    };

    this._startLevel = function(iIndex){
        this.unload();
        s_oMain.gotoGameStoryMode(iIndex);
    };
    
    this.update = function(){
        if(_bStartUpdate){
            _iTimeElapse += s_iTimeElaps;
            if(_iTimeElapse>50){
                _bStartUpdate = false;
            }
        }
        
        if(_bMapCorrectionActive){
            this._activeMapPiece();
        }
        
    };

    s_oMapStoryMode = this;
    _oParent=this;
    this._init();
}

var s_oMapStoryMode = null;