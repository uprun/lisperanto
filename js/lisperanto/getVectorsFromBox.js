// Version hash: f5ecd538f9006c8e888636b021cb506f7ad6c91382bbf3e12e2ff904d2c700d3
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