# 🚀 FGL Rastreamento - Guia do Desenvolvedor

## 📋 Visão Geral da Arquitetura

Este projeto implementa uma **plataforma de rastreamento veicular** com arquitetura **cliente-servidor** moderna:

- **Frontend**: React SPA (Single Page Application)
- **Backend**: Node.js API REST
- **Banco**: DynamoDB (simulado com dados mockados)
- **Deploy**: AWS (Amplify + Lambda + API Gateway)

## 🏗️ Estrutura do Projeto

```
fglrastreamento/
├── backend/                 # API Node.js
│   ├── src/
│   │   ├── routes/         # Rotas da API organizadas por módulo
│   │   ├── controllers/    # Lógica de negócio
│   │   ├── models/         # Modelos de dados
│   │   ├── services/       # Serviços externos (email, AWS)
│   │   └── utils/          # Utilitários e helpers
│   └── server.js           # Servidor principal
├── frontend/               # App React
│   ├── src/
│   │   ├── components/     # Componentes reutilizáveis
│   │   ├── pages/          # Páginas da aplicação
│   │   ├── hooks/          # Custom hooks
│   │   ├── context/        # Context API (estado global)
│   │   └── utils/          # Utilitários frontend
│   └── public/             # Arquivos estáticos
└── docs/                   # Documentação
```

## 🔄 Fluxo de Dados

### 1. Inicialização da Aplicação
```
1. Usuário acessa http://localhost:3000
2. React Router carrega componente App
3. Layout wrapper é renderizado
4. Dashboard é carregado como página inicial
5. useEffect dispara fetchVehicles()
6. API retorna dados dos veículos
7. Interface é atualizada
```

### 2. Comunicação Frontend ↔ Backend
```
Frontend (React)     →     Backend (Node.js)     →     Dados (Mock/DynamoDB)
     ↓                           ↓                            ↓
fetch('/api/vehicles')  →  router.get('/')      →  vehicles array
     ↓                           ↓                            ↓
JSON response          ←  res.json(data)        ←  return data
     ↓
setState(vehicles)
```

## 🧩 Componentes Principais

### Backend (server.js)
**Responsabilidade**: Ponto de entrada da API
- Configura Express.js
- Registra middlewares (CORS, JSON parser)
- Define rotas com prefixo `/api`
- Inicia servidor na porta 5001

### Frontend (App.jsx)
**Responsabilidade**: Componente raiz da SPA
- Configura React Router
- Define todas as rotas da aplicação
- Gerencia sistema de notificações (Toaster)

### Layout (Layout.jsx)
**Responsabilidade**: Estrutura visual principal
- Sidebar responsiva com navegação
- Header com informações do usuário
- Área de conteúdo dinâmico
- Sistema de overlay para mobile

### Dashboard (Dashboard.jsx)
**Responsabilidade**: Página inicial
- Lista todos os veículos cadastrados
- Exibe estatísticas (ativos, inativos, total)
- Permite navegação para rastreamento
- Gerencia estados de loading e erro

## 🔌 API Endpoints

### Veículos
```http
GET /api/vehicles
# Retorna lista de todos os veículos
Response: {
  success: boolean,
  data: Vehicle[],
  total: number
}

GET /api/vehicles/:id
# Retorna veículo específico
Response: {
  success: boolean,
  data: Vehicle
}
```

### Estrutura do Objeto Vehicle
```javascript
{
  id: string,              // Identificador único
  plate: string,           // Placa do veículo
  model: string,           // Modelo e ano
  status: 'active' | 'inactive',  // Status do rastreamento
  image: string,           // Caminho da imagem
  lastLocation: {         // Última posição GPS
    lat: number,
    lng: number
  }
}
```

## 🎨 Sistema de Estilos

### TailwindCSS
O projeto usa **TailwindCSS** para estilização:
- **Classes utilitárias**: `flex`, `bg-white`, `text-lg`
- **Responsividade**: `md:grid-cols-2`, `lg:grid-cols-3`
- **Estados**: `hover:shadow-md`, `focus:ring-2`

### Classes Customizadas
```css
.card {
  @apply bg-white rounded-lg shadow-sm border border-gray-200 p-6;
}

.btn-primary {
  @apply bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700;
}
```

## 🔧 Estados e Hooks

### useState
```javascript
// Gerencia dados dos veículos
const [vehicles, setVehicles] = useState([])

// Controla estado de carregamento
const [loading, setLoading] = useState(true)

// Controla sidebar mobile
const [sidebarOpen, setSidebarOpen] = useState(false)
```

### useEffect
```javascript
// Executa uma vez na montagem do componente
useEffect(() => {
  fetchVehicles()  // Carrega dados da API
}, [])  // Array vazio = executa apenas uma vez
```

### useLocation
```javascript
// Obtém rota atual para destacar item ativo no menu
const location = useLocation()
const isActive = location.pathname === item.href
```

## 🚨 Tratamento de Erros

### Frontend
```javascript
try {
  const response = await fetch('/api/vehicles')
  const data = await response.json()
  
  if (data.success) {
    setVehicles(data.data)
  } else {
    toast.error('Erro ao carregar veículos')
  }
} catch (error) {
  toast.error('Erro de conexão')
  console.error('Erro:', error)
} finally {
  setLoading(false)
}
```

### Backend
```javascript
// Validação de parâmetros
const vehicle = vehicles.find(v => v.id === req.params.id)

if (!vehicle) {
  return res.status(404).json({
    success: false,
    message: 'Veículo não encontrado'
  })
}
```

## 📱 Responsividade

### Breakpoints TailwindCSS
- **sm**: 640px+ (mobile landscape)
- **md**: 768px+ (tablet)
- **lg**: 1024px+ (desktop)
- **xl**: 1280px+ (large desktop)

### Estratégia Mobile-First
```javascript
// Grid responsivo
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"

// Sidebar responsiva
className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
  fixed lg:translate-x-0 lg:static`}
```

## 🔄 Ciclo de Vida dos Componentes

### Montagem
1. Componente é criado
2. Estado inicial é definido
3. useEffect é executado
4. Dados são carregados da API
5. Interface é renderizada

### Atualização
1. Estado muda (setVehicles)
2. Componente re-renderiza
3. Virtual DOM é comparado
4. Apenas diferenças são atualizadas

### Desmontagem
1. Componente é removido
2. Cleanup functions são executadas
3. Event listeners são removidos

## 🚀 Próximos Passos

### Funcionalidades Pendentes
- [ ] Autenticação JWT
- [ ] Rastreamento em tempo real (WebSockets)
- [ ] Integração com DynamoDB
- [ ] Sistema de notificações push
- [ ] Relatórios e analytics

### Melhorias Técnicas
- [ ] Testes unitários (Jest + React Testing Library)
- [ ] Testes E2E (Cypress)
- [ ] TypeScript para type safety
- [ ] PWA (Progressive Web App)
- [ ] Docker para containerização

## 📚 Recursos Úteis

- [React Documentation](https://react.dev/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Express.js Guide](https://expressjs.com/)
- [AWS SDK Documentation](https://docs.aws.amazon.com/sdk-for-javascript/)

---

**Desenvolvido por Felipe - FGL Rastreamento** 🚗📍