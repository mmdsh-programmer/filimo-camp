var DELAY_COMBO_MATCHING_SOUND = 150;
var RESET_TIMER = 1000;
var NUM_BREAK_SOUNDS = 5;
var BREAK_VOLUME_SOUND = [0.6, 0.6, 0.6, 0.6, 1];

function CSoundMatching(){
  
    var _iNumCombo;
    
    this._init = function(){        
        this.reset();        
    };
    
    this.fallPieces = function(){
        if(!soundPlaying('fall_0')){
            playSound('fall_0', 1, false);
        }
    };
    
    this.reset = function(){
        _iNumCombo = 0;
    };
    
    this.triggerComboSound = function(){
        playSound("break_" + _iNumCombo, BREAK_VOLUME_SOUND[_iNumCombo],false); 
        if(_iNumCombo >= NUM_BREAK_SOUNDS-1){
            _iNumCombo = NUM_BREAK_SOUNDS-1;
        }else{
            _iNumCombo++;
        }
    };
    
    this._init();
};