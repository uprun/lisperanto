// Version hash: 3e4e85c8dd9a4b20b434f5477e82383de896d2c0c13ad92e1e22e6b3ed59484b
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.omniBoxOnWheel = function()
{
    // i need this to block scroll event, probably
    event.stopPropagation();
};