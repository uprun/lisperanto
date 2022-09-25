// Version hash: 6ae21b5d797225371b6f243d367eec26d6398a7e10d03ef4c82b617797b407c7
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.bodyOnWheel = function() {
    event.preventDefault();
    const deltaY = event.deltaY;
    const deltaX = event.deltaX;
    //console.log(event);
    lisperanto.applyMovement(deltaY, deltaX);
  
    //scale += event.deltaY * -0.01;
};