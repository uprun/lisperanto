// Version hash: 2e0d9c7a94a4ce64d89d8e33147657da0f29d84ef07fd5403a80cc9cc61e1cd9
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.getUIBoxOfElement = function(obj, margin = 0.0)
{
    var objId = obj.id()
    var foundUI = document.getElementById(objId);//$("#" + objId)[0];
    if(foundUI == null || typeof(foundUI) === "undefined")
    {
        return undefined;
    }
    else
    {
        var toReturn = 
        {
            left: obj.offsetX() - margin,
            top: obj.offsetY() - margin,
            width: foundUI.offsetWidth + 2 * margin,
            height: foundUI.offsetHeight + 2 * margin
        };
        return toReturn;
    }
};