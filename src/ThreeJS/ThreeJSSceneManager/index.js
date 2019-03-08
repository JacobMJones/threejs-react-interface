import * as THREE from "three";

export default (canvas, canvasOptions, sceneOptions, subjects, cb) => {
  var mouse = new THREE.Vector2();
  const clock = new THREE.Clock();
  var mouseClicked = false;
  var mouseClicks = [];
  const canvasDimensions = {
    width: canvasOptions.width,
    height: canvasOptions.height
  };

  const scene = buildScene();
  const renderer = buildRender(canvasDimensions);
  const camera = buildCamera(canvasDimensions);
  const sceneSubjects = createSceneSubjects(scene);

  function buildScene() {
    const scene = new THREE.Scene();
    console.log(scene);
    return scene;
  }

  function buildRender({ width, height }) {
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true
    });
    const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;
    renderer.setPixelRatio(DPR);
    renderer.setSize(width, height);
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.addEventListener("click", () => {
      
    });
    return renderer;
  }

  function buildCamera({ width, height }) {
    const fieldOfView = 70;
    const aspect = width / height;
    const farPlane = 100;
    const camera = new THREE.PerspectiveCamera(70, width / height, 1, 10000);

    camera.position.z = 15;
    camera.position.y = 0;
    return camera;
  }

  function createSceneSubjects(scene, updateState) {
    const sceneSubjects = subjects.map(sub => sub(scene));
    return sceneSubjects;
  }

  function onWindowResize() {
    console.log("window resized");
    const { width, height } = canvasDimensions;
    canvasDimensions.width = window.innerWidth;
    canvasDimensions.height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  function onMouseMove(event) {
    // mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    // mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }
  function onClick(event) {
    event.preventDefault();

    mouse.x = (event.clientX / canvasDimensions.width) * 2 - 1;
    mouse.y = -(event.clientY / canvasDimensions.height) * 2 + 1;
    // mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
    // mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
    mouseClicked = true;
    cb();
    mouseClicks.push({ x: mouse.x, y: mouse.y });
    console.log(mouseClicked);
  }
  var state = { rotateBall:true};

function updateState (key, value){
    console.log('in update', key, value)
   
    state[key] = value;
  };
  function update() {
    const elapsedTime = clock.getElapsedTime();
    if (mouseClicked) {
      for (let i = 0; i < sceneSubjects.length; i++) {
        sceneSubjects[i].click && sceneSubjects[i].click(mouse, camera);
      }
    }

    for (let i = 0; i < sceneSubjects.length; i++) {
  
      sceneSubjects[i].update(elapsedTime, mouse, camera, state, updateState);

    
       // sceneSubjects[i].updateState(this.updateState)
      
    }

    mouseClicked = false;

    renderer.render(scene, camera);
  }
  return {
    update,
    onWindowResize,
    onMouseMove,
    onClick,
    state
  };
};

// updateCameraPositionRelativeToMouse();

//   function updateCameraPositionRelativeToMouse() {
//     camera.position.x += (mouse.x * 0.01 - camera.position.x) * 0.01;
//     camera.position.y += (-(mouse.y * 0.01) - camera.position.y) * 0.01;
//     camera.lookAt(origin);
//   }




// var container;

// var camera, scene, renderer, clock;
// var mesh, mixer;
// var clip;

// init();
// animate();

// function init() {

//   setUpCamera();
//   setUpScene();
//   setUpLights();

//   clock = new THREE.Clock();

  

//   var geometry = new THREE.BoxGeometry(100, 100, 100);
//   var material = new THREE.MeshLambertMaterial({
//     color: 0xffffff,
//     morphTargets: true
//   });

//   // generate morph target data

//   var vertices = [];

//   for (var v = 0; v < geometry.vertices.length; v++) {
//     vertices.push(geometry.vertices[v].clone());

//     vertices[vertices.length - 1].x *= 1.2;
//     vertices[vertices.length - 1].y *= 1.2;
//     vertices[vertices.length - 1].z *= 1.2;
//   }

//   geometry.morphTargets.push({ name: "target_1", vertices: vertices });

//   //

//   geometry = new THREE.BufferGeometry().fromGeometry(geometry);

//   mesh = new THREE.Mesh(geometry, material);

//   scene.add(mesh);

//   // construct clip

//   var times = [0, 0.1, 0.2];
//   var values = [0, 1, 0];

//   var track = new THREE.VectorKeyframeTrack(
//     ".morphTargetInfluences[0]",
//     times,
//     values,
//     THREE.InterpolateLinear
//   );
//   var clip = new THREE.AnimationClip("clip", undefined, [track]);

//   mixer = new THREE.AnimationMixer(mesh);

//   var action = mixer.clipAction(clip);
//   action.loop = THREE.LoopOnce;

//   //

//   renderer = new THREE.WebGLRenderer();
//   renderer.setPixelRatio(window.devicePixelRatio);
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   document.body.appendChild(renderer.domElement);

//   //

//   //

//   window.addEventListener("resize", onWindowResize, false);

//   renderer.domElement.addEventListener(
//     "click",
//     () => {
//       action.stop();
//       action.play();

//       mesh.morphTargetInfluences[0] = 1 - mesh.morphTargetInfluences[0];
//     },
//     false
//   );
// }

// function setUpCamera() {
//   camera = new THREE.PerspectiveCamera(
//     45,
//     window.innerWidth / window.innerHeight,
//     1,
//     2000
//   );
//   camera.position.z = 500;
// }
// function setUpScene(){
//   scene = new THREE.Scene();
//   scene.background = new THREE.Color(0x222222);
//   scene.fog = new THREE.Fog(0x000000, 1, 15000);
// }

// function setUpLights(){
//   var light = new THREE.PointLight(0xff2200);
//   camera.add(light);
//   scene.add(camera);

//   light = new THREE.AmbientLight(0x111111);
//   scene.add(light);
// }
// function onWindowResize() {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();

//   renderer.setSize(window.innerWidth, window.innerHeight);
// }

// function animate() {
//   requestAnimationFrame(animate);

//   var delta = clock.getDelta();

//   mixer.update(delta);

//   renderer.render(scene, camera);
// }