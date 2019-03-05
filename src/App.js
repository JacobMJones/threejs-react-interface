import React, { Component } from 'react';
import ThreeJSWrapper from './ThreeJS/ThreeJSWrapper'

class App extends Component {

  triggeredByCanvasEvent = () => {
    console.log('i was triggered by the canvas');
  }

  render() {
    return (
      <div>
        <ThreeJSWrapper triggeredByCanvasEvent={this.triggeredByCanvasEvent} />
      </div>
    );
  }
}

export default App;
