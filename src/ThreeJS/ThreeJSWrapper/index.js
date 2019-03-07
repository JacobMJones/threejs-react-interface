import React, { Component } from "react";
import SceneManager from "../ThreeJSSceneManager";
import Canvas from "../ThreeJSCanvas/index.js";
import GeneralLights from "../ThreeJSLights";
import Button from "../SceneSubjects/button.js";
import Button2 from "../SceneSubjects/button.js";
import Button3 from "../SceneSubjects/button.js";
import Ball from "../SceneSubjects/psychedelicBall.js";

class ThreeJSWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = { change: false };
  }
  componentDidUpdate() {
    console.log("wrapper update");
  }
  render() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const canvasOptions = {
      height,
      width,
      backgroundColor: "red"
    };

    const sceneOptions = {
      // cameraPositionZ: 40
    };
    const buttonOptions = {
      position: { x: 0, y: -5, z: 0 },
      scale: { x: 3, y: 3, z: .93 },
      rotation: { x: 0, y: 0, z: 0 }
    };
    const buttonOptions2 = {
      position: { x: 0, y: 0, z: 0},
      scale: { x: 3, y: 3, z: .93 },
      rotation: { x: 0, y: 0, z: 0 }
    };
    const buttonOptions3 = {
      position: { x: 0, y: 5, z: 0},
      scale: { x: 3, y: 3, z: .93 },
      rotation: { x: 0, y: 0, z: 0 }
    };
    const ballOptions = {
      position: { x: 0, y: 3, z: 0 },
      scale: { x: 2, y: 2, z: 2, rotation: { x: 0, y: 0, z: 0 } }
    };
    const cb = this.props.triggeredByCanvasEvent;

    return (
      <div>
        <div style={{ textAlign: "center" }}>
          <button style={{ display: "inline-block" }}>Change Canvas</button>
        </div>

        <Canvas
          cb={cb}
          canvasOptions={canvasOptions}
          SceneManager={SceneManager}
          sceneOptions={sceneOptions}
          subjects={[
            scene => new GeneralLights(scene),
           scene => new Button(scene, buttonOptions),
            scene => new Button2(scene, buttonOptions2),
            scene => new Button3(scene, buttonOptions3)
          ]}
        />
      </div>
    );
  }
}
export default ThreeJSWrapper;
