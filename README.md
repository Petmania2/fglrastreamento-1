# FGL Rastreamento - Plataforma de Rastreamento Veicular

## 📋 Descrição
Protótipo de plataforma de rastreamento veicular com interface moderna, desenvolvida em React (frontend) e Node.js (backend), preparada para deploy na AWS.

## 🚀 Funcionalidades
- ✅ Listagem de veículos cadastrados
- 🗺️ Rastreamento em tempo real com mapa interativo
- 💰 Gestão de boletos e contratos
- 📄 Solicitação de cotação para novos veículos
- ⚙️ Configurações de conta e sistema
- 🔄 Renovação automática de contratos com ajuste FIPE

## 🛠️ Tecnologias
- **Frontend**: React, TailwindCSS, React Router, Leaflet Maps
- **Backend**: Node.js, Express, AWS SDK
- **Banco**: DynamoDB (simulado)
- **Deploy**: AWS Amplify + Lambda + API Gateway

## 📦 Instalação

### Backend
```bash
cd backend
npm install
npm start
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## 🌐 URLs
- Frontend: http://localhost:3000
- Backend API: http://localhost:5001

## 📁 Estrutura do Projeto
```
/fglrastreamento
├── backend/          # API Node.js + Express
├── frontend/         # React App
├── docs/            # Documentação
└── README.md        # Este arquivo
```

## 🔧 Configuração AWS (Produção)
1. Configure AWS CLI
2. Deploy frontend via Amplify
3. Deploy backend via Lambda + API Gateway
4. Configure DynamoDB tables

## 👨💻 Desenvolvedor
Felipe - FGL Rastreamento