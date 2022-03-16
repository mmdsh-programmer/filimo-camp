function CPausePanel(){
    
    var _oBg;
    var _oPauseText;
    var _oButContinue;

    var _oParent;
    
    var _oListenerMouseDown;
    this._init = function(){
        
        var oSprite = s_oSpriteLibrary.getSprite('msg_box');
        _oBg = createBitmap(oSprite);
        _oListenerMouseDown =_oBg.on("mousedown", function(){});
        s_oStage.addChild(_oBg);
        
        _oPauseText = new CFormatText(CANVAS_WIDTH/2, CANVAS_HEIGHT/2 -250, TEXT_ISPAUSED, PRIMARY_FONT_COLOR, s_oStage, STROKE_COLOR, 90, "center");
        
        _oButContinue = new CGfxButton(CANVAS_WIDTH/2, CANVAS_HEIGHT/2 + 150, s_oSpriteLibrary.getSprite('but_continue'), s_oStage);
        _oButContinue.addEventListener(ON_MOUSE_UP, this._onButContinueRelease, this);
        _oButContinue.pulseAnimation();
    };
    
    this.unload = function(){
        _oPauseText.unload();
        _oPauseText = null;
        _oButContinue.unload();
        _oButContinue = null;
        
        _oBg.off("mousedown", _oListenerMouseDown);
        
        s_oStage.removeChild(_oBg);
    };
    
    this._onButContinueRelease = function(){
        _oParent.unload();
        s_oGame.resumeGame();
    };

    _oParent = this;
    this._init();

}