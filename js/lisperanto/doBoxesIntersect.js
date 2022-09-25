// Version hash: ea9641e3a1ef6bf1811364fc764924737d71839c2fab942a42342c5ba1e72ac1
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.doBoxesIntersect = function(firstBox, secondBox)
{
    var firstCorners = lisperanto.generateCornersOfTheBox(firstBox);
    var resultFirst = firstCorners.find(point => lisperanto.isPointInsideTheBox(point, secondBox, margin=1));
    if(typeof(resultFirst) === "undefined")
    {
        var secondCorners = lisperanto.generateCornersOfTheBox(secondBox);
        var resultSecond = secondCorners.find(point => lisperanto.isPointInsideTheBox(point, firstBox, margin=1));
        if(typeof(resultSecond) === "undefined")
        {
            return false;
        }
        else
        {
            return true;
        }
    }
    else
    {
        return true;
    }

};