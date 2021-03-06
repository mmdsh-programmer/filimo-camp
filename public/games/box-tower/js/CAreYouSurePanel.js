function CAreYouSurePanel(oParentContainer) {
    var _oMsgStroke;
    var _oMsg;
    var _oButYes;
    var _oButNo;
    var _oContainer;
    var _oParentContainer;

    this._init = function () {
        _oContainer = new createjs.Container();
        _oContainer.alpha = 0;
        _oParentContainer.addChild(_oContainer);

        var oFade = new createjs.Shape();
        oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        oFade.alpha = 0.5;
        _oContainer.addChild(oFade);

        var oSprite = s_oSpriteLibrary.getSprite('msg_box');

        var oBg = createBitmap(oSprite);
        oBg.x = CANVAS_WIDTH_HALF;
        oBg.y = CANVAS_HEIGHT_HALF;
        oBg.regX = oSprite.width * 0.5;
        oBg.regY = oSprite.height * 0.5;
        _oContainer.addChild(oBg);

        _oMsgStroke = new CTLText(_oContainer, 
                    CANVAS_WIDTH/2-300, (CANVAS_HEIGHT/2)-200, 600, 160, 
                    80, "center", TEXT_COLOR_STROKE, FONT_GAME, 1,
                    0, 0,
                    TEXT_ARE_SURE,
                    true, true, true,
                    false );
                    
        _oMsgStroke.setOutline(3);

        _oMsg = new CTLText(_oContainer, 
                    CANVAS_WIDTH/2-300, (CANVAS_HEIGHT/2)-200, 600, 160, 
                    80, "center", TEXT_COLOR, FONT_GAME, 1,
                    0, 0,
                    TEXT_ARE_SURE,
                    true, true, true,
                    false );

        _oContainer.on("click", function () {});

        _oButYes = new CGfxButton(CANVAS_WIDTH / 2 + 280, CANVAS_HEIGHT_HALF + 120, s_oSpriteLibrary.getSprite('but_yes'), _oContainer);
        _oButYes.addEventListener(ON_MOUSE_UP, this._onButYes, this);

        _oButNo = new CGfxButton(CANVAS_WIDTH / 2 - 280, CANVAS_HEIGHT_HALF + 120, s_oSpriteLibrary.getSprite('but_no'), _oContainer);
        _oButNo.addEventListener(ON_MOUSE_UP, this._onButNo, this);
        _oButNo.pulseAnimation();
    };

    this.show = function () {
        s_oGame.unpause(false);
        createjs.Tween.get(_oContainer, {ignoreGlobalPause: true}).to({alpha: 1}, 500, createjs.Ease.cubicOut);
    };

    this._onButYes = function () {
        s_oGame.unpause(true);
        this.unload();
        s_oGame.onExit();
    };

    this._onButNo = function () {
        var oParent = this;
        createjs.Tween.get(_oContainer, {ignoreGlobalPause: true}).to({alpha: 0}, 500, createjs.Ease.cubicOut).call(function () {
            s_oGame.unpause(true);
            oParent.unload();
        });
    };

    this.unload = function () {
        _oButYes.unload();
        _oButYes = null;

        _oButNo.unload();
        _oButNo = null;

        _oContainer.removeAllEventListeners();

        s_oStage.removeChild(_oContainer);
    };

    _oParentContainer = oParentContainer;

    this._init();
}