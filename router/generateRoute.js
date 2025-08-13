const express = require('express');
const router = express.Router();
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });
const generateController = require('../controller/generateController');

router.post('/generate-text', generateController.generateText);
router.post('/generate-from-image', upload.single('image'), generateController.generateFromImage);
router.post('/generate-from-document', upload.single('document'), generateController.generateFromDocument);
router.post('/generate-from-audio', upload.single('audio'), generateController.generateFromAudio);

module.exports = router;
