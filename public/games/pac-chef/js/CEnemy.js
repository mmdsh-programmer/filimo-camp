function CEnemy(iIndex,iX,iY,iRow,iCol,oParentContainer){
    var _bUpdate;
    var _iCurState;
    var _bZombie;
    var _iIndex;
    var _iRow;
    var _iCol;
    var _iStartX;
    var _iStartY;
    var _iStartingRow;
    var _iStartingCol;
    var _iCurSprite;
    var _iCurSpeed;
    var _iCurPathIndex;
    var _pStartingPoint;
    var _pEndPoint;
    var _iTimeElaps = 0;
    var _aSprites;
    var _aCurPosPath;
    var _aCurPath;
    
    var _oContainer;
    var _oParentContainer = oParentContainer;
    
    this._init = function(iIndex,iX,iY,iRow,iCol){
        _bUpdate = false;
        _bZombie = false;
        _iIndex = iIndex;
        _iRow = _iStartingRow = iRow;
        _iCol = _iStartingCol = iCol;
        _iStartX = iX;
        _iStartY = iY;
        _aSprites = new Array();
        
        _oContainer = new createjs.Container();
        _oContainer.x = iX;
        _oContainer.y = iY;
        _oContainer.regX = ENEMY_WIDTH/2;
        _oContainer.regY = ENEMY_HEIGHT/2 + 15;
        _oParentContainer.addChild(_oContainer);
        
        
        //TOP DIRECTION
        var oData = {   
                        images: [s_oSpriteLibrary.getSprite("enemy_top_"+_iIndex)], 
                        framerate:FPS_CHARACTERS,
                        // width, height & registration point of each sprite
                        frames: {width: ENEMY_WIDTH, height: ENEMY_HEIGHT}, 
                        animations: {start:0,walk_0: [0, 3, "walk_0"],walk_1:[1,3,"walk_0"], walk_2:[2,3,"walk_0"], 
                                        escape: [4, 7, "escape"], die: [8, 11, "stop_die"],stop_die:11,ghost:4}
                   };
                   
        var oSpriteSheet = new createjs.SpriteSheet(oData);
	var oSpriteTop = createSprite(oSpriteSheet, "start",0,0,ENEMY_WIDTH,ENEMY_HEIGHT);
        oSpriteTop.visible = false;
        _oContainer.addChild(oSpriteTop);
        
        _aSprites[DIR_TOP] = oSpriteTop;
        
        
        //RIGHT DIRECTION
        var oData = {   
                        images: [s_oSpriteLibrary.getSprite("enemy_right_"+_iIndex)], 
                        framerate:FPS_CHARACTERS,
                        // width, height & registration point of each sprite
                        frames: {width: ENEMY_WIDTH, height: ENEMY_HEIGHT}, 
                        animations: {start:0,walk_0: [0, 3, "walk_0"],walk_1:[1,3,"walk_0"], walk_2:[2,3,"walk_0"], 
                                        escape: [4, 7, "escape"], die: [8, 11, "stop_die"],stop_die:11,ghost:4}
                   };
                   
        var oSpriteSheet = new createjs.SpriteSheet(oData);
	var oSpriteRight = createSprite(oSpriteSheet, "start",0,0,ENEMY_WIDTH,ENEMY_HEIGHT);
        oSpriteRight.visible = false;
        _oContainer.addChild(oSpriteRight);
        
        _aSprites[DIR_RIGHT] = oSpriteRight;
        
        
        //BOTTOM DIRECTION
        var oData = {   
                        images: [s_oSpriteLibrary.getSprite("enemy_bottom_"+_iIndex)], 
                        framerate:FPS_CHARACTERS,
                        // width, height & registration point of each sprite
                        frames: {width: ENEMY_WIDTH, height: ENEMY_HEIGHT}, 
                        animations: {start:0,walk_0: [0, 3, "walk_0"],walk_1:[1,3,"walk_0"], walk_2:[2,3,"walk_0"], 
                                        escape: [4, 7, "escape"], die: [8, 11, "stop_die"],stop_die:11,ghost:4}
                   };
                   
        var oSpriteSheet = new createjs.SpriteSheet(oData);
	var oSpriteBottom = createSprite(oSpriteSheet, "walk_1",0,0,ENEMY_WIDTH,ENEMY_HEIGHT);
        _oContainer.addChild(oSpriteBottom);
        
        _aSprites[DIR_BOTTOM] = oSpriteBottom;
        
        
        
        //LEFT DIRECTION
        var oData = {   
                        images: [s_oSpriteLibrary.getSprite("enemy_left_"+_iIndex)], 
                        framerate:FPS_CHARACTERS,
                        // width, height & registration point of each sprite
                        frames: {width: ENEMY_WIDTH, height: ENEMY_HEIGHT}, 
                        animations: {start:0,walk_0: [0, 3, "walk_0"],walk_1:[1,3,"walk_0"], walk_2:[2,3,"walk_0"],  
                                        escape: [4, 7, "escape"], die: [8, 11, "stop_die"],stop_die:11,ghost:4}
                   };
                   
        var oSpriteSheet = new createjs.SpriteSheet(oData);
	var oSpriteLeft = createSprite(oSpriteSheet, "start",0,0,ENEMY_WIDTH,ENEMY_HEIGHT);
        oSpriteLeft.visible = false;
        _oContainer.addChild(oSpriteLeft);
        
        _aSprites[DIR_LEFT] = oSpriteLeft;
        
        _iCurSpeed = ENEMY_SPEED;
        _iCurSprite = DIR_BOTTOM;
    };
    
    this.unload = function(){
        _oParentContainer.removeChild(_oContainer);
    };
    
    this.reset = function(){
        _bUpdate = false;
        _bZombie = false;

        _iRow = _iStartingRow;
        _iCol = _iStartingCol;
        _oContainer.x = _iStartX;
        _oContainer.y = _iStartY;
        _oContainer.alpha = 1;
        
        _iCurSprite = DIR_BOTTOM;
        this.playAnim(_iCurSprite,ANIM_WALK);
    };
    
    this._hideAllAnims = function(){
        for(var i=0;i<_aSprites.length;i++){
            _aSprites[i].visible = false;
        }
    };
    
    this.playAnim = function(iDir,szAnim){
        if(_iCurSprite === iDir && _aSprites[iDir].currentAnimation === szAnim){
            return;
        }
        
        this._hideAllAnims();
        
        if(szAnim === ANIM_WALK){
            var iRandWalk = Math.floor(Math.random()*3);
            _aSprites[iDir].gotoAndPlay("walk_"+iRandWalk);
        }else{
            _aSprites[iDir].gotoAndPlay(szAnim);
        }
        _aSprites[iDir].visible = true;
        
        
        _iCurSprite = iDir;
        
        if(szAnim === ANIM_ESCAPE){
            _iCurSpeed = ENEMY_SPEED_SLOW;
        }else{
            _iCurSpeed = ENEMY_SPEED;
        }
    };
    
    this.setMask = function(oMask){
        _oContainer.mask = oMask;
    };
    
    this.increaseX = function(iIncrease){
        _oContainer.x += iIncrease;
    };
    
    this.setPath = function(aPath,aConvertedPath,iEnemyState){
        _iCurState = iEnemyState;
        _aCurPosPath = aConvertedPath;
        _aCurPath = aPath;
        
        _iCurPathIndex = 0;
        
        this._setNextPoint();
        _bUpdate = true;
    };

    this.setUpdate = function(bUpdate){
        _bUpdate = bUpdate;
    };
    
    this._setNextPoint = function(){
        _iRow = _aCurPath[_iCurPathIndex][0];
        _iCol = _aCurPath[_iCurPathIndex][1];
        
        if(_iCurState !== STATE_ENEMY_FOLLOW && !_bZombie && s_oGame.checkDistFromPlayer(this)){
            return;
        }else if((_iCurPathIndex+1) >= _aCurPosPath.length){
            _bZombie = false;
            _bUpdate = false;

            _oContainer.alpha = 1;
            s_oGame.getNewEnemyPath(this,_iCurState);
        }else{
            _iTimeElaps = 0;
            
            _pStartingPoint = new CVector2(_aCurPosPath[_iCurPathIndex].x,_aCurPosPath[_iCurPathIndex].y);
            _pEndPoint = new CVector2(_aCurPosPath[_iCurPathIndex+1].x,_aCurPosPath[_iCurPathIndex+1].y);
            
            this._changeDir();
        }
    };
    
    this.pauseAnim = function(bPause){
         _aSprites[_iCurSprite].paused = bPause;
    };
    
    this._changeDir = function(){
        var iDiffRow = _aCurPath[_iCurPathIndex+1][0] - _aCurPath[_iCurPathIndex][0];
        var iDiffCol = _aCurPath[_iCurPathIndex+1][1] - _aCurPath[_iCurPathIndex][1];

        if(_bZombie === false){
            var szLabel = ANIM_WALK;
            if(s_oGame.isPowerUpActive()){
                    szLabel = ANIM_ESCAPE;
            }
            if(iDiffRow < 0){
                this.playAnim(DIR_TOP,szLabel);
            }else if(iDiffRow>0){
                this.playAnim(DIR_BOTTOM,szLabel);
            }else if(iDiffCol<0){
                this.playAnim(DIR_LEFT,szLabel);
            }else if(iDiffCol>0){
                this.playAnim(DIR_RIGHT,szLabel);
            }
        }
        
    };
    
    this.death = function(){
        _bUpdate = false;
        _bZombie = true;
        _aSprites[_iCurSprite].gotoAndPlay(ANIM_DIE);
        
        playSound("enemy_"+_iIndex+"_death",1,false);
        
        var oParent = this;
        createjs.Tween.get(_oContainer).wait(2000).to({alpha:0}, 1000).call(function(){
                                                                            oParent._playDeathAnim();
                                                                    });
    };
    
    this._playDeathAnim = function(){
        
        this._hideAllAnims();
        
        _iCurSprite = DIR_BOTTOM;
        _aSprites[_iCurSprite].visible = true;
        _oContainer.alpha = 0.5;
        _aSprites[_iCurSprite].gotoAndStop("ghost");

        
        s_oGame.getEnemyPathToStartPos(this);
    };
    
    this.setX = function(iX){
        _oContainer.x = iX;
    };
    
    this.getRow = function () {
        return _iRow;
    };

    this.getCol = function () {
        return _iCol;
    };
    
    this.getX = function(){
        return _oContainer.x;
    };
    
    this.getStartingRow = function(){
        return _iStartingRow;
    };
    
    this.getStartingCol = function(){
        return _iStartingCol;
    };
    
    this.getY = function(){
        return _oContainer.y;
    };
    
    this.getPos = function(){
        return {x:_oContainer.x,y:_oContainer.y};
    };
    
    this.getCurSpriteIndex = function(){
        return _iCurSprite;
    };
    
    this._moveEnemy = function () {
        // LINEAR MOVEMENT
        _iTimeElaps +=  s_iTimeElaps;
        if(_iTimeElaps > _iCurSpeed){
            _iCurPathIndex++;
            this._setNextPoint();
        }else{
            var fLerp = easeLinear(_iTimeElaps, 0, 1, _iCurSpeed);
            var oPoint = tweenVectors(_pStartingPoint, _pEndPoint, fLerp);
            _oContainer.x = oPoint.getX();
            _oContainer.y = oPoint.getY();
        }
    };
    
    this.getState = function(){
        return _iCurState;
    };
    
    this.isDeath = function(){
        return _bZombie;
    };
    
    this.update = function(){
        if(_bUpdate){
            this._moveEnemy();
            
            if(_bZombie){
                return false;
            }else{
                return true;
            }
            
        }
        
        return false;
    };
    
    this._init(iIndex,iX,iY,iRow,iCol);
}