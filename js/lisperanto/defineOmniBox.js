// Version hash: 14b2cdfe85d81e21e6076da00985506c1fdfd8aad611b208e4d8f5abe5b77951
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