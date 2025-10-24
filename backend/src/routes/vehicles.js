const express = require('express');
const router = express.Router();

// Mock data
const vehicles = [
  {
    id: '1',
    plate: 'ABC-1234',
    model: 'Honda Civic 2020',
    status: 'active',
    image: '/images/civic.jpg',
    lastLocation: { lat: -23.5505, lng: -46.6333 }
  },
  {
    id: '2',
    plate: 'DEF-5678',
    model: 'Toyota Corolla 2021',
    status: 'active',
    image: '/images/corolla.jpg',
    lastLocation: { lat: -23.5489, lng: -46.6388 }
  },
  {
    id: '3',
    plate: 'GHI-9012',
    model: 'Volkswagen Jetta 2019',
    status: 'inactive',
    image: '/images/jetta.jpg',
    lastLocation: { lat: -23.5558, lng: -46.6396 }
  }
];

// GET /api/vehicles - Listar todos os veículos
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: vehicles,
    total: vehicles.length
  });
});

// GET /api/vehicles/:id - Obter veículo específico
router.get('/:id', (req, res) => {
  const vehicle = vehicles.find(v => v.id === req.params.id);
  
  if (!vehicle) {
    return res.status(404).json({
      success: false,
      message: 'Veículo não encontrado'
    });
  }
  
  res.json({
    success: true,
    data: vehicle
  });
});

module.exports = router;