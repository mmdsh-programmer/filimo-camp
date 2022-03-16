function CCell(iX,iY,iRow,iCol,iIndex,oParentContainer){
    var _iRow = iRow;
    var _iCol = iCol;
    var _iStartX;
    var _iStartY;
    var _iIndex = iIndex;
    var _szTag;
    var _aAdjacents;
    var _pStartPos;
    var _oSprite;

    var _oParentContainer = oParentContainer;
    
    this._init = function(iX,iY,iIndex){
        
        _iStartX = iX;
        _iStartY = iY;
        
        if(iIndex >= 43){
            if(iIndex === 43){
                var oSpriteItem = s_oSpriteLibrary.getSprite("exit_door_left");
            }else{
                var oSpriteItem = s_oSpriteLibrary.getSprite("exit_door_right");
            }

            _oSprite = createBitmap(oSpriteItem);
            _oSprite.regX = oSpriteItem.width/2;
            _oSprite.regY = oSpriteItem.height/2;
            _oSprite.x = iX;
            _oSprite.y = iY;
            oParentContainer.addChild(_oSprite);
            
            _szTag = CELL_EMPTY;
        }else{
            var oData = {   
                        images: [s_oSpriteLibrary.getSprite("walls")], 
                        // width, height & registration point of each sprite
                        frames: {width: CELL_SIZE, height: CELL_SIZE,regX:CELL_SIZE/2,regY:CELL_SIZE/2},
                        animations:{piece_0:0,
                                    piece_1:1,
                                    piece_2:2,
                                    piece_3:3,
                                    piece_4:4,
                                    piece_5:5,
                                    piece_6:6,
                                    piece_7:7,
                                    piece_8:8,
                                    piece_9:9,
                                    piece_10:10,
                                    piece_11:11,
                                    piece_12:12,
                                    piece_13:13,
                                    piece_14:14,
                                    piece_15:15,
                                    piece_16:16,
                                    piece_17:17,
                                    piece_18:18,
                                    piece_19:19,
                                    piece_20:20,
                                    piece_21:21,
                                    piece_22:22,
                                    piece_23:23,
                                    piece_24:24,
                                    piece_25:25,
                                    piece_26:26,
                                    piece_27:27,
                                    piece_28:28,
                                    piece_29:29,
                                    piece_30:30,
                                    piece_31:31,
                                    piece_32:32,
                                    piece_33:33,
                                    piece_34:34,
                                    piece_35:35,
                                    piece_36:36,
                                    piece_37:37,
                                    piece_38:38,
                                    piece_39:39,
                                    piece_40:40,
                                    piece_41:41,
                                    piece_42:42,
                                    empty:43}
                   };
                   
            var oSpriteSheet = new createjs.SpriteSheet(oData);

            var szLabel = "piece_"+iIndex;

            if(iIndex <0){
                szLabel = "empty";
                _szTag = CELL_EMPTY;
            }else if(iIndex<22){
                _szTag = CELL_WALL;
            }else if(iIndex === 22){
                _szTag = CELL_EMPTY;
            }else if(iIndex === SYMBOL_COIN){
                _szTag = CELL_CHEESE;
            }else{
                _szTag = CELL_INGREDIENT;
            }
            
            _oSprite = createSprite(oSpriteSheet, szLabel,CELL_SIZE/2,CELL_SIZE/2,CELL_SIZE,CELL_SIZE);
            _oSprite.x = iX;
            _oSprite.y = iY;
            _oSprite.stop();
            _oParentContainer.addChild(_oSprite);
        }
        
        _pStartPos = {x:_oSprite.x,y:_oSprite.y};

        //STORE ADJACENTS ROW COLUMNS
        _aAdjacents = new Array({row:_iRow,col:_iCol});
        if(_iRow-1>0){
            _aAdjacents.push({row:_iRow-1,col:_iCol});
        }
        
        if(_iCol+1 < GRID_COLS){
            _aAdjacents.push({row:_iRow,col:_iCol+1});
        }
        
        if(_iRow+1 < GRID_ROWS){
            _aAdjacents.push({row:_iRow+1,col:_iCol});
        }
        
        if(_iCol-1 >0){
            _aAdjacents.push({row:_iRow,col:_iCol-1});
        }
    };
    
    this.reset = function(){
        _oSprite.x = _iStartX;
        _oSprite.y = _iStartY;
    };
    
    this.setEmpty = function(){
        _szTag = CELL_EMPTY;
        _oSprite.gotoAndStop("empty");
    };
    
    this.setIndex = function(){
        
    };
    
    this.openDoor = function(){
        createjs.Tween.get(_oSprite).to({x:_oSprite.x - CELL_SIZE}, 1500).call(function(){
                                                                                s_oGame.startEnemies();
                                                                            });
    };
    
    this.getX = function(){
        return _pStartPos.x;
    };
    
    this.getY = function(){
        return _pStartPos.y;
    };
    
    this.getRow = function(){
        return _iRow;
    };
    
    this.getCol = function(){
        return _iCol;
    };
    
    this.getTag = function(){
        return _szTag;
    };
    
    this.getIndex = function(){
        return _iIndex;
    };
    
    this.isWalkable = function(){
        return _szTag===CELL_WALL?false:true;
    };
    
    this.getAdjacents = function(){
        return _aAdjacents;
    };
    
    this._init(iX,iY,iIndex);
}