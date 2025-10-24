const express = require('express');
const router = express.Router();

// Mock data - Contratos
const contracts = [
  {
    id: '1',
    vehicleId: '1',
    startDate: '2023-06-15',
    endDate: '2024-06-15',
    monthlyValue: 89.90,
    status: 'active',
    fipeAdjustment: 0
  },
  {
    id: '2',
    vehicleId: '2',
    startDate: '2023-12-01',
    endDate: '2024-12-01',
    monthlyValue: 89.90,
    status: 'active',
    fipeAdjustment: 0
  },
  {
    id: '3',
    vehicleId: '3',
    startDate: '2023-03-10',
    endDate: '2024-03-10',
    monthlyValue: 89.90,
    status: 'expired',
    fipeAdjustment: 5.2
  }
];

// GET /api/contracts - Listar contratos
router.get('/', (req, res) => {
  const contractsWithExpiration = contracts.map(contract => {
    const endDate = new Date(contract.endDate);
    const today = new Date();
    const daysToExpire = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
    
    return {
      ...contract,
      daysToExpire,
      needsRenewal: daysToExpire <= 30
    };
  });
  
  res.json({
    success: true,
    data: contractsWithExpiration
  });
});

// POST /api/contracts/:id/renew - Renovar contrato
router.post('/:id/renew', (req, res) => {
  const contract = contracts.find(c => c.id === req.params.id);
  
  if (!contract) {
    return res.status(404).json({
      success: false,
      message: 'Contrato não encontrado'
    });
  }
  
  // Simula ajuste FIPE (5-15% de aumento)
  const fipeAdjustment = Math.random() * 10 + 5;
  const newValue = contract.monthlyValue * (1 + fipeAdjustment / 100);
  
  const renewedContract = {
    ...contract,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    monthlyValue: Math.round(newValue * 100) / 100,
    fipeAdjustment: Math.round(fipeAdjustment * 100) / 100,
    status: 'active'
  };
  
  res.json({
    success: true,
    message: 'Contrato renovado com sucesso',
    data: renewedContract
  });
});

module.exports = router;