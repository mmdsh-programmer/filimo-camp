var ON_PRESS_DOWN_TAP_ACTION = 0;
var ON_PRESS_MOVE_TAP_ACTION = 1;
var ON_PRESS_UP_TAP_ACTION   = 2;

var TRIGGER_PRESS_MOVE_DISTANCE_THRESHOLD = 4;

var ON_SWIPE_LEFT  = 0;
var ON_SWIPE_RIGHT = 1;
var ON_SWIPE_UP    = 2;
var ON_SWIPE_DOWN  = 3;

function CInputController(oParentContainer = s_oStage){
    var _oParent;
    var _oParentContainer;

    var _bInput;
    
    var _oAction;
    var _aListenerTapAction;
   
    var _pMouseDownPoint;
    var _pPrevMouseMovePoint;
    
    var _aKeyDown;
    var _aCbCompleted;
    var _aCbOwner;
    var _aParams;

    this._init = function(oParentContainer){
        _bInput = true;

        _aKeyDown = new Array();
        _aCbCompleted = new Array();
        _aCbOwner = new Array();
        _aParams = new Array();
        
        _oParentContainer = oParentContainer;
        
        _aListenerTapAction = {};
        
        _pMouseDownPoint = {x: 0, y:0};
        
        _pPrevMouseMovePoint = {x: 0, y:0};
    };
    
    this.setInput = function(bInput){
        _bInput = bInput;
    };
    
    this.onMouseDownAction = function(e){
         if (!_bInput ){ 
            return;
        }

        _pPrevMouseMovePoint.x = _pMouseDownPoint.x = e.stageX;
        _pPrevMouseMovePoint.y = _pMouseDownPoint.y = e.stageY;
    };
    
    this.onPressMoveAction = function(e){
        if (!_bInput ){ 
            return;
        }
        
        var iXDist = _pPrevMouseMovePoint.x - e.stageX;
        var iYDist = _pPrevMouseMovePoint.y - e.stageY;
        
        _pPrevMouseMovePoint.x = e.stageX;
        _pPrevMouseMovePoint.y = e.stageY;
        
        var iDir = null;
        
        if(Math.abs(iXDist) >= TRIGGER_PRESS_MOVE_DISTANCE_THRESHOLD){
            iDir = iXDist > 0 ? ON_SWIPE_LEFT : ON_SWIPE_RIGHT;
        }else if(Math.abs(iYDist) >= TRIGGER_PRESS_MOVE_DISTANCE_THRESHOLD){
            iDir = iYDist > 0 ? ON_SWIPE_UP : ON_SWIPE_DOWN;
        }
        
        if(iDir !== null){
            _aParams[ON_PRESS_MOVE_TAP_ACTION] = {dir: iDir, offset: {x: iXDist, y: iYDist}};
            this.triggerEvent(ON_PRESS_MOVE_TAP_ACTION);
        }
    };
    
    this.onPressUpAction = function(){
        if (!_bInput ){ 
            return;
        }
        
        this.triggerEvent(ON_PRESS_UP_TAP_ACTION);
    };
    
    this.unload = function(){
       
    };

    this.triggerEvent = function(iEvent){
       var bEventExists = _aCbCompleted[iEvent];
        if(bEventExists)
        {
            _aCbCompleted[iEvent].call(_aCbOwner[iEvent], _aParams[iEvent]);
        }
        return bEventExists;
    };
  
    this.addEventListener = function (iEvent, cbCompleted, cbOwner, aParams){
        _aCbCompleted[iEvent] = cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
        _aParams[iEvent] = aParams;
    };
    
    _oParent = this;
    this._init(oParentContainer);
    
}
