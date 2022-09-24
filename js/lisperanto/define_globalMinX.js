// Version hash: 7d46dc09ef5bbb4ccd63def5fc9a726de3507dca43a7485e8a02101be96443ff
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_globalMinX = () => lisperanto.globalMinX = ko.observable(-screen.width * 2);