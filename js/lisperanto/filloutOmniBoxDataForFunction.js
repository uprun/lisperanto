// Version hash: 34d9b61ac4c359165a10872380205008f8bb7462a31a189e6d81bab334289731
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.filloutOmniBoxDataForFunction = function(query, omniBox, root) 
{
    var foundUI = $(query)[0];
    omniBox.visible(true);
    var offsetX = foundUI.offsetLeft;
        offsetX += root.offsetX();
    omniBox.left(offsetX );
    var offsetY = foundUI.offsetTop + foundUI.offsetHeight ;
        offsetY += root.offsetY();
    omniBox.top(offsetY);

    $("#" + omniBox.id ).focus();
    event && event.stopPropagation();
};