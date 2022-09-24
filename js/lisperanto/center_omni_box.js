// Version hash: 0abfb4a57770d7ecaa5e03b0334ad884793f4624e6dbb996a148ee7f6e1dfd0f
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.center_omni_box = function () {
    lisperanto.filloutGlobalOmniBox(lisperanto.canvasOmniBox,
        {
            x: 0,
            y: document.body.offsetHeight / 3
        });

    const width_of_omnibox = document.getElementById("contextual-omni-box").offsetWidth;
    const delta_x_2 = Math.max(0, (document.body.offsetWidth / 2 - width_of_omnibox / 2));
    lisperanto.filloutGlobalOmniBox(lisperanto.canvasOmniBox,
        {
            x: delta_x_2,
            y: document.body.offsetHeight / 3
        });
};