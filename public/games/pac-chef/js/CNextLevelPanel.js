function CNextLevelPanel(){
    var _iStartY;
    var _iEventToLaunch;
    var _aCbCompleted;
    var _aCbOwner;
    var _oListener;
    var _oBg;
    
    var _oRecipe;
    var _oFade;
    var _oLevelScoreText;
    var _oLevelClearedText;
    var _oTotScoreText;
    var _oButHome;
    var _oButRestart;
    var _oButContinue;
    var _oContainer;
    var _oContainerPanel;
    
    var _oThis = this;

    
    this._init = function(){
        _aCbCompleted=new Array();
        _aCbOwner =new Array();
        
        _oContainer = new createjs.Container();
        _oContainer.visible = false;
        s_oStage.addChild(_oContainer);
        
        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oFade.alpha = 0.5;
        _oListener = _oFade.on("click", function(){});
        _oContainer.addChild(_oFade);
        
       
        _oBg = createBitmap(s_oSpriteLibrary.getSprite("bg_game"));
        _oContainer.addChild(_oBg);
        
        _oContainerPanel = new createjs.Container();
        _oContainerPanel.x = CANVAS_WIDTH/2;
        _oContainer.addChild(_oContainerPanel);
        
        var oSpriteBg = s_oSpriteLibrary.getSprite("bg_level_selection");
        var oBg = createBitmap(oSpriteBg);
        _oContainerPanel.addChild(oBg);
        
        var iWidth = oSpriteBg.width-100;
        var iHeight = 140;
        var iX = -10 +  oSpriteBg.width/2;
        var iY = oSpriteBg.height/2-300;
        _oLevelClearedText = new CTLText(_oContainerPanel, 
                    iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                    70, "center", "#fff", FONT, 1,
                    2, 2,
                    " ",
                    true, true, true,
                    false );
        
        var oSpriteRecipe = s_oSpriteLibrary.getSprite("recipe_2");
        _oRecipe = createBitmap(oSpriteRecipe);
        _oRecipe.regX = oSpriteRecipe.width/2;
        _oRecipe.x = oSpriteBg.width/2;
        _oRecipe.y = iY+80;
        _oContainerPanel.addChild(_oRecipe);
        
        var iWidth = oSpriteBg.width-100;
        var iHeight = 60;
        var iY = oSpriteBg.height/2;
        _oLevelScoreText = new CTLText(_oContainerPanel, 
                    iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                    50, "center", "#fff", FONT, 1,
                    2, 2,
                    " ",
                    true, true, false,
                    false );

        var iY = oSpriteBg.height/2 + 100;
        _oTotScoreText = new CTLText(_oContainerPanel, 
                    iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                    50, "center", "#fff", FONT, 1,
                    2, 2,
                    " ",
                    true, true, false,
                    false );

        _oButHome = new CGfxButton(oSpriteBg.width/2 - 300,oSpriteBg.height/2 + 270,s_oSpriteLibrary.getSprite("but_home"),_oContainerPanel);
        _oButHome.addEventListener(ON_MOUSE_UP,this._onHome,this);
        
        _oButRestart = new CGfxButton(oSpriteBg.width/2,oSpriteBg.height/2+270,s_oSpriteLibrary.getSprite("but_restart"),_oContainerPanel);
        _oButRestart.addEventListener(ON_MOUSE_UP,this._onRestart,this);
        
        _oButContinue = new CGfxButton(oSpriteBg.width/2 + 300,oSpriteBg.height/2+270,s_oSpriteLibrary.getSprite("but_next"),_oContainerPanel);
        _oButContinue.addEventListener(ON_MOUSE_UP,this._onContinue,this);
        
        _iStartY = -oSpriteBg.height/2;
        
        _oContainerPanel.regX = oSpriteBg.width/2;
        _oContainerPanel.regY = oSpriteBg.height/2;
    };
    
    this.unload = function(){
        _oButContinue.unload();
        _oButHome.unload();
        _oButRestart.unload();
        
        _oFade.off("click", _oListener);
    };
    
    this.addEventListener = function( iEvent,cbCompleted, cbOwner ){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner; 
    };
    
    this.show = function(iLevel,iTotScore,iLevelScore,bLastLevel){
        setVolume("soundtrack",0);
        var oSfx = playSound("win_level",1,false);
        oSfx.on('end', function(){
            setVolume("soundtrack",SOUNDTRACK_VOLUME_IN_GAME);
        });
        
        var oSpriteRecipe = s_oSpriteLibrary.getSprite("recipe_"+(iLevel-1));
        _oRecipe.image = oSpriteRecipe;
        _oRecipe.regX = oSpriteRecipe.width/2;
        
        _oLevelClearedText.refreshText( sprintf( TEXT_CLEARED,  TEXT_RECIPE[iLevel-1]) );
        _oLevelScoreText.refreshText( sprintf( TEXT_LEVEL_SCORE,  iLevelScore) );
        _oTotScoreText.refreshText( sprintf( TEXT_TOT_SCORE,  iTotScore) );
        
        _oBg.alpha = 0;
        _oFade.alpha=0;
        _oContainerPanel.y = _iStartY;
        _oContainer.visible = true;
        
        if(bLastLevel){
            _oButContinue.setVisible(false);
            _oButRestart.setX(_oContainerPanel.regX + 250);
        }
        
        createjs.Tween.get(_oBg).to({alpha:1}, 500);
        createjs.Tween.get(_oFade).to({alpha:1}, 500);
        createjs.Tween.get(_oContainerPanel).wait(400).to({y:CANVAS_HEIGHT/2}, 1000,createjs.Ease.bounceOut);
    };
    
    this.hide = function(){
        createjs.Tween.get(_oContainerPanel).to({y:_iStartY}, 1000,createjs.Ease.backIn).call(function(){
                                                                createjs.Tween.get(_oBg).to({alpha:0}, 400,createjs.Ease.cubicOut).call(function(){
                                                                                                        _oContainer.visible = false;
                                                                    
                                                                                                        if(_aCbCompleted[_iEventToLaunch]){
                                                                                                            _aCbCompleted[_iEventToLaunch].call(_aCbOwner[_iEventToLaunch]);
                                                                                                        }
                                                                })
                                                    });
    };
    
    this._onHome = function(){
        
        _iEventToLaunch = ON_BACK_MENU;
        
        _oThis.hide();
    };
    
    this._onRestart = function(){
        $(s_oMain).trigger("show_interlevel_ad");
        
        _iEventToLaunch = ON_RESTART;
        
        _oThis.hide();
    };
    
    this._onContinue = function(){
        $(s_oMain).trigger("show_interlevel_ad");
        
        _iEventToLaunch = ON_NEXT;
        
        _oThis.hide();
    };
    
    this._init();
}