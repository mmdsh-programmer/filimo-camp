function CAreYouSurePanel(oConfirmFunction, oNegateFunction) {

    var _oTitle;
    var _oButYes;
    var _oButNo;
    var _oPanelContainer;
    var _oParent;
    
    var _pStartPanelPos;
    var _oListenerPanel;

    this._init = function (oConfirmFunction, oNegateFunction) {
        
        _oPanelContainer = new createjs.Container();        
        s_oStage.addChild(_oPanelContainer);
        
        var oSprite = s_oSpriteLibrary.getSprite('msg_box');
        var oPanel = createBitmap(oSprite);        
        oPanel.regX = oSprite.width/2;
        oPanel.regY = oSprite.height/2;
        _oListenerPanel =  _oPanelContainer.on("mousedown",function(){});
        _oPanelContainer.addChild(oPanel);
        
        _oPanelContainer.x = CANVAS_WIDTH/2;
        _oPanelContainer.y = CANVAS_HEIGHT/2;  
        
        var iX = 0;
        var iY = -200;
        var iWidth = 700;
        var iHeight = 300;
        
        _oTitle = new CTLText(_oPanelContainer, 
                    iX-iWidth/2, iY-iHeight/2, iWidth, iHeight, 
                    90, "center", PRIMARY_FONT_COLOR, PRIMARY_FONT, 1.1,
                    0, 0,
                    TEXT_SURE,
                    true, true, true,
                    false );
        
        _oButYes = new CGfxButton(150, 80, s_oSpriteLibrary.getSprite('but_check'), _oPanelContainer);
        _oButYes.addEventListener(ON_MOUSE_UP, this._onButYes, this);

        _oButNo = new CGfxButton(-150, 80, s_oSpriteLibrary.getSprite('but_exit_big'), _oPanelContainer);
        _oButNo.addEventListener(ON_MOUSE_UP, this._onButNo, this);
        _oButNo.pulseAnimation();
    };

    this._onButYes = function () {

        _oParent.unload();
        if(oConfirmFunction){
            oConfirmFunction();
        }
    };

    this._onButNo = function () {
        
        _oParent.unload();
        if(oNegateFunction){
            oNegateFunction();
        }
    };

    this.changeMessage = function(szText, iY){
        
        _oTitle.refreshText(szText);
        
      
        _oTitle.setY(iY);
    };

    this.setOneButton = function(){
        _oButNo.setVisible(false);
        _oButYes.setPosition(-40, 250);
        _oButYes.pulseAnimation();
    };

    this.unload = function () {
        _oButNo.unload();
        _oButYes.unload();

        s_oStage.removeChild(_oPanelContainer);
        
        _oPanelContainer.off("mousedown",_oListenerPanel);
        _oPanelContainer.removeAllEventListeners();
    };

    _oParent = this;
    this._init(oConfirmFunction, oNegateFunction);
}

