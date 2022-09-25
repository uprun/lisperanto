// Version hash: 939c1b1968d7e17a085e72b6861644e0b17e1547eec2be7671c7295ee850258b
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.clone = (obj) => JSON.parse(JSON.stringify(obj));