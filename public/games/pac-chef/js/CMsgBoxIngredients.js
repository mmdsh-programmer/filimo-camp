function CMsgBoxIngredients(iLevel){
    var _iStartY;
    var _oListener;
    var _oButYes;
    var _oFade;
    var _oPanelContainer;
    var _oContainer;
    
    this._init = function (iLevel) {
        _oContainer = new createjs.Container();
        s_oStage.addChild(_oContainer);

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oFade.alpha = 0.5;
        _oListener =_oFade.on("click", function () {});
        _oContainer.addChild(_oFade);
        
        _oPanelContainer = new createjs.Container();   
        _oContainer.addChild(_oPanelContainer);
        
        var oSpriteBg = s_oSpriteLibrary.getSprite('msg_box');
        var oBg = createBitmap(oSpriteBg);
        oBg.regX = oSpriteBg.width * 0.5;
        oBg.regY = oSpriteBg.height * 0.5;
        _oPanelContainer.addChild(oBg);
        
        _oPanelContainer.x = CANVAS_WIDTH/2;
        _oPanelContainer.y = _iStartY = - oSpriteBg.height/2;    
        
        var szMsg = TEXT_INGREDIENTS;
        if(iLevel === NUM_LEVELS-2){
            szMsg = TEXT_INGREDIENTS_PENULTIMATE;
        }else if(iLevel === NUM_LEVELS-1){
            szMsg = TEXT_INGREDIENTS_LAST;
        }
        var oMsg = new CTLText(_oPanelContainer, 
                    -250, -250, 500, 200, 
                    40, "center", "#fff", FONT, 1,
                    2, 2,
                    sprintf(szMsg, TEXT_RECIPE[iLevel]),
                    true, true, true,
                    false );
        
        var oContainerIngredients = new createjs.Container();
        oContainerIngredients.x = CELL_SIZE/2;
        oContainerIngredients.y = 10;
        _oPanelContainer.addChild(oContainerIngredients);
        
        
            
        var iXPos = 0;
        for(var k=0;k<RECIPE_INGREDIENTS[iLevel].length;k++){
            var oBmp = new CIngredient(iXPos,0,RECIPE_INGREDIENTS[iLevel][k],oContainerIngredients);

            iXPos += CELL_SIZE +20;
        }
        
        var oSpriteCoin = s_oSpriteLibrary.getSprite("coin_help");
        var oBmp = createBitmap(oSpriteCoin);
        oBmp.x = iXPos;
        oBmp.regX = oSpriteCoin.width/2;
        oBmp.regY = oSpriteCoin.height/2;
        oContainerIngredients.addChild(oBmp);
        
        oContainerIngredients.regX = oContainerIngredients.getBounds().width/2;
        
        _oButYes = new CGfxButton(0, 160, s_oSpriteLibrary.getSprite('but_yes'), _oPanelContainer);
        _oButYes.addEventListener(ON_MOUSE_UP, this._onButYes, this);
        
        createjs.Tween.get(_oPanelContainer).to({y: CANVAS_HEIGHT/2}, 1000, createjs.Ease.bounceOut);
    };
    
    
    this._onButYes = function(){
        _oButYes.unload();
        _oFade.off("click",_oListener);
        
        s_oStage.removeChild(_oContainer);
        s_oGame.startLevel();
    };
    
    this._init(iLevel);
}