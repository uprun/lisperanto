// Version hash: e42fbde32533ae56f6b774bd55903d7c28635139dfff8801c658fbcdfdd44c39
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.defineOmniBox = function() {
    var omniBox = {
        visible: ko.observable(false),
        left: ko.observable(0),
        top: ko.observable(0),
        id: 'global--popup-omni-box-input' 
    };
    return omniBox;
};