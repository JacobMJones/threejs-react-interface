import * as THREE from "three";
import alphaTexture from "./blue-stars.jpg";

export default (scene, camera) => {
  var raycaster = new THREE.Raycaster();
  var lastMouse = { x: null, y: null }
  var clicked;
  var shrinking = false;
  const group = new THREE.Group();


  const subjectMaterial = new THREE.MeshPhongMaterial({
    color: 0x093145,
    transparent: true,
    emissive: 0xffff00,
    emissiveIntensity: .1
    // side: THREE.DoubleSide,
    // alphaTest: 0.1
  });
 
  var subjectGeometry = new THREE.BoxGeometry(3, 3, 1);


  const subjectMesh = new THREE.Mesh(subjectGeometry, subjectMaterial);
  subjectMesh.scale.set(2, 2, 2)
  //subjectMesh.position.set(0, 0, 0);
  group.add(subjectMesh);

  scene.add(group);

  group.rotation.x = -.4

  // group.rotation.z = Math.PI / 6;

  let speed = 0.2;
  const textureOffsetSpeed = .15;
  var twistCounter = 0;
  var twistMax = 6;
  var upVec;
  var horVec;
var originalVertices =[]
  function dGeometry(geometry, timer, twist){
    const quaternion = new THREE.Quaternion();
console.log(geometry.vertices)
for (let i = 0; i < geometry.vertices.length; i++) {
  // a single vertex Y position

  const yPos = geometry.vertices[i].y;
  if(originalVertices.length < 1){
    originalVertices.push(yPos)
  }
  const twistAmount = 100;
  upVec = new THREE.Vector3(0, 1, 0)

  var n = (Math.PI / 180) / (yPos)
  quaternion.setFromAxisAngle(
    upVec,
    n
  );

  geometry.vertices[i].applyQuaternion(quaternion);
}
geometry.verticesNeedUpdate = true;
    return geometry;
  }
  function deformGeometry(geometry, timer, twist) {
    const quaternion = new THREE.Quaternion();

 
  
    if (twistCounter < 3) {
      console.log('top')
      if (twist) {

        for (let i = 0; i < geometry.vertices.length; i++) {
       
          const yPos = geometry.vertices[i].y;
          
          const twistAmount = 100;
          upVec = new THREE.Vector3(0, -4, 0)

          var n = (Math.PI / 180) / (yPos)
          quaternion.setFromAxisAngle(
            upVec,
            n
          );

          geometry.vertices[i].applyQuaternion(quaternion);
        }

      }
    }
      else  if (twistCounter < 6) {
     
console.log('bottom')
        for (let i = 0; i < geometry.vertices.length; i++) {
          // a single vertex Y position
          const yPos = geometry.vertices[i].y;
          
          const twistAmount = 100;
          upVec = new THREE.Vector3(0, 4, 0)

          var n = (Math.PI / 180) / (yPos)
          quaternion.setFromAxisAngle(
            upVec,
            n
          );

          geometry.vertices[i].applyQuaternion(quaternion);
        }
      }
    
    
    
      twistCounter++;

    if (timer === 0) {
      twistCounter = 0
    }
    geometry.verticesNeedUpdate = true;
    return geometry;
  }

  var timer = 1
  var animating = 0
  var timerLimit = 1000;
  function click(mouse, camera) {


    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects([subjectMesh]);
    if (intersects.length > 0) {
      
      shrinking = true;
      animating = !animating
    
      subjectMesh.scale.set(2, 2, 2)

    }
    // clicked = !clicked;

  }
  var size;
  var scale
  var sizeLimit = 1.5;
  var startSize = 2
  function update(time) {
    if (animating) {

    }

    size = subjectMesh.scale.z
    if (animating && size >= sizeLimit && shrinking) {
      const angle = time * speed;

      scale = timer / 10;
      deformGeometry(subjectGeometry, timer, true)
      subjectMesh.scale.set(2, 2 , 2 - scale)
      timer++;

    }
    else if (animating && size <= sizeLimit && shrinking) {


      shrinking = false;

    }
    else if (animating && !shrinking && size <= startSize) {
      deformGeometry(subjectGeometry, timer, false)

      timer--;
      scale = timer / 10;
      subjectMesh.scale.set(2, 2, 2 - scale)
    }
    else {
      animating = false;
      subjectMesh.scale.set(startSize, startSize, startSize)
      timer = 1
    }





  }

  return {
    update,
    click
  };
};
//     const quaternion = new THREE.Quaternion();
    // var upVec;
    //     for (let i = 0; i < geometry.vertices.length; i++) {
    //       // a single vertex Y position
    //       const yPos = geometry.vertices[i].y;
    //       const twistAmount = 10;
    //       upVec = new THREE.Vector3(0, 1, 0) 

    //       var n = (Math.PI / 180) / (yPos ) 
    //       quaternion.setFromAxisAngle(
    //         upVec, 
    //         n
    //       );

    //       geometry.vertices[i].applyQuaternion(quaternion);
    // }

    // tells Three.js to re-render this mesh


    

    // const angle = time * speed;
    //const scale = (Math.sin(timer/5));

    //    const scale = (Math.sin(angle * 6) + 8) / 5;
    // subjectMesh.scale.set(scale, scale, scale)
    // subjectMesh.rotation.y = angle;
    // subjectMesh.rotation.x = angle;
    // subjectMaterial.alphaMap.offset.y = 0.55 + time * textureOffsetSpeed;
    // subjectMaterial.alphaMap.offset.x = 0.55 + time * textureOffsetSpeed;
    // subjectWireframe.material.color.setHSL( Math.sin(angle*2), 0.5, 0.5 );

    // const scale = (Math.sin(angle * 6) + 8) / 5;
    // subjectMesh.scale.set(scale, scale, scale)
    // lastMouse = mouse.x;

  // const subjectGeometry = deformGeometry(new THREE.IcosahedronGeometry(4, 5));



     // subjectMaterial.alphaMap = new THREE.TextureLoader().load(alphaTexture);
  // subjectMaterial.alphaMap.magFilter = THREE.NearestFilter;
  // subjectMaterial.alphaMap.wrapT = THREE.RepeatWrapping;
  // subjectMaterial.alphaMap.repeat.y = 1;



  // var subjectMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
  //   var geometry = new THREE.RingGeometry( 1, 5, 32 );
  // var material = new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide } );
  // var mesh = new THREE.Mesh( geometry, material );
  //subjectMaterial.alphaMap.repeat.y = 12;