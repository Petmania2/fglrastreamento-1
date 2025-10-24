/**
 * FGL RASTREAMENTO - SERVIDOR PRINCIPAL (BACKEND)
 * 
 * Este arquivo é o ponto de entrada da API do sistema de rastreamento veicular.
 * Ele configura o servidor Express.js e define todas as rotas principais.
 * 
 * ARQUITETURA:
 * - Express.js como framework web
 * - CORS habilitado para comunicação com frontend
 * - Rotas organizadas por módulos (vehicles, tracking, billing, etc.)
 * - Middleware para parsing de JSON e URL-encoded
 * 
 * FLUXO DE FUNCIONAMENTO:
 * 1. Carrega variáveis de ambiente (.env)
 * 2. Importa todas as rotas dos módulos
 * 3. Configura middlewares essenciais
 * 4. Registra todas as rotas com prefixo /api
 * 5. Inicia servidor na porta configurada
 */

// === IMPORTAÇÕES PRINCIPAIS ===
const express = require('express');        // Framework web para Node.js
const cors = require('cors');              // Middleware para Cross-Origin Resource Sharing
require('dotenv').config();               // Carrega variáveis de ambiente do arquivo .env

// === IMPORTAÇÃO DAS ROTAS POR MÓDULO ===
// Cada arquivo de rota gerencia um conjunto específico de funcionalidades
const vehicleRoutes = require('./src/routes/vehicles');     // Gestão de veículos cadastrados
const trackingRoutes = require('./src/routes/tracking');   // Rastreamento em tempo real
const billingRoutes = require('./src/routes/billing');     // Gestão de boletos e pagamentos
const contractRoutes = require('./src/routes/contracts');  // Contratos e renovações
const quoteRoutes = require('./src/routes/quotes');        // Cotações para novos veículos
const authRoutes = require('./src/routes/auth');           // Autenticação e autorização

// === CONFIGURAÇÃO DO SERVIDOR ===
const app = express();
const PORT = process.env.PORT || 5001;  // Porta do servidor (padrão: 5001)

// === MIDDLEWARES ESSENCIAIS ===
// Middlewares são funções que processam requisições antes de chegarem às rotas

app.use(cors());                          // Permite requisições de diferentes origens (frontend)
app.use(express.json());                  // Parser para requisições JSON
app.use(express.urlencoded({ extended: true })); // Parser para dados de formulário

// === REGISTRO DAS ROTAS ===
// Todas as rotas são prefixadas com /api para organização
// Exemplo: GET /api/vehicles, POST /api/auth/login, etc.

app.use('/api/auth', authRoutes);         // Rotas de autenticação: /api/auth/*
app.use('/api/vehicles', vehicleRoutes);  // Rotas de veículos: /api/vehicles/*
app.use('/api/tracking', trackingRoutes); // Rotas de rastreamento: /api/tracking/*
app.use('/api/billing', billingRoutes);   // Rotas de cobrança: /api/billing/*
app.use('/api/contracts', contractRoutes);// Rotas de contratos: /api/contracts/*
app.use('/api/quotes', quoteRoutes);      // Rotas de cotação: /api/quotes/*

// === ROTA DE HEALTH CHECK ===
// Endpoint para verificar se a API está funcionando
// Útil para monitoramento e deploy automatizado
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'FGL Rastreamento API is running',
    timestamp: new Date().toISOString()
  });
});

// === INICIALIZAÇÃO DO SERVIDOR ===
// Inicia o servidor na porta especificada
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`📋 API Base URL: http://localhost:${PORT}/api`);
});