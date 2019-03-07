import * as THREE from "three";
import alphaTexture from "./blue-stars.jpg";

export default (scene, buttonOptions, camera) => {
  var raycaster = new THREE.Raycaster();
  var firstPartOfAnimation = false;

  var timer = 0;
  var animating;
  var sizeLimit = buttonOptions.scale.z;
  var startSize = buttonOptions.scale.z ;

  const group = new THREE.Group();

  const subjectMaterial = new THREE.MeshPhongMaterial({
    color: 0x093145,
    transparent: true,
    emissive: 0xffff00,
    emissiveIntensity: 0.55
  });

  const subjectGeometry = new THREE.BoxGeometry(buttonOptions.scale.x, buttonOptions.scale.y, buttonOptions.scale.z);
  const subjectMesh = new THREE.Mesh(subjectGeometry, subjectMaterial);

  // changeScale(
  //   buttonOptions.scale.x,
  //   buttonOptions.scale.y,
  //   buttonOptions.scale.z
  // );
  changePosition(
    buttonOptions.position.x,
    buttonOptions.position.y,
    buttonOptions.position.z
  );

  group.add(subjectMesh);
  scene.add(group);
  group.rotation.x = -1.1;

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

  function deformGeometry(firstPartOfAnimation) {
    const quaternion = new THREE.Quaternion();
    let geometry = subjectGeometry;

    if (firstPartOfAnimation) {
      for (let i = 0; i < geometry.vertices.length; i++) {
        console.log("in loop");
        const yPos = geometry.vertices[i].y;
        const xPos = geometry.vertices[i].x;
        const upVec = new THREE.Vector3(-0.5, 0, 0);
        const n = Math.PI / 180;
        quaternion.setFromAxisAngle(upVec, n);
        geometry.vertices[i].applyQuaternion(quaternion);
      }
      geometry.verticesNeedUpdate = true;
    } else {
      for (let i = 0; i < geometry.vertices.length; i++) {
        console.log("in loop2");
        const yPos = geometry.vertices[i].y;
        const xPos = geometry.vertices[i].x;
        const upVec = new THREE.Vector3(0.5, 0, 0);
        const n = Math.PI / 180;
        quaternion.setFromAxisAngle(upVec, n);
        geometry.vertices[i].applyQuaternion(quaternion);
      }
      geometry.verticesNeedUpdate = true;
    }

  
  }

  function click(mouse, camera) {
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects([subjectMesh]);
    if (intersects.length > 0 && !animating) {
      firstPartOfAnimation = true;
      animating = !animating;
    }
  }

  function update(time) {
    if (animating) {
      if (subjectMesh.scale.z > buttonOptions.scale.z/2 && firstPartOfAnimation) {
        changeScale(0, 0, -timer / 12);
        changePosition(0, 0, -timer / 24);
        deformGeometry(firstPartOfAnimation, timer);
      } else if (subjectMesh.scale.z <= sizeLimit && firstPartOfAnimation) {
        firstPartOfAnimation = false;
        timer = 0;
      }

      else if (subjectMesh.scale.z < buttonOptions.scale.z && !firstPartOfAnimation) {
        changeScale(0, 0, timer / 12);
        changePosition(0, 0, timer / 24);
        deformGeometry(firstPartOfAnimation, timer);
      } else if (
        subjectMesh.scale.z > buttonOptions.scale.z &&
        !firstPartOfAnimation
      ) {
        animating = false;
        timer = -1;
      }
      timer++;
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
