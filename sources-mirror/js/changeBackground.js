if(typeof(lisperanto) === 'undefined')
{
    lisperanto = {};
} 
lisperanto.define_backgroundColor = () => lisperanto.backgroundColor = ko.observable("#000000");
lisperanto.changeBackground = function() 
{
    var background = "#333333";
    lisperanto.backgroundColor(background);
    localStorage["backgroundColor"] = background;
    event.stopPropagation();
};

lisperanto.changeBackgroundToDefault = function() 
{
    var background = "#000000";
    lisperanto.backgroundColor(background);
    localStorage["backgroundColor"] = background;
    event.stopPropagation();
};

lisperanto.backgroundApplySaved = function() 
{
    var background = localStorage["backgroundColor"] || "#000000";
    lisperanto.backgroundColor(background);
};