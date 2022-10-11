// Version hash: 64f76ce6b7fe7906f4aa9495766c3f9a421c352011dc078dab72e36c97bb459c
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_globalMinY = () => lisperanto.globalMinY = ko.observable(-screen.height * 2);