function CGame(iLevel,iScore,iLives){
    var _bUpdate;
    var _szPrevAction;
    var _bPowerUpActive;
    var _iScore;   
    var _iCurLevel;
    var _iCurLevelScore;
    var _iDir;
    var _iTimePowerUp;
    var _iItemToCatch;
    var _iCurLives;
    var _iStartingLives;
    var _szAction;
    var _aGridCells;
    var _aIngredients;
    var _aLives;
    var _aEnemies;
    var _aWalkableCells;
    var _oGridForPathfinding;
    var _oFinderController;
    var _oHammer;
    
    var _oHero;
    var _oContainerScore;
    var _oContainerIngredients;
    var _oScoreNum;
    var _oLevelText;
    var _oCurEnemyEntryCell;
    var _oContainerLives;
    var _oContainerGrid;
    var _oContainerWalls;
    var _oContainerDoors;
    var _oContainerItems;
    var _oContainerCharacters;
    var _oContainerWallFg;
    var _oInterface;
    var _oHelpPanel;
    var _oAreYouSurePanel;
    var _oNextLevelPanel = null;
    var _oGameOverPanel;
    var _oWinPanel;
    var _oMsgBoxIngredients;
    
    this._init = function(iLevel,iScore,iLives){
        setVolume("soundtrack",SOUNDTRACK_VOLUME_IN_GAME);
        
        
        _iScore = iScore;
        _iCurLevel = iLevel;
        _iCurLives = _iStartingLives = iLives;

        this.reset();
        
        var oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_game'));
        s_oStage.addChild(oBg); 
        
        this._initGrid();
        this._calculateItemToCatch();
        this._initCharacters();
        
        _oInterface = new CInterface();
        
        _oHelpPanel = new CHelpPanel();
        
        
        _oAreYouSurePanel = new CAreYouSurePanel(s_oStage);
        _oAreYouSurePanel.addEventListener(ON_BUT_YES_DOWN,this.onConfirmExit,this);
        
        _oGameOverPanel = new CEndPanel();
        _oGameOverPanel.addEventListener(ON_BACK_MENU,this.onConfirmExit,this);
        _oGameOverPanel.addEventListener(ON_RESTART,this._restartLevel,this);
        
        _oNextLevelPanel = new CNextLevelPanel();
        _oNextLevelPanel.addEventListener(ON_BACK_MENU,this.onConfirmExit,this);
        _oNextLevelPanel.addEventListener(ON_RESTART,this._restartLevel,this);
        _oNextLevelPanel.addEventListener(ON_NEXT,this._nextLevel,this);
        
        _oWinPanel = new CWinPanel();
        _oWinPanel.addEventListener(ON_BACK_MENU,this.onConfirmExit,this);
        _oWinPanel.addEventListener(ON_RESTART,this._restartLevel,this);

        if(!s_bMobile){
            document.onkeydown = this._onKeyDown; 
        }else{
            _oHammer = new Hammer(s_oCanvas);

            _oHammer.get('swipe').set({direction: Hammer.DIRECTION_ALL});
            _oHammer.get('swipe').set({velocity: 0.005});
            _oHammer.get('swipe').set({threshold: 0.1});

            _oHammer.on("swipeleft", function () {
                _szPrevAction = "left";
            });
            _oHammer.on("swiperight", function () {
                _szPrevAction = "right";
            });
            _oHammer.on("swipeup", function () {
                _szPrevAction = "up";
            });
            _oHammer.on("swipedown", function () {
                _szPrevAction = "down";
            });
        }
        
        this.refreshButtonPos();
        
        this._initPathfindingGrid();
        
        if(s_bFirstPlay){
            s_bFirstPlay = false;
            _oHelpPanel.show();
        }else{
            this.prepareStartLevel(true);
        }

    };
    
    
    this.unload = function(){
        _oInterface.unload();
        _oNextLevelPanel.unload();
        _oGameOverPanel.unload();
        _oWinPanel.unload();
        
        _oHelpPanel.unload();
        
        if(!s_bMobile){
            document.onkeydown = null; 
        }
        
        
        s_oGame = null;
        createjs.Tween.removeAllTweens();
        s_oStage.removeAllChildren(); 
    };
    
    this.refreshButtonPos = function(){
        this.refreshGridScale();
        
        _oInterface.refreshButtonPos();
    };
    
    this.reset = function(){
        _bUpdate = false;
        _bPowerUpActive = false;
        _szPrevAction = "";
        _szAction = "";
        _iDir = 0;
        _iCurLevelScore = 0;
    };

    this._restartAfterDeath = function(){
        _iDir = 0;
        _szAction = "";
        _oHero.reset();
        
        for(var i=0;i<_aEnemies.length;i++){
            _aEnemies[i].reset();
        }
        
        _oCurEnemyEntryCell.reset();
    };
    
    this._nextLevel = function(){
        _iCurLevel++;
        _iStartingLives = _iCurLives;

        this._prepareLevel();
    };
    
    this._restartLevel = function(){
        $(s_oMain).trigger("restart_level",_iCurLevel);
        this.refreshScore(-_iCurLevelScore);
        
        _iCurLives = _iStartingLives;
        for(var i=0;i<_iCurLives;i++){
            _aLives[i].visible= true;
        }
        
        this._prepareLevel();
    };
    
    this._prepareLevel = function(){
        $(s_oMain).trigger("start_level",_iCurLevel);
        
        _oContainerWalls.removeAllChildren();
        _oContainerDoors.removeAllChildren();
        _oContainerItems.removeAllChildren();
        _oContainerWallFg.removeAllChildren();
    
        this._prepareCells();
        this._calculateItemToCatch();
        this._initPathfindingGrid();
        
        //RESET HERO
        var iRow = PLAYER_START[_iCurLevel-1].row;
        var iCol = PLAYER_START[_iCurLevel-1].col;
        _oHero.setStart(_aGridCells[iRow][iCol].getX(),_aGridCells[iRow][iCol].getY(),iRow,iCol);
        
        
        //RESET ENEMIES
        for(var k=0;k<_aEnemies.length;k++){
            _aEnemies[k].unload();
        }
        
        var aPos = ENEMY_START[_iCurLevel-1];
        _aEnemies = new Array();
        for(var i=0;i<aPos.length;i++){
            var iRandType = Math.floor(Math.random() * (ENEMY_TYPES));
            var iRow = aPos[i].row;
            var iCol = aPos[i].col;
            var oEnemy = new CEnemy(iRandType,_aGridCells[iRow][iCol].getX(),_aGridCells[iRow][iCol].getY(),iRow,iCol,_oContainerCharacters);
            
            _aEnemies.push(oEnemy);
        }
        
        _oContainerWalls.updateCache();
        
        this.reset();
        
        this.refreshIngredients();
        
        this._restartAfterDeath();
        
        _oLevelText.refreshText( sprintf(TEXT_LEVEL, _iCurLevel) );
        
        this.prepareStartLevel(true);
    };
    
    this.prepareStartLevel = function(bShowIngredients){
        if(bShowIngredients){
            _oMsgBoxIngredients = new CMsgBoxIngredients(_iCurLevel-1);
        }else{
            this.startLevel();
        }
    };
    
    this.startLevel = function(){
        var oReadyText = new createjs.Text(TEXT_READY,"40px "+FONT, "#fff");
        oReadyText.x = _oContainerGrid.getBounds().width/2-20;
        oReadyText.y = 635;
        oReadyText.textAlign = "center";
        oReadyText.textBaseline = "alphabetic";
        _oContainerGrid.addChild(oReadyText);

        playSound("ready_go",1,false);
        createjs.Tween.get(oReadyText).wait(1500).to({alpha:0}, 400).call(function(){
                                                                                _oCurEnemyEntryCell.openDoor();
                                                                                _bUpdate = true;
                                                                            });
    };
    
    this._onKeyDown = function(evt){
        if(_bUpdate === false){
           if(evt.keyCode === KEY_SPACEBAR || evt.keyCode === KEY_ENTER) {    

                if(_oHelpPanel.isShown()) {  
                    _oHelpPanel._onStart();   
                }
            }
            evt.preventDefault();
            return false;
        }
        
        
        if (!evt) {  
            evt = window.event; 
        }
        
        switch(evt.keyCode) {    
            case LEFT_DIR: {
                _szPrevAction = "left";
                evt.preventDefault();
                return false;
            };
            case TOP_DIR: {
                _szPrevAction = "up";
                evt.preventDefault();
                return false;
            };      
            case RIGHT_DIR: {
                _szPrevAction = "right";
                evt.preventDefault();
                return false;
            };
            case BOTTOM_DIR: {
                _szPrevAction = "down";
                evt.preventDefault();
                return false;
            };
            case KEY_ESC:{
                s_oGame.onExit();
                evt.preventDefault();
                return false;
            }
            
        }

    }
    
    this.refreshGridScale = function(){
        if(s_bLandscape){
            var iGUIHeight = 160;
            s_iScaleFactor=1
            var iMaxGridSizeHeight = (CANVAS_HEIGHT - (s_iOffsetY*2))  - iGUIHeight;
            var iRefGridSizeY = (CELL_SIZE*GRID_ROWS);
            
            CUR_GRID_SCALE = iMaxGridSizeHeight/iRefGridSizeY;
        } else {
            var iGUIHeight = 300;
            
            var iMaxGridSizeHeight = (CANVAS_HEIGHT - (s_iOffsetY*2))  - iGUIHeight;
            var iMaxGridSizeWidth = (CANVAS_WIDTH - (s_iOffsetX*2));
            
            
            var iMinDim = Math.min(iMaxGridSizeHeight, iMaxGridSizeWidth);
            var iRefGridSizeX = (CELL_SIZE*GRID_COLS);

            CUR_GRID_SCALE = iMinDim/iRefGridSizeX;
            
        }
        
        CUR_GRID_SCALE = parseFloat(CUR_GRID_SCALE.toFixed(2));
        _oContainerGrid.scaleX = _oContainerGrid.scaleY = CUR_GRID_SCALE;
        
        _oContainerWalls.updateCache();
    };
    
    this._initGrid = function(){
        _oContainerGrid = new createjs.Container();
        _oContainerGrid.x = GRID_X + CELL_SIZE/2;
        _oContainerGrid.y = GRID_Y + CELL_SIZE/2;
        s_oStage.addChild(_oContainerGrid);
        
        _oContainerDoors = new createjs.Container();
        _oContainerGrid.addChild(_oContainerDoors);
        
        _oContainerWalls = new createjs.Container();
        _oContainerGrid.addChild(_oContainerWalls);
        
        _oContainerItems = new createjs.Container();
        _oContainerGrid.addChild(_oContainerItems);
        
        _oContainerCharacters = new createjs.Container();
        _oContainerGrid.addChild(_oContainerCharacters);
        
        _oContainerWallFg = new createjs.Container();
        _oContainerGrid.addChild(_oContainerWallFg);
        
        
        
        this._prepareCells();
        
        
        //SCORE CONTAINER
        _oContainerScore = new createjs.Container();
        _oContainerGrid.addChild(_oContainerScore);
        
        
        var oSpriteScoreBg = s_oSpriteLibrary.getSprite('score_bg');
        var oScoreBg = createBitmap(oSpriteScoreBg);
        _oContainerScore.addChild(oScoreBg);
        
        var iWidth = oSpriteScoreBg.width-40;
        var iHeight = 30;
        var iX = 20;
        var iY = oSpriteScoreBg.height/2-12;
        _oScoreNum = new CTLText(_oContainerScore, 
                    iX, iY-iHeight/2, iWidth, iHeight, 
                    30, "left", "#fff", FONT, 1,
                    2, 2,
                    sprintf(TEXT_SCORE, _iScore),
                    true, true, false,
                    false );
       
        var iWidth = oSpriteScoreBg.width-40;
        var iHeight = 30;
        var iX = 20;
        var iY = oSpriteScoreBg.height/2+20;
        _oLevelText = new CTLText(_oContainerScore, 
                    iX, iY-iHeight/2, iWidth, iHeight, 
                    30, "left", "#deecf8", FONT, 1,
                    2, 2,
                    sprintf(TEXT_LEVEL, _iCurLevel),
                    true, true, false,
                    false );

        _oContainerScore.x =  0;
        _oContainerScore.y =  -oSpriteScoreBg.height - 30;
        
        //LIVES CONTAINER
        _oContainerLives = new createjs.Container();
        _oContainerGrid.addChild(_oContainerLives);
        
        _aLives = new Array();
        var iXPos = 0;
        var oSpriteLife = s_oSpriteLibrary.getSprite("life");
        for(var i=0;i<_iCurLives;i++){
            _aLives[i] = createBitmap(oSpriteLife);
            _aLives[i].x = iXPos;
            _oContainerLives.addChild(_aLives[i]);
            
            iXPos += oSpriteLife.width + 10;
        }
        
        
        
        _oContainerLives.x = _oContainerScore.x + oSpriteScoreBg.width + 50;
        _oContainerLives.y = -oSpriteLife.height - 30;
        
        
        //INGREDIENTS CONTAINER
        _oContainerIngredients = new createjs.Container();
        _oContainerIngredients.x = 1000;
        _oContainerIngredients.y = -CELL_SIZE-10
        _oContainerGrid.addChild(_oContainerIngredients);
        
        this.refreshIngredients();
        
        _oContainerGrid.regX = GRID_WIDTH/2;
        _oContainerGrid.regY = (GRID_HEIGHT-oSpriteScoreBg.height)/2 ;
        _oContainerWalls.cache(-CELL_SIZE/2,-CELL_SIZE/2,GRID_WIDTH,GRID_HEIGHT)
    };
    
    this.refreshIngredients = function(){
        _oContainerIngredients.removeAllChildren();
        
        _aIngredients = new Array();
        var iXPos = 0;
        for(var k=0;k<RECIPE_INGREDIENTS[_iCurLevel-1].length;k++){
           
           var oBmp = new CIngredient(iXPos,0,RECIPE_INGREDIENTS[_iCurLevel-1][k],_oContainerIngredients);
           oBmp.setState(false);
           
            iXPos += CELL_SIZE +10;
            _aIngredients.push(oBmp);
        }
        
        _oContainerIngredients.regX = _oContainerIngredients.getBounds().width;
    };
    
    this._prepareCells = function(){
        var aGridValues = LEVEL_INFOS[_iCurLevel-1].split("#");
        _aGridCells = new Array();
        var iX = 0;
        var iY = 0;
        var iCont=0;
        for(var i=0;i<GRID_ROWS;i++){
            _aGridCells[i] = new Array();
            for(var j=0;j<GRID_COLS;j++){
                var iValue = Number(aGridValues[iCont]);

                var oCell;

                if(iValue === ENEMY_ENTRY_TYPE){
                    oCell = new CCell(iX,iY,i,j,iValue,_oContainerDoors);
                }else if(iValue < SYMBOL_COIN){
                    oCell = new CCell(iX,iY,i,j,iValue,_oContainerWalls);
                }else if(iValue >= SYMBOL_COIN){
                    oCell = new CCell(iX,iY,i,j,iValue,_oContainerItems);
                }else{
                    oCell = new CCell(iX,iY,i,j,iValue,_oContainerWallFg);
                }
                _aGridCells[i][j] = oCell;

                if(iValue === ENEMY_ENTRY_TYPE){
                    _oCurEnemyEntryCell = oCell;
                }

                iX += CELL_SIZE;
                
                iCont++;
            }
            
            iX = 0;
            iY += CELL_SIZE;
        }
    };
    
    this._calculateItemToCatch = function(){
        _iItemToCatch = 0;
        for(var i=0;i<GRID_ROWS;i++){
            for(var j=0;j<GRID_COLS;j++){
                if(_aGridCells[i][j].getTag() === CELL_CHEESE || _aGridCells[i][j].getTag() === CELL_INGREDIENT){
                    _iItemToCatch++;
                }
            }
        }
    };
    
    this._initCharacters = function(){
        var iRow = PLAYER_START[_iCurLevel-1].row;
        var iCol = PLAYER_START[_iCurLevel-1].col;
        _oHero = new CHero(_aGridCells[iRow][iCol].getX(),_aGridCells[iRow][iCol].getY(),iRow,iCol,_oContainerCharacters);
        
        
        //ATTACH ENEMIES
        var aPos = ENEMY_START[_iCurLevel-1];
        _aEnemies = new Array();
        for(var i=0;i<aPos.length;i++){
            var iRandType = Math.floor(Math.random() * (ENEMY_TYPES));
            var iRow = aPos[i].row;
            var iCol = aPos[i].col;
            var oEnemy = new CEnemy(iRandType,_aGridCells[iRow][iCol].getX(),_aGridCells[iRow][iCol].getY(),iRow,iCol,_oContainerCharacters);
            
            _aEnemies.push(oEnemy);
        }
    };
    
    this._initPathfindingGrid = function(){
        _oGridForPathfinding = new PF.Grid(GRID_ROWS,GRID_COLS);
        
        _aWalkableCells = new Array();
        for(var i=0;i<GRID_ROWS;i++){
            for(var j=0;j<GRID_COLS;j++){
                var bWalkable = _aGridCells[i][j].isWalkable();
                _oGridForPathfinding.setWalkableAt(i, j, bWalkable);
                
                if(bWalkable){
                    _aWalkableCells.push({row:i,col:j});
                }
            }
        }
        
        _oFinderController = new PF.AStarFinder();
    };
        
    
    this.startEnemies = function(){        
        for(var i=0;i<_aEnemies.length;i++){
            this.getNewEnemyPath(_aEnemies[i],STATE_ENEMY_IDLE);
        }
    };
    
    this._convertPathIntoCoordinates = function(aPath){
        //CONVERT ROW COLS IN XY POSITIONS
        var aConvertedPath = new Array();
        for(var k=0;k<aPath.length;k++){
            var aPos = aPath[k];
            aConvertedPath.push({x:_aGridCells[aPos[0]][aPos[1]].getX(),y:_aGridCells[aPos[0]][aPos[1]].getY()});
        }
        
        return aConvertedPath;
    };
    
    this.getNewEnemyPath = function(oEnemy,iEnemyState){
        var aPath;
        
        var iCont = 0;
        do{
            var oGridBackup = _oGridForPathfinding.clone();
            switch(iEnemyState){
                case STATE_ENEMY_IDLE:{
                        var iRand = Math.floor(Math.random()*_aWalkableCells.length);

                        aPath = _oFinderController.findPath(oEnemy.getRow(), oEnemy.getCol(), _aWalkableCells[iRand].row,_aWalkableCells[iRand].col , oGridBackup);
                        break;
                }
                case STATE_ENEMY_FOLLOW:{
                        aPath = _oFinderController.findPath(oEnemy.getRow(), oEnemy.getCol(), _oHero.getRow(), _oHero.getCol(), oGridBackup);
                        break;
                }
                case STATE_ENEMY_ESCAPE:{
                        var iRand = this._findCellFarFromHero();
                        aPath = _oFinderController.findPath(oEnemy.getRow(), oEnemy.getCol(), _aWalkableCells[iRand].row,_aWalkableCells[iRand].col , oGridBackup);
                        break;
                }
                
            }
            iCont++;
            
        }while(aPath.length<3 && iCont<100 && iEnemyState !== STATE_ENEMY_FOLLOW);
        
        
        if(iCont >= 100){
            var iRand = Math.floor(Math.random()*_aWalkableCells.length);
            var oGridBackup = _oGridForPathfinding.clone();
            aPath = _oFinderController.findPath(oEnemy.getRow(), oEnemy.getCol(), _aWalkableCells[iRand].row,_aWalkableCells[iRand].col , oGridBackup);
            iEnemyState = STATE_ENEMY_IDLE;
        }
        var aConvertedPath = this._convertPathIntoCoordinates(aPath);
        
        oEnemy.setPath(aPath,aConvertedPath,iEnemyState);
    };
    
    this.getEnemyPathToStartPos = function(oEnemy){
        var oGridBackup = _oGridForPathfinding.clone();
        var aPath = _oFinderController.findPath(oEnemy.getRow(), oEnemy.getCol(),oEnemy.getStartingRow(),oEnemy.getStartingCol() ,oGridBackup);
        
        var aConvertedPath = this._convertPathIntoCoordinates(aPath);
        oEnemy.setPath(aPath,aConvertedPath,STATE_ENEMY_IDLE);
    };
    
    this._findCellFarFromHero = function(){
        do{
            var iRand = Math.floor(Math.random()*_aWalkableCells.length);
            var iRow = _aWalkableCells[iRand].row;
            var iCol = _aWalkableCells[iRand].col;
        }while( Math.abs(iRow - _oHero.getRow() ) < 4  || Math.abs(iCol - _oHero.getCol() ) < 4);
        
        return iRand;
    };
    
    this.characterCell = function () {
        var bFlag = false;
        for (var i = -1; i < 2; i++) {
            var iR = _oHero.getRow() + i;
            if (iR > 0 && iR < GRID_ROWS) {
                for (var j = 0; j < GRID_COLS; j++) {
                    var bCollide = collisionWithCircle(_oHero, _aGridCells[iR][j], 0.05);
                    
                    if (bCollide === true) {
                        bFlag = true;
                        _oHero.setCol(_aGridCells[iR][j].getCol());
                        _oHero.setRow(_aGridCells[iR][j].getRow());
                        
                        if (_aGridCells[iR][j].getTag() === CELL_CHEESE){
                            this._collectItem(iR,j);
                        }else if(_aGridCells[iR][j].getTag() === CELL_INGREDIENT){
                            this._collectPowerUp(iR,j,_aGridCells[iR][j].getIndex());
                        }

                        break;
                    } 
                }
            }
        }

        if (bFlag) {
            this.prevDirection();
        }
    };
    
    this.prevDirection = function () {

        var iColLeft = _oHero.getCol() - 1;
        var iColRight = _oHero.getCol() + 1;
        var iRowUp = _oHero.getRow() - 1;
        var iRowDown = _oHero.getRow() + 1;

        if(iColLeft < 0){
            if(_szAction === "left"){
                _oHero.setCol(GRID_COLS-1);
                _oHero.setPos(_aGridCells[_oHero.getRow()][GRID_COLS-1].getX(),_aGridCells[_oHero.getRow()][GRID_COLS-1].getY());
            }
            return;
        }else if(iColRight === GRID_COLS){
            if(_szAction === "right"){
                _oHero.setCol(0);
                _oHero.setPos(_aGridCells[_oHero.getRow()][0].getX(),_aGridCells[_oHero.getRow()][0].getY());
            }
            return;
        }
    
        if (_aGridCells[_oHero.getRow()][iColLeft].getTag() !== CELL_WALL) {
            this.prevAction("left");
        } else {
            this.prevCollision("left");
        }
        if (_aGridCells[_oHero.getRow()][iColRight].getTag() !== CELL_WALL) {
            this.prevAction("right");
        } else {
            this.prevCollision("right");
        }

        if (_aGridCells[iRowUp][_oHero.getCol()].getTag() !== CELL_WALL) {
            this.prevAction("up");
        } else {
            this.prevCollision("up");
        }
        if (_aGridCells[iRowDown][_oHero.getCol()].getTag() !== CELL_WALL) {
            this.prevAction("down");
        } else {
            this.prevCollision("down");
        }
    };
    
    this.prevCollision = function (szState) {
        if (_szAction === szState && _bUpdate){
            _iDir = 0;
            _oHero.playAnim(_oHero.getCurSpriteIndex(),_bPowerUpActive?ANIM_ATTACK:ANIM_IDLE);
            _szAction = "";
        }
    };
    
    this.prevAction = function (szPrev) {
        if (_szPrevAction === szPrev) {
            this._control(_szPrevAction);
            _szPrevAction = "";
        }
    };
    
    this._control = function (szAction) {
        if (_szAction === szAction) {
            return;
        }

        switch (szAction) {
            case "right":
                if (_bPowerUpActive === false)
                    this.setCharacterState(DIR_RIGHT, ANIM_WALK, "right", 1);
                else
                    this.setCharacterState(DIR_RIGHT, ANIM_ATTACK, "right", 1);
                break;
            case "left":{
                if (_bPowerUpActive === false)
                    this.setCharacterState(DIR_LEFT, ANIM_WALK, "left", -1);
                else
                    this.setCharacterState(DIR_LEFT, ANIM_ATTACK, "left", -1);
                break;
            }
            case "up":{
                if (_bPowerUpActive === false)
                    this.setCharacterState(DIR_TOP, ANIM_WALK, "up", -1);
                else
                    this.setCharacterState(DIR_TOP, ANIM_ATTACK, "up", -1);
                break;
            }
            case"down":{
                if (_bPowerUpActive === false)
                    this.setCharacterState(DIR_BOTTOM, ANIM_WALK, "down", 1);
                else
                    this.setCharacterState(DIR_BOTTOM, ANIM_ATTACK, "down", 1);
                break;
            }
        }
    };
    
    this.pauseCharacterAnims = function(){
        _bUpdate = false;
        
        _oHero.pauseAnim(true);
        for(var i=0;i<_aEnemies.length;i++){
            _aEnemies[i].pauseAnim(true);
        }
    };
    
    this.unpauseCharacterAnims = function(){
        _bUpdate = true;
        
        _oHero.pauseAnim(false);
        for(var i=0;i<_aEnemies.length;i++){
            _aEnemies[i].pauseAnim(false);
        }
    };
    
    this.setCharacterState = function (iVal, szState, szAction, iDir) {
        _szAction = szAction;

        _iDir = iDir;
        _oHero.playAnim(iVal,szState);
    };
    
    this._collectItem = function(iRow,iCol){
        _aGridCells[iRow][iCol].setEmpty();
        
        this.refreshScore(POINT_PER_ITEM);
        
        playSound("hero_eating",1,false);
        
        _iItemToCatch--;
        if(_iItemToCatch === 0){
            //LEVEL CLEARED
            this._endLevel();
        }
    };
    
    this._collectPowerUp = function(iRow,iCol,iIndexCell){
        _aGridCells[iRow][iCol].setEmpty();
        
        this.refreshScore(POINT_PER_POWERUP);
        playSound("hero_powerup",1,false);
        
        //HIGHLIGHT COLLECTED INGREDIENT
        for(var k=0;k<_aIngredients.length;k++){
            if(iIndexCell === RECIPE_INGREDIENTS[_iCurLevel-1][k]){
                var pStartPos = {x:_aGridCells[iRow][iCol].getX(),y:_aGridCells[iRow][iCol].getY()}
                var pEndPos = {x:_oContainerIngredients.x +  ((CELL_SIZE +10)*k) - _oContainerIngredients.regX,y:_oContainerIngredients.y};
                var oMovingIngredient = new CIngredient(pStartPos.x,pStartPos.y,iIndexCell,_oContainerGrid);
                
                createjs.Tween.get(oMovingIngredient.getSprite()).to({x:pEndPos.x,y:pEndPos.y,scale:1}, 2000,createjs.Ease.cubicOut).call(function(){
                    _aIngredients[k].setState(true);
                    oMovingIngredient.unload();
                    
                    createjs.Tween.get(_aIngredients[k].getSprite()).to({scale:1.3},300,createjs.Ease.cubicOut).to({scale:1},300,createjs.Ease.cubicIn);
                });
                
                break;
            }
        }
        
        _iItemToCatch--;
        if(_iItemToCatch === 0){
            //LEVEL CLEARED
            this._endLevel();
            return;
        }
        
        

        if(_bPowerUpActive){
             _iTimePowerUp = 0;
             _oHero.clearIntervalAnim();
        }else{
            this.pauseCharacterAnims();
            _oHero.catchPowerUp(true);

            for(var i=0;i<_aEnemies.length;i++){
                _aEnemies[i].playAnim(_aEnemies[i].getCurSpriteIndex(),ANIM_ESCAPE);
            }
        }
        
    };
    
    this._endPowerupEffect = function(){
        //this.pauseCharacterAnims();
        _oHero.catchPowerUp(false);
        
        for(var i=0;i<_aEnemies.length;i++){
            if(_aEnemies[i].isDeath() === false){
                _aEnemies[i].playAnim(_aEnemies[i].getCurSpriteIndex(),ANIM_WALK);
            }
        }
        
        playSound("hero_powerup_off",1,false);
    };
    
    this.resumeFromPowerUpAnim = function(){
        this.unpauseCharacterAnims();

        _iTimePowerUp = 0;
        _bPowerUpActive = !_bPowerUpActive;
        
        if(_bPowerUpActive){
            _oHero.playAnim(_oHero.getCurSpriteIndex(),ANIM_ATTACK);
        }else{
            _oHero.playAnim(_oHero.getCurSpriteIndex(),ANIM_WALK);
        }
        
        _bUpdate = true;
    };
    
    this.refreshScore = function(iAmount){
        _iScore += iAmount;
        _iCurLevelScore += iAmount;
        
        _oScoreNum.refreshText( sprintf(TEXT_SCORE, _iScore) );
    };
    
    this._endLevel = function(){
        $(s_oMain).trigger("end_level",_iCurLevel);
        $(s_oMain).trigger("save_score",_iScore);
        
        _bUpdate = false;
        setLocalStorageScore(_iCurLevelScore,_iCurLevel);
        
        
        if(_iCurLevel === NUM_LEVELS){
            _oNextLevelPanel.show(_iCurLevel,_iScore,_iCurLevelScore,true);
        }else{
            setLocalStorageLevel(_iCurLevel+1);
            setLocalStorageLives(_iCurLives,_iCurLevel+1);
            
            _oNextLevelPanel.show(_iCurLevel,_iScore,_iCurLevelScore,false);
        }
    };
    
    this.onExit = function(){
        _oAreYouSurePanel.show(TEXT_ARE_YOU_SURE,90);
    };
    
    this.onConfirmExit = function(){
        this.unload();
        
        $(s_oMain).trigger("show_interlevel_ad");
        $(s_oMain).trigger("end_session");
        
        s_oMain.gotoMenu();
    };

    this.gameOver = function(){   
        _oGameOverPanel.show(_iScore,_iCurLevelScore);
    };
    
    this._checkCollision = function(oEnemy){
        var iDist = distance(oEnemy.getPos(),_oHero.getPos() );

        if(iDist < COLLISION_DIST){
            if(_bPowerUpActive){
                //ENEMY DEATH
                oEnemy.death();
                this.refreshScore(POINT_KILL_ENEMY);
            }else{
                //PLAYER DEATH
                _bUpdate= false;
                _oHero.playAnim(_oHero.getCurSpriteIndex(),ANIM_DIE);
                playSound("hero_death",1,false);
            }
        }
    };
    
    this.checkDistFromPlayer = function(oEnemy){
        var iDist = distance(oEnemy.getPos(),_oHero.getPos() );
        if(oEnemy.getState() === STATE_ENEMY_IDLE && iDist < FOLLOW_DIST){

            if(_bPowerUpActive === false){
                this.getNewEnemyPath(oEnemy,STATE_ENEMY_FOLLOW);
            }else{
                this.getNewEnemyPath(oEnemy,STATE_ENEMY_ESCAPE);
            }
            return true;
        }
        
        return false;
    };
    
    this.loseLife = function(){
        _iCurLives--;
        _aLives[_iCurLives].visible = false;
        
        if(_iCurLives === 0){
            $(s_oMain).trigger("end_level",_iCurLevel);
            this.gameOver();
        }else{
            this._restartAfterDeath();
            this.prepareStartLevel(false);
        }
    };
    
    this._manageCharactersDepth = function(){
        var sortFunction = function(obj1, obj2, options) {
            if (obj1.y > obj2.y) { return 1;}
            if (obj1.y < obj2.y) { return -1;}
            return 0;
        };
        
        _oContainerCharacters.sortChildren(sortFunction);
    };
    
    this.isPowerUpActive = function(){
        return _bPowerUpActive;
    };
    
    
    this.update = function(){
        if(!_bUpdate){
            return;
        }
        
        this._manageCharactersDepth();
        
        this.characterCell();
        _oHero.update(_iDir, _szAction);
        
        for(var i=0;i<_aEnemies.length;i++){
            if(_aEnemies[i].update()){
                this._checkCollision(_aEnemies[i]);
            }
        }
        
        if(_bPowerUpActive){
            _iTimePowerUp += s_iTimeElaps;
            
            if(_iTimePowerUp > TIME_POWERUP){
                _iTimePowerUp = 0;
                this._endPowerupEffect();
            }
        }
    };

    s_oGame = this;
    
    this._init(iLevel,iScore,iLives);
}

var s_oGame = null;
