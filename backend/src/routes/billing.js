const express = require('express');
const router = express.Router();
const { sendBillEmail } = require('../services/emailService');

// Mock data - Boletos ficticios
const bills = [
  {
    id: '1',
    month: '2024-01',
    value: 89.90,
    status: 'paid',
    dueDate: '2024-01-15',
    paidDate: '2024-01-10'
  },
  {
    id: '2',
    month: '2024-02',
    value: 89.90,
    status: 'paid',
    dueDate: '2024-02-15',
    paidDate: '2024-02-12'
  },
  {
    id: '3',
    month: '2024-03',
    value: 89.90,
    status: 'overdue',
    dueDate: '2024-03-15',
    paidDate: null
  },
  {
    id: '4',
    month: '2024-04',
    value: 89.90,
    status: 'pending',
    dueDate: '2024-04-15',
    paidDate: null
  },
  {
    id: '5',
    month: '2024-05',
    value: 89.90,
    status: 'pending',
    dueDate: '2024-05-15',
    paidDate: null
  },
  {
    id: '6',
    month: '2024-06',
    value: 89.90,
    status: 'pending',
    dueDate: '2024-06-15',
    paidDate: null
  }
];

// GET /api/billing - Listar todos os boletos
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: bills
  });
});

// POST /api/billing/:id/generate-duplicate - Gerar segunda via
router.post('/:id/generate-duplicate', async (req, res) => {
  const bill = bills.find(b => b.id === req.params.id);
  
  if (!bill) {
    return res.status(404).json({
      success: false,
      message: 'Boleto não encontrado'
    });
  }
  
  // Simula geração de segunda via
  const duplicateCode = `FGL${Date.now()}`;
  const billData = {
    ...bill,
    duplicateCode,
    generatedAt: new Date().toISOString()
  };
  
  // Enviar email
  await sendBillEmail(billData);
  
  res.json({
    success: true,
    message: 'Segunda via gerada e enviada por email com sucesso!',
    data: billData
  });
});

module.exports = router;