import * as THREE from "three";
import alphaTexture from "./clean-grey-gradient.jpg";

export default (scene, ballOptions) => {
  const group = new THREE.Group();
  const subjectGeometry = deformGeometry(new THREE.IcosahedronGeometry(3, 5));
  const subjectMaterial = new THREE.MeshStandardMaterial({
    color: "transparent",
    transparent: true,
    side: THREE.DoubleSide,
    alphaTest: 0.1
  });
  
  subjectMaterial.alphaMap = new THREE.TextureLoader().load(alphaTexture);
  subjectMaterial.alphaMap.magFilter = THREE.NearestFilter;
  subjectMaterial.alphaMap.wrapT = THREE.RepeatWrapping;
  subjectMaterial.alphaMap.repeat.y = 5;

  const subjectMesh = new THREE.Mesh(subjectGeometry, subjectMaterial);

  group.add(subjectMesh);
  scene.add(group);

  group.rotation.z = Math.PI / 2;
  group.position.set(
    ballOptions.position.x,
    ballOptions.position.y,
    ballOptions.position.z
  );
  const speed = 0.3;
  const textureOffsetSpeed = 0.5;
  function updateState(updateState){
    updateState('showBall', true)
  }
  function deformGeometry(geometry) {
    // for (let i=0; i<geometry.vertices.length; i+=8) {
    //     const scalar = 1 - Math.random() * .2;
    //     geometry.vertices[i].multiplyScalar(scalar)
    // }

    return geometry;
  }

  function makeVisible () {
    console.log('make visible')
  }
  var timer =0;
  function update(time, mouse, camera,state, updateState) {
    if(state.showBall) {
      timer = timer -.04;

      const angle = timer * speed;

      group.rotation.y = angle;
  
      subjectMaterial.alphaMap.offset.y = 0.55 + timer * textureOffsetSpeed;
    }
    

    // subjectWireframe.material.color.setHSL( Math.sin(angle*2), 0.5, 0.5 );

    // const scale = (Math.sin(angle * 8) + 6.4) / 5;
    // subjectWireframe.scale.set(scale, scale, scale)
  }

  return {
    update
  };
};

