// Version hash: d2009e4fc7eb92fe48b34e2b6d70a91d32aa498e33902ad7f7c85c0fcc5b36bb
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.removeEverything = function()
{
    localStorage.clear();
    location.reload();
};