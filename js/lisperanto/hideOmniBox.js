// Version hash: 2b9aca33b2d2c113a22669ffd2c67ea91ee097f3538aed032cc6a97eae51ec45
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.hideOmniBox = function()
{
    lisperanto.canvasOmniBox.visible(false);
    lisperanto.focusedObj(undefined);
    lisperanto.activeOperation("");
    lisperanto.omniBoxTextInput("");
};