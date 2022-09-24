// Version hash: 70cf16a66f1d1ec560d92ba9806cf93a34b1c42694486fc3a0c2925eab21ca5d
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.omniWheelOnWheelEvent = function()
{
    // i need this to block scroll event, probably
    event.stopPropagation();
};