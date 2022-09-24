// Version hash: 995c2c3e142b0bbe951b99908009c6f96211225511cc7715bc1b1747f025bb20
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.hideOptions = function()
{
    if(lisperanto.optionsIsOpen())
    {
        lisperanto.toggleOptions();
    }
};