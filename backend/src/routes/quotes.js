const express = require('express');
const multer = require('multer');
const router = express.Router();
const { sendQuoteApproval } = require('../services/emailService');

// Configuração do multer para upload de arquivos
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Apenas imagens e PDFs são permitidos'), false);
    }
  }
});

// Mock data - Cotações
let quotes = [];

// POST /api/quotes - Solicitar nova cotação
router.post('/', upload.array('files', 5), (req, res) => {
  try {
    const { plate, model, additionalInfo } = req.body;
    const files = req.files || [];
    
    if (!plate || !model) {
      return res.status(400).json({
        success: false,
        message: 'Placa e modelo são obrigatórios'
      });
    }
    
    const newQuote = {
      id: Date.now().toString(),
      plate,
      model,
      additionalInfo: additionalInfo || '',
      files: files.map(file => ({
        name: file.originalname,
        size: file.size,
        type: file.mimetype
      })),
      status: 'pending',
      createdAt: new Date().toISOString(),
      estimatedResponse: '2-3 dias úteis'
    };
    
    quotes.push(newQuote);
    
    // Simular aprovação automática após 3 segundos
    setTimeout(async () => {
      newQuote.status = 'approved';
      await sendQuoteApproval(newQuote);
    }, 3000);
    
    res.json({
      success: true,
      message: 'Solicitação de cotação enviada com sucesso! Aguarde a avaliação.',
      data: newQuote
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao processar solicitação',
      error: error.message
    });
  }
});

// GET /api/quotes - Listar cotações
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: quotes
  });
});

module.exports = router;