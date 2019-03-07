import * as THREE from "three";
import alphaTexture from "./blue-stars.jpg";

export default (scene, buttonOptions) => {
  var raycaster = new THREE.Raycaster();
  var firstPartOfAnimation = false;

  var timer = 0;
  var animating;
  var sizeLimit = buttonOptions.scale.z;
  var startSize = buttonOptions.scale.z;

  const group = new THREE.Group();

  const subjectMaterial = new THREE.MeshPhongMaterial({
    color: 0x093145,
    transparent: true,
    emissive: 0xffff00,
    emissiveIntensity: 0.55
  });

  const subjectGeometry = new THREE.BoxGeometry(
    buttonOptions.scale.x,
    buttonOptions.scale.y,
    buttonOptions.scale.z
  );
  const subjectMesh = new THREE.Mesh(subjectGeometry, subjectMaterial);

  // changeScale(
  //   buttonOptions.scale.x,
  //   buttonOptions.scale.y,
  //   buttonOptions.scale.z
  // );
  subjectMesh.rotation.set(buttonOptions.rotation.x, buttonOptions.rotation.y, buttonOptions.rotation.z);
  changePosition(
    buttonOptions.position.x,
    buttonOptions.position.y,
    buttonOptions.position.z
  );
  // changeRotation(
  //   buttonOptions.rotation.x,
  //   buttonOptions.rotation.y,
  //   buttonOptions.rotation.z
  // )

  group.add(subjectMesh);
  scene.add(group);
  group.rotation.x = -1.1;

  var originalVertices = []
  function setOriginalYVertices() {
    const quaternion = new THREE.Quaternion();
    let geometry = subjectGeometry;
    for (const v in geometry.vertices) {

     
const vertices = {x: geometry.vertices[v].x, y: geometry.vertices[v].y, z: geometry.vertices[v].z}
        
       // const yPos = geometry.vertices[v].y;

     originalVertices.push(vertices)
      }
    console.log(originalVertices)
  }
  setOriginalYVertices();
  function changePosition(x, y, z) {
    subjectMesh.position.set(
      subjectMesh.position.x + x,
      subjectMesh.position.y + y,
      subjectMesh.position.z + z
    );
  }
  function changeScale(x, y, z) {
    subjectMesh.scale.set(
      subjectMesh.scale.x + x,
      subjectMesh.scale.y + y,
      subjectMesh.scale.z + z
    );
  }
  function changeRotation(x, y, z) {
    subjectMesh.scale.set(
      subjectMesh.rotation.x + x,
      subjectMesh.rotation.y + y,
      subjectMesh.rotation.z + z
    );
  }
  let firstCounter = 0;
  let secondCounter = 0;


  function deformGeometry(firstPartOfAnimation, timer) {

    const quaternion = new THREE.Quaternion();
    let geometry = subjectGeometry;
    const n = Math.PI / 180;
    const deformAmount = 7.9;

    if (firstPartOfAnimation) {
      for (const v in originalVertices) {

        if (timer === 1) {

          const upVec = new THREE.Vector3(0, 15, 0);
          //const yPos = geometry.vertices[v].y;
          const yPos = originalVertices[v].y
          quaternion.setFromAxisAngle(
            upVec,
            yPos / 180
          );
          geometry.vertices[v].applyQuaternion(quaternion);
          geometry.verticesNeedUpdate = true;
        }
      }
    } else {
      for (const v in originalVertices) {

        if (timer === 1) {

          const d = new THREE.Vector3(0, -15, 0);
          const yPos = originalVertices[v].y
          quaternion.setFromAxisAngle(
            d,
            (yPos / 180)
          );
          geometry.vertices[v].applyQuaternion(quaternion);
          geometry.verticesNeedUpdate = true;
        }
      }
    }
    console.log('counters', firstCounter, secondCounter)

  }
  // const yPos = geometry.vertices[i].y;
  // const xPos = geometry.vertices[i].x;

  function click(mouse, camera) {
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects([subjectMesh]);
    if (intersects.length > 0 && !animating) {
      firstPartOfAnimation = true;
      animating = !animating;
    }
  }

  const max = 32;
  function update(time, mouse, camera, state, updateState) {

    if (animating) {
      if (
        timer < 5 &&
        firstPartOfAnimation
      ) {
        //  changeScale(0, 0, -timer / 12);
        // changePosition(0, 0, -timer / 24);
        timer++
        deformGeometry(firstPartOfAnimation, timer);
      } else if (timer >= 5 && firstPartOfAnimation) {
        firstPartOfAnimation = false;
        // deformGeometry(firstPartOfAnimation, timer);
        timer = 0;
      } else if (
        timer < 5 &&
        !firstPartOfAnimation) {
        //changeScale(0, 0, timer / 12);
        // changePosition(0, 0, timer / 24);

        timer++
        deformGeometry(firstPartOfAnimation, timer);
      } else if (
        timer >= 5 &&
        !firstPartOfAnimation
      ) {
        animating = false;

        updateState('showButton', !state.showBall)
        console.log('timer', timer);
      }


    }

    else {
      firstCounter = 0;
      secondCounter = 0;
      timer = 0;
    }
    // size = subjectMesh.scale.z;
    // if (animating && size >= sizeLimit && shrinking) {
    //   const angle = time * speed;

    //   scale = timer / 10;
    //   deformGeometry(subjectGeometry, timer, true);
    //   subjectMesh.scale.set(
    //     buttonOptions.scale.x,
    //     buttonOptions.scale.y,
    //     buttonOptions.scale.z - scale
    //   );
    //   timer++;
    // } else if (animating && size <= sizeLimit && shrinking) {
    //   shrinking = false;
    // } else if (animating && !shrinking && size <= startSize) {
    //   deformGeometry(subjectGeometry, timer, false);

    //   timer--;
    //   scale = timer / 10;
    //   subjectMesh.scale.set(
    //     buttonOptions.scale.x,
    //     buttonOptions.scale.y,
    //     buttonOptions.scale.z - scale
    //   );
    // } else {
    //   animating = false;
    //   subjectMesh.scale.set(
    //     buttonOptions.scale.x,
    //     buttonOptions.scale.y,
    //     buttonOptions.scale.z
    //   );
    //   timer = 1;
    // }
  }

  return {
    update,
    click
  };
};
