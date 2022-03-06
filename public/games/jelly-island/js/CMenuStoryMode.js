function CMenuStoryMode(oParentContainer){
    var _oButPlay;
    
    var _oParentContainer;
    var _oContainer;

    var _oParent;    
    var _oButContinue;
    var _oText;
    var _oTextOutline;
    
    var _iFirstScore;
    var _oContainerText;       
    
    this._init = function(oParentContainer){
        //stopSound("soundtrack");
        
        _oParentContainer = oParentContainer;
        _oContainer = new createjs.Container();
        _oParentContainer.addChild(_oContainer);

        var oSprite = s_oSpriteLibrary.getSprite('but_play');
        _iFirstScore = s_aLevelScore[1];        
        
        _oButContinue = null;
        
        _oButPlay = new CGfxButton(CANVAS_WIDTH/2 - 300, 1300, oSprite, s_oStage);
        _oButPlay.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);

        var oSprite = s_oSpriteLibrary.getSprite('but_continue');
        _oButContinue = new CGfxButton(CANVAS_WIDTH/2 + 300, 1300, oSprite, s_oStage);
        _oButContinue.addEventListener(ON_MOUSE_UP, this._onButContinueRelease, this);   

        _oButContinue.getButtonImage().scaleX = 0;
        _oButContinue.getButtonImage().scaleY = 0;
        
        
        _oButPlay.getButtonImage().scaleX = 0;
        _oButPlay.getButtonImage().scaleY = 0;
        
        _oContainerText = new createjs.Container();
        _oContainer.addChild(_oContainerText);
        
        var iWidth = 500;
        var iHeight = 100;
        
        _oTextOutline = new CTLText(_oContainerText, 
                            -iWidth/2, -iHeight/2, iWidth, iHeight, 
                            90, "center", STROKE_COLOR_STAGE[1], PRIMARY_FONT, 1.1,
                            0, 0,
                            sprintf(TEXT_STORY_MODE, " "),
                            true, true, false,
                            false );
                    
        _oTextOutline.setOutline(10);
        
        _oText = new CTLText(_oContainerText, 
                    -iWidth/2, -iHeight/2, iWidth, iHeight, 
                    90, "center", PRIMARY_FONT_COLOR, PRIMARY_FONT, 1.1,
                    0, 0,
                    sprintf(TEXT_STORY_MODE, " "),
                    true, true, false,
                    false );
        
        _oContainerText.x = CANVAS_WIDTH/2;
        _oContainerText.y = 1000;
        
        _oContainerText.scaleX = _oContainerText.scaleY = 0;
    };
    
    this.show = function(){
        createjs.Tween.get(_oContainerText).to({scaleX : 1, scaleY: 1}, 800, createjs.Ease.bounceOut);
        
        var oButtonPlay = _oButPlay.getButtonImage();
        createjs.Tween.get(oButtonPlay).to({scaleX : 1, scaleY: 1}, 800, createjs.Ease.bounceOut)
                      .call(function(){
                            if(!_oButContinue){
                                _oButPlay.pulseAnimation();
                            }
                      });
        
        if(_oButContinue){
            var oButtonContinue = _oButContinue.getButtonImage();
            createjs.Tween.get(oButtonContinue).to({scaleX : 1, scaleY: 1}, 800, createjs.Ease.bounceOut)
                    .call(function(){
                            _oButContinue.pulseAnimation();
                    });  
        }
    };
    
    this.hide = function(oCbCompleted = null, oCbScope){
        var oButtonPlay = _oButPlay.getButtonImage();
        var oBounds = oButtonPlay.getBounds();
        
        createjs.Tween.get(oButtonPlay).to({x: -oBounds.width/2}, 800, createjs.Ease.cubicOut);
        
        if(_oButContinue){
             var oButtonContinue = _oButContinue.getButtonImage();
            createjs.Tween.get(oButtonContinue).to({x: CANVAS_WIDTH + oBounds.width/2}, 800, createjs.Ease.cubicOut);
        }
        
        var oTextBounds = _oContainerText.getBounds();
        createjs.Tween.get(_oContainerText)
                      .to({y: CANVAS_HEIGHT + oTextBounds.height/2}, 800, createjs.Ease.cubicOut)
                      .call(function(){
                          if(oCbCompleted){
                              oCbCompleted.call(oCbScope);
                          }
                      });
    };
    
    this.unload = function(){
        if(_oButContinue){
            
            _oButContinue.unload(); 
            _oButContinue = null;
        }


        _oButPlay.unload(); 
        _oButPlay = null;
        
        _oParentContainer.removeChild(_oContainer);
        
        s_oMenuStoryMode = null;
    };
   
    this.refreshButtonPos = function(iNewX,iNewY){

    };
    
    this.refreshText = function(szText){
        _oText.refreshText(szText);
        _oTextOutline.refreshText(szText);
    };
    
    this._onButContinueRelease = function(){

        s_oMenu.unload();
        
        s_oMain.goToModeMenu();
        
        $(s_oMain).trigger("start_session");
    };
    
    this._onButPlayRelease = function(){
        new CWarningPanel();
    };

    s_oMenuStoryMode = this;
    
    _oParent = this;
    this._init(oParentContainer);
}