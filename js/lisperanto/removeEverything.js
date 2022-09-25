// Version hash: 4cc02f01ff55083e3071be45c665bdc90264ae41e07627c895589d748ec8a0b9
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.removeEverything = function()
{
    localStorage.clear();
    location.reload();
};