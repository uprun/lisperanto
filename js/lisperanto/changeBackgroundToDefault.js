// Version hash: 1456ebf30dce3aeb57f41e33b958df70fc3b7740440d0e88ddada58d7133bb65
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.changeBackgroundToDefault = function() 
{
    var background = "#000000";
    lisperanto.backgroundColor(background);
    localStorage["backgroundColor"] = background;
    event.stopPropagation();
};