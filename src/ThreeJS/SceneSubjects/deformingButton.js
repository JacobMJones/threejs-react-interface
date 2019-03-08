import * as THREE from "three";

export default (scene, options) => {

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

 
  var raycaster = new THREE.Raycaster();


  mesh.position.set(options.position.x, options.position.y, options.position.z);
  mesh.rotation.set(options.rotation.x, options.rotation.y, options.rotation.z);


  var firstPartOfAnimation = false;

  var animating;

  var timer = 0;


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
        changePosition(0, 0, -timer / 40);
        timer++;
        //   deformGeometry(firstPartOfAnimation, timer);
      } else if (timer >= 5 && firstPartOfAnimation) {
        firstPartOfAnimation = false;
        // deformGeometry(firstPartOfAnimation, timer);
        timer = 0;
      } else if (timer < 5 && !firstPartOfAnimation) {
        changeScale(0, 0, timer / 12);
        changePosition(0, 0, timer / 40);

        timer++;
        //  deformGeometry(firstPartOfAnimation, timer);
      } else if (timer >= 5 && !firstPartOfAnimation) {
        animating = false;

        updateState(options.change, !state[options.change]);
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

