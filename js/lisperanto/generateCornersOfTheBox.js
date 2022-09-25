// Version hash: 1ff49b7862d89b0d311680040bd4139b3d3ec4d08c5cd32f9824add62224c8a1
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