// Version hash: 28adab98b2f515c132beb8efa7149be7cd2c6a348049f0121bd96ae793635da2
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.bodyOnWheel = function() {
// just test

console.log("42");  

    event.preventDefault();
    const deltaY = event.deltaY;
    const deltaX = event.deltaX;
    //console.log(event);
    lisperanto.applyMovement(deltaY, deltaX);
  
    //scale += event.deltaY * -0.01;



    console.log('body_on_wheel');

};