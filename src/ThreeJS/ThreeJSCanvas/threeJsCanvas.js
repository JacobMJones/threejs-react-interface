export default (container, SceneManager, canvasOptions, sceneOptions, subjects, cb) => {

  console.log('click in canvas', cb)
  const canvas = createCanvas(document, container);
  const sceneManager = new SceneManager(canvas, canvasOptions, sceneOptions, subjects, cb);

  let canvasHalfWidth;
  let canvasHalfHeight;

  bindEventListeners(canvas);
  render();

  function createCanvas(document, container) {
    const canvas = document.createElement("canvas");
    container.appendChild(canvas);
    return canvas;
  }

  function bindEventListeners(canvas) {
    canvas.onresize = resizeCanvas;
    canvas.onmousemove = mouseMove;
    canvas.onclick = onClick;
    resizeCanvas();
  }

  function resizeCanvas() {
    canvas.style.width = canvasOptions.width;
    canvas.style.height = canvasOptions.height;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    canvasHalfWidth = Math.round(canvas.offsetWidth / 2);
    canvasHalfHeight = Math.round(canvas.offsetHeight / 2);
    sceneManager.onWindowResize();
  }

  //   CANVAS API
  function mouseMove(event) {
    sceneManager.onMouseMove(event);
  }

  function onClick(event) {
    event.preventDefault();
    sceneManager.onClick(event);
  }

  function render(time) {
    requestAnimationFrame(render);
    sceneManager.update();
  }
};
