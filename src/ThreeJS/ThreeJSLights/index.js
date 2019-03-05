import * as THREE from 'three'

export default scene => {    

   const lightIn = new THREE.PointLight("blue", 30);
    const lightOut = new THREE.DirectionalLight("lightgreen", .3);
  lightOut.position.set(100,300,100);

    scene.add(lightIn);
    scene.add(lightOut);

    const rad = 2;

    function click(){

    }
    function update(time) {
        const x = rad * Math.sin(time*0.2)
        lightOut.position.x = x;
    }

    return {
        update,
        click
    }
}