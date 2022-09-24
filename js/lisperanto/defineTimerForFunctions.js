// Version hash: a4d3e769ead7e5fd5a1f6be1a261d8300c67c48755c63d830d9fd5d266c5f6c5
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.defineTimerForFunctions = function()
{
    lisperanto.timerForFunctions = setInterval(lisperanto.moveElementsOnCanvasIteration, 30);
};