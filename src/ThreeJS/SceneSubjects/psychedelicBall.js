import * as THREE from "three";
import alphaTexture from "./four-eyes.jpg";
import alphaTexture2 from "./eye.jpg";
export default (scene, ballOptions) => {
  const group = new THREE.Group();
  const subjectGeometry = deformGeometry(new THREE.IcosahedronGeometry(3, 5));
  const subjectMaterial = new THREE.MeshStandardMaterial({
    color: 0xff0000,
    transparent: false,
    side: THREE.DoubleSide,
    alphaTest: 0.2
  });

  subjectMaterial.alphaMap = new THREE.TextureLoader().load(alphaTexture);
  subjectMaterial.alphaMap.magFilter = THREE.NearestFilter;
  subjectMaterial.alphaMap.wrapT = THREE.RepeatWrapping;
  subjectMaterial.alphaMap.repeat.y = 10;

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
  function updateState(updateState) {
    updateState("showBall", true);
  }
  function deformGeometry(geometry) {
    // for (let i=0; i<geometry.vertices.length; i+=8) {
    //     const scalar = 1 - Math.random() * .2;
    //     geometry.vertices[i].multiplyScalar(scalar)
    // }

    return geometry;
  }

  function makeVisible() {
    console.log("make visible");
  }
  var timer = 0;
  function update(time, mouse, camera, state, updateState) {
    if (state.rotateBall) {
      if (state.reverseRotation) {
        timer = timer - 0.01;
      } else {
        timer = timer + 0.01;
      }
      const angle = timer * speed;
      group.rotation.y = angle;

      subjectMaterial.alphaMap.offset.y = 0.55 + timer * textureOffsetSpeed;
    }

    if (state.doubleSided) {
      subjectMaterial.side = THREE.DoubleSide;
    } else {
      subjectMaterial.side = THREE.FrontSide;
    }

    // subjectWireframe.material.color.setHSL( Math.sin(angle*2), 0.5, 0.5 );

    // const scale = (Math.sin(angle * 8) + 6.4) / 5;
    // subjectWireframe.scale.set(scale, scale, scale)
  }

  return {
    update
  };
};
