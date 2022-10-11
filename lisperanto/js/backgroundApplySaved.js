// Version hash: 1e6bc74346755c8b44b1183ccf599a2bd6db10e25d8ee269404b3ecb47506633
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.backgroundApplySaved = function() 
{
    var background = localStorage["backgroundColor"] || "#000000";
    lisperanto.backgroundColor(background);
};