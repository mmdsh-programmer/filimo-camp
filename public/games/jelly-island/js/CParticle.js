function CParticle(iX, iY, iType, oParentContainer){
    
    var _bSliced;
    var _bGone;
    
    var _iSpeed;
    var _iRunFactor;
    var _iRunTime = 0;
    var _iShiftLeftX;
    var _iShiftRightX;
    var _iShiftx;
    var _iRotFactorSlice1;
    var _iRotFactorSlice2;
    var _iRotFactor;
    
    var _oParticle = null;
    var _oParent;
    
    this._init= function(iX, iY, iType, oParentContainer){
        
        _bSliced = false;
        _bGone = false;
        
        _iSpeed = 9;
        _iRunFactor = _iSpeed/9;
        
        if(iX > (CANVAS_WIDTH/2) ){
            _iShiftx = randomFloatBetween(-25,-10,2);
        }else{
            _iShiftx = randomFloatBetween(10,25,2);
        }
        
        _iRotFactor = randomFloatBetween(-MAX_SYMBOL_ROT_SPEED,MAX_SYMBOL_ROT_SPEED,2);

        if(iType === TYPE_BLOCK){

            var oSprite = s_oSpriteLibrary.getSprite('explosion_'+iType);
            var oData = {   
                            framerate: 20,
                            images: [oSprite], 
                            // width, height & registration point of each sprite
                            frames: {width: 408, height: 474, regX: 204, regY: 150}, 
                            animations: {idle: [0,9,"stop"], stop:[10]}
                       };

            var oSpriteSheet = new createjs.SpriteSheet(oData);
            _oParticle = createSprite(oSpriteSheet, "idle",204,237,408,474);
            _oParticle.on("animationend", this._onParticleEnd);
            _oParticle.gotoAndPlay("idle");

            _oParticle.x = iX + PARTICLE_OFFSET[iType].x;
            _oParticle.y = iY + PARTICLE_OFFSET[iType].y;
          
            oParentContainer.addChild(_oParticle);
            
        } else {
            
            if(iType === TYPE_STAR){
                _bGone = true;
                return;
            }
            
            var oSprite = s_oSpriteLibrary.getSprite("explosion_" + iType);
            var oData = {   
                            images: [oSprite], 
                            // width, height & registration point of each sprite
                            frames: EXPLOSION_ANIMATION_SET[iType].frames, 
                            animations: EXPLOSION_ANIMATION_SET[iType].animations,
                            framerate: EXPLOSION_ANIMATION_SET[iType].framerate
                       };

            var oSpriteSheet = new createjs.SpriteSheet(oData);
            _oParticle = createSprite(
                                        oSpriteSheet,
                                        "idle",
                                        EXPLOSION_ANIMATION_SET[iType].frames.width/2,
                                        EXPLOSION_ANIMATION_SET[iType].frames.height/2,
                                        EXPLOSION_ANIMATION_SET[iType].frames.width,
                                        EXPLOSION_ANIMATION_SET[iType].frames.height
                                    );            
            _oParticle.x = iX;
            _oParticle.y = iY;
            
            switch(iType){
                case TYPE_BOMB:
                case TYPE_CLOCK:
                    _oParticle.on("animationend", this._onParticleEnd);
                    oParentContainer.addChild(_oParticle);
                    break;
                default:
                     _oParticle.gotoAndStop("idle");
                     var iDelay = Math.random()*400;
                    createjs.Tween.get(_oParticle).wait(iDelay)
                                .to({scaleX: 0, scaleY: 0}, 400, createjs.Ease.backIn)
                                .call(this._onAnimationEnd, null, this);
                  
                    createjs.Tween.get(_oParticle).wait(iDelay).to({alpha: 0}, 400, createjs.Ease.cubicIn);
                    oParentContainer.addChildAt(_oParticle, 0);
                    break;
            }
           
        }
    };
    
    this.unload = function(){
        
        if(_oParticle !== null){            
            _oParticle.visible = false;
            _oParticle.off("animationend", this._onParticleEnd);
            s_oStage.removeChild(_oParticle);
        } 
        _bGone = true;
    };
    
    this.sliceVertical = function(){
        _bSliced = true;
       
        _iRunTimeSlice1 = _iRunTime - (_iRunFactor*2);
        _iRunTimeSlice2 = _iRunTime - (_iRunFactor*2);
        _iShiftLeftX = _iShiftx;
        _iShiftRightX = -_iShiftx;
        _iRotFactorSlice1 = _iRotFactor * 1.5;
        _iRotFactorSlice2 = -_iRotFactor * 1.5;
       
    };
    
    this.update = function(){

    };
    
    this.isGone = function(){
        return _bGone;
    };
    
    this._onAnimationEnd = function(){
        _oParent.unload();
    };
    
    this._onParticleEnd = function(){
        if(_oParticle.currentAnimation === "idle"){
            _oParent.unload();
        }
    };
    
    _oParent = this;
    this._init(iX, iY, iType, oParentContainer);
    
};