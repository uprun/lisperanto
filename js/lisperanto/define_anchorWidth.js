// Version hash: 136080994379ade002af289371dbfa5827a4c92dfab2e9fe09ae96add9765ea2
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_anchorWidth = () => lisperanto.anchorWidth = ko.observable(2 * parseFloat(getComputedStyle(document.documentElement).fontSize));