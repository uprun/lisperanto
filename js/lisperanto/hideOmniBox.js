// Version hash: 069dfbe61d18f8273ce85ab479e2f551a777e91d354c2a3d77fa3782798ccc0b
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