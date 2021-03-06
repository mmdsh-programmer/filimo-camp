function CGame(oData) {
    var _bStartGame = true;
    var _bPressedKeys = false;
    var _iScore = 0;
    var _iGameState = STATE_PAUSE;
    var _iStartPos = 1;
    var _iContainerY;
    var _iColorPos;
    var _iBgColorPos;
    var _iStartCheckStack = 0;
    var _oInterface;
    var _oBg;
    var _oFBg;
    var _oFade;
    var _oContainerStack;
    var _oPrevStack;
    var _oCurrentStack;
    var _oOffset;
    var _oHitArea;
    var _aStacks;

    this._init = function () {
        $(s_oMain).trigger("start_session");
        $(s_oMain).trigger("start_level", 1);

        _aStacks = new Array();

        this.restartColorGrandients();

        _oBg = new createjs.Shape();
        _oBg.graphics.beginFill(COLOR_GRADIENTS_STACKS[_iBgColorPos]).drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oBg.cache(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        s_oStage.addChild(_oBg);

        var oSpriteFBg = s_oSpriteLibrary.getSprite("bg_game");
        _oFBg = createBitmap(oSpriteFBg);
        s_oStage.addChild(_oFBg);
        _oFBg.cache(0, 0, oSpriteFBg.width, oSpriteFBg.height);

        _oContainerStack = new createjs.Container();
        _oContainerStack.tickChildren = false;

        this.resetContainerStacks();

        s_oStage.addChild(_oContainerStack);

        _oHitArea = new createjs.Shape();
        _oHitArea.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        _oHitArea.on("mousedown", this.onMouseDown);
        s_oStage.addChild(_oHitArea);

        _oInterface = new CInterface();
        _oInterface.refreshScoreText(_iScore);
        _oInterface.refreshBestScore(s_iBestScore, false);

        this.createStartStacks();

        _oFade = new createjs.Shape();
        _oFade.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        _oOffset = {x: 0, y: 0};

        s_oStage.addChild(_oFade);

        if (!s_bMobile) {
            document.onkeydown = onKeyDown;
            document.onkeyup = onKeyUp;
        }

        this.startFade();
        
    };

    function onKeyDown(evt) {
        if (!_bPressedKeys && _iGameState === STATE_PLAY) {
            if (evt.keyCode === 32) {
                s_oGame.onMouseDown();
                _bPressedKeys = true;
            }
        }

        evt.preventDefault();
        return false;
    }

    this.restartColorGrandients = function () {
        _iColorPos = Math.floor(Math.random() * COLOR_GRADIENTS_STACKS.length);

        _iBgColorPos = _iColorPos + 10;
        if (_iBgColorPos >= COLOR_GRADIENTS_STACKS.length) {
            var iDif = _iBgColorPos - COLOR_GRADIENTS_STACKS.length;
            _iBgColorPos = iDif;
        }
    };

    function onKeyUp(evt) {

        if (evt.keyCode === 32) {
            _bPressedKeys = false;
        }

        evt.preventDefault();
        return false;
    }

    this.startFade = function () {
        _oFade.visible = true;
        _oFade.alpha = 1;
        createjs.Tween.get(_oFade).to({alpha: 0}, MS_FADE_ANIM, createjs.Ease.cubicOut).call(function () {
            _oFade.visible = false;
        });
    };

    this.resetContainerStacks = function () {
        _oContainerStack.x = CANVAS_WIDTH_HALF;
        _oContainerStack.y = CANVAS_HEIGHT;
        _oContainerStack.regX = CANVAS_WIDTH_HALF;
        _oContainerStack.regY = CANVAS_HEIGHT;
        _oContainerStack.scaleX = _oContainerStack.scaleY = 1;
        _iContainerY = _oContainerStack.y;
    };

    this.createStartStacks = function () {
        var aEdge = new Array();
        for (var i = 0; i < NUM_OF_EDGES_FOR_STACK; i++) {
            aEdge.push(new CEdge(START_EDGES_POSITION[i].startX, START_EDGES_POSITION[i].startY,
                    START_EDGES_POSITION[i].endX, START_EDGES_POSITION[i].endY));
        }

        _oPrevStack = new CStack({x: CANVAS_WIDTH_HALF, y: CANVAS_HEIGHT_HALF + 150, dir: NO_DIR}, {line: COLOR_GRADIENTS_STACKS[_iColorPos], plane: COLOR_GRADIENTS_STACKS[_iColorPos], width: LINES_WIDTH, depth: null}, aEdge, _oContainerStack);
        _oPrevStack.setID(0);
        _aStacks.push(_oPrevStack);
        this.nextColorGradient();

        var oInfo = {x: STACKS_START_POSITION[_iStartPos].x, y: STACKS_START_POSITION[_iStartPos].y - STACK_DEPTH_SIZE, dir: STACKS_START_POSITION[_iStartPos].dir};

        _oCurrentStack = new CStack(oInfo, {line: COLOR_GRADIENTS_STACKS[_iColorPos], plane: COLOR_GRADIENTS_STACKS[_iColorPos], width: LINES_WIDTH, depth: null}, aEdge, _oContainerStack);
        _oCurrentStack.setID(1);

        var oPos = _oPrevStack.getPos();
        oPos.y -= STACK_DEPTH_SIZE;
        _oCurrentStack.setLimitPosition(this.getLimitPos(oPos));
        _oCurrentStack.setPosition(_oCurrentStack.getLimitPosition(3 - _iStartPos).x, _oCurrentStack.getLimitPosition(3 - _iStartPos).y);
        this.nextColorGradient();

        _aStacks.push(_oCurrentStack);
    };

    this.zoomOutContainerStacks = function () {
        var fZoom = 1 / (_iScore * 0.06);
        if (fZoom > 1) {
            fZoom = 1;
        }
        var fPosY = _oContainerStack.y + (_aStacks[Math.floor(_aStacks.length - 1)].getPos().y - _aStacks[0].getPos().y);

        createjs.Tween.get(_oContainerStack).to({scaleX: fZoom, scaleY: fZoom, y: fPosY}, MS_TIME_ZOOM_OUT, createjs.Ease.quartOut);
    };

    this.gameOver = function () {
        _iGameState = STATE_FINISH;
        _oCurrentStack.fallEffect();
        this.zoomOutContainerStacks();
        this.visibleAllStacks();

        if (_iScore > s_iBestScore) {
            s_iBestScore = _iScore;
            saveItem("box_best_score", _iScore);
        }
        
        playSound("game_over",1,false);
        _oInterface.createWinPanel(_iScore);
    };

    this.onMouseDown = function () {
        _oCurrentStack.updateEdgesPosition();
        var oResult = s_oGame.intersectionPointsStacks(_oPrevStack, _oCurrentStack);
        if (oResult.result === false) {
            if (_iGameState === STATE_PLAY) {
                s_oGame.gameOver();
            }
            return;
        }

        s_oGame.nextColorGradient();
        s_oGame.moveContainerStack();
        _oCurrentStack.updateSize();
        _oCurrentStack.cacheStack();
        s_oGame.changeDirStack();
        s_oGame.createNewStack(_oCurrentStack.getEdges(), oResult.point, oResult.cut);
        s_oGame.addScore(1);
        s_oGame.animPerfectText(oResult.cut);
        s_oGame.checkVisibleStack();
    };

    this.animPerfectText = function (bVal) {
        if (!bVal) {
            _oInterface.animPerfectText();
        }
    };

    this.nextColorGradient = function () {
        _iColorPos++;
        _iBgColorPos++;
        if (_iColorPos === COLOR_GRADIENTS_STACKS.length) {
            _iColorPos = 0;
        }
        if (_iBgColorPos === COLOR_GRADIENTS_STACKS.length) {
            _iBgColorPos = 0;
        }
        _oBg.graphics.clear();
        _oBg.graphics.beginFill(COLOR_GRADIENTS_STACKS[_iBgColorPos]).drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT).endFill();
        _oBg.updateCache();
    };

    this.checkVisibleStack = function () {
        for (var i = _iStartCheckStack; i < _aStacks.length; i++) {
            if (_aStacks[i].isVisible()) {
                var oPosLocal = _aStacks[i].getPosLocal();
                if (oPosLocal.y > CANVAS_HEIGHT) {
                    _aStacks[i].setVisible(false);
                    _iStartCheckStack = i;
                    break;
                }
            }
        }
    };

    this.visibleAllStacks = function () {
        for (var i = 0; i < _aStacks.length; i++) {
            _aStacks[i].setVisible(true);
        }
    };

    this.addScore = function (iVal) {
        _iScore += iVal;
        _oInterface.refreshScoreText(_iScore);
        if (_iScore > s_iBestScore) {
            _oInterface.refreshBestScore(_iScore, true);
        }
    };

    this.intersectionPointsStacks = function (oPrevStack, oCurrentStack) {
        var iSidesEdges = 1;
        if (oCurrentStack.getDirID() === LEFT_UP || oCurrentStack.getDirID() === RIGHT_DOWN) {
            iSidesEdges = 0;
        }
        var aPrevStackEdges;
        var aCurrentStackEdges;
        var aCurrentStackSpecularEdges;
        var oResultRight;
        var oResultLeft;

        if (iSidesEdges === 0) {
            aPrevStackEdges = oPrevStack.getLeftDownAndRightUpEdges();
            aCurrentStackEdges = oCurrentStack.getLeftDownAndRightUpEdges();
            aCurrentStackSpecularEdges = oCurrentStack.getLeftUpAndRightDownEdges();
            oResultRight = this.checkIntersectionPoint(aPrevStackEdges[0], aCurrentStackEdges[0]);
            oResultLeft = this.checkIntersectionPoint(aPrevStackEdges[1], aCurrentStackEdges[1]);
        } else {
            aPrevStackEdges = oPrevStack.getLeftUpAndRightDownEdges();
            aCurrentStackEdges = oCurrentStack.getLeftUpAndRightDownEdges();
            aCurrentStackSpecularEdges = oCurrentStack.getLeftDownAndRightUpEdges();
            oResultRight = this.checkIntersectionPoint(aPrevStackEdges[0], aCurrentStackEdges[0]);
            oResultLeft = this.checkIntersectionPoint(aPrevStackEdges[1], aCurrentStackEdges[1]);
        }

        if (oResultLeft.result === 0 || oResultLeft.result === 1 || oResultRight.result === 0 || oResultRight.result === 1) {
            return {result: false};
        }

        var iCutDimRightPointAX = aCurrentStackEdges[0].getPointA().getX() - oResultRight.vec1.getX();
        var iCutDimLeftPointAX = aCurrentStackEdges[1].getPointA().getX() - oResultLeft.vec1.getX();
        var iCutDimRightPointAY = aCurrentStackEdges[0].getPointA().getY() - oResultRight.vec1.getY();
        var iCutDimLeftPointAY = aCurrentStackEdges[1].getPointA().getY() - oResultLeft.vec1.getY();

        var iCutDimRightPointBX = aCurrentStackEdges[0].getPointB().getX() - oResultRight.vec2.getX();
        var iCutDimLeftPointBX = aCurrentStackEdges[1].getPointB().getX() - oResultLeft.vec2.getX();
        var iCutDimRightPointBY = aCurrentStackEdges[0].getPointB().getY() - oResultRight.vec2.getY();
        var iCutDimLeftPointBY = aCurrentStackEdges[1].getPointB().getY() - oResultLeft.vec2.getY();

        var oPointOffset = {x: 0, y: 0};
        var bCut = false;
        var oStartCut;
        var oPointCut;
        var bRightEdgeCollision = false;

        if (iSidesEdges === 0) {
            if (iCutDimRightPointAX !== 0 && iCutDimLeftPointBX !== 0) {//RIGHT
                oPointOffset = {x: iCutDimRightPointAX, y: iCutDimRightPointAY};
                if (Math.abs(iCutDimRightPointAX) > PERFECT_RANGE && Math.abs(iCutDimLeftPointBX) > PERFECT_RANGE) {//RIGHT
                    bRightEdgeCollision = true;

                    oStartCut = aCurrentStackSpecularEdges[1];

                    oPointCut = new CEdge(aCurrentStackSpecularEdges[1].getPointB().getX(), aCurrentStackSpecularEdges[1].getPointB().getY(),
                            aCurrentStackSpecularEdges[1].getPointA().getX(), aCurrentStackSpecularEdges[1].getPointA().getY(), aCurrentStackSpecularEdges[1].getInfo());

                    this.newEdgesPosition({right: aCurrentStackEdges[0], left: aCurrentStackEdges[1], distance: aCurrentStackSpecularEdges[1],
                                                            point1: {x: iCutDimRightPointAX, y: iCutDimRightPointAY}, point2: {x: iCutDimLeftPointBX, y: iCutDimLeftPointBY}});
                    bCut = true;
                }

            } else if (iCutDimRightPointBX !== 0 && iCutDimLeftPointAX !== 0) {

                oPointOffset = {x: iCutDimLeftPointAX, y: iCutDimLeftPointAY};
                if (Math.abs(iCutDimRightPointBX) > PERFECT_RANGE && Math.abs(iCutDimLeftPointAX) > PERFECT_RANGE) {
                    oStartCut = aCurrentStackSpecularEdges[0];
                    oPointCut = new CEdge(aCurrentStackSpecularEdges[0].getPointB().getX(), aCurrentStackSpecularEdges[0].getPointB().getY(),
                            aCurrentStackSpecularEdges[0].getPointA().getX(), aCurrentStackSpecularEdges[0].getPointA().getY(), aCurrentStackSpecularEdges[0].getInfo());
                    this.newEdgesPosition({right: aCurrentStackEdges[1], left: aCurrentStackEdges[0], distance: aCurrentStackSpecularEdges[0],
                        point1: {x: iCutDimRightPointBX, y: iCutDimRightPointBY}, point2: {x: iCutDimLeftPointAX, y: iCutDimLeftPointAY}});
                    bCut = true;
                }
            }
        } else {
            if (iCutDimRightPointAX !== 0 && iCutDimLeftPointBX !== 0) {//LEFT
                oPointOffset = {x: iCutDimLeftPointBX, y: iCutDimLeftPointBY};
                if (Math.abs(iCutDimRightPointAX) > PERFECT_RANGE && Math.abs(iCutDimLeftPointBX) > PERFECT_RANGE) {
                    oStartCut = aCurrentStackSpecularEdges[0];
                    oPointCut = new CEdge(aCurrentStackSpecularEdges[0].getPointB().getX(), aCurrentStackSpecularEdges[0].getPointB().getY(),
                            aCurrentStackSpecularEdges[0].getPointA().getX(), aCurrentStackSpecularEdges[0].getPointA().getY(), aCurrentStackSpecularEdges[0].getInfo());

                    this.newEdgesPosition({right: aCurrentStackEdges[0], left: aCurrentStackEdges[1], distance: aCurrentStackSpecularEdges[0],
                        point1: {x: iCutDimRightPointAX, y: iCutDimRightPointAY}, point2: {x: iCutDimLeftPointBX, y: iCutDimLeftPointBY}});

                    bCut = true;
                }
            } else if (iCutDimRightPointBX !== 0 && iCutDimLeftPointAX !== 0) {
                bRightEdgeCollision = true;
                oPointOffset = {x: iCutDimRightPointBX, y: iCutDimRightPointBY};
                if (Math.abs(iCutDimRightPointBX) > PERFECT_RANGE && Math.abs(iCutDimLeftPointAX) > PERFECT_RANGE) {
                    oPointCut = new CEdge(aCurrentStackSpecularEdges[1].getPointB().getX(), aCurrentStackSpecularEdges[1].getPointB().getY(),
                            aCurrentStackSpecularEdges[1].getPointA().getX(), aCurrentStackSpecularEdges[1].getPointA().getY(), aCurrentStackSpecularEdges[1].getInfo());

                    oStartCut = aCurrentStackSpecularEdges[1];
                    this.newEdgesPosition({right: aCurrentStackEdges[1], left: aCurrentStackEdges[0], distance: aCurrentStackSpecularEdges[1],
                        point1: {x: iCutDimRightPointBX, y: iCutDimRightPointBY}, point2: {x: iCutDimLeftPointAX, y: iCutDimLeftPointAY}});

                    bCut = true;
                }
            }
        }

        if (bCut) {
            this.cutStack(oStartCut, oPointCut, oPointOffset, bRightEdgeCollision);
        }


        return {result: true, point: oPointOffset, cut: bCut};
    };

    this.cutStack = function (oStartEdge, oPointsCut, oPointOffset, bRightCol) {
        var aEdges = new Array();

        switch (_oCurrentStack.getDirID()) {
            case 0:
            case 3:
                if (bRightCol) {
                    aEdges.push(new CEdge(oPointsCut.getPointA().getX(), oPointsCut.getPointA().getY(), oStartEdge.getPointB().getX(), oStartEdge.getPointB().getY()));
                    aEdges.push(new CEdge(oStartEdge.getPointB().getX(), oStartEdge.getPointB().getY(), oStartEdge.getPointA().getX(), oStartEdge.getPointA().getY()));
                    aEdges.push(new CEdge(oStartEdge.getPointA().getX(), oStartEdge.getPointA().getY(), oPointsCut.getPointB().getX(), oPointsCut.getPointB().getY()));
                    aEdges.push(new CEdge(oPointsCut.getPointB().getX(), oPointsCut.getPointB().getY(), oPointsCut.getPointA().getX(), oPointsCut.getPointA().getY()));
                } else {
                    aEdges.push(new CEdge(oStartEdge.getPointA().getX(), oStartEdge.getPointA().getY(), oPointsCut.getPointB().getX(), oPointsCut.getPointB().getY()));
                    aEdges.push(new CEdge(oPointsCut.getPointB().getX(), oPointsCut.getPointB().getY(), oPointsCut.getPointA().getX(), oPointsCut.getPointA().getY()));
                    aEdges.push(new CEdge(oPointsCut.getPointA().getX(), oPointsCut.getPointA().getY(), oStartEdge.getPointB().getX(), oStartEdge.getPointB().getY()));
                    aEdges.push(new CEdge(oStartEdge.getPointB().getX(), oStartEdge.getPointB().getY(), oStartEdge.getPointA().getX(), oStartEdge.getPointA().getY()));
                }
                break;
            case 1:
            case 2:
                if (bRightCol) {
                    aEdges.push(new CEdge(oStartEdge.getPointB().getX(), oStartEdge.getPointB().getY(), oStartEdge.getPointA().getX(), oStartEdge.getPointA().getY()));
                    aEdges.push(new CEdge(oStartEdge.getPointA().getX(), oStartEdge.getPointA().getY(), oPointsCut.getPointB().getX(), oPointsCut.getPointB().getY()));
                    aEdges.push(new CEdge(oPointsCut.getPointB().getX(), oPointsCut.getPointB().getY(), oPointsCut.getPointA().getX(), oPointsCut.getPointA().getY()));
                    aEdges.push(new CEdge(oPointsCut.getPointA().getX(), oPointsCut.getPointA().getY(), oStartEdge.getPointB().getX(), oStartEdge.getPointB().getY()));
                } else {

                    aEdges.push(new CEdge(oPointsCut.getPointB().getX(), oPointsCut.getPointB().getY(), oPointsCut.getPointA().getX(), oPointsCut.getPointA().getY()));
                    aEdges.push(new CEdge(oPointsCut.getPointA().getX(), oPointsCut.getPointA().getY(), oStartEdge.getPointB().getX(), oStartEdge.getPointB().getY()));
                    aEdges.push(new CEdge(oStartEdge.getPointB().getX(), oStartEdge.getPointB().getY(), oStartEdge.getPointA().getX(), oStartEdge.getPointA().getY()));
                    aEdges.push(new CEdge(oStartEdge.getPointA().getX(), oStartEdge.getPointA().getY(), oPointsCut.getPointB().getX(), oPointsCut.getPointB().getY()));
                }
                break;
        }

        var oInfo = {x: _oCurrentStack.getPos().x, y: _oCurrentStack.getPos().y, dir: NO_DIR};
        if (SHOW_CUT_EDGES) {
            for (var i = 0; i < aEdges.length; i++) {
                var oLineDraw = new createjs.Shape();
                oLineDraw.graphics.beginStroke(DEFAULT_COLOR[i]);
                oLineDraw.graphics.setStrokeStyle(LINES_WIDTH);
                oLineDraw.graphics.moveTo(aEdges[i].getPointA().getX(), aEdges[i].getPointA().getY());
                oLineDraw.graphics.lineTo(aEdges[i].getPointB().getX(), aEdges[i].getPointB().getY());

                var oCircle1 = new createjs.Shape();
                oCircle1.graphics.beginFill("#fff").drawCircle(aEdges[i].getPointA().getX(), aEdges[i].getPointA().getY(), 10);

                var oCircle2 = new createjs.Shape();
                oCircle2.graphics.beginFill("#000").drawCircle(aEdges[i].getPointB().getX(), aEdges[i].getPointB().getY(), 10);

                _oContainerStack.addChild(oLineDraw, oCircle2, oCircle1);

            }
        }

        var oCutStack = this.createStack(aEdges, {x: 0, y: 0}, oInfo, _oCurrentStack.getColor());

        if (oPointOffset.x < 0 && oPointOffset.y < 0) {
            oCutStack.setChildIndex(0);
        } else if (oPointOffset.x > 0 && oPointOffset.y < 0) {
            oCutStack.setChildIndex(0);
        }
        oCutStack.fallEffect();
    };

    this.newEdgesPosition = function (oEdgesMod) {
        oEdgesMod.right.set(oEdgesMod.right.getPointA().getX() - oEdgesMod.point1.x,
                oEdgesMod.right.getPointA().getY() - oEdgesMod.point1.y, oEdgesMod.right.getPointB().getX(),
                oEdgesMod.right.getPointB().getY());

        oEdgesMod.left.set(oEdgesMod.left.getPointA().getX(), oEdgesMod.left.getPointA().getY(),
                oEdgesMod.left.getPointB().getX() - oEdgesMod.point2.x, oEdgesMod.left.getPointB().getY() - oEdgesMod.point2.y);

        oEdgesMod.distance.set(oEdgesMod.left.getPointB().getX(), oEdgesMod.left.getPointB().getY(),
                oEdgesMod.right.getPointA().getX(), oEdgesMod.right.getPointA().getY());
    };

    this.checkIntersectionPoint = function (oPrevEdge, oCurentEdge) {
        var iRegOffsetHalf = 0;
        var oVec1 = new CVector2(0, 0);
        var oVec2 = new CVector2(0, 0);
        var oPrevEdgeOffset = new CEdge(oPrevEdge.getPointA().getX() + iRegOffsetHalf, oPrevEdge.getPointA().getY() + iRegOffsetHalf,
                oPrevEdge.getPointB().getX() + iRegOffsetHalf, oPrevEdge.getPointB().getY() + iRegOffsetHalf);

        var iResult = intersect2D_Segments(oPrevEdgeOffset, oCurentEdge, oVec1, oVec2);

        return {vec1: oVec1, vec2: oVec2, result: iResult};
    };

    this.createNewStack = function (aEdges, oOffset, bCut) {
        var oInfo;
        if (!bCut) {
            playSound("perfect", 1, false);
            _oCurrentStack.perfectPosition();
            _oCurrentStack.setPosition(_oPrevStack.getPos().x - _oOffset.x, (_oPrevStack.getPos().y - _oOffset.y) - STACK_DEPTH_SIZE);
            _oCurrentStack.updateEdgesPosition();
            oInfo = {x: _oCurrentStack.getPos().x + _oOffset.x - oOffset.x, y: _oCurrentStack.getPos().y - STACK_DEPTH_SIZE + _oOffset.y - oOffset.y, dir: STACKS_START_POSITION[_iStartPos].dir};
        } else {
            playSound("cut", 1, false);
            oInfo = {x: _oCurrentStack.getPos().x - oOffset.x, y: _oCurrentStack.getPos().y - STACK_DEPTH_SIZE - oOffset.y, dir: STACKS_START_POSITION[_iStartPos].dir};
        }
        _oOffset.x = oOffset.x;
        _oOffset.y = oOffset.y;

        var oCurrentStack = this.createStack(aEdges, oOffset, oInfo, {line: COLOR_GRADIENTS_STACKS[_iColorPos], plane: COLOR_GRADIENTS_STACKS[_iColorPos], width: LINES_WIDTH, depth: null});

        oCurrentStack.setLimitPosition(this.getLimitPos(oInfo));

        oCurrentStack.setPosition(oCurrentStack.getLimitPosition(3 - _iStartPos).x, oCurrentStack.getLimitPosition(3 - _iStartPos).y);
        _aStacks.push(oCurrentStack);

        _oPrevStack = _oCurrentStack;
        _oCurrentStack = oCurrentStack;
    };

    this.createStack = function (aEdges, oOffset, oInfo, oColor) {
        var oStackPos = _oCurrentStack.getPos();
        var aLocalEdges = new Array();
        for (var i = 0; i < aEdges.length; i++) {
            aLocalEdges[i] = new CEdge(aEdges[i].getPointA().getX() - oStackPos.x + oOffset.x, aEdges[i].getPointA().getY() - oStackPos.y + oOffset.y,
                    aEdges[i].getPointB().getX() - oStackPos.x + oOffset.x, aEdges[i].getPointB().getY() - oStackPos.y + oOffset.y, START_EDGES_POSITION[i].type);
        }

        var oStack = new CStack(oInfo, oColor, aLocalEdges, _oContainerStack);

        return oStack;
    };

    this.changeDirStack = function () {
        if (_iStartPos === 1) {
            _iStartPos = 0;
        } else {
            _iStartPos++;
        }
    };

    this.moveContainerStack = function () {
        _iContainerY += STACK_DEPTH_SIZE;
        createjs.Tween.get(_oContainerStack, {override: true}).to({y: _iContainerY}, MS_SCROLL_CONTAINER_STACK, createjs.Ease.cubicOut).call(function () {

        }, null, this);
    };

    this.getLimitPos = function (oPos) {
        var aLimitPosition = new Array();
        for (var i = 0; i < STACKS_LIMIT_POSITION.length; i++) {
            aLimitPosition.push({x: oPos.x + (DIRECTION_STACKS[i].x * STACKS_DISTANCE_OFFSET), y: oPos.y + (DIRECTION_STACKS[i].y * STACKS_DISTANCE_OFFSET)});
        }
        return aLimitPosition;
    };


    this.unload = function () {
        _bStartGame = false;

        _oInterface.unload();

        s_oStage.removeAllChildren();

        createjs.Tween.removeAllTweens();
    };

    this.onExit = function () {
        $(s_oMain).trigger("end_session");
        $(s_oMain).trigger("end_level", 1);
        var oParent = this;
        _oFade.visible = true;
        createjs.Tween.get(_oFade, {override: true}).to({alpha: 1}, MS_FADE_ANIM, createjs.Ease.cubicOut).call(function () {
            $(s_oMain).trigger("show_interlevel_ad");
            oParent.unload();
            setVolume("soundtrack", 1);
            s_oMain.gotoMenu();
        });
    };

    this._onStart = function () {
        _iGameState = STATE_PLAY;
        setVolume("soundtrack", SOUNDTRACK_VOLUME_IN_GAME);
    };

    this.restartGame = function () {
        _oFade.visible = true;
        createjs.Tween.get(_oFade, {ignoreGlobalPause: true, override: true}).to({alpha: 1}, MS_FADE_ANIM, createjs.Ease.cubicOut).call(function () {
            for (var i = 0; i < _aStacks.length; i++) {
                _aStacks[i].unload();
            }
            _aStacks = new Array();
            s_oGame.resetContainerStacks();
            _oPrevStack = null;
            _oOffset = {x: 0, y: 0};
            _iScore = 0;
            _oInterface.refreshScoreText(_iScore);
            s_oGame.restartColorGrandients();
            s_oGame.createStartStacks();
            s_oGame.startFade();
            _oInterface.refreshBestScore(s_iBestScore, false);
            _iGameState = STATE_PLAY;
        });
    };

    this.unpause = function (bVal) {
        _bStartGame = bVal;
        if (bVal === true) {

        } else {

        }
    };

    this._onEnd = function () {
        _oFade.visible = true;
        createjs.Tween.get(_oFade, {ignoreGlobalPause: true}).to({alpha: 1}, MS_FADE_ANIM, createjs.Ease.cubicOut).call(function () {
            s_oGame.unload();
            $(s_oMain).trigger("end_level", 1);
            $(s_oMain).trigger("end_session");
            setVolume("soundtrack", 1);
            s_oMain.gotoMenu();
        });
    };

    this._updatePlay = function () {
        if (_bStartGame) {
            _oCurrentStack.update(STACK_VELOCITY);
        }
    };

    this.update = function () {

        switch (_iGameState) {
            case STATE_INIT:

                break;
            case STATE_PLAY:
                this._updatePlay();
                break;
            case STATE_FINISH:

                break;
            case STATE_PAUSE:

                break;
        }
    };

    s_oGame = this;

    STACK_VELOCITY = oData.stack_velocity;
    NUM_LEVEL_FOR_ADS = oData.num_levels_for_ads;
    

    this._init();
}

var s_oGame;