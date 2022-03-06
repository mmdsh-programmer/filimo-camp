function CIngredient(iX,iY,iIndex,oParentContainer){
    
    var _oSprite;
    var _oParentContainer = oParentContainer;
    
    this._init = function(iX,iY,iIndex){
        var oSprite = s_oSpriteLibrary.getSprite("ingredients_"+iIndex);
            var oData = {
                images: [oSprite],
                // width, height & registration point of each sprite
                frames: {width: oSprite.width / 2, height: oSprite.height, regX: (oSprite.width / 2) / 2, regY: oSprite.height / 2},
                animations: {state_off: 0, state_on: 1}
            };

            var oSpriteSheet = new createjs.SpriteSheet(oData);
            _oSprite = createSprite(oSpriteSheet,"state_on",(oSprite.width / 2) / 2,oSprite.height / 2,oSprite.width / 2,oSprite.height);
            _oSprite.x = iX;
            _oSprite.y = iY;
            _oParentContainer.addChild(_oSprite);
    };
    
    this.unload = function(){
        _oParentContainer.removeChild(_oSprite);
    };
    
    this.setState = function(bOn){
        _oSprite.gotoAndStop(bOn?"state_on":"state_off");
    };
    
    this.getSprite = function(){
        return _oSprite;
    };
    
    this._init(iX,iY,iIndex);
}