function CCreditsPanel(){
    
    var _oContainer;
    var _oBg;
    var _oButLogo;
    var _oButExit;
    var _oMsgText;
    
    var _oLink;
    
    var _pStartPosExit;
    
    this._init = function(){
        _oContainer = new createjs.Container();
        s_oStage.addChild(_oContainer);
        
        _oBg = createBitmap(s_oSpriteLibrary.getSprite('msg_box'));
        s_oStage.addChild(_oBg);
        _oBg.on("click", function(){});
       
        var oSprite = s_oSpriteLibrary.getSprite('but_exit');
        _pStartPosExit = {x: CANVAS_WIDTH - (oSprite.height/2)- 190, y: 640};
        _oButExit = new CGfxButton(_pStartPosExit.x, _pStartPosExit.y, oSprite, s_oStage);
        _oButExit.addEventListener(ON_MOUSE_UP, this.unload, this);
       
        var iYOffset = 60;
       
        _oMsgText = new CFormatText(CANVAS_WIDTH/2, CANVAS_HEIGHT/2 - 190 + iYOffset, "Developed by", PRIMARY_FONT_COLOR, s_oStage, STROKE_COLOR, 80, "center");
       
        var oSprite = s_oSpriteLibrary.getSprite('logo_ctl');
        _oButLogo = new CGfxButton(CANVAS_WIDTH/2, CANVAS_HEIGHT/2 - 75 + iYOffset, oSprite, s_oStage);
        _oButLogo.addEventListener(ON_MOUSE_UP, this._onLogoButRelease, this);
       
        _oLink = new CFormatText(CANVAS_WIDTH/2, CANVAS_HEIGHT/2+20 + iYOffset, "www.codethislab.com", PRIMARY_FONT_COLOR, s_oStage, STROKE_COLOR, 70, "center");
    };
    
    this.unload = function(){
        _oBg.removeAllEventListeners();
        
        _oButExit.unload(); 
        _oButExit = null;
        
        _oButLogo.unload();
        
        _oMsgText.unload();

        _oLink.unload();

        s_oStage.removeChild(_oBg);
    };
    
    this._onLogoButRelease = function(){
        window.open("http://www.codethislab.com/index.php?&l=en");
    };
    
    this._init();
    
    
};


