// Version hash: e274f9e8c997c862463bff66b8ef9f36a665f6ae8fa14e92f5b5a2d134504b48
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.omniWheelOnWheelEvent = function()
{
    // i need this to block scroll event, probably
    event.stopPropagation();
};