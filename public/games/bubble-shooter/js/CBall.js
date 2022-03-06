function CBall(iXPos,iYPos,iCodeColor,oSpriteSheet,oExplosion,oContainer){
    
    var _iXPos;
    var _iYPos;
    var _iColor;
    var _oSprite;
    var _oExplosion;
    
    this._init = function(iXPos,iYPos,iCodeColor,oSpriteSheet,oExplosion,oContainer){
        _iXPos = iXPos;
        _iYPos = iYPos;
        _iColor = iCodeColor;
        
        _oSprite = createSprite(oSpriteSheet,"ball_0",0,0,BALL_DIM,BALL_DIM);
        _oSprite.stop();
        _oSprite.x = iXPos;
        _oSprite.y = iYPos;
        oContainer.addChild(_oSprite);
        
        _oExplosion  = createSprite(oExplosion,"invisible");
        _oExplosion.stop();
        _oExplosion.x = iXPos;
        _oExplosion.y = iYPos;
        oContainer.addChild(_oExplosion);
    };
    
    this.setInfo = function(iColor){
        this.stopTremble();
        _oSprite.y = _iYPos;
		_oExplosion.y = _iYPos;
        this.setColor(iColor); 
    };
    
    this.setColor = function(iColor){
        _oSprite.gotoAndStop("ball_"+(iColor-1));
        _oSprite.alpha = 1;
    };
    
    this.increaseY = function(iValue){
        _oSprite.y += iValue;
	_oExplosion.y += iValue;
    };
    
    this.destroy = function(){
        this.stopTremble();
        createjs.Tween.get(_oSprite).to({alpha:0} , 300,createjs.Ease.cubicOut);
        _oExplosion.gotoAndPlay("explosion");
    };
    
    this.stopTremble = function(){
        createjs.Tween.removeTweens(_oSprite);
        _oSprite.x = _iXPos;
    };
    
    this.tremble = function(iXOffset,iTime){
        var oParent = this;
         createjs.Tween.get(_oSprite,{loop:-1}).to({x:_oSprite.x + iXOffset }, iTime).to({x:_oSprite.x - iXOffset }, iTime);
    };
    
    this.getY = function(){
        return _iYPos;
    };
    
    this._init(iXPos,iYPos,iCodeColor,oSpriteSheet,oExplosion,oContainer);
}