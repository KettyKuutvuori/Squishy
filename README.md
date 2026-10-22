# Squish Face

A 3D stress ball that wears your face. Squish it, pinch it, pick it up and drop it.

Open `index.html` in a browser, or serve the folder with any static host (GitHub Pages works as-is).

## What you can do

- **Squish:** press or drag the ball. Pressure builds the longer you press, and the rubber resists, then rebounds slowly.
- **Pinch:** two fingers on a touchscreen, or pinch on a trackpad.
- **Pick up and drop:** hold still on the ball for a moment, then lift. Let go to drop it, or flick to throw it.
- **Hold to squeeze:** the hand button kneads the ball at random spots.
- **Turn it:** drag the background.

## Customize

- **Material:** Squishy (foam that wrinkles when squeezed), Foam (slow memory-foam rebound), Bouncy plastic, or Clay (keeps the shape you give it).
- **Face:** pick a preset (Smiley, Frog, Chick, Kitty, Puppy, Panda, Piggy, Bear) or upload your own photo. Your face is found automatically and its eyes and mouth are set into the ball; you can also put on the whole photo, an ink print or a sculpted 3D face.
- **Hair:** None, Tuft, Mohawk, Curls or Shaggy, in six colors.

Sound and vibration can be muted with the speaker button (or the M key).

## How it's built

A single HTML page with no build step.

- [three.js](https://threejs.org) r128 renders the ball, a deformable mesh simulated on the CPU, loaded from cdnjs.
- [@vladmandic/face-api](https://github.com/vladmandic/face-api) 1.7.15 finds the face and its 68 landmark points, loaded from jsDelivr. It only loads when you upload a photo.
- `models/` holds that library's tiny face detector and 68-point landmark weights, stored as base64 text next to their manifests. They come from the face-api repository under its MIT license.

Photos never leave your browser: detection, cut-outs and expressions all run locally.
