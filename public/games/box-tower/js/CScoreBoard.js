function CScoreBoard(oParentContainer) {

    var _pContainerPos;
    var _pBestScorePos;
    var _oScoreText;
    var _oScoreTextStroke;
    var _oBestScore;
    var _oBestScoreStroke;
    var _oParentContainer = oParentContainer;
    var _oContainer;
    var _oContainerScore;
    var _oContainerBest;
    var _oBestLight;


    this._init = function () {

        _oContainerScore = new createjs.Container();
        _oContainerBest = new createjs.Container();
        _oContainerBest.x = -360;
        _oContainerBest.y = 120;

        _pContainerPos = {x: CANVAS_WIDTH * 0.5, y: 61};
        _oContainer = new createjs.Container();
        _oContainer.x = _pContainerPos.x;
        _oContainer.y = _pContainerPos.y;
        _oParentContainer.addChild(_oContainer);

        _oContainer.addChild(_oContainerBest, _oContainerScore);

        _oScoreTextStroke = new createjs.Text("999", "40px " + FONT_GAME, TEXT_COLOR_STROKE);
        _oScoreTextStroke.textAlign = "center";
        _oScoreTextStroke.textBaseline = "middle";
        _oScoreTextStroke.x = -7;
        _oScoreTextStroke.outline = 3;
        _oContainerScore.addChild(_oScoreTextStroke);

        _oScoreText = new createjs.Text("999", "40px " + FONT_GAME, TEXT_COLOR);
        _oScoreText.textAlign = "center";
        _oScoreText.textBaseline = "middle";
        _oScoreText.x = _oScoreTextStroke.x;
        _oContainerScore.addChild(_oScoreText);

        var oSpriteScore = s_oSpriteLibrary.getSprite("bg_score");
        var oScore = createBitmap(oSpriteScore);
        oScore.regX = oSpriteScore.width * 0.5;
        oScore.regY = oSpriteScore.height * 0.5;
        _oContainerScore.addChild(oScore);
        _oContainerScore.x = -360;

        _oBestScoreStroke = new createjs.Text("25", "40px " + FONT_GAME, TEXT_COLOR_STROKE);
        _oBestScoreStroke.textAlign = "center";
        _oBestScoreStroke.textBaseline = "middle";
        _oBestScoreStroke.outline = 3;
        _oBestScoreStroke.x = -5;
        _oContainerBest.addChild(_oBestScoreStroke);

        _oBestScore = new createjs.Text("25", "40px " + FONT_GAME, TEXT_COLOR);
        _oBestScore.textAlign = "center";
        _oBestScore.textBaseline = "middle";
        _oBestScore.x = _oBestScoreStroke.x;
        _oContainerBest.addChild(_oBestScore);
        _pBestScorePos = {x: _oContainerBest.x, y: 0};

        var oBest = this.createStar();
        _oContainerBest.addChild(oBest);

        _oBestLight = this.createStar();
        _oBestLight.visible = false;
        _oBestLight.alpha = 0;
        _oContainerBest.addChild(_oBestLight);
    };

    this.createStar = function () {
        var oSpriteBest = s_oSpriteLibrary.getSprite("bg_bestscore");

        var oData = {
            images: [oSpriteBest],
            // width, height & registration point of each sprite
            frames: {width: oSpriteBest.width / 2, height: oSpriteBest.height, regX: (oSpriteBest.width / 2) / 2, regY: oSpriteBest.height / 2},
            animations: {normal: [0], active: [1]}
        };
        var oSpriteSheet = new createjs.SpriteSheet(oData);

        var oBest = createSprite(oSpriteSheet, "normal", (oSpriteSheet.width / 2) / 2, oSpriteSheet.height / 2, oSpriteSheet.width / 2, oSpriteSheet.height);
        oBest.y = -5;
        oBest.x = 5;

        return oBest;
    };

    this.getStartPosScore = function () {
        return _pContainerPos;
    };

    this.getStartPosBestScore = function () {
        return _pBestScorePos;
    };

    this.setBestScorePos = function (iX, iY) {
        _oContainerBest.x = iX;
        _oContainerBest.y = iY;
    };

    this.setPosScore = function (iX, iY) {
        _oContainer.x = iX;
        _oContainer.y = iY;
    };

    this.refreshTextBestScore = function (iScore, bAnim) {
        _oBestScore.text = iScore;
        _oBestScoreStroke.text = iScore;
        if (bAnim) {
//            _oBestScore.color = TEXT_COLOR_BEST_SORE;
            _oBestLight.visible = true;
            createjs.Tween.get(_oBestLight, {override: true}).to({alpha: 1},
                    250, createjs.Ease.cubicOut).to({alpha: 0}, 250, createjs.Ease.cubicIn).set({visible: false});
        }
    };

    this.refreshTextScore = function (iScore) {
        _oScoreText.text = iScore;
        _oScoreTextStroke.text = iScore;
    };


    this._init();

    return this;
}