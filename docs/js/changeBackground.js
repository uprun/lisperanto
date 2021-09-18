lookup.backgroundColor = ko.observable("#000000");
lookup.changeBackground = function() 
{
    var background = "#333333";
    lookup.backgroundColor(background);
    lookup.localStorage["backgroundColor"] = background;
};

lookup.changeBackgroundToDefault = function() 
{
    var background = "#000000";
    lookup.backgroundColor(background);
    lookup.localStorage["backgroundColor"] = background;
};

lookup.backgroundApplySaved = function() 
{
    var background = lookup.localStorage["backgroundColor"] || "#000000";
    lookup.backgroundColor(background);
};