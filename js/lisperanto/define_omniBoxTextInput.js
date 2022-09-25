// Version hash: 878ad3896c8e8a9e0ada7c15dfbbf9b32c50d9e0c209d429ea5f189edc8ec7af
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_omniBoxTextInput = () => {
    lisperanto.omniBoxTextInput = ko.observable("");
    lisperanto.omniBoxTextInput
        .extend({ rateLimit: 100 });
};