function CHelpPanelStoryMode(){
    
    var _iTimeAlphaBG;

    var _oImage = null;
    var _oFace = null;
    var _oHero = null;
    var _oComic = null;

    var _oHelpBg;
    var _oParent;
    var _oContainer;

    this._init = function(){
        _iTimeAlphaBG = 300;
       
       
        if(!s_aHelpPanelEnabled[s_iCurLevel]){
            s_oGame.onExitHelp();
            return;
        }
        
       
        _oContainer  = new createjs.Container();
        s_oStage.addChild(_oContainer);
        
        var graphics = new createjs.Graphics().beginFill("rgba(0,0,0,0.7)").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oHelpBg = new createjs.Shape(graphics);
        _oHelpBg.alpha = 0;
        _oHelpBg.on("click", function(){_oParent._onExitHelp();});
        _oContainer.addChild(_oHelpBg);

        var iNumChangingFace = CONFIG[s_iCurLevel].numfaces - 1;
        var oSprite = s_oSpriteLibrary.getSprite('jelly');
        var oData = {   
                        images: [oSprite], 
                        // width, height & registration point of each sprite
                        frames: {width: CELL_SIZE, height: CELL_SIZE, regX: CELL_SIZE/2, regY: CELL_SIZE/2}, 
                        animations: {type_0:[0], type_1:[1], type_2:[2], type_3:[3], type_4:[4], type_5:[5], type_6:[6], type_7:[7], star:[8], bomb:[9], clock:[10], changing:[0,iNumChangingFace,"changing",JELLY_CHANGING_SPEED]}
                   };
                   
        var oSpriteSheet = new createjs.SpriteSheet(oData);
        
        switch(s_iCurLevel){
            case 1: {
                    
                    createjs.Tween.get(_oHelpBg).to({alpha: 1}, _iTimeAlphaBG).call(function(){
                        _oFace = createSprite(oSpriteSheet, "type_1",CELL_SIZE/2,CELL_SIZE/2,CELL_SIZE,CELL_SIZE);
                        _oFace.x = 250;
                        _oFace.y = 1509;
                        _oFace.scaleX = _oFace.scaleY = 0.75;
                        _oContainer.addChild(_oFace);
                        
                        var oHand = _oParent.createHand();
                        oHand.x = 260;
                        oHand.y = 1380;
                        _oContainer.addChild(oHand);
                        
                    }).wait(500).call(function(){_oComic = new CComic(540, 1370, _oContainer, TEXT_HELP1);});
                    
                    break;
            }
            case 3: {                    
                    createjs.Tween.get(_oHelpBg).to({alpha: 1}, _iTimeAlphaBG).call(function(){
                        _oFace = createSprite(oSpriteSheet, "bomb",CELL_SIZE/2,CELL_SIZE/2,CELL_SIZE,CELL_SIZE);
                        _oFace.x = 490;
                        _oFace.y = 1071;
                        _oContainer.addChild(_oFace);
                        
                        var oHand = _oParent.createHand();
                        oHand.x = 500;
                        oHand.y = 980;
                        _oContainer.addChild(oHand);
                        
                        _oComic = new CComic(450, 700, _oContainer, TEXT_HELP3);
                    });
                    break;
            }
            case 5: {
                    createjs.Tween.get(_oHelpBg).to({alpha:1}, _iTimeAlphaBG).call(function(){
                        _oFace = createSprite(oSpriteSheet, "type_3",CELL_SIZE/2,CELL_SIZE/2,CELL_SIZE,CELL_SIZE);
                        _oFace.x = 250;
                        _oFace.y = 1509;
                        _oFace.scaleX = _oFace.scaleY = 0.75;
                        _oContainer.addChild(_oFace);
                        var oHand = _oParent.createHand();
                        oHand.x = 260;
                        oHand.y = 1380;
                        _oContainer.addChild(oHand);
                    }).wait(500).call(function(){_oComic = new CComic(540, 1370, _oContainer, TEXT_HELP5); _oContainer.addChild(_oFace);});
                    
                    break;
            }
            case 8: {                    
                    createjs.Tween.get(_oHelpBg).to({alpha:1}, _iTimeAlphaBG).call(function(){
                        var oSpriteBlock = s_oSpriteLibrary.getSprite("block");
                        _oFace = createBitmap(oSpriteBlock);
                        _oFace.regX = oSpriteBlock.width/2;
                        _oFace.regY = oSpriteBlock.height/2;
                        _oFace.x = 480;
                        _oFace.y = 1509;
                        _oFace.scaleX = _oFace.scaleY = 0.75;
                        _oContainer.addChild(_oFace);
                        
                        var oHand = _oParent.createHand();
                        oHand.x = 490;
                        oHand.y = 1400;
                        _oContainer.addChild(oHand);
                    }).wait(500).call(function(){_oComic = new CComic(450, 1170, _oContainer, TEXT_HELP8); _oContainer.addChild(_oFace);});
                    
                    break;
            }
            case 11: { 
                    
                    createjs.Tween.get(_oHelpBg).to({alpha:1}, _iTimeAlphaBG).call(function(){
                        _oFace = createSprite(oSpriteSheet, "clock",CELL_SIZE/2,CELL_SIZE/2,CELL_SIZE,CELL_SIZE);
                        _oFace.x = 540;
                        _oFace.y = 920;
                        _oContainer.addChild(_oFace);
                        
                        var oHand = _oParent.createHand();
                        oHand.x = _oFace.x + 20;
                        oHand.y = _oFace.y - 140;
                        _oContainer.addChild(oHand);
                        
                    }).wait(500).call(function(){_oComic = new CComic(320, 1200, _oContainer, TEXT_HELP11); _oContainer.addChild(_oFace);});
                    
                    break;
            }
            case 13: {
                    createjs.Tween.get(_oHelpBg).to({alpha:1}, _iTimeAlphaBG).call(function(){
                        _oFace = createSprite(oSpriteSheet, "type_4",CELL_SIZE/2,CELL_SIZE/2,CELL_SIZE,CELL_SIZE);
                        _oFace.x = 250;
                        _oFace.y = 1509;
                        _oFace.scaleX = _oFace.scaleY = 0.75;
                        _oContainer.addChild(_oFace);
                        var oHand = _oParent.createHand();
                        oHand.x = 260;
                        oHand.y = 1380;
                        _oContainer.addChild(oHand);
                    }).wait(500).call(function(){_oComic = new CComic(540, 1370, _oContainer, TEXT_HELP13); _oContainer.addChild(_oFace);});
                    
                    break;
            }
            case 15: {                  
                    
                    _oFace = createSprite(oSpriteSheet, "changing",CELL_SIZE/2,CELL_SIZE/2,CELL_SIZE,CELL_SIZE);
                    _oFace.x = CANVAS_WIDTH/2 + CELL_SIZE*3/2;
                    _oFace.y = CANVAS_HEIGHT/2 - CELL_SIZE*5/2 - 40;
                    _oContainer.addChild(_oFace);
                    
                    createjs.Tween.get(_oHelpBg).to({alpha:1}, _iTimeAlphaBG).call(function(){
                        var oHand = _oParent.createHand();
                        oHand.x = _oFace.x + 10;
                        oHand.y = _oFace.y - 130;
                        _oContainer.addChild(oHand);
                        
                    }).wait(500).call(function(){_oComic = new CComic(300, _oFace.y - 140, _oContainer, TEXT_HELP15);});
                    
                    break;
            }
            case 17: {
                    _oFace = createSprite(oSpriteSheet, "star",CELL_SIZE/2,CELL_SIZE/2,CELL_SIZE,CELL_SIZE);
                    _oFace.x = 590;
                    _oFace.y = 570;
                    _oFace.scaleX = _oFace.scaleY = 1;
                    _oContainer.addChild(_oFace);
                    
                    var oGlowFace = createSprite(s_oJellySpriteSheet, "type_7",CELL_SIZE/2,CELL_SIZE/2,CELL_SIZE,CELL_SIZE);
                    oGlowFace.x = _oFace.x;
                    oGlowFace.y = _oFace.y;
                    oGlowFace.gotoAndStop("type_7");
                    _oContainer.addChild(oGlowFace);
                    createjs.Tween.get(oGlowFace, {loop:true}).to({alpha:0},1000).to({alpha:1},1000)

                    createjs.Tween.get(_oHelpBg).to({alpha:1}, _iTimeAlphaBG).call(function(){
                        
                        
                        var oHand = _oParent.createHand();
                        oHand.x =  _oFace.x + 10;
                        oHand.y = _oFace.y - 130;
                        _oContainer.addChild(oHand);
                        
                        _oComic = new CComic(680, 800, _oContainer, TEXT_HELP17);
                    });
                    
                    break;
            }
            case 19: {
                    
                    createjs.Tween.get(_oHelpBg).to({alpha:1}, _iTimeAlphaBG).call(function(){
                        var oSprite = s_oSpriteLibrary.getSprite('trap');
                        _oFace = createBitmap(oSprite);
                        _oFace.regX = oSprite.width/2 ;
                        _oFace.regY = oSprite.height/2;
                        _oFace.x = CANVAS_WIDTH/2 + CELL_SIZE *3/2;
                        _oFace.y = CANVAS_HEIGHT/2 - 40;

                        var oHand = _oParent.createHand();
                        oHand.x = _oFace.x + 10;
                        oHand.y = _oFace.y - 140;
                        _oContainer.addChild(oHand);
                
                    }).wait(500).call(function(){_oComic = new CComic(280, _oFace.y - 150, _oContainer, TEXT_HELP19); _oComic.flip(); _oContainer.addChild(_oFace);});
                    
                    break;
            }
            case 22: {
                    createjs.Tween.get(_oHelpBg).to({alpha:1}, _iTimeAlphaBG).call(function(){
                        
                    _oFace = createSprite(oSpriteSheet, "type_5", CELL_SIZE/2,CELL_SIZE/2,CELL_SIZE,CELL_SIZE);
                    _oFace.x = 250;
                    _oFace.y = 1509;
                    _oFace.scaleX = _oFace.scaleY = 0.75;
                    _oContainer.addChild(_oFace);
                    
                    var oHand = _oParent.createHand();
                    oHand.x = 260;
                    oHand.y = 1390;
                    _oContainer.addChild(oHand);
                        
                    }).wait(500).call(function(){_oComic = new CComic(540, 1370, _oContainer, TEXT_HELP22); _oContainer.addChild(_oFace);});
                    
                    break;
            }
            
            default: {
                    
                    s_oGame.onExitHelp();
                    s_oStage.removeChild(_oContainer);
                    return;
            }
            
        }

    };
    
    this.createHand = function(){
        var aImages = new Array();
        
        for(var i = 0; i < HAND_ANIM_NUM_FRAMES; i++){
            aImages.push(s_oSpriteLibrary.getSprite("hand_anim_" + i));
        }
        var oSprite = s_oSpriteLibrary.getSprite("hand_anim_" + 0);
        var oData = {   
                            images: aImages, 
                            // width, height & registration point of each sprite
                            frames: {width: oSprite.width, height: oSprite.height, regX: oSprite.width/2, regY: oSprite.height/2}, 
                            animations: {loop : [0, 19, "loop"]},
                            framerate: 30
                       };

        var oSpriteSheet = new createjs.SpriteSheet(oData);

        var oHand = createSprite(oSpriteSheet,"loop",oSprite.width/2,oSprite.height/2,oSprite.width,oSprite.height);
        
        return oHand;
    };

    this.unload = function(){
        _oHelpBg.removeAllEventListeners();
        s_oStage.removeChild(_oContainer);
    };

    this._onExitHelp = function(){
        _oParent.unload();
        s_oGame.onExitHelp();
    };

    this._onButContinueRelease = function(){
        this.unload();
        s_oGame.onExitHelp();
    };

    _oParent=this;
    this._init();

}
