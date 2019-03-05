import React, { Component } from "react";
import threeJSCanvas from "./threeJsCanvas";

class ThreeJSCanvas extends Component {
  constructor(props) {
    super(props);
  }



  componentDidMount() {
console.log('canvas mount')
  const {SceneManager, canvasOptions, sceneOptions, subjects, cb} = this.props
    threeJSCanvas(
      this.threeRootElement,
      SceneManager,
      canvasOptions,
      sceneOptions, 
      subjects,
      cb
    );
  }
  componentDidUpdate() {
    console.log('canvas update')

  }
  render() {
    return (
        <div ref={element => (this.threeRootElement = element)} />  
    );
  }
}
export default ThreeJSCanvas;
