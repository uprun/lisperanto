// Version hash: 88422a96540999c0b66509d0306485263367a633beab795c778ca415cb4953f3
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.changeBackground = function() 
{
    var background = "#333333";
    lisperanto.backgroundColor(background);
    localStorage["backgroundColor"] = background;
    event.stopPropagation();
};