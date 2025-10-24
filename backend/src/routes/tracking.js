const express = require('express');
const router = express.Router();

// Simulação de dados de rastreamento em tempo real
const generateTrackingData = (vehicleId) => {
  const baseLocations = {
    '1': { lat: -23.5505, lng: -46.6333 },
    '2': { lat: -23.5489, lng: -46.6388 },
    '3': { lat: -23.5558, lng: -46.6396 }
  };
  
  const base = baseLocations[vehicleId] || { lat: -23.5505, lng: -46.6333 };
  
  // Simula movimento aleatório
  const randomOffset = () => (Math.random() - 0.5) * 0.01;
  
  return {
    vehicleId,
    location: {
      lat: base.lat + randomOffset(),
      lng: base.lng + randomOffset()
    },
    speed: Math.floor(Math.random() * 80) + 20,
    direction: Math.floor(Math.random() * 360),
    timestamp: new Date().toISOString(),
    status: 'moving'
  };
};

// GET /api/tracking/:vehicleId - Obter localização atual
router.get('/:vehicleId', (req, res) => {
  const trackingData = generateTrackingData(req.params.vehicleId);
  
  res.json({
    success: true,
    data: trackingData
  });
});

// GET /api/tracking/:vehicleId/history - Histórico de localizações
router.get('/:vehicleId/history', (req, res) => {
  const history = [];
  const now = new Date();
  
  // Gera histórico das últimas 24 horas
  for (let i = 0; i < 24; i++) {
    const timestamp = new Date(now.getTime() - (i * 60 * 60 * 1000));
    const data = generateTrackingData(req.params.vehicleId);
    data.timestamp = timestamp.toISOString();
    history.push(data);
  }
  
  res.json({
    success: true,
    data: history.reverse()
  });
});

module.exports = router;