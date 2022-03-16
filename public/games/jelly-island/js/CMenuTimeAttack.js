function CMenuTimeAttack(oParentContainer){
    var _oButPlay;
    
    var _oParentContainer;
    var _oContainer;

    var _oParent;    
    
    var _iBestScore;
    var _oContainerText;       
    
    this._init = function(oParentContainer){
        //stopSound("soundtrack");
        
        _oParentContainer = oParentContainer;
        _oContainer = new createjs.Container();
        _oParentContainer.addChild(_oContainer);

        var oSprite = s_oSpriteLibrary.getSprite('but_play');
        _iBestScore = s_aLevelScore[1];        

        _oButPlay = new CGfxButton(CANVAS_WIDTH/2, 1300, oSprite, s_oStage);
        _oButPlay.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
        
        _oButPlay.getButtonImage().scaleX = 0;
        _oButPlay.getButtonImage().scaleY = 0;
        
        _oContainerText = new createjs.Container();
        _oContainer.addChild(_oContainerText);
        
        
        var iWidth = 500;
        var iHeight = 100;
        
        var oTextOutline = new CTLText(_oContainerText, 
                            -iWidth/2, -iHeight/2, iWidth, iHeight, 
                            50, "center", "#000", PRIMARY_FONT, 1.1,
                            0, 0,
                            TEXT_TIME_ATTACK,
                            true, true, false,
                            false );
                    
        oTextOutline.setOutline(4);
        
        new CTLText(_oContainerText, 
                    -iWidth/2, -iHeight/2, iWidth, iHeight, 
                    50, "center", '#fff', PRIMARY_FONT, 1.1,
                    0, 0,
                    TEXT_TIME_ATTACK,
                    true, true, false,
                    false );
       
        if(s_iBestScore ){
            this._createTextBestScore();
        }
        
        _oContainerText.x = CANVAS_WIDTH/2;
        _oContainerText.y = 1000;
        
        _oContainerText.scaleX = _oContainerText.scaleY = 0;
    };
    
    this._createTextBestScore = function(){
        var szBestScore = sprintf(TEXT_BEST_SCORE, s_iBestScore);
        
        var iX = 0;
        var iY = 50;
        var iWidth = 500;
        var iHeight = 100;
        
        var oTextOutline = new CTLText(_oContainerText, 
                            iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                            50, "center", STROKE_COLOR_STAGE[1], PRIMARY_FONT, 1.1,
                            0, 0,
                            szBestScore,
                            true, true, false,
                            false );
                    
        oTextOutline.setOutline(4);
        
        new CTLText(_oContainerText, 
                    iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                    50, "center", '#fff', PRIMARY_FONT, 1.1,
                    0, 0,
                    szBestScore,
                    true, true, false,
                    false );
    };
    
    this.show = function(){
        createjs.Tween.get(_oContainerText).to({scaleX : 1, scaleY: 1}, 800, createjs.Ease.bounceOut);
        
        var oButtonPlay = _oButPlay.getButtonImage();
        createjs.Tween.get(oButtonPlay).to({scaleX : 1, scaleY: 1}, 800, createjs.Ease.bounceOut)
                      .call(function(){
                            _oButPlay.pulseAnimation();
                      });
    };
    
    this.hide = function(oCbCompleted = null, oCbScope){
        var oButtonPlay = _oButPlay.getButtonImage();
        var oBounds = oButtonPlay.getBounds();
        
        createjs.Tween.get(oButtonPlay).to({x: -oBounds.width/2}, 800, createjs.Ease.cubicOut);
        
        var oTextBounds = _oContainerText.getBounds();
        createjs.Tween.get(_oContainerText)
                      .to({x: CANVAS_WIDTH + oTextBounds.width/2}, 800, createjs.Ease.cubicOut)
                      .call(function(){
                          if(oCbCompleted){
                              oCbCompleted.call(oCbScope);
                          }
                      }); 
    };
    
    this.unload = function(){
        _oButPlay.unload(); 
        _oButPlay = null;
        
        _oParentContainer.removeChild(_oContainer);
        
        s_oMenuTimeAttack = null;
    };
   
    this.refreshButtonPos = function(iNewX,iNewY){

    };
    
    this.startTimeAttack = function(){
        s_oMenu.unload();
        s_oMain.gotoGameTimeAttack();
        
        $(s_oMain).trigger("start_session");
    };
    
    this._onButPlayRelease = function(){
        this.startTimeAttack();
    };
    
    s_oMenuTimeAttack = this;
    
    _oParent = this;
    this._init(oParentContainer);
}