const { getGeminiModel } = require('../services/googleGemini');
const fs = require('fs');
const path = require('path');
const { imageGenerativePart } = require('../helpers/imageGenerativePart');

// Controller for /generate-text endpoint
const generateText = async (req, res) => {
  try {
    const { prompt } = req.body;
    const model = getGeminiModel();
    const result = await model.generateContent(prompt);
    res.json({ result: result.response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateFromImage = async (req, res) => {
  const prompt = req.body.prompt || 'Describe the image';
  const image = imageGenerativePart(req.file.path);

  try {
    const model = getGeminiModel();
    const result = await model.generateContent([prompt, image]);
    res.json({ result: result.response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    fs.unlinkSync(req.file.path);
  }
};

const generateFromDocument = async (req, res) => {
  const filePath = req.file.path;
  const buffer = fs.readFileSync(filePath);
  const base64Data = buffer.toString('base64');
  const mimeType = req.file.mimetype;

  try {
    const documentPart = {
      inlineData: {
        data: base64Data,
        mimeType
      }
    }
    const model = getGeminiModel();
    const result = await model.generateContent(['Analyze this document', documentPart]);
    res.json({ result: result.response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    fs.unlinkSync(filePath);
  }

}

const generateFromAudio = async (req, res) => {
  const audioBuffer = fs.readFileSync(req.file.path);
  const base64Audio = audioBuffer.toString('base64');

  try {
    const audioPart = {
      inlineData: {
        data: base64Audio,
        mimeType: req.file.mimetype
      }
    };
    const model = getGeminiModel();
    const result = await model.generateContent(['Transcribe or analyze this audio', audioPart]);
    res.json({ result: result.response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    fs.unlinkSync(audioBuffer);
  }
};

module.exports = { generateText, generateFromImage, generateFromDocument, generateFromAudio };
