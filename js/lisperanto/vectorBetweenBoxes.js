// Version hash: 87669851222f1a15444dbea65993c53bb1bc391f31bed86b3d4e968891487dfc
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.vectorBetweenBoxes = function(firstBox, secondBox)
{
    var a = 
    { 
        x: firstBox.left + firstBox.width / 2,
        y: firstBox.top + firstBox.height / 2
    };

    var b =
    {
        x: secondBox.left + secondBox.width / 2,
        y: secondBox.top + secondBox.height / 2
    };
    var v = lisperanto.createVector(a, b);
    return v;
};