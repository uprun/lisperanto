// Version hash: 37f5177ff2a1d92aee24401ecaa28aa0f85daeff95e7a0701590b877541edc52
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