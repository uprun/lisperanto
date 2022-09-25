// Version hash: abfe246c80cb78bf87cf3b25c2042e374a9c8cfbe1feca8f0a2aafe4c93c7721
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.omniBoxOnWheel = function()
{
    // i need this to block scroll event, probably
    event.stopPropagation();
};