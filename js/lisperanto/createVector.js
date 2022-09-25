// Version hash: 120b94bad4b4b6d1a5c8d179efa4b723ce50b1a8fb7fd6c67e4ff3e584838a18
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.createVector = function(a, b)
{
    var result = {
        x: b.x - a.x,
        y: b.y - a.y
    };
    return result;
};