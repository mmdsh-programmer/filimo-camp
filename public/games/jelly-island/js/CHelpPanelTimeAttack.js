function CHelpPanelTimeAttack(){

    var _bPage1Active = true;

    var _oHelpBg;
    
    var _oContainerPage;
    
    var _oMsgStroke1;
    var _oMsg1;
    var _oMsgStroke2;
    var _oMsg2;
    
    var _oRightArrow;
    
    var _oMsg3;
    var _oMsgStroke3;
    var _oMsg4;
    var _oMsgStroke4;
    var _oBomb;
    var _oClock;
    var _oChanging;
    var _oLeftArrow;
    var _oListener;
    
    var _aThree;
    var _aFour;
    
    var _oParent;

    this._init = function(){
        if(!s_bHelpTimeAttack){
             s_oGame.onExitHelp();
            return;
        }
        
        var oSprite = s_oSpriteLibrary.getSprite('msg_box');
        _oHelpBg = createBitmap(oSprite);
        _oListener = _oHelpBg.on("click", function(){_oParent._onExitHelp();});
        s_oStage.addChild(_oHelpBg);
        
        var iNumChangingFace = CONFIG[s_iCurLevel].numfaces -1;
        var oSprite = s_oSpriteLibrary.getSprite('jelly');
        var oData = {   
                        images: [oSprite], 
                        // width, height & registration point of each sprite
                        frames: {width: CELL_SIZE, height: CELL_SIZE, regX: CELL_SIZE/2, regY: CELL_SIZE/2}, 
                        animations: {type_0:[0], type_1:[1], type_2:[2], type_3:[3], type_4:[4], type_5:[5], type_6:[6], type_7:[7], star:[8], bomb:[9], clock:[10], changing:[0,iNumChangingFace,"changing",JELLY_CHANGING_SPEED]}
                   };
                   
        var oSpriteSheet = new createjs.SpriteSheet(oData);
        
        _oBomb = createSprite(oSpriteSheet, "bomb",CELL_SIZE/2,CELL_SIZE/2,CELL_SIZE,CELL_SIZE);
        _oBomb.x = 250;
        _oBomb.y = 290;
        
        _oClock = createSprite(oSpriteSheet, "clock",CELL_SIZE/2,CELL_SIZE/2,CELL_SIZE,CELL_SIZE);
        _oClock.x = 250;
        _oClock.y = 485;
        
        _oChanging = createSprite(oSpriteSheet, "changing",CELL_SIZE/2,CELL_SIZE/2,CELL_SIZE,CELL_SIZE);
        _oChanging.x = 250;
        _oChanging.y = 690;
        
        _oContainerPage = new createjs.Container();
        _oContainerPage.y = CANVAS_HEIGHT/4;
        s_oStage.addChild(_oContainerPage);
        
        _aThree = new Array();
        var iOffset = 10;
        for(var i=0; i<3; i++){
            _aThree[i] = createSprite(oSpriteSheet, "type_0",CELL_SIZE/2,CELL_SIZE/2,CELL_SIZE,CELL_SIZE);
            _aThree[i].x = CANVAS_WIDTH/2 +i*(CELL_SIZE+iOffset) - CELL_SIZE-iOffset;
            _aThree[i].y = 180;
        }
        
        _aFour = new Array();
        for(var i=0; i<4; i++){
            _aFour[i] = createSprite(oSpriteSheet, "type_4",CELL_SIZE/2,CELL_SIZE/2,CELL_SIZE,CELL_SIZE);
            _aFour[i].x = CANVAS_WIDTH/2 +i*(CELL_SIZE+iOffset) - (CELL_SIZE+iOffset)*3/2;
            _aFour[i].y = 560;
        }
        
        this._buildPage1();
        
        s_bHelpTimeAttack = false;
    };

    this.unload = function(){       
        
        if(_bPage1Active){
            _oRightArrow.unload();
        } else {
            _oLeftArrow.unload();
        }
        
        _oHelpBg.off("click", _oListener);
        s_oStage.removeChild(_oHelpBg, _oContainerPage);
    };
    
    this._buildPage1 = function(){
        _bPage1Active = true;
        
        for(var i=0; i<3; i++){
            _oContainerPage.addChild(_aThree[i]);
        }
        for(var i=0; i<4; i++){
            _oContainerPage.addChild(_aFour[i]);
        }
        
        var iX = CANVAS_WIDTH/2;
        var iY = 340;
        var iWidth = 670;
        var iHeight = 400;
        
        _oMsgStroke1 = new CTLText(_oContainerPage, 
                    iX-iWidth/2, iY - iHeight/2, iWidth, iHeight, 
                    46, "center", STROKE_COLOR, PRIMARY_FONT, 1.1,
                    0, 0,
                    TEXT_HELP,
                    true, true, true,
                    false );
        _oMsgStroke1.setOutline(4);
        
        _oMsg1 = new CTLText(_oContainerPage, 
                    iX-iWidth/2, iY - iHeight/2, iWidth, iHeight, 
                    46, "center", PRIMARY_FONT_COLOR, PRIMARY_FONT, 1.1,
                    0, 0,
                    TEXT_HELP,
                    true, true, true,
                    false );
                    
        var iX = CANVAS_WIDTH/2;
        var iY = 690;
        var iWidth = 650;
        var iHeight = 400;
        
        _oMsgStroke2 = new CTLText(_oContainerPage, 
                    iX-iWidth/2, iY - iHeight/2, iWidth, iHeight, 
                    46, "center", STROKE_COLOR, PRIMARY_FONT, 1.1,
                    0, 0,
                    TEXT_HELP2,
                    true, true, true,
                    false );
        _oMsgStroke2.setOutline(4);
        
        _oMsg2 = new CTLText(_oContainerPage, 
                    iX-iWidth/2, iY - iHeight/2, iWidth, iHeight, 
                    46, "center", PRIMARY_FONT_COLOR, PRIMARY_FONT, 1.1,
                    0, 0,
                    TEXT_HELP2,
                    true, true, true,
                    false );
        
        var oSprite = s_oSpriteLibrary.getSprite('arrow');
        _oRightArrow = new CGfxButton(CANVAS_WIDTH/2 + 435, 490, oSprite, _oContainerPage);
        _oRightArrow.addEventListener(ON_MOUSE_UP, this._onButRightRelease, this);
        _oRightArrow.pulseAnimation();
    };

    this._buildPage2 = function(){        
        _bPage1Active = false;
        
        var iX = CANVAS_WIDTH/2;
        var iY = 150;
        var iWidth = 650;
        var iHeight = 130;
        
        _oMsgStroke1 = new CTLText(_oContainerPage, 
                    iX-iWidth/2, iY - iHeight/2, iWidth, iHeight, 
                    80, "center", STROKE_COLOR, PRIMARY_FONT, 1.1,
                    0, 0,
                    TEXT_HELP_ITEM,
                    true, true, false,
                    true );
        _oMsgStroke1.setOutline(4);
        
        _oMsg1 = new CTLText(_oContainerPage, 
                    iX-iWidth/2, iY - iHeight/2, iWidth, iHeight, 
                    80, "center", PRIMARY_FONT_COLOR, PRIMARY_FONT, 1.1,
                    0, 0,
                    TEXT_HELP_ITEM,
                    true, true, true,
                    false );
        
        _oContainerPage.addChild(_oBomb);
        
        var iX = CANVAS_WIDTH/2 - 200;
        var iY = 230;
        var iWidth = 540;
        var iHeight = 120;
        
        _oMsgStroke2 = new CTLText(_oContainerPage, 
                    iX, iY , iWidth, iHeight,
                    50, "left", STROKE_COLOR, PRIMARY_FONT, 1.1,
                    0, 0,
                    TEXT_HELP_BOMB,
                    true, true, true,
                    false );
        _oMsgStroke2.setOutline(4);
        
        _oMsg2 = new CTLText(_oContainerPage, 
                    iX, iY , iWidth, iHeight,
                    50, "left", PRIMARY_FONT_COLOR, PRIMARY_FONT, 1.1,
                    0, 0,
                    TEXT_HELP_BOMB,
                    true, true, true,
                    false );
        
        _oContainerPage.addChild(_oClock);

        var iY = 400;
        var iWidth = 540;
        var iHeight = 150;
        
        _oMsgStroke3 = new CTLText(_oContainerPage, 
                    iX , iY, iWidth, iHeight,
                    50, "left", STROKE_COLOR, PRIMARY_FONT, 1.1,
                    0, 0,
                    TEXT_HELP_CLOCK,
                    true, true, true,
                    false );
        _oMsgStroke3.setOutline(4);
        
        _oMsg3 = new CTLText(_oContainerPage, 
                     iX, iY, iWidth, iHeight,
                    50, "left", PRIMARY_FONT_COLOR, PRIMARY_FONT, 1.1,
                    0, 0,
                    TEXT_HELP_CLOCK,
                    true, true, true,
                    false );
        
        _oContainerPage.addChild(_oClock);

        var iY = 600;
        var iWidth = 540;
        var iHeight = 200;
        
        _oMsgStroke4 = new CTLText(_oContainerPage, 
                     iX, iY , iWidth, iHeight,
                    50, "left", STROKE_COLOR, PRIMARY_FONT, 1.1,
                    0, 0,
                    TEXT_HELP_CHANGING,
                    true, true, true,
                    false );
        _oMsgStroke4.setOutline(4);            
       
        _oMsg4 = new CTLText(_oContainerPage, 
                    iX, iY , iWidth, iHeight,
                    50, "left", PRIMARY_FONT_COLOR, PRIMARY_FONT, 1.1,
                    0, 0,
                    TEXT_HELP_CHANGING,
                    true, true, true,
                    false );
                    
        _oContainerPage.addChild(_oChanging);
        
        var oSprite = s_oSpriteLibrary.getSprite('arrow');
        _oLeftArrow = new CGfxButton(CANVAS_WIDTH/2 - 435, 490, oSprite, _oContainerPage);
        _oLeftArrow.addEventListener(ON_MOUSE_UP, this._onButLeftRelease, this);
        _oLeftArrow.pulseAnimation();
        _oLeftArrow.reverseSprite();
    };
    
    this._onButRightRelease = function(){
        _oContainerPage.removeAllChildren();
        _oRightArrow.unload();
        
        this._buildPage2();
    };
    
    this._onButLeftRelease = function(){
        if(!_bPage1Active){

            _oLeftArrow.unload();
            _oContainerPage.removeAllChildren();
        }
        
        this._buildPage1();
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
