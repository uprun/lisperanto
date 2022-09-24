// Version hash: a3422509458c8f2a9b4ecd6a92cb1a618499aa85a3537cba05dfc3b28bbb9c5d
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.showOmniBox = function()
{
    var offset = 
    {
        x: event.pageX,
        y: event.pageY
    };
    lisperanto.filloutGlobalOmniBox(lisperanto.canvasOmniBox, offset);
};