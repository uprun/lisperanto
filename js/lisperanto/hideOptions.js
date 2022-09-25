// Version hash: 62f26c674fcd1eb70aa74d030bbe9e0f2cc2ee92695f44ef3df68f5f47c0f59f
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