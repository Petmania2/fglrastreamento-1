/**
 * FGL RASTREAMENTO - ROTAS DE VEÍCULOS (BACKEND)
 * 
 * Este módulo gerencia todas as operações relacionadas aos veículos:
 * - Listagem de todos os veículos
 * - Busca de veículo específico por ID
 * - Dados mockados para desenvolvimento
 * 
 * ESTRUTURA DA API:
 * GET /api/vehicles     -> Lista todos os veículos
 * GET /api/vehicles/:id -> Busca veículo por ID
 * 
 * FORMATO DOS DADOS:
 * - id: Identificador único
 * - plate: Placa do veículo
 * - model: Modelo e ano
 * - status: 'active' ou 'inactive'
 * - image: Caminho para imagem
 * - lastLocation: Última localização GPS (lat, lng)
 * 
 * NOTA: Em produção, os dados serão substituídos por consultas ao DynamoDB
 */

// === IMPORTAÇÕES ===
const express = require('express');  // Framework web
const router = express.Router();     // Roteador do Express

// === DADOS MOCKADOS PARA DESENVOLVIMENTO ===
// Em produção, estes dados virão do DynamoDB
// Cada veículo representa um cliente real do sistema
const vehicles = [
  {
    id: '1',                                    // ID único do veículo
    plate: 'ABC-1234',                          // Placa do veículo
    model: 'Honda Civic 2020',                  // Modelo e ano
    status: 'active',                           // Status do rastreamento
    image: '/images/civic.jpg',                 // Imagem do veículo
    lastLocation: { lat: -23.5505, lng: -46.6333 } // Última posição GPS (São Paulo)
  },
  {
    id: '2',
    plate: 'DEF-5678',
    model: 'Toyota Corolla 2021',
    status: 'active',
    image: '/images/corolla.jpg',
    lastLocation: { lat: -23.5489, lng: -46.6388 } // Próximo ao centro de SP
  },
  {
    id: '3',
    plate: 'GHI-9012',
    model: 'Volkswagen Jetta 2019',
    status: 'inactive',                         // Veículo inativo (sem rastreamento)
    image: '/images/jetta.jpg',
    lastLocation: { lat: -23.5558, lng: -46.6396 }
  }
];

// === ROTA: LISTAR TODOS OS VEÍCULOS ===
// GET /api/vehicles
// Retorna array com todos os veículos cadastrados
router.get('/', (req, res) => {
  // Resposta padronizada da API
  res.json({
    success: true,           // Indica sucesso da operação
    data: vehicles,          // Array com todos os veículos
    total: vehicles.length   // Total de veículos (para paginação futura)
  });
});

// === ROTA: BUSCAR VEÍCULO POR ID ===
// GET /api/vehicles/:id
// Retorna dados de um veículo específico
router.get('/:id', (req, res) => {
  // Busca veículo pelo ID passado na URL
  const vehicle = vehicles.find(v => v.id === req.params.id);
  
  // Verifica se o veículo foi encontrado
  if (!vehicle) {
    // Retorna erro 404 se não encontrado
    return res.status(404).json({
      success: false,
      message: 'Veículo não encontrado'
    });
  }
  
  // Retorna dados do veículo encontrado
  res.json({
    success: true,
    data: vehicle
  });
});

// === EXPORTAÇÃO DO ROTEADOR ===
// Permite que este módulo seja usado no servidor principal
module.exports = router;