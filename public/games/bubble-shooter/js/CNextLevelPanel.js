function CNextLevelPanel(iLevel,iScore){
    var _oListener;
    var _oContainer;
    
    this._init = function(iLevel,iScore){
        _oContainer = new createjs.Container();
        s_oStage.addChild(_oContainer);
        
        var oBg = createBitmap(s_oSpriteLibrary.getSprite('msg_box'));
        _oContainer.addChild(oBg);
        
        var oLevelTextBack = new CTLText(_oContainer, 
                    CANVAS_WIDTH/2-198, (CANVAS_HEIGHT/2)-98, 400, 50, 
                    50, "center", "#000", FONT_GAME, 1,
                    0, 0,
                    TEXT_LEVEL+" "+iLevel+" "+TEXT_COMPLETED,
                    true, true, false,
                    false );

        
        var oLevelText = new CTLText(_oContainer, 
                    CANVAS_WIDTH/2-200, (CANVAS_HEIGHT/2)-100, 400, 50, 
                    50, "center", "#fff", FONT_GAME, 1,
                    0, 0,
                    TEXT_LEVEL+" "+iLevel+" "+TEXT_COMPLETED,
                    true, true, false,
                    false );
                    
                    
        var oScoreTextBack = new CTLText(_oContainer, 
                    CANVAS_WIDTH/2-198, 760, 400, 50, 
                    50, "center", "#000", FONT_GAME, 1,
                    0, 0,
                    TEXT_SCORE+": "+iScore,
                    true, true, true,
                    false );



        
        var oScoreText = new CTLText(_oContainer, 
                    CANVAS_WIDTH/2-200, 758, 400, 50, 
                    50, "center", "#fff", FONT_GAME, 1,
                    0, 0,
                    TEXT_SCORE+": "+iScore,
                    true, true, true,
                    false );
        
        
        _oListener = _oContainer.on("mousedown",this._onExit);
        
        $(s_oMain).trigger("save_score",iScore);
        $(s_oMain).trigger("show_interlevel_ad");
    };
    
    this._onExit = function(){
        _oContainer.off("mousedown",_oListener);
        _oContainer.removeAllChildren();
        s_oGame.resetLevel();
    };
    
    this._init(iLevel,iScore);
}