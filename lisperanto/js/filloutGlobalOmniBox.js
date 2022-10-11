// Version hash: ed0f8cf55b8e9a15b43dfe0ae7283ca4882b7af6a5457eff35a93eff345d4c10
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.filloutGlobalOmniBox = function(omniBox, offset) 
{
    lisperanto.focusedObj(undefined);
    lisperanto.activeOperation("global-omni-box-activated");
    omniBox.visible(true);
    var offsetX = offset.x;
        offsetX -= lisperanto.globalOffsetX();
    omniBox.left(offsetX );
    var offsetY = offset.y;
        offsetY -= lisperanto.globalOffsetY();
    omniBox.top(offsetY);

    lisperanto.desiredOffset = {
        x: offsetX,
        y: offsetY
    };

    $("#" + omniBox.id ).focus();
    event && event.stopPropagation();
};