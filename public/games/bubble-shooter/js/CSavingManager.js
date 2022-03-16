function CSavingManager(szTag){
    
    var _szTag;
    var _aCbCompleted;
    var _aCbOwner;
    
    this._init = function(szTag){
        try{
            localStorage.setItem("ls_available","ok");
        }catch(evt){
            // localStorage not defined
            s_bStorageAvailable = false;
        }
        
        _szTag = szTag;
        _aCbCompleted=new Array();
        _aCbOwner =new Array();
        
        this.loadLocalStorage();
    };
    
    this.addEventListener = function( iEvent,cbCompleted, cbOwner ){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner; 
    };
    
    this.loadLocalStorage = function(){
        if(!s_bStorageAvailable){
            s_iLastLevel = 1;
            return;
        }
        
        var szFlag = localStorage.getItem(_szTag+"_level");
        if(szFlag !== null && szFlag !== undefined){
            s_iLastLevel = parseInt(localStorage.getItem(_szTag+"_level"));
        }else{
            localStorage.setItem(_szTag+"_level", 1);
        }
    };
    
    this.setLocalStorageLevel = function(iLevel){
        if(!s_bStorageAvailable){
            return;
        }
        
        if(s_iLastLevel < iLevel){
            s_iLastLevel = iLevel;
            localStorage.setItem(_szTag+"_level", s_iLastLevel);
        }
    };

    this.setLocalStorageScore = function(iCurScore,iLevel){
        if(!s_bStorageAvailable){
            return;
        }
        localStorage.setItem(_szTag + "_score_level_"+iLevel, iCurScore);
    };
    
    this.clearLocalStorage = function(){
        if(!s_bStorageAvailable){
            return;
        }
        
        s_iLastLevel = 1;
        localStorage.clear();
    };
    
    this.levelSelected = function(iLevel){
        if(iLevel >= s_iLastLevel){
            s_iLastLevel = iLevel;
        }
        
        var iScore = 0;
        if(s_bStorageAvailable){
            iScore = this.getScoreTillLevel(iLevel);
        }
        
        if(_aCbCompleted[ON_LEVEL_SELECTED]){
            _aCbCompleted[ON_LEVEL_SELECTED].call(_aCbOwner[ON_LEVEL_SELECTED],iLevel,iScore);
        }
    };
    
    this.getScoreTillLevel = function(iLevel){        
        var iScore = 0;
        for(var i=0;i<iLevel-1;i++){
            iScore += parseInt(localStorage.getItem(_szTag+"_score_level_"+(i+1) ));
        }
        
        return iScore;
    };
    
    this._init(szTag);
}

var s_iLastLevel = 1;
var s_bStorageAvailable = true;