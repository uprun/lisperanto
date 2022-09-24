// Version hash: e0f234b8a2dbf88a5c8ac953e03726b41bca7f01edabbe1dc6680e554545943c
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.clone = (obj) => JSON.parse(JSON.stringify(obj));