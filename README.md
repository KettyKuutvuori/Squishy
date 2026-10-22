# Squish Face

A 3D stress ball that wears your face. Squish it, pinch it, pick it up and drop it.

Open `index.html` in a browser (it works straight from disk), or serve the folder with any static host (GitHub Pages works as-is).

## What you can do

- **Squish:** press or drag the ball. Pressure builds the longer you press, and the rubber resists, then rebounds slowly.
- **Pinch:** two fingers on a touchscreen, or pinch on a trackpad.
- **Pick up and drop:** hold still on the ball for a moment, then lift. Let go to drop it, or flick to throw it.
- **Hold to squeeze:** the hand button kneads the ball at random spots.
- **Turn it:** drag the background.

## Customize

- **Material:** with a photo on, the first color swatch is your own skin tone, sampled from the cheeks, forehead and nose. Materials: Squishy (foam that wrinkles when squeezed), Foam (slow memory-foam rebound), Bouncy plastic, or Clay (keeps the shape you give it).
- **Photo:** upload a photo. Your face is found and framed automatically; put it on as the whole photo, an ink print or a sculpted 3D face, and adjust the framing.
- **Face:** your photo or a preset (Smiley, Frog, Kitty, Chick, Puppy, Panda, Piggy, Bear). Presets come in four expressions: Happy, Surprised, Angry and Crying.
- **Hair:** yarn strands growing from a plug on top: None, Tuft, Mohawk, Curls or Shaggy, in six colors.

Sound and vibration can be muted with the speaker button (or the M key).

## How it's built

A single HTML page with no build step.

- [three.js](https://threejs.org) r128 renders the ball, a deformable mesh simulated on the CPU, loaded from cdnjs.
- [@vladmandic/face-api](https://github.com/vladmandic/face-api) 1.7.15 finds the face and its 68 landmark points, loaded from jsDelivr. It only loads when you upload a photo.
- `models/` holds that library's tiny face detector and 68-point landmark weights, stored as base64 text next to their manifests. They come from the face-api repository under its MIT license.

- `models/file-preview-models.js` packs the same weights as a script, for browsers that block `fetch` on `file://`. Rebuild it after changing the models: `node scripts/bundle-file-models.cjs`.

Photos never leave your browser: face detection runs locally.

## Tests

No dependencies; they run the page's own simulation code in Node.

- `node tests/physics.cjs`: landings come out identical at 30, 60, 120 and 144 Hz, every material settles, and plastic slides further than foam.
- `node tests/clay.cjs`: clay keeps local dents, repeated releases don't flatten it, and a baked shape doesn't creep afterwards.
