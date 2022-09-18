lisperanto.backgroundColor = ko.observable("#000000");
lisperanto.changeBackground = function() 
{
    var background = "#333333";
    lisperanto.backgroundColor(background);
    lisperanto.localStorage["backgroundColor"] = background;
    event.stopPropagation();
};

lisperanto.changeBackgroundToDefault = function() 
{
    var background = "#000000";
    lisperanto.backgroundColor(background);
    lisperanto.localStorage["backgroundColor"] = background;
    event.stopPropagation();
};

lisperanto.backgroundApplySaved = function() 
{
    var background = lisperanto.localStorage["backgroundColor"] || "#000000";
    lisperanto.backgroundColor(background);
};