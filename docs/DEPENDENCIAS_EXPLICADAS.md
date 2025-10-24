# 📦 FGL Rastreamento - Dependências Explicadas

## 🎯 Frontend (React)

### 🔧 Dependências Principais

#### **React Ecosystem**
```json
"react": "^18.2.0"              // Biblioteca principal do React
"react-dom": "^18.2.0"          // Renderização no DOM
"react-router-dom": "^6.15.0"   // Roteamento SPA
```
**Por que usar?**
- React 18: Recursos modernos como Concurrent Features
- React Router v6: Roteamento declarativo e type-safe
- Padrão da indústria para SPAs

#### **HTTP Client**
```json
"axios": "^1.5.0"               // Cliente HTTP para APIs
```
**Por que usar?**
- Interceptors para tratamento global de erros
- Cancelamento de requisições
- Melhor que fetch() nativo para projetos complexos

#### **Mapas e Geolocalização**
```json
"leaflet": "^1.9.4"             // Biblioteca de mapas open-source
"react-leaflet": "^4.2.1"       // Wrapper React para Leaflet
```
**Por que usar?**
- Alternativa gratuita ao Google Maps
- Altamente customizável
- Suporte a múltiplos provedores de tiles

#### **UI e UX**
```json
"react-icons": "^4.11.0"        // Biblioteca de ícones
"react-hot-toast": "^2.4.1"     // Sistema de notificações
```
**Por que usar?**
- React Icons: +10.000 ícones de várias bibliotecas
- Hot Toast: Notificações elegantes e customizáveis

### 🛠️ Dependências de Desenvolvimento

#### **Build Tool**
```json
"vite": "^4.4.5"                // Build tool moderna
"@vitejs/plugin-react": "^4.0.3" // Plugin React para Vite
```
**Por que usar?**
- Vite: Build extremamente rápido com HMR
- Substitui Create React App (mais rápido)
- Hot Module Replacement instantâneo

#### **CSS Framework**
```json
"tailwindcss": "^3.3.3"         // Framework CSS utility-first
"autoprefixer": "^10.4.15"      // Adiciona prefixos CSS automaticamente
"postcss": "^8.4.29"            // Processador CSS
```
**Por que usar?**
- TailwindCSS: Desenvolvimento rápido com classes utilitárias
- Purge automático de CSS não utilizado
- Design system consistente

---

## 🚀 Backend (Node.js)

### 🔧 Dependências Principais

#### **Framework Web**
```json
"express": "^4.18.2"            // Framework web minimalista
"cors": "^2.8.5"                // Cross-Origin Resource Sharing
"dotenv": "^16.3.1"             // Gerenciamento de variáveis de ambiente
```
**Por que usar?**
- Express: Padrão da indústria para APIs Node.js
- CORS: Permite comunicação frontend-backend
- Dotenv: Segurança para credenciais

#### **AWS Integration**
```json
"aws-sdk": "^2.1467.0"          // SDK oficial da AWS
```
**Por que usar?**
- Integração nativa com DynamoDB
- Suporte a Lambda, S3, SES, etc.
- Autenticação automática com IAM

#### **Autenticação e Segurança**
```json
"bcryptjs": "^2.4.3"            // Hash de senhas
"jsonwebtoken": "^9.0.2"        // Tokens JWT
```
**Por que usar?**
- bcrypt: Hash seguro para senhas (salt + hash)
- JWT: Autenticação stateless para APIs REST

#### **Utilitários**
```json
"uuid": "^9.0.1"                // Geração de IDs únicos
"multer": "^1.4.5-lts.1"        // Upload de arquivos
"nodemailer": "^7.0.10"         // Envio de emails
```
**Por que usar?**
- UUID: IDs únicos para registros no banco
- Multer: Upload de imagens de veículos
- Nodemailer: Notificações por email

### 🛠️ Dependências de Desenvolvimento

#### **Testing**
```json
"jest": "^29.7.0"               // Framework de testes
```
**Por que usar?**
- Padrão para testes em Node.js
- Mocking automático
- Coverage reports

#### **Development**
```json
"nodemon": "^3.0.1"             // Auto-restart do servidor
```
**Por que usar?**
- Reinicia servidor automaticamente ao salvar
- Essencial para desenvolvimento

---

## 🔄 Scripts Explicados

### Frontend Scripts
```json
{
  "dev": "vite",                 // Inicia servidor de desenvolvimento
  "build": "vite build",         // Build para produção
  "preview": "vite preview",     // Preview do build
  "start": "vite"                // Alias para dev
}
```

### Backend Scripts
```json
{
  "start": "node server.js",     // Produção (PM2/Docker)
  "dev": "nodemon server.js",    // Desenvolvimento com auto-restart
  "test": "jest"                 // Executa testes
}
```

---

## 🏗️ Arquitetura de Dependências

### Frontend Flow
```
Vite (Build) → React (UI) → React Router (Navigation) → Axios (API) → Leaflet (Maps)
     ↓              ↓              ↓                    ↓              ↓
TailwindCSS    React Icons    Hot Toast           HTTP Requests    Geolocation
```

### Backend Flow
```
Express (Server) → AWS SDK (Database) → JWT (Auth) → Nodemailer (Email)
     ↓                   ↓                  ↓              ↓
   CORS              DynamoDB           bcrypt         SES/SMTP
```

---

## 🚨 Considerações de Segurança

### Produção vs Desenvolvimento
```javascript
// ❌ Nunca em produção
if (process.env.NODE_ENV === 'development') {
  // Logs detalhados, CORS permissivo
}

// ✅ Sempre em produção
app.use(helmet())              // Headers de segurança
app.use(rateLimit())           // Rate limiting
app.use(compression())         // Compressão gzip
```

### Variáveis de Ambiente
```bash
# .env (nunca commitar)
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
JWT_SECRET=your_jwt_secret
DB_CONNECTION_STRING=your_db_url
```

---

## 📈 Performance Considerations

### Bundle Size
- **React**: ~42KB gzipped
- **TailwindCSS**: ~10KB após purge
- **Leaflet**: ~38KB gzipped
- **Total Frontend**: ~150KB (excelente)

### Backend Memory
- **Express**: ~10MB base
- **AWS SDK**: ~15MB
- **Total Backend**: ~50MB (otimizado)

---

## 🔄 Atualizações e Manutenção

### Dependências Críticas (Atualizar sempre)
- `react`, `react-dom`: Segurança e performance
- `express`: Patches de segurança
- `aws-sdk`: Novos serviços AWS

### Dependências Estáveis (Atualizar com cuidado)
- `tailwindcss`: Breaking changes em major versions
- `react-router-dom`: API changes entre versões

### Comando para Verificar Atualizações
```bash
# Frontend
cd frontend && npm outdated

# Backend  
cd backend && npm outdated

# Atualizar dependências
npm update
```

---

**💡 Dica**: Sempre teste em ambiente de desenvolvimento antes de atualizar dependências em produção!