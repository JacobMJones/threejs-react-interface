import * as THREE from "three";

export default (scene, options) => {

  const material = new THREE.MeshPhongMaterial({
    color: 0x093145,
    transparent: true,
    emissive: 0xffff00,
    emissiveIntensity: 0.4
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





// import * as THREE from "three";
// import alphaTexture from "./blue-stars.jpg";
// import * as dat from 'dat.gui';
// export default (scene, buttonOptions) => {
  
//   var raycaster = new THREE.Raycaster();
//   var firstPartOfAnimation = false;

//   var timer = 0;
//   var animating;
//   var sizeLimit = buttonOptions.scale.z;
//   var startSize = buttonOptions.scale.z;

//  var group = new THREE.Group();

//  var subjectMaterial = new THREE.MeshPhongMaterial({
//     color: 0x093145,
//     transparent: true,
//     emissive: 0xffff00,
//     emissiveIntensity: 0.55
//   });

//   var subjectGeometry = new THREE.BoxGeometry(
//     buttonOptions.scale.x,
//     buttonOptions.scale.y,
//     buttonOptions.scale.z
//   );
//  var subjectMesh = new THREE.Mesh(subjectGeometry, subjectMaterial);

//   // changeScale(
//   //   buttonOptions.scale.x,
//   //   buttonOptions.scale.y,
//   //   buttonOptions.scale.z
//   // );
//   subjectMesh.rotation.set(buttonOptions.rotation.x, buttonOptions.rotation.y, buttonOptions.rotation.z);
//   changePosition(
//     buttonOptions.position.x,
//     buttonOptions.position.y,
//     buttonOptions.position.z
//   );
//   // changeRotation(
//   //   buttonOptions.rotation.x,
//   //   buttonOptions.rotation.y,
//   //   buttonOptions.rotation.z
//   // )

 
//   group.rotation.x = -1.1;

//   var originalVertices = []
//   function setOriginalYVertices() {
//     const quaternion = new THREE.Quaternion();
//     let geometry = subjectGeometry;
//     for (const v in geometry.vertices) {

     
//       const vertices = {x: geometry.vertices[v].x, y: geometry.vertices[v].y, z: geometry.vertices[v].z}
        
//        // const yPos = geometry.vertices[v].y;

//      originalVertices.push(vertices)
//       }
//     console.log(originalVertices)
//   }
//   setOriginalYVertices();
//   function changePosition(x, y, z) {
//     subjectMesh.position.set(
//       subjectMesh.position.x + x,
//       subjectMesh.position.y + y,
//       subjectMesh.position.z + z
//     );
//   }
//   function changeScale(x, y, z) {
//     subjectMesh.scale.set(
//       subjectMesh.scale.x + x,
//       subjectMesh.scale.y + y,
//       subjectMesh.scale.z + z
//     );
//   }
//   function changeRotation(x, y, z) {
//     subjectMesh.scale.set(
//       subjectMesh.rotation.x + x,
//       subjectMesh.rotation.y + y,
//       subjectMesh.rotation.z + z
//     );
//   }
//   let firstCounter = 0;
//   let secondCounter = 0;


// // MAKE MORPH TARGETS
// for ( var i = 0; i < 8; i ++ ) {
//   const vertices = [];
//   for ( var v = 0; v < subjectGeometry.vertices.length; v ++ ) {
//     vertices.push( subjectGeometry.vertices[ v ].clone() );
//     if ( v === i ) {
//       vertices[ vertices.length - 1 ].x *= 2;
//       vertices[ vertices.length - 1 ].y *= 2;
//       vertices[ vertices.length - 1 ].z *= 2;
//     }
//   }
//   //console.log(vertices)
//   subjectGeometry.morphTargets.push( { name: "target" + i, vertices: vertices } );
// }

// subjectGeometry = new THREE.BufferGeometry().fromGeometry( subjectGeometry );
// 				subjectMesh = new THREE.Mesh( subjectGeometry, subjectMaterial );

// group.add(subjectMesh);
// scene.add(group);




//   function deformGeometry(firstPartOfAnimation, timer) {

//     const quaternion = new THREE.Quaternion();
//     let geometry = subjectGeometry;
//     const n = Math.PI / 180;
//     const deformAmount = 7.9;

//     if (firstPartOfAnimation) {
//       for (const v in originalVertices) {

//         if (timer === 1) {

//           const upVec = new THREE.Vector3(0, 15, 0);
//           //const yPos = geometry.vertices[v].y;
//           const yPos = originalVertices[v].y
//           quaternion.setFromAxisAngle(
//             upVec,
//             yPos / 180
//           );
//           geometry.vertices[v].applyQuaternion(quaternion);
//           geometry.verticesNeedUpdate = true;
//         }
//       }
//     } else {
//       for (const v in originalVertices) {

//         if (timer === 1) {

//           const d = new THREE.Vector3(0, -15, 0);
//           const yPos = originalVertices[v].y
//           quaternion.setFromAxisAngle(
//             d,
//             (yPos / 180)
//           );
//           geometry.vertices[v].applyQuaternion(quaternion);
//           geometry.verticesNeedUpdate = true;
//         }
//       }
//     }
//     console.log('counters', firstCounter, secondCounter)

//   }
//   // const yPos = geometry.vertices[i].y;
//   // const xPos = geometry.vertices[i].x;

//   function click(mouse, camera) {
//     raycaster.setFromCamera(mouse, camera);
//     var intersects = raycaster.intersectObjects([subjectMesh]);
//     if (intersects.length > 0 && !animating) {
//       firstPartOfAnimation = true;
//       animating = !animating;
//     }
//   }

//   const max = 32;


//   subjectMesh.morphTargetInfluences[ 3] = 2;


//   var params = {
//     influence1: 0,
//     influence2: 0,
//     influence3: 0,
//     influence4: 0,
//     influence5: 0,
//     influence6: 0,
//     influence7: 0,
//     influence8: 0
//   };
//   var gui = new dat.GUI();
//   var folder = gui.addFolder( 'Morph Targets' );
  
//   folder.add( params, 'influence1', 0, 1 ).step( 0.01 ).onChange( function ( value ) {
//     subjectMesh.morphTargetInfluences[ 0 ] = value;
//   } );
//   folder.add( params, 'influence2', 0, 1 ).step( 0.01 ).onChange( function ( value ) {
//     subjectMesh.morphTargetInfluences[ 1 ] = value;
//   } );
//   folder.add( params, 'influence3', 0, 1 ).step( 0.01 ).onChange( function ( value ) {
//     subjectMesh.morphTargetInfluences[ 2 ] = value;
//   } );
//   folder.add( params, 'influence4', 0, 1 ).step( 0.01 ).onChange( function ( value ) {
//     subjectMesh.morphTargetInfluences[ 3 ] = value;
//   } );
//   folder.add( params, 'influence5', 0, 1 ).step( 0.01 ).onChange( function ( value ) {
//     subjectMesh.morphTargetInfluences[ 4 ] = value;
//   } );
//   folder.add( params, 'influence6', 0, 1 ).step( 0.01 ).onChange( function ( value ) {
//     subjectMesh.morphTargetInfluences[ 5 ] = value;
//   } );
//   folder.add( params, 'influence7', 0, 1 ).step( 0.01 ).onChange( function ( value ) {
//     subjectMesh.morphTargetInfluences[ 6 ] = value;
//   } );
//   folder.add( params, 'influence8', 0, 1 ).step( 0.01 ).onChange( function ( value ) {
//     subjectMesh.morphTargetInfluences[ 7 ] = value;
//   } );
//   folder.open();


//   function update(time, mouse, camera, state, updateState) {
//     subjectMesh.rotation.y += 0.01;
//     if (animating) {
//       if (
//         timer < 5 &&
//         firstPartOfAnimation
//       ) {
//         //  changeScale(0, 0, -timer / 12);
//         // changePosition(0, 0, -timer / 24);
//         timer++
//      //   deformGeometry(firstPartOfAnimation, timer);
//       } else if (timer >= 5 && firstPartOfAnimation) {
//         firstPartOfAnimation = false;
//         // deformGeometry(firstPartOfAnimation, timer);
//         timer = 0;
//       } else if (
//         timer < 5 &&
//         !firstPartOfAnimation) {
//         //changeScale(0, 0, timer / 12);
//         // changePosition(0, 0, timer / 24);

//         timer++
//       //  deformGeometry(firstPartOfAnimation, timer);
//       } else if (
//         timer >= 5 &&
//         !firstPartOfAnimation
//       ) {
//         animating = false;

//         updateState('showButton', !state.showBall)
//         console.log('timer', timer);
//       }


//     }

//     else {
//       firstCounter = 0;
//       secondCounter = 0;
//       timer = 0;
//     }
//     // size = subjectMesh.scale.z;
//     // if (animating && size >= sizeLimit && shrinking) {
//     //   const angle = time * speed;

//     //   scale = timer / 10;
//     //   deformGeometry(subjectGeometry, timer, true);
//     //   subjectMesh.scale.set(
//     //     buttonOptions.scale.x,
//     //     buttonOptions.scale.y,
//     //     buttonOptions.scale.z - scale
//     //   );
//     //   timer++;
//     // } else if (animating && size <= sizeLimit && shrinking) {
//     //   shrinking = false;
//     // } else if (animating && !shrinking && size <= startSize) {
//     //   deformGeometry(subjectGeometry, timer, false);

//     //   timer--;
//     //   scale = timer / 10;
//     //   subjectMesh.scale.set(
//     //     buttonOptions.scale.x,
//     //     buttonOptions.scale.y,
//     //     buttonOptions.scale.z - scale
//     //   );
//     // } else {
//     //   animating = false;
//     //   subjectMesh.scale.set(
//     //     buttonOptions.scale.x,
//     //     buttonOptions.scale.y,
//     //     buttonOptions.scale.z
//     //   );
//     //   timer = 1;
//     // }
//   }

//   return {
//     update,
//     click
//   };
// };
