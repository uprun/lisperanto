// Version hash: 1c8f27f3640350673a6f86cd41c17e8155e74336c59fe4e9adf358d8ff4db00e
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_global_offsets = function() {
    lisperanto.define_globalOffsetX(); // initialization
    lisperanto.define_globalOffsetY(); // initialization
    lisperanto.define_globalOffsetZ(); // initialization
    lisperanto.define_globalMaxX(); // initialization
    lisperanto.define_globalMaxY(); // initialization
    lisperanto.define_globalMinX(); // initialization
    lisperanto.define_globalMinY();
};