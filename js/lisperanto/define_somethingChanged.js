// Version hash: 19e2bf02c539123e09b709ecec9696820fc34c2b802012251a98a485c98e7b48
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_somethingChanged = () => {
    lisperanto.somethingChanged = ko.observable(0);
    lisperanto.somethingChanged.extend({ rateLimit: 100 });
};