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
  // scene.background = new THREE.Color(0xff0000);
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
      console.log("");
    });
    return renderer;
  }

  function buildCamera({ width, height }) {
    const fieldOfView = 70;
    const aspect = width / height;
    const farPlane = 100;
 const camera = new THREE.PerspectiveCamera( 70, width / height, 1, 10000 );

    camera.position.z = 15;
    camera.position.y = 0
    return camera;
  }

  function createSceneSubjects(scene) {
    const sceneSubjects = subjects.map(sub => sub(scene, camera));
    return sceneSubjects;
  }

  function onWindowResize() {
    const { width, height } = canvasDimensions;
    canvasDimensions.width = width;
    canvasDimensions.height = height;
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

  function update() {
    const elapsedTime = clock.getElapsedTime();
    if (mouseClicked) {
      for (let i = 0; i < sceneSubjects.length; i++) {
        sceneSubjects[i].click(mouse, camera);
      }
    }

    for (let i = 0; i < sceneSubjects.length; i++) {
      sceneSubjects[i].update(elapsedTime, mouse, camera);
    }

    mouseClicked = false;

    renderer.render(scene, camera);
  }
  return {
    update,
    onWindowResize,
    onMouseMove,
    onClick
  };
};

// updateCameraPositionRelativeToMouse();

//   function updateCameraPositionRelativeToMouse() {
//     camera.position.x += (mouse.x * 0.01 - camera.position.x) * 0.01;
//     camera.position.y += (-(mouse.y * 0.01) - camera.position.y) * 0.01;
//     camera.lookAt(origin);
//   }
