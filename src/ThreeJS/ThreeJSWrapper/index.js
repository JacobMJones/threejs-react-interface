import React, { Component } from "react";
import SceneManager from "../ThreeJSSceneManager";
import Canvas from "../ThreeJSCanvas/index.js";
import GeneralLights from "../ThreeJSLights";
import SceneSubject from '../SceneSubjects/button.js'
import SceneSubject2 from '../SceneSubjects/trippy-ball2.js'

class ThreeJSWrapper extends Component {
  constructor(props) {
    super(props);
    this.state={change:false}
  }
  componentDidUpdate() {
    console.log('wrapper update')

  }
  render() {
    const width = 700;
    const height = 700;
    const canvasOptions = {
      height,
      width,
      backgroundColor: "red"
    };

    const sceneOptions = {
      // cameraPositionZ: 40
    };

    const cb = this.props.triggeredByCanvasEvent
    
    return (
      <div>
        <div style={{ textAlign: 'center' }}><button style={{ display: 'inline-block' }}>Change Canvas</button></div>

        <Canvas
         cb={cb}
          canvasOptions={canvasOptions}
          SceneManager={SceneManager}
          sceneOptions={sceneOptions}
          subjects={[
            (scene) => new GeneralLights(scene),
            (scene) => new SceneSubject2(scene),
            // (scene) => new SceneSubject(scene),
          ]}
        />

      </div>
    );
  }
}
export default ThreeJSWrapper;
