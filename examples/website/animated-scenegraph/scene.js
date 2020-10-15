import {DeckScene, CameraKeyframes} from '@hubble.gl/core';
import {easeInOut} from 'popmotion';

export async function sceneBuilder(animationLoop) {
  const keyframes = {
    camera: new CameraKeyframes({
      timings: [0, 5000],
      keyframes: [
        {
          latitude: 37.78,
          longitude: -122.45,
          zoom: 10.62345478102812,
          maxZoom: 16,
          bearing: -9.294320137693632,
          pitch: 60
        },
        {
          latitude: 37.78,
          longitude: -122.45,
          zoom: 10.62345478102812,
          maxZoom: 16,
          bearing: -15,
          pitch: 40
        }
      ],
      easings: [easeInOut]
    })
  };
  animationLoop.timeline.attachAnimation(keyframes.camera);

  return new DeckScene({
    animationLoop,
    keyframes,
    lengthMs: 5000,
    width: 640,
    height: 480
  });
}
