// Version hash: c50e2deb54a57352f8d806292724733fb6f9c8d726e381dd47c6e06f575a0d2f
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