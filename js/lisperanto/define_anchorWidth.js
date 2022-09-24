// Version hash: b10a2c510dcb0d9317a6615b4f10a5e6670fd4c80dadc2ddc7159c84910f3e64
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_anchorWidth = () => lisperanto.anchorWidth = ko.observable(2 * parseFloat(getComputedStyle(document.documentElement).fontSize));