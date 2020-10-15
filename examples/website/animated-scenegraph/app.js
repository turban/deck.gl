import React, {useState, useRef} from 'react';
import {render} from 'react-dom';

import DeckGL from '@deck.gl/react';
import {ScenegraphLayer} from '@deck.gl/mesh-layers';

import {GLTFLoader} from '@loaders.gl/gltf';
import {registerLoaders} from '@loaders.gl/core';

import {DeckAdapter} from '@hubble.gl/core';
import {useNextFrame, BasicControls} from '@hubble.gl/react';
import {sceneBuilder} from './scene';

registerLoaders([GLTFLoader]);

const MODEL_URL =
  'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxAnimated/glTF-Binary/BoxAnimated.glb';

const ANIMATIONS = {
  '*': {speed: 5}
};

const INITIAL_VIEW_STATE = {
  latitude: 37.78,
  longitude: -122.45,
  zoom: 10.62345478102812,
  maxZoom: 16,
  bearing: 0,
  pitch: 60
};

const adapter = new DeckAdapter(sceneBuilder);

const encoderSettings = {
  framerate: 30,
  webm: {
    quality: 0.8
  },
  jpeg: {
    quality: 0.8
  },
  gif: {
    sampleInterval: 1000
  }
};

export default function App({sizeScale = 25}) {
  const deckgl = useRef(null);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const nextFrame = useNextFrame();

  const layer = new ScenegraphLayer({
    id: 'scenegraph-layer',
    data: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart-stations.json',
    pickable: true,
    sizeScale,
    scenegraph: MODEL_URL,
    _animations: ANIMATIONS,
    sizeMinPixels: 25,
    sizeMaxPixels: 40,
    _lighting: 'pbr',
    getPosition: d => d.coordinates,
    getOrientation: d => [0, Math.random() * 180, 90]
  });

  return (
    <>
      <DeckGL
        ref={deckgl}
        layers={[layer]}
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        {...adapter.getProps(deckgl, setReady, nextFrame)}
      />
      <div style={{position: 'absolute'}}>
        {ready && (
          <BasicControls
            adapter={adapter}
            busy={busy}
            setBusy={setBusy}
            encoderSettings={encoderSettings}
          />
        )}
      </div>
    </>
  );
}

export function renderToDOM(container) {
  render(<App />, container);
}

// import React from 'react';
// import {render} from 'react-dom';
// import DeckGL from '@deck.gl/react';
// import {ScenegraphLayer} from '@deck.gl/mesh-layers';
// import {GLTFLoader} from '@loaders.gl/gltf';
// import {registerLoaders} from '@loaders.gl/core';
// registerLoaders([GLTFLoader]);
// const INITIAL_VIEW_STATE = {
//   latitude: 37.78,
//   longitude: -122.45,
//   zoom: 10.62345478102812,
//   maxZoom: 16,
//   bearing: 0,
//   pitch: 60
// };
// export default function App() {
//   const layer =
//     new ScenegraphLayer({
//       id: 'scenegraph-layer',
//       data: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart-stations.json',
//       pickable: true,
//       sizeScale: 25,
//       scenegraph: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/BoxAnimated/glTF-Binary/BoxAnimated.glb',
//       _animations: {
//         '*': {speed: 5}
//       },
//       sizeMinPixels: 25,
//       sizeMaxPixels: 40,
//       _lighting: 'pbr',
//       getPosition: d => d.coordinates,
//       getOrientation: d => [0, Math.random() * 180, 90]
//     });
//   return (
//     <DeckGL
//       layers={[layer]}
//       initialViewState={INITIAL_VIEW_STATE}
//       controller={true}
//       getTooltip={() => null}
//     />
//   );
// }
// export function renderToDOM(container) {
//   render(<App />, container);
// }
