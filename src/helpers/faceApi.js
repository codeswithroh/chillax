import * as faceapi from 'face-api.js';

export const loadModels = () => {
  const MODEL_URL = `${process.env.PUBLIC_URL}/models`;

  return Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
    faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
    faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
    faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
    faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
  ]);
};

export const detectFaces = async (image) => {
  if (!image) {
    return;
  }

  const imgSize = image.getBoundingClientRect();
  const displaySize = { width: imgSize.width, height: imgSize.height };
  if (displaySize.height === 0) {
    return;
  }

  const faces = await faceapi
    .detectAllFaces(image, new faceapi.TinyFaceDetectorOptions({ inputSize: 320 }))
    .withFaceLandmarks()
    .withFaceExpressions()
    .withAgeAndGender();

  return faceapi.resizeResults(faces, displaySize);
};

export const drawResults = async (image, canvas, results, type) => {
  if (image && canvas && results) {
    const imgSize = image.getBoundingClientRect();
    const displaySize = { width: imgSize.width, height: imgSize.height };
    faceapi.matchDimensions(canvas, displaySize);
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    const resizedDetections = faceapi.resizeResults(results, displaySize);

    switch (type) {
      case 'landmarks':
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        break;
      case 'expressions':
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
        break;
      case 'box':
        faceapi.draw.drawDetections(canvas, resizedDetections);
        break;
      case 'boxLandmarks':
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        break;
      default:
        break;
    }
  }
};
