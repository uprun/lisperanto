// Version hash: 380724b588ac5d3a8e9c06d43b62aaec5c13ec1cc96165c30200b576e6ff1fb6
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.defineTimerForFunctions = function()
{
    lisperanto.timerForFunctions = setInterval(lisperanto.moveElementsOnCanvasIteration, 30);
};