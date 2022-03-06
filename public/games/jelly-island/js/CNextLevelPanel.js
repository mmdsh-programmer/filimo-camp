function CNextLevelPanel(bWin, iScore, iTimeBonus, iBestScore = null, szTitle = TEXT_GAMEOVER){
    
    var _iTotalScore;
    
    var _oBg;
    var _oParent;
    var _oPanel;
    var _oGroup;    
    var _oMsgText;
    
    var _oScores;
    var _oTimeBonus;
    var _oTotal;
    var _oButNext;
    var _oStar;

    var _oButRetry;
    var _oButHome;
    
    this._init = function(bWin, iScore, iTimeBonus, iBestScore, szTitle){
        
        var graphics = new createjs.Graphics().beginFill("rgba(0,0,0,0.7)").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oBg = new createjs.Shape(graphics);
        _oBg.alpha = 0;
        s_oStage.addChild(_oBg);
       
        _oGroup = new createjs.Container();
        var oSprite = s_oSpriteLibrary.getSprite('end_panel');
        _oGroup.y = -oSprite.height*1.5;

        _oPanel = createBitmap(oSprite);
        _oPanel.regX = oSprite.width/2;
        _oPanel.regY = oSprite.height/2;
        _oPanel.x = CANVAS_WIDTH/2;
        _oPanel.y = CANVAS_HEIGHT/2;        
        _oGroup.addChild(_oPanel);
        
        if(bWin){
            _oGroup.addChild(_oStar);
        }
        
        var iTimeComplete = 750;
        createjs.Tween.get(_oBg).to({alpha:1}, iTimeComplete, createjs.Ease.linear);

        _oBg.on("mousedown", function(){});

              
        s_oStage.addChild(_oGroup);
        
        if(bWin){
            s_aLevelEnabled[s_iCurLevel+1] = true;
            
            var iPrevScore = s_aLevelScore[s_iCurLevel];
            
            if(iScore + iTimeBonus > iPrevScore){
                s_aLevelScore[s_iCurLevel] = iScore + iTimeBonus;
            }

            s_oMain.updateTotalScore();
            
            var iXOffset = 260;
            var iYOffset = 260;
            
            _oButRetry = new CGfxButton(CANVAS_WIDTH/2 - iXOffset, CANVAS_HEIGHT/2 +iYOffset, s_oSpriteLibrary.getSprite('but_restart_big'), _oGroup);
            _oButRetry.addEventListener(ON_MOUSE_UP, this._onButRetryRelease, this);

            _oButNext = new CGfxButton(CANVAS_WIDTH/2 + iXOffset, CANVAS_HEIGHT/2 +iYOffset, s_oSpriteLibrary.getSprite('but_continue_small'), _oGroup);
            _oButNext.addEventListener(ON_MOUSE_UP, this._onButNextRelease, this);
          
            _oButNext.setVisible(false);
            _oButRetry.setVisible(false);

            $(s_oMain).trigger("save_score", [s_iTotalScore, CTL_MODE_NAME[s_iGameMode]]);
            $(s_oMain).trigger("share_event",s_iTotalScore);
        }
        
        setTimeout(function(){_oParent._addElements(iBestScore, szTitle);}, iTimeComplete);
    };
    
    this._addElements = function(iBestScore, szTitle){
        if(bWin){
            var iYOffset = 50;
            
            _oMsgText = new CFormatText(CANVAS_WIDTH/2, CANVAS_HEIGHT/2 -370 + iYOffset, TEXT_WIN, PRIMARY_FONT_COLOR, _oGroup, STROKE_COLOR, 70, "center");
            _oMsgText.setOutline(10);
            
            _oScores = new CFormatText(CANVAS_WIDTH/2 , CANVAS_HEIGHT/2 -60 + iYOffset, sprintf(TEXT_SCORES, iScore), PRIMARY_FONT_COLOR, _oGroup, STROKE_COLOR, 54, "center");
            
            _oTimeBonus = new CFormatText(CANVAS_WIDTH/2, CANVAS_HEIGHT/2 +20 + iYOffset, sprintf(TEXT_TIMEBONUS, iTimeBonus), PRIMARY_FONT_COLOR, _oGroup, STROKE_COLOR, 54, "center");
            
            _iTotalScore = iScore + iTimeBonus;
            
            _oTotal = new CFormatText(CANVAS_WIDTH/2, CANVAS_HEIGHT/2 +100+ iYOffset, sprintf(TEXT_TOTAL, _iTotalScore), PRIMARY_FONT_COLOR, _oGroup, STROKE_COLOR, 54, "center");

            this.setStars(iScore + iTimeBonus, iYOffset);
        } else {
            _oButRetry = new CGfxButton(CANVAS_WIDTH/2 + 260, CANVAS_HEIGHT/2 + 260, s_oSpriteLibrary.getSprite('but_restart_big'), _oGroup);
            _oButRetry.addEventListener(ON_MOUSE_UP, this._onButRetryRelease, this);
            _oButRetry.popShowAnimation(_oButRetry.pulseAnimation, _oButRetry);
            
            _oButHome = new CGfxButton(CANVAS_WIDTH/2 - 260, CANVAS_HEIGHT/2 + 260, s_oSpriteLibrary.getSprite('but_home'), _oGroup);
            _oButHome.addEventListener(ON_MOUSE_UP, this._onButHomeRelease, this);
            _oButHome.popShowAnimation();
            
            _oScores = new CFormatText(CANVAS_WIDTH/2, CANVAS_HEIGHT/2 -150, sprintf(TEXT_SCORE, iScore), PRIMARY_FONT_COLOR, _oGroup, STROKE_COLOR, 70, "center", PRIMARY_FONT, 200);
            
            if(iBestScore !== null){
                $(s_oMain).trigger("save_score", [s_iBestScore, CTL_MODE_NAME[s_iGameMode]]);
                $(s_oMain).trigger("share_event",s_iBestScore);
                new CFormatText(CANVAS_WIDTH/2, CANVAS_HEIGHT/2 + 50, sprintf(TEXT_BEST_SCORE, iBestScore), PRIMARY_FONT_COLOR, _oGroup, STROKE_COLOR, 70, "center", PRIMARY_FONT, 200);
            }
            
            _oMsgText = new CFormatText(CANVAS_WIDTH/2, CANVAS_HEIGHT/2 - 300, szTitle, PRIMARY_FONT_COLOR, _oGroup, STROKE_COLOR, 80, "center");
        }
        
        createjs.Tween.get(_oGroup).to({y:0}, 1000, createjs.Ease.bounceOut);
    };
    
    this.unload = function(){
        _oMsgText.unload();
        _oMsgText = null;
        
        if(bWin){         
            _oScores.unload();
            _oScores = null;
            _oTimeBonus.unload();
            _oTimeBonus = null;
            _oTotal.unload();
            _oTotal = null;
            _oButNext.unload();
            _oButNext = null;
        }
            
        _oButRetry.unload();
        _oButRetry = null;    
            
        s_oStage.removeChild(_oBg);
        s_oStage.removeChild(_oGroup);

    };
    
    this.setStars = function(iScore, iYOffset){
        var oSprite = s_oSpriteLibrary.getSprite('star_empty');
        var oLeftStar = createBitmap(oSprite);
        oLeftStar.regX = oSprite.width/2;
        oLeftStar.regY = oSprite.height/2;
        oLeftStar.x = CANVAS_WIDTH/2 - 200;
        oLeftStar.y = 780 + iYOffset;
        oLeftStar.rotation = 30;
        _oGroup.addChild(oLeftStar);
        
        var oCenterStar = createBitmap(oSprite);
        oCenterStar.regX = oSprite.width/2;
        oCenterStar.regY = oSprite.height/2;
        oCenterStar.x = CANVAS_WIDTH/2;
        oCenterStar.y = 720 + iYOffset;
        _oGroup.addChild(oCenterStar);
        
        var oRightStar = createBitmap(oSprite);
        oRightStar.regX = oSprite.width/2;
        oRightStar.regY = oSprite.height/2;
        oRightStar.x = CANVAS_WIDTH/2 + 190;
        oRightStar.y = 780 + iYOffset;
        oRightStar.rotation = -30;
        _oGroup.addChild(oRightStar);
        
        var oSprite = s_oSpriteLibrary.getSprite('star_filled');
        var oLeftStar = createBitmap(oSprite);
        oLeftStar.regX = oSprite.width/2;
        oLeftStar.regY = oSprite.height/2;
        oLeftStar.x = CANVAS_WIDTH/2 - 200;
        oLeftStar.y = 780 + iYOffset;
        oLeftStar.rotation = 30;
        oLeftStar.scaleX = oLeftStar.scaleY = 0.01;
        _oGroup.addChild(oLeftStar);
        
        var oCenterStar = createBitmap(oSprite);
        oCenterStar.regX = oSprite.width/2;
        oCenterStar.regY = oSprite.height/2;
        oCenterStar.x = CANVAS_WIDTH/2;
        oCenterStar.y = 720 + iYOffset;
        oCenterStar.scaleX = oCenterStar.scaleY = 0.01;
        _oGroup.addChild(oCenterStar);
        
        var oRightStar = createBitmap(oSprite);
        oRightStar.regX = oSprite.width/2;
        oRightStar.regY = oSprite.height/2;
        oRightStar.x = CANVAS_WIDTH/2 + 190;
        oRightStar.y = 780 + iYOffset;
        oRightStar.rotation = -30;
        oRightStar.scaleX = oRightStar.scaleY = 0.01;
        _oGroup.addChild(oRightStar);
        
        var iTimeStar = 1500;

        if(iScore >= BEST_SCORE_LIMIT[s_iCurLevel]){

            createjs.Tween.get(oLeftStar).wait(700).call(function(){

                playSound("chime", 1, false);
                
            }).to({scaleX:1, scaleY:1}, iTimeStar, createjs.Ease.elasticOut);
            createjs.Tween.get(oCenterStar).wait(1400).call(function(){

                playSound("chime", 1, false);
               
            }).to({scaleX:1, scaleY:1}, iTimeStar, createjs.Ease.elasticOut);
            createjs.Tween.get(oRightStar).wait(2100).call(function(){

               playSound("chime", 1, false);
               
            }).to({scaleX:1, scaleY:1}, iTimeStar, createjs.Ease.elasticOut).call(function(){_oParent.callLevelCompletePing();});
            
        } else if(iScore > BEST_SCORE_LIMIT[s_iCurLevel]*0.7 && iScore < BEST_SCORE_LIMIT[s_iCurLevel]){

            createjs.Tween.get(oLeftStar).wait(700).call(function(){

                playSound("chime", 1, false);
               
            }).to({scaleX:1, scaleY:1}, iTimeStar, createjs.Ease.elasticOut);
            createjs.Tween.get(oCenterStar).wait(1400).call(function(){

                playSound("chime", 1, false);
               
            }).to({scaleX:1, scaleY:1}, iTimeStar, createjs.Ease.elasticOut).call(function(){_oParent.callLevelCompletePing();});
        } else {

            createjs.Tween.get(oLeftStar).wait(700).call(function(){

                playSound("chime", 1, false);
                
            }).to({scaleX:1, scaleY:1}, iTimeStar, createjs.Ease.elasticOut).call(function(){_oParent.callLevelCompletePing();});
        }
        
    };
    
    this.callLevelCompletePing = function(){
        _oButNext.popShowAnimation(_oButNext.pulseAnimation, _oButNext);
        _oButRetry.popShowAnimation();
        _oButNext.setVisible(true);
        _oButRetry.setVisible(true);

    };
    
    this.show = function(){        
        createjs.Tween.get(_oGroup).to({y:0}, 500, createjs.Ease.backOut);
    };
    
    this._onButHomeRelease = function(){
         createjs.Tween.get(_oGroup).to({y:480}, 500, createjs.Ease.backIn).call(function() {s_oGame.setBlock(false); s_oGame.onExit();});
    };
    
    this._onButRetryRelease = function(){
        $(s_oMain).trigger("show_interlevel_ad");
        createjs.Tween.get(_oGroup).to({y:480}, 500, createjs.Ease.backIn).call(function() {s_oGame.setBlock(false); s_oGame.restartGame();});
    };
    
    this._onButNextRelease = function(){
        $(s_oMain).trigger("show_interlevel_ad");
        createjs.Tween.get(_oGroup).to({y:480}, 500, createjs.Ease.backIn).call(function() {s_oGame.onNextLevel(_iTotalScore);});
    };

    _oParent = this;
    this._init(bWin, iScore, iTimeBonus, iBestScore, szTitle);
    
    return this;
}