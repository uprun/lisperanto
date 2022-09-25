// Version hash: ca530581a641133ba20044bf2a4c83586b2c3d86e54d032cf8fb50a2be550f10
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_somethingChanged = () => {
    lisperanto.somethingChanged = ko.observable(0);
    lisperanto.somethingChanged.extend({ rateLimit: 100 });
};