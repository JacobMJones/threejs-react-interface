import * as THREE from "three";

export default (scene, options) => {
  //Set up the material and geometry before adding them to a mesh
  //Then the mesh is added to a group which is added to a scene passed
  //down from the sceneManager

  const material = new THREE.MeshPhongMaterial({
    color: 0x093145,
    transparent: true,
    emissive: 0xffff00,
    emissiveIntensity: 0.55
  });

  const geometry = new THREE.BoxGeometry(
    options.scale.x,
    options.scale.y,
    options.scale.z
  );
  const mesh = new THREE.Mesh(geometry, material);
  const group = new THREE.Group();

  group.add(mesh);
  scene.add(group);

  //Add a raycaster to look for interactions between the mouse
  //and the mesh
  var raycaster = new THREE.Raycaster();

  //Set the initial position and rotation of the mesh
  mesh.position.set(options.position.x, options.position.y, options.position.z);
  mesh.rotation.set(options.rotation.x, options.rotation.y, options.rotation.z);

  //This bool is used when you want to deform back and forth between
  //two mesh configurations. When you get to the second position, you flip the bool and
  //run the previous deformation in reverse.
  var firstPartOfAnimation = false;

  //lives in the update, wether you are aplly animations or not
  var animating;
  //Timer, also in update, is used in animations that are not continuous
  //(otherwise use time, which is passed by the scenemanager)
  var timer = 0;

  //THese functions are used for animation, to increment to the current scale
  //position or rotation
  function changePosition(x, y, z) {
    mesh.position.set(
      mesh.position.x + x,
      mesh.position.y + y,
      mesh.position.z + z
    );
  }
  function changeScale(x, y, z) {
    mesh.scale.set(mesh.scale.x + x, mesh.scale.y + y, mesh.scale.z + z);
  }
  function changeRotation(x, y, z) {
    mesh.scale.set(
      mesh.rotation.x + x,
      mesh.rotation.y + y,
      mesh.rotation.z + z
    );
  }
mesh.rotation.set(-1,0,0)
  //This function is used to apply transformations to the mesh's vertices
  //Ive left it able to got back and forth between the initial state and
  // a deformed state.
  function deformGeometry(firstPartOfAnimation) {
    const quaternion = new THREE.Quaternion();

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

  //a click even is passed, along with a camer to this click function
  //where we use the raycaster to check for interactions
  function click(mouse, camera) {
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects([mesh]);
    if (intersects.length > 0 && !animating) {
      firstPartOfAnimation = true;
      animating = !animating;
    }
  }

  function update(time, mouse, camera, state, updateState) {
    if (animating) {
      if (timer < 5 && firstPartOfAnimation) {
         changeScale(0, 0, -timer / 12);
        changePosition(0, 0, -timer / 24);
        timer++;
        //   deformGeometry(firstPartOfAnimation, timer);
      } else if (timer >= 5 && firstPartOfAnimation) {
        firstPartOfAnimation = false;
        // deformGeometry(firstPartOfAnimation, timer);
        timer = 0;
      } else if (timer < 5 && !firstPartOfAnimation) {
        changeScale(0, 0, timer / 12);
        changePosition(0, 0, timer / 24);

        timer++;
        //  deformGeometry(firstPartOfAnimation, timer);
      } else if (timer >= 5 && !firstPartOfAnimation) {
        animating = false;

        updateState("showButton", !state.showBall);
        console.log("timer", timer);
      }
    } else {
     
      timer = 0;
    }
  }

  return {
    update,
    click
  };
};
