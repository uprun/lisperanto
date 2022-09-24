// Version hash: d1f17bc1e68559a59d67f2c78580d7276950c392e2f3711ed63e5aaf4d414a5c
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.generateCornersOfTheBox = function(box)
{
    var result = [
        {
            x: box.left,
            y: box.top
        },
        {
            x: box.left + box.width,
            y: box.top
        },
        {
            x: box.left,
            y: box.top + box.height
        },
        {
            x: box.left + box.width,
            y: box.top + box.height
        }
    ];
    return result;
};