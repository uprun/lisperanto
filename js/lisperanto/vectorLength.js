// Version hash: cf02528fc83549af9cf86471a58e4b0f810af1c4bb4c7bd5a83aa1a6bcb37f5b
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.vectorLength = function(v)
{
    var result = Math.sqrt(lisperanto.vectorLengthSquared(v));
    return result;
};