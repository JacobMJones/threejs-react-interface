import * as THREE from 'three'

export default scene => {    

  const lightIn = new THREE.DirectionalLight("pink", .12);
   const lightOut = new THREE.DirectionalLight("pink", .12);
 lightOut.position.set(100,-100,100);
 lightIn.position.set(0,80,-100);
  scene.add(lightIn);
  scene.add(lightOut);

    const rad = 12;

    function click(){

    }
    function updateState(updateState){
        // updateState('showBall', true)
      }
    function update(time) {
       // const x = rad * Math.sin(time*0.2)
     //   lightOut.position.x = x;
    }

    return {
        update,
        click
    }
}