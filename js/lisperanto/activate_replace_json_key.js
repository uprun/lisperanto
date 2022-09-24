// Version hash: 922167480bc3e9a0076354110ca36091a4498ae927fb7ad1cc13d678a22cbdc0
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.activate_replace_json_key = function()
{
    lisperanto.activeOperation("replace-existing-json-key");
    $("#" + lisperanto.canvasOmniBox.id ).focus();
};