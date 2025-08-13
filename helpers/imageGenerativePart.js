const fs = require('fs');

// Utility to create an image generative part for Gemini API from file path
function imageGenerativePart(filePath, mimeType = 'image/png') {
  const imageBuffer = fs.readFileSync(filePath);
  return {
    inlineData: {
      data: imageBuffer.toString('base64'),
      mimeType: mimeType
    }
  };
}

module.exports = { imageGenerativePart };
