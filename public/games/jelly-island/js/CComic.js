function CComic(iX, iY, oParentContainer, szText){
    
    var _oBalloon;
    var _oText;
    
    this._init = function(iX, iY, oParentContainer, szText){
        
        var oSprite = s_oSpriteLibrary.getSprite('balloon_1');
        
        iX += (oSprite.width -  455)/2;       
        _oBalloon = createBitmap(oSprite);
        _oBalloon.regX = oSprite.width/2;
        _oBalloon.regY = oSprite.height/2;
        _oBalloon.x = iX;
        _oBalloon.y = iY;
        oParentContainer.addChild(_oBalloon);
        
      //  var iWidth = ;
        
        _oText = new CFormatText(iX-5, iY - 13, szText, "#000", oParentContainer, STROKE_COLOR, 50, "center", PRIMARY_FONT, oSprite.height - 40, oSprite.width-120);
        _oText.playText();
    };
    
    this.unload = function(){
      
        oParentContainer.removeChild(_oBalloon);
        
        _oText.unload();
        
    };
    
    this.flip = function(){
        _oBalloon.scaleX = _oBalloon.scaleY = -1;

        _oText.setPosition(iX + 45,iY + 5);
    };
    
    this._init(iX, iY, oParentContainer, szText);
}