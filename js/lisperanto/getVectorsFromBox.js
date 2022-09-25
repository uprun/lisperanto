// Version hash: 71142b721515b10ec169ac948391ffd2d6e23ca5890614c1f8fc922c644f8f8f
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.getVectorsFromBox = function(point, box, margin)
{
    var result = [
        lisperanto.createVector(point, {x: point.x, y: box.top - margin}), // to Up
        lisperanto.createVector(point, {x: point.x, y: box.top + box.height + margin}), // to Bottom
        lisperanto.createVector(point, {x: box.left - margin, y: point.y}), // to Left
        lisperanto.createVector(point, {x: box.left + box.width + margin, y: point.y}) // to Right
    ];
    return result;
    
};