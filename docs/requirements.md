# Requisitos do Sistema - FGL Rastreamento

## 📋 Funcionalidades Principais

### 1. Página Inicial - Listagem de Veículos
- Exibir cards com foto, placa, modelo e status
- Botão "Rastrear" em cada veículo
- Interface responsiva

### 2. Tela de Rastreamento
- Mapa interativo (Leaflet)
- Ícone do veículo em movimento simulado
- Dados de localização em tempo real (mock)

### 3. Gestão de Conta
- Editar dados pessoais (nome, telefone, email)
- Alterar senha
- Configurações de tema e notificações

### 4. Boletos e Contratos
- Lista de boletos com status
- Geração de segunda via
- Controle de vencimento de contrato
- Renovação automática com ajuste FIPE
- Notificações de vencimento

### 5. Cotação de Novos Veículos
- Formulário com upload de fotos
- Campos para placa, modelo, documentos
- Notificação de envio bem-sucedido

## 🎨 Design System
- Interface limpa e moderna
- Sidebar com navegação
- Cores neutras e profissionais
- Responsivo (mobile-first)
- Ícones consistentes

## 🔧 Tecnologias Obrigatórias
- React + TailwindCSS
- Node.js + Express
- DynamoDB (AWS)
- Leaflet Maps
- React Router
- AWS Cognito (auth)

## 📊 Dados Mock
- 3-5 veículos cadastrados
- Boletos dos últimos 12 meses
- Contratos com datas variadas
- Simulação de movimento GPS