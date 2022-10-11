// Version hash: 00ee6e2b4a386d2fd031438c0f7239041f62a707e97edad085cca7b960a6ea6a
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.vectorsDotProduct = function(a, b)
{
    result = a.x * b.x + a.y * b.y;
    return result;
};