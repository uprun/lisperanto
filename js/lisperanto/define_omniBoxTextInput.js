// Version hash: 7ec92c115447d162fe7f2f33d65ad917727abd05c1738d2cd4ad890d44cd5753
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_omniBoxTextInput = () => {
    lisperanto.omniBoxTextInput = ko.observable("");
    lisperanto.omniBoxTextInput
        .extend({ rateLimit: 100 });
};