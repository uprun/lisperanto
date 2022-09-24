// Version hash: b4f57c042f71592943dbd423c5d36b00fde48ca3de1cc3623209476e9f893d64
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.vectorsDotProduct = function(a, b)
{
    result = a.x * b.x + a.y * b.y;
    return result;
};