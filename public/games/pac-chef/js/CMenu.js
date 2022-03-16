function CMenu(){
    var INCREASE_X = 8;
    
    var _bUpdate = false;
    var _bAttacking;
    var _iTimeElaps;
    var _pStartPos;
    var _pEndPos;
    var _aEnemies;
    var _oHero;

    var _oButPlay;
    var _oCreditsBut;
    
    var _fRequestFullScreen = null;
    var _fCancelFullScreen = null;
    var _oBg;
    var _oAudioToggle;
    var _oButFullscreen;
    var _oButDelete;
    var _oAreYouSurePanel;
    var _oMaskCharacters;
    
    var _pStartPosAudio;
    var _pStartPosCredits;
    var _pStartPosFullscreen;
    var _pStartPosDelete;
    
    this._init = function(){
        _bUpdate = false;
        _bAttacking = false;
        _iTimeElaps = 0;

        _oBg = createBitmap(s_oSpriteLibrary.getSprite('bg_menu'));
        s_oStage.addChild(_oBg);
        
        var oSpriteStart = s_oSpriteLibrary.getSprite('but_play');
        _oButPlay = new CGfxButton(CANVAS_WIDTH/2,CANVAS_HEIGHT/2 + 210,oSpriteStart,s_oStage);
        _oButPlay.addEventListener(ON_MOUSE_UP, this._onStart, this);
        _oButPlay.pulseAnimation();
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            var oSprite = s_oSpriteLibrary.getSprite('audio_icon');
            _pStartPosAudio = {x: CANVAS_WIDTH - (oSprite.height/2) - 10, y: (oSprite.height/2) + 10};
            
            _oAudioToggle = new CToggle(_pStartPosAudio.x,_pStartPosAudio.y,oSprite,s_bAudioActive,s_oStage);
            _oAudioToggle.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);    
        }
        
        var oSprite = s_oSpriteLibrary.getSprite('but_credits');
        _pStartPosCredits = {x: (oSprite.width/2) + 10, y: (oSprite.height/2) + 10};            
        _oCreditsBut = new CGfxButton(_pStartPosCredits.x,_pStartPosCredits.y,oSprite, s_oStage);
        _oCreditsBut.addEventListener(ON_MOUSE_UP, this._onCreditsBut, this);
        
        var doc = window.document;
        var docEl = doc.documentElement;
        _fRequestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        _fCancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

        if(ENABLE_FULLSCREEN === false){
            _fRequestFullScreen = false;
        }

        if (_fRequestFullScreen && screenfull.isEnabled){
            oSprite = s_oSpriteLibrary.getSprite("but_fullscreen")
            _pStartPosFullscreen = {x:_pStartPosCredits.x + oSprite.width/2 + 10,y:(oSprite.height/2) + 10};
            _oButFullscreen = new CToggle(_pStartPosFullscreen.x,_pStartPosFullscreen.y,oSprite,s_bFullscreen, s_oStage);
            _oButFullscreen.addEventListener(ON_MOUSE_UP,this._onFullscreenRelease,this);
        }
        
        var oSpriteDelete = s_oSpriteLibrary.getSprite("but_delete");
        _pStartPosDelete = {x:oSpriteDelete.width/2 + 10,y:CANVAS_HEIGHT - oSpriteDelete.height/2 - 10};
        _oButDelete = new CGfxButton(_pStartPosDelete.x,_pStartPosDelete.y,oSpriteDelete,s_oStage);
        _oButDelete.addEventListener(ON_MOUSE_UP,this._onDelete,this);
        
        var oExitDoor = createBitmap(s_oSpriteLibrary.getSprite("exit_door_left"));
        oExitDoor.x = 470;
        oExitDoor.y = 916;
        s_oStage.addChild(oExitDoor);
        
        var oExitDoor = createBitmap(s_oSpriteLibrary.getSprite("exit_door_right"));
        oExitDoor.x = 1390;
        oExitDoor.y = 916;
        s_oStage.addChild(oExitDoor);
        
        _oMaskCharacters = new createjs.Shape();
        _oMaskCharacters.graphics.beginFill("rgba(255,255,0,0.01)").drawRect(470, 850, 980, 150);
        s_oStage.addChild(_oMaskCharacters);
        
        _pStartPos = {x:1430,y:CANVAS_HEIGHT/2-25};
        _pEndPos = {x:500,y:CANVAS_HEIGHT/2-25};
        _oHero = new CHero(_pStartPos.x,_pStartPos.y,0,0,s_oStage);
        
        
        _aEnemies = new Array();
        var iX = _pStartPos.x + 80;
        for(var k=0;k<3;k++){
            _aEnemies[k] = new CEnemy(k,iX,_pStartPos.y,0,0,s_oStage);
            _aEnemies[k].setMask(_oMaskCharacters);
            
            iX += 80;
        }

        _oHero.setMask(_oMaskCharacters);

        this.refreshButtonPos();
        
        this._resetCharacters();
        
        _oAreYouSurePanel = new CAreYouSurePanel(s_oStage);
        _oAreYouSurePanel.addEventListener(ON_BUT_YES_DOWN,this.onConfirmDelete,this);

        if(!s_bStorageAvailable){
            new CMsgBox();
        }else{
            var szFlag = getItem(PREFIX_GAME+"level");
            if(szFlag !== null && szFlag !== undefined){
                s_iLastLevel = parseInt(getItem(PREFIX_GAME+"level"));
            }else{
                saveItem(PREFIX_GAME+"level", 1);
            }
        }
        
        var oFade = new createjs.Shape();
        oFade.graphics.beginFill("black").drawRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
        s_oStage.addChild(oFade);
        
        createjs.Tween.get(oFade).to({alpha:0}, 1000).call(function(){oFade.visible = false;}); 
        
        _bUpdate = true;
        
        if(!s_bMobile){
            document.onkeydown = this._onKeyDown; 
        }
    };  
    
    this.unload = function(){
        _bUpdate = false;
        _oButPlay.unload();
        _oCreditsBut.unload();
        
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.unload();
            _oAudioToggle = null;
        }
        
        if (_fRequestFullScreen && screenfull.isEnabled){
                _oButFullscreen.unload();
        }
        
        if(!s_bMobile){
            document.onkeydown = null; 
        }
        
        s_oMenu = null;
        s_oStage.removeAllChildren();        
    };
    
    this.refreshButtonPos = function(){
        if(DISABLE_SOUND_MOBILE === false || s_bMobile === false){
            _oAudioToggle.setPosition(_pStartPosAudio.x - s_iOffsetX,s_iOffsetY + _pStartPosAudio.y);
        }        
        
        if (_fRequestFullScreen && screenfull.isEnabled){
                _oButFullscreen.setPosition(_pStartPosFullscreen.x + s_iOffsetX, _pStartPosFullscreen.y + s_iOffsetY);
        }
        
        _oCreditsBut.setPosition(_pStartPosCredits.x + s_iOffsetX,s_iOffsetY + _pStartPosCredits.y);
        _oButDelete.setPosition(_pStartPosDelete.x + s_iOffsetX,_pStartPosDelete.y - s_iOffsetY);
    };
    
    this._onKeyDown = function(evt){

        if (!evt) {  
            evt = window.event; 
        }
        
        if(evt.keyCode === KEY_SPACEBAR || evt.keyCode === KEY_ENTER) {    
            s_oMenu._onStart();
            evt.preventDefault();
            return false;
        }
    }
    
    this._resetCharacters = function(){
        if(_bAttacking){
            var iX = _pStartPos.x;
            for(var i=0;i<3;i++){
                _aEnemies[i].setX(iX);
                _aEnemies[i].setUpdate(true);
                _aEnemies[i].playAnim(DIR_LEFT,ANIM_ESCAPE);

                iX += 80;
            }
            
            _oHero.setX(iX);
            _oHero.playAnim(DIR_LEFT,ANIM_ATTACK);
        }else{
            _oHero.setX(_pStartPos.x);
            
            var iX = _pStartPos.x + 80;
            for(var i=0;i<_aEnemies.length;i++){
                _aEnemies[i].setX(iX);
                _aEnemies[i].setUpdate(true);
                _aEnemies[i].playAnim(DIR_LEFT,ANIM_WALK);

                iX += 80;
            }
        
            _oHero.playAnim(DIR_LEFT,ANIM_WALK);
            
        }
        
        _bAttacking = !_bAttacking;
    };

    this._onStart = function(){
        $(s_oMain).trigger("start_session");
        s_oMenu.unload();
        s_oMain.gotoLevelPanel();
    };
    
    this._onAudioToggle = function(){
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive;
    };
    
    this._onCreditsBut = function(){
        new CCreditsPanel();
    };
    
    this.resetFullscreenBut = function(){
        if (_fRequestFullScreen && screenfull.isEnabled){
            _oButFullscreen.setActive(s_bFullscreen);
        }
    };
        
    this._onFullscreenRelease = function(){
	if(s_bFullscreen) { 
		_fCancelFullScreen.call(window.document);
	}else{
		_fRequestFullScreen.call(window.document.documentElement);
	}
	
	sizeHandler();
    };
    
    this._onDelete = function(){
        _oAreYouSurePanel.show(TEXT_CONFIRM_DELETE,40);
    };
    
    this.onConfirmDelete = function(){
        clearLocalStorage();
    };
    
    this.update = function(){
        if(_bUpdate === false){
            return; 
        }
        
        
        _oHero.increaseX(-INCREASE_X);
        for(var k=0;k<3;k++){
            _aEnemies[k].increaseX(-INCREASE_X);
        }
        
        if(_oHero.getX() < 0){
            this._resetCharacters();
        }
    };
    
    s_oMenu = this;        
    this._init();
    
    
};

var s_oMenu = null;