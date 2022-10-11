// Version hash: e1ce7166cc52d8f6cad4e22c76a5944ce36d7bce0e10d0c5f32efcd995f4df12
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