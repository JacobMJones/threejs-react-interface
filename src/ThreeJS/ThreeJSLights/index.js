import * as THREE from 'three'

export default scene => {    

 //  const lightIn = new THREE.PointLight("white", 30);
    const lightOut = new THREE.DirectionalLight("pink", 1.12);
 //lightOut.position.set(100,-100,100);

 //  scene.add(lightIn);
  scene.add(lightOut);

    const rad = 12;

    function click(){

    }
    function updateState(updateState){
        updateState('showBall', true)
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