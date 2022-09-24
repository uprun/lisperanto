// Version hash: fe44fcc751a0bdd41823060758db9cd166e97b4852186dcd0955be2bd267ca0d
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