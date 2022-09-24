// Version hash: 6da9270cb063fb1b99819e42732af6fb17bca80771ada4dd3696bafe53e457f6
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