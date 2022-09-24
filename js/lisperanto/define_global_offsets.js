// Version hash: 8ea6d4f7020d385dc3963206409109e3b299a6f571f9d4a41ed6a82e017c852b
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