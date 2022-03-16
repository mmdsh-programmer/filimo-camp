function CTextButton(iXPos, iYPos, oSprite, szText, szFont, szColor, iFontSize, szAlign, iPaddingX, iPaddingY, oParentContainer){
    var _bDisable;
    var _iCurScale;
    var _iWidth;
    var _iHeight;
    var _aCbCompleted;
    var _aCbOwner;
    var _oListenerDown;
    var _oListenerUp;
    var _oListenerOver;
    var _oListenerOut;
    var _oParams;
    
    var _oButton;

    var _oText;
    var _oTextOutline;
    var _oButtonBg;
    var _oParentContainer = oParentContainer;
    
    var _bPulse;
    
    
    this._init = function(iXPos,iYPos,oSprite,szText,szFont,szColor,iFontSize,szAlign,iPaddingX, iPaddingY){
        _bDisable = false;
        _bPulse = false;
        _iCurScale = 1;
        _aCbCompleted=new Array();
        _aCbOwner =new Array();

        _oButtonBg = createBitmap( oSprite);
	_iWidth = oSprite.width;
        _iHeight = oSprite.height;

        _oButton = new createjs.Container();
        _oButton.x = iXPos;
        _oButton.y = iYPos;
        _oButton.regX = oSprite.width/2;
        _oButton.regY = oSprite.height/2;
	if (!s_bMobile){
            _oButton.cursor = "pointer";
	}
        _oButton.addChild(_oButtonBg);

        _oParentContainer.addChild(_oButton);
        
        _oText = new CTLText(_oButton, 
                    iPaddingX, iPaddingY, oSprite.width, oSprite.height, 
                    iFontSize, szAlign, szColor, szFont, 1,
                    30, 5,
                    szText,
                    true, true, true,
                    false );
        
        this._initListener();
    };
    
    this.unload = function(){
       _oButton.off("mousedown", _oListenerDown);
       _oButton.off("pressup" , _oListenerUp); 
       if(!s_bMobile){
            _oButton.off("mouseover",_oListenerOver);
            _oButton.off("mouseout", _oListenerOut);
        }
       
       createjs.Tween.removeTweens(_oButton);
       
       _oParentContainer.removeChild(_oButton);
    };
    
    this.setVisible = function(bVisible){
        _oButton.visible = bVisible;
    };
    
    this.setAlign = function(szAlign){
        _oText.textAlign = szAlign;
    };
    
    this.setTextX = function(iX){
        _oText.x = iX;
    };
    
    this.setScale = function(iScale){
        _oButton.scaleX = _oButton.scaleY = iScale;
        _iCurScale = iScale;
    };
    
    this.block = function(bVal){
        _bDisable = bVal;
    };
    
    this._initListener = function(){
       _oListenerDown = _oButton.on("mousedown", this.buttonDown);
       _oListenerUp = _oButton.on("pressup" , this.buttonRelease);     
       if(!s_bMobile){
            _oListenerOver = _oButton.on("mouseover", this.buttonOver, this);
            _oListenerOut = _oButton.on("mouseout", this.buttonOut, this);
        }     
    };
    
    this.addEventListener = function( iEvent,cbCompleted, cbOwner ){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner; 
    };
    
    this.addEventListenerWithParams = function(iEvent,cbCompleted, cbOwner,oParams){
        _aCbCompleted[iEvent]=cbCompleted;
        _aCbOwner[iEvent] = cbOwner;
        
        _oParams = oParams;
    };
    
    this.buttonRelease = function(){
        if(_bDisable){
            return;
        }
        
        playSound("click",1,false);
        
        _oButton.scaleX = _iCurScale;
        _oButton.scaleY = _iCurScale;
        
        if(_aCbCompleted[ON_MOUSE_UP]){
            _aCbCompleted[ON_MOUSE_UP].call(_aCbOwner[ON_MOUSE_UP],_oParams);
        }
    };
    
    this.buttonDown = function(){
        if(_bDisable){
            return;
        }
        _oButton.scaleX = _iCurScale*0.9;
        _oButton.scaleY = _iCurScale*0.9;

       if(_aCbCompleted[ON_MOUSE_DOWN]){
           _aCbCompleted[ON_MOUSE_DOWN].call(_aCbOwner[ON_MOUSE_DOWN]);
       }
    };
    
    this.buttonOver = function(evt){
        if(_bDisable){
            return;
        }
        evt.target.cursor = "pointer";

        playSound("click", 1, false);
       
        if(_bPulse){
           createjs.Tween.removeTweens(_oButton);
        }
        
        createjs.Tween.get(_oButton, {override:true}).to({scaleX: 0.9, scaleY: 0.9}, 200, createjs.Ease.quadOut);
    };
    
    this.buttonOut = function(){    
        if(_bDisable){
            return;
        }
        
        createjs.Tween.get(_oButton).to({scaleX: 1, scaleY: 1}, 500, createjs.Ease.quadIn)
                      .call(function(){
  
                            if(_bPulse){
                                    this.pulseAnimation();
                                }
                        }, null, this);
        
    };
    
    this.setPosition = function(iXPos,iYPos){
        _oButton.x = iXPos;
        _oButton.y = iYPos;
    };
    
    this.tweenPosition = function(iXPos,iYPos,iTime,iDelay,oEase,oCallback,oCallOwner){
        createjs.Tween.get(_oButton).wait(iDelay).to({x:iXPos,y:iYPos}, iTime,oEase).call(function(){
            if(oCallback !== undefined){
                oCallback.call(oCallOwner);
            }
        }); 
    };
    
    this.pulseAnimation = function () {
        _bPulse = true;
        createjs.Tween.get(_oButton, {loop: true}).to({scaleX: 0.9, scaleY: 0.9}, 850, createjs.Ease.quadOut).to({scaleX: 1, scaleY: 1}, 650, createjs.Ease.quadIn);
    };
    
    this.changeText = function(szText){

        _oText.refreshText(szText);
    };
    
    this.setX = function(iXPos){
        _oButton.x = iXPos;
    };
    
    this.setY = function(iYPos){
        _oButton.y = iYPos;
    };

    this.getX = function(){
        return _oButton.x;
    };
    
    this.getY = function(){
        return _oButton.y;
    };
    
    this.getContainer = function(){
        return _oButton;
    };
    
    this.getScale = function(){
        return _oButton.scaleX;
    };

    this._init(iXPos,iYPos,oSprite,szText,szFont,szColor,iFontSize,szAlign,iPaddingX, iPaddingY);
}