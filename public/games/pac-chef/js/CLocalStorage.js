var PREFIX_GAME = "pacchef_";

function setLocalStorageLevel(iLevel){
    if(s_iLastLevel < iLevel){
        s_iLastLevel = iLevel;
        saveItem(PREFIX_GAME+"level", s_iLastLevel);
    }
};

function setLocalStorageScore(iCurScore,iLevel){
    saveItem(PREFIX_GAME+"score_level_"+iLevel, iCurScore);
};

function setLocalStorageLives(iLives,iLevel){
    saveItem(PREFIX_GAME+"lives_level_"+iLevel, iLives);
};

function clearLocalStorage(){
    s_iLastLevel = 1;
    if(s_bStorageAvailable){
        localStorage.clear();
    }
};

function getScoreTillLevel(iLevel){
    if(!s_bStorageAvailable){
        return 0;
    }

    var iScore = 0;
    for(var i=0;i<iLevel-1;i++){
        iScore += parseInt(getItem(PREFIX_GAME+"score_level_"+(i+1) ));
    }

    return iScore;
};

function getLives(iLevel){
    if(!s_bStorageAvailable){
        return NUM_LIVES;
    }
    
    var iLives = getItem(PREFIX_GAME+"lives_level_"+(iLevel) );
    
    if(iLives !== null){
        return parseInt(iLives);
    }
    
    return NUM_LIVES;
}