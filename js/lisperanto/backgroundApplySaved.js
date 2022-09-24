// Version hash: e1b8930a8b59daec2636e7a28dc21f37dd846c8f2b4f182e1242ee5e41668784
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.backgroundApplySaved = function() 
{
    var background = localStorage["backgroundColor"] || "#000000";
    lisperanto.backgroundColor(background);
};