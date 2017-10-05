
/* Sets variables */
var $extensionTop        = document.getElementById('baselinerTop');
var $extensionLeft       = document.getElementById('baselinerLeft');
var $extensionBaseline   = document.getElementById('baselinerValue');
var $extensionBtnRemove  = document.getElementById('btnRemoveBaseliner');
var $extensionBtnApply   = document.getElementById('btnApplyBaseliner');
var $arrowtopUp          = document.getElementById('topUp');
var $arrowtopDown        = document.getElementById('topDown');
var $arrowleftUp         = document.getElementById('leftUp');
var $arrowleftDown       = document.getElementById('leftDown');
var $arrowbaseUp         = document.getElementById('baseUp');
var $arrowbaseDown       = document.getElementById('baseDown');
var $extensionOpacity    = document.getElementById('baselinerOpacity');
var $arrowOpacityUp      = document.getElementById('opacityUp');
var $arrowOpacityDown    = document.getElementById('opacityDown');
var $baselinerColor      = document.getElementById('baselinerColor');
var $forceHeight         = document.getElementById('forceHeight');


/* Runs Baseliner script on tab */
chrome.tabs.executeScript(null, {file: "baseliner.js"}, function(currentValues){
    if (!!currentValues[0]){
        // currentValues is either the default or the current values on data-attribs
        $extensionBaseline.value = currentValues[0][0];
        $extensionTop.value = currentValues[0][1];
        $extensionLeft.value = currentValues[0][2];
        $baselinerColor.value  = currentValues[0][3];
        $extensionOpacity.value = currentValues[0][4];
        $forceHeight.checked = currentValues[0][5];
    }

    chrome.tabs.executeScript({code: 'Baseliner.checkForBaselinerInStorage()'});
});


/* Listening to messages, in this case, for Storage update */
chrome.runtime.onMessage.addListener(
  function(request) {console.log(request);
    if (request.data) {
        $extensionBaseline.value = request.data.baseline;
        $extensionTop.value = request.data.top;
        $extensionLeft.value = request.data.left;
        $baselinerColor.value  = request.data.color;
        $extensionOpacity.value = request.data.opacity;
        $forceHeight.checked = request.data.forceHeight;
    }
});



/* Executes || Updates Baseliner */
var updatesBaseliner = function(event){
    // If Up/Down arrow pressed...
    if (event.keyIdentifier === 'Up' && event.target === $extensionTop) $extensionTop.value++;
    if (event.keyIdentifier === 'Down' && event.target === $extensionTop) $extensionTop.value--;
    if (event.key === "ArrowUp" && event.target === $extensionTop) $extensionTop.value++;
    if (event.key === "ArrowDown" && event.target === $extensionTop) $extensionTop.value--;
    if (event.keyIdentifier === 'Up' && event.target === $extensionLeft) $extensionLeft.value++;
    if (event.keyIdentifier === 'Down' && event.target === $extensionLeft) $extensionLeft.value--;
    if (event.key === "ArrowUp" && event.target === $extensionLeft) $extensionLeft.value++;
    if (event.key === "ArrowDown" && event.target === $extensionLeft) $extensionLeft.value--;
    if (event.keyIdentifier === 'Up' && event.target === $extensionBaseline) $extensionBaseline.value++;
    if (event.keyIdentifier === 'Down' && event.target === $extensionBaseline) $extensionBaseline.value--;
    if (event.key === "ArrowUp" && event.target === $extensionBaseline) $extensionBaseline.value++;
    if (event.key === "ArrowDown" && event.target === $extensionBaseline && $extensionBaseline.value > 2) $extensionBaseline.value--;
    if (event.keyIdentifier === 'Up' && event.target === $extensionOpacity && $extensionOpacity.value < 100) $extensionOpacity.value++;
    if (event.keyIdentifier === 'Down' && event.target === $extensionOpacity && $extensionOpacity.value > 0) $extensionOpacity.value--;
    if (event.key === "ArrowUp" && event.target === $extensionOpacity && $extensionOpacity.value < 100) $extensionOpacity.value++;
    if (event.key === "ArrowDown" && event.target === $extensionOpacity && $extensionOpacity.value > 0) $extensionOpacity.value--;
    if (event.keyIdentifier === 'setColor') $baselinerColor.value = event.color;

    // Set my initial vars with integers
    var newTop = $extensionTop.value;
    var newLeft = $extensionLeft.value;
    var newBase = $extensionBaseline.value;
    var newColor = $baselinerColor.value;
    var newOpacity = $extensionOpacity.value;
    var newForce = $forceHeight.checked;

    console.log('updatesBaseliner');

    // Executes Baseliner update script
    chrome.tabs.executeScript({
        code: 'Baseliner.update(' + newBase + ',' + newTop + ',' + newLeft + ',"' + newColor + '",' + newOpacity + ',' + newForce + ')'
    });
};


/* Executes removeRules */
var removeBaseliner = function(){
    chrome.tabs.executeScript({
        code: 'Baseliner.removeRules()'
    });
};


/* Set event listeners on form fields */
$extensionBaseline.addEventListener('input', updatesBaseliner);
$extensionBaseline.addEventListener('keydown', updatesBaseliner);
$extensionTop.addEventListener('input', updatesBaseliner);
$extensionTop.addEventListener('keydown', updatesBaseliner);
$extensionLeft.addEventListener('input', updatesBaseliner);
$extensionLeft.addEventListener('keydown', updatesBaseliner);
$extensionOpacity.addEventListener('input', updatesBaseliner);
$extensionOpacity.addEventListener('keydown', updatesBaseliner);
$forceHeight.addEventListener('change', updatesBaseliner);
$extensionBtnRemove.addEventListener('click', removeBaseliner);
$extensionBtnApply.addEventListener('click', updatesBaseliner);


/* Event Listeners for arrows */
$arrowtopUp.addEventListener('click', function(){
    var event = {
        keyIdentifier: "Up",
        target: $extensionTop
    };
    updatesBaseliner(event);
});
$arrowtopDown.addEventListener('click', function(){
    var event = {
        keyIdentifier: "Down",
        target: $extensionTop
    };
    updatesBaseliner(event);
});
$arrowleftUp.addEventListener('click', function(){
    var event = {
        keyIdentifier: "Up",
        target: $extensionLeft
    };
    updatesBaseliner(event);
});
$arrowleftDown.addEventListener('click', function(){
    var event = {
        keyIdentifier: "Down",
        target: $extensionLeft
    };
    updatesBaseliner(event);
});
$arrowbaseUp.addEventListener('click', function(){
    var event = {
        keyIdentifier: "Up",
        target: $extensionBaseline
    };
    updatesBaseliner(event);
});
$arrowbaseDown.addEventListener('click', function(){
    var event = {
        keyIdentifier: "Down",
        target: $extensionBaseline
    };
    updatesBaseliner(event);
});

$arrowOpacityUp.addEventListener('click', function(){
    var event = {
        keyIdentifier: "Up",
        target: $extensionOpacity
    };
    updatesBaseliner(event);
});
$arrowOpacityDown.addEventListener('click', function(){
    var event = {
        keyIdentifier: "Down",
        target: $extensionOpacity
    };
    updatesBaseliner(event);
});

$baselinerColor.addEventListener('blur',  function(){
    var event = {
        keyIdentifier: "setColor",
        color: this.value
    };
    updatesBaseliner(event);
});

/* Init ColorPicker */
var colors = jsColorPicker('#baselinerColor', {
    customBG: '#CCCCCC',
    readOnly: true,
    init: function(elm, colors) {
      elm.style.backgroundColor = elm.value;
      elm.style.color = colors.rgbaMixCustom.luminance > 0.22 ? '#222' : '#ddd';
    }
});
