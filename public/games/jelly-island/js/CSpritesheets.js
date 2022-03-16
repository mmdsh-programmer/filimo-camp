function CSpriteSheets(){
    
    this._init = function(){        
        this.changingNum(CONFIG[s_iCurLevel].numfaces -1);  
    };
    
    this.changingNum = function(iNum){
        var iNumChangingItem = iNum;
        var oSprite = s_oSpriteLibrary.getSprite('jelly');
        var oData = {   
                        images: [oSprite], 
                        // width, height & registration point of each sprite
                        frames: {width: CELL_SIZE, height: CELL_SIZE, regX: CELL_SIZE/2, regY: CELL_SIZE/2}, 
                        animations: {type_0:[0], type_1:[1], type_2:[2], type_3:[3], type_4:[4], type_5:[5], type_6:[6], type_7:[7], star:[8], bomb:[9], clock:[10], changing:[0,iNumChangingItem,"changing",JELLY_CHANGING_SPEED]}
                   };

        s_oJellySpriteSheet = new createjs.SpriteSheet(oData);
    }; 
    
    this._init();
}

var s_oJellySpriteSheet;