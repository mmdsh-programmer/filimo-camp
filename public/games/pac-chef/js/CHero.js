function CHero(iX,iY,iRow,iCol,oParentContainer){
    var _iRow;
    var _iCol;
    var _iStartingRow;
    var _iStartingCol;
    var _iStartX;
    var _iStartY;
    var _iCurSprite;
    var _iIntervalId;
    var _iCounterAnim;
    var NUM_COUNT = 7;
    var _aSprites;
    
    var _oContainer;
    var _oParentContainer = oParentContainer;
    
    this._init = function(iX,iY,iRow,iCol){
        _iRow = _iStartingRow = iRow;
        _iCol = _iStartingCol = iCol;
        
        _iStartX = iX;
        _iStartY = iY;
        _aSprites = new Array();
        
        _oContainer = new createjs.Container();
        _oContainer.x = iX;
        _oContainer.y = iY;
        _oContainer.regX = HERO_WIDTH/2;
        _oContainer.regY = HERO_HEIGHT/2 + 15;
        _oParentContainer.addChild(_oContainer);
        
        
        //TOP DIRECTION
        var oData = {   
                        images: [s_oSpriteLibrary.getSprite("hero_top")], 
                        framerate:FPS_CHARACTERS,
                        // width, height & registration point of each sprite
                        frames: {width: HERO_WIDTH, height: HERO_HEIGHT}, 
                        animations: {start:0,idle:0,walk: [0, 3, "walk"], attack: [4, 7, "attack"], die: [8, 11, "stop_die"],stop_die:11}
                   };
                   
        var oSpriteSheet = new createjs.SpriteSheet(oData);
	var oSpriteTop = createSprite(oSpriteSheet, "start",0,0,HERO_WIDTH,HERO_HEIGHT);
        oSpriteTop.on("animationend",this._onAnimationEnd,this);
        oSpriteTop.visible = false;
        _oContainer.addChild(oSpriteTop);
        
        _aSprites[DIR_TOP] = oSpriteTop;
        
        
        //RIGHT DIRECTION
        var oData = {   
                        images: [s_oSpriteLibrary.getSprite("hero_right")], 
                        framerate:FPS_CHARACTERS,
                        // width, height & registration point of each sprite
                        frames: {width: HERO_WIDTH, height: HERO_HEIGHT}, 
                        animations: {start:0,idle:0,walk: [0, 3, "walk"], attack: [4, 7, "attack"], die: [8, 11, "stop_die"],stop_die:11}
                   };
                   
        var oSpriteSheet = new createjs.SpriteSheet(oData);
	var oSpriteRight = createSprite(oSpriteSheet, "start",0,0,HERO_WIDTH,HERO_HEIGHT);
        oSpriteRight.on("animationend",this._onAnimationEnd,this);
        oSpriteRight.visible = false;
        _oContainer.addChild(oSpriteRight);
        
        _aSprites[DIR_RIGHT] = oSpriteRight;
        
        
        //BOTTOM DIRECTION
        var oData = {   
                        images: [s_oSpriteLibrary.getSprite("hero_bottom")], 
                        framerate:FPS_CHARACTERS,
                        // width, height & registration point of each sprite
                        frames: {width: HERO_WIDTH, height: HERO_HEIGHT}, 
                        animations: {start:0,idle:0,walk: [0, 3, "walk"], attack: [4, 7, "attack"], die: [8, 11, "stop_die"],stop_die:11}
                   };
                   
        var oSpriteSheet = new createjs.SpriteSheet(oData);
	var oSpriteBottom = createSprite(oSpriteSheet, "start",0,0,HERO_WIDTH,HERO_HEIGHT);
        oSpriteBottom.on("animationend",this._onAnimationEnd,this);
        _oContainer.addChild(oSpriteBottom);
        
        _aSprites[DIR_BOTTOM] = oSpriteBottom;
        
        
        
        //LEFT DIRECTION
        var oData = {   
                        images: [s_oSpriteLibrary.getSprite("hero_left")], 
                        framerate:FPS_CHARACTERS,
                        // width, height & registration point of each sprite
                        frames: {width: HERO_WIDTH, height: HERO_HEIGHT}, 
                        animations: {start:0,idle:0,walk: [0, 3, "walk"], attack: [4, 7, "attack"], die: [8, 11, "stop_die"],stop_die:11}
                   };
                   
        var oSpriteSheet = new createjs.SpriteSheet(oData);
	var oSpriteLeft = createSprite(oSpriteSheet, "start",0,0,HERO_WIDTH,HERO_HEIGHT);
        oSpriteLeft.on("animationend",this._onAnimationEnd,this);
        oSpriteLeft.visible = false;
        _oContainer.addChild(oSpriteLeft);
        
        _aSprites[DIR_LEFT] = oSpriteLeft;
        
        _iCurSprite = DIR_BOTTOM;
    };

    this.reset = function(){
        _iRow = _iStartingRow;
        _iCol = _iStartingCol;
        _oContainer.x = _iStartX;
        _oContainer.y = _iStartY;
        
        _iCurSprite = DIR_BOTTOM;
        this.playAnim(_iCurSprite,ANIM_IDLE);
    };
    
    this.setStart = function(iX,iY,iRow,iCol){
        _iRow = _iStartingRow = iRow;
        _iCol = _iStartingCol = iCol;
        
        _iStartX = iX;
        _iStartY = iY;
    };
    
    this._hideAllAnims = function(){
        for(var i=0;i<_aSprites.length;i++){
            _aSprites[i].visible = false;
        }
    };
    
    this.playAnim = function(iDir,szAnim){
        this._hideAllAnims();
        
        _aSprites[iDir].visible = true;
        _aSprites[iDir].gotoAndPlay(szAnim);
        
        _iCurSprite = iDir;
    };
    
    this.pauseAnim = function(bPause){
        _aSprites[_iCurSprite].paused = bPause;
    };
    
    this.catchPowerUp = function(bPowerUp){
        var oParent = this;
        _iCounterAnim = 0;
        
        var iOffset = bPowerUp?1:-1;
        _iIntervalId = setInterval(function(){
                        oParent._playPowerUpAnim(_iCounterAnim%2===0?(_aSprites[_iCurSprite].currentFrame+(16*iOffset)):(_aSprites[_iCurSprite].currentFrame-(16*iOffset)));
                    },150);
    };
    
    this._playPowerUpAnim = function(iFrame){
        _aSprites[_iCurSprite].gotoAndStop(iFrame);
        _iCounterAnim++;
        if(_iCounterAnim === NUM_COUNT){
            clearInterval(_iIntervalId);
            s_oGame.resumeFromPowerUpAnim();
        }
        
    };
    
    this.clearIntervalAnim = function(){
        clearInterval(_iIntervalId);
    };
    
    this.setMask = function(oMask){
        _oContainer.mask = oMask;
    };
    
    this.increaseX = function(iIncrease){
        _oContainer.x += iIncrease;
    };
    
    this.setRow = function (iValue) {
        _iRow = iValue;
    };

    this.setCol = function (iValue) {
        _iCol = iValue;
    };
    
    this._onAnimationEnd = function(evt){
        if(evt.currentTarget.currentAnimation === ANIM_DIE){
            setTimeout(function(){s_oGame.loseLife();},1500);
        }
    };
    
    this.getRow = function () {
        return _iRow;
    };

    this.getCol = function () {
        return _iCol;
    };
    
    this.setX = function(iX){
        _oContainer.x = iX;
    };
    
    this.setPos = function(iX,iY){
        _oContainer.x = iX;
        _oContainer.y = iY;
    };
    
    this.getCurSpriteIndex = function(){
        return _iCurSprite;
    };
    
    this.getX = function(){
        return _oContainer.x;
    };
    
    this.getY = function(){
        return _oContainer.y;
    };
    
    this.getPos = function(){
        return {x:_oContainer.x,y:_oContainer.y};
    };
    
    this.update = function(iDir, szAction){
        if (szAction === "right" || szAction === "left"){
            _oContainer.x += PLAYER_SPEED * iDir;
        }else{
            _oContainer.y += PLAYER_SPEED * iDir;
        }
    };
    
    this._init(iX,iY,iRow,iCol);
}