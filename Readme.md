# Stegosaurus.js - Storing secret messages in images

User HTML5 canvas to insert hidden messages into the least significant bits of pixel data.
These messages persist even when the user screenshots the image (they're stored in the pixel's colors) and can be used for source tracking, or proving where an image came from.

N.B. Only works with images that don't use transparency.

## ImageProtector.js

Also included is a small set of tools to make it harder for anyone to try and save the image from the canvas. Saving via the context menu (Right Clicking -> Save As) is disabled on the canvas, but will trigger on an overlayed transparent png image. The user will instead download an invisible image, thinking they've downloaded the one they see.

See the demo.html for a use case.

decodeStegDemo.html is decoding a screenshot of the demo image. We're not sure exactly where to start looking for a message, so the decode method has an argument that lets you scan along a bit until you find the right spot.

