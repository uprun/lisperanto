// Version hash: 061fa46e59ee2cbb844907e500f126fed3c98080415e5e37908aaed95694a2fe
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