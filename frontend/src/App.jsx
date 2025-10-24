/**
 * FGL RASTREAMENTO - COMPONENTE PRINCIPAL (FRONTEND)
 * 
 * Este é o componente raiz da aplicação React que define:
 * - Estrutura de roteamento da SPA (Single Page Application)
 * - Layout principal que envolve todas as páginas
 * - Sistema de notificações toast
 * 
 * ARQUITETURA:
 * - React Router para navegação entre páginas
 * - Layout wrapper que contém sidebar e header
 * - Toaster para feedback visual ao usuário
 * 
 * FLUXO DE NAVEGAÇÃO:
 * / -> Dashboard (página inicial com lista de veículos)
 * /tracking/:vehicleId -> Rastreamento em tempo real
 * /billing -> Gestão de boletos
 * /quotes -> Solicitação de cotações
 * /support -> Central de atendimento
 * /towing -> Solicitação de guincho
 * /profile -> Perfil do usuário
 * /settings -> Configurações do sistema
 */

// === IMPORTAÇÕES DO REACT ROUTER ===
// BrowserRouter: Gerencia o histórico de navegação do browser
// Routes: Container para definir todas as rotas
// Route: Define uma rota específica (path + component)
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// === IMPORTAÇÃO DO SISTEMA DE NOTIFICAÇÕES ===
// Toaster: Componente para exibir mensagens de sucesso/erro
import { Toaster } from 'react-hot-toast'

// === IMPORTAÇÃO DO LAYOUT E PÁGINAS ===
// Layout: Componente que contém sidebar, header e área de conteúdo
import Layout from './components/Layout'

// Páginas da aplicação - cada uma representa uma funcionalidade principal
import Dashboard from './pages/Dashboard'     // Página inicial - lista de veículos
import Tracking from './pages/Tracking'       // Rastreamento em tempo real com mapa
import Billing from './pages/Billing'         // Gestão de boletos e pagamentos
import Quotes from './pages/Quotes'           // Solicitação de cotações
import Support from './pages/Support'         // Central de atendimento
import Towing from './pages/Towing'           // Solicitação de guincho
import Profile from './pages/Profile'         // Perfil do usuário
import Settings from './pages/Settings'       // Configurações do sistema

/**
 * COMPONENTE PRINCIPAL DA APLICAÇÃO
 * 
 * Estrutura hierárquica:
 * App
 * └── Router (gerencia navegação)
 *     └── Layout (sidebar + header + conteúdo)
 *         └── Routes (define rotas disponíveis)
 *             └── Route (cada página específica)
 */
function App() {
  return (
    // === ROUTER PRINCIPAL ===
    // Habilita navegação SPA com histórico do browser
    <Router>
      <div className="App">
        {/* === LAYOUT WRAPPER === */}
        {/* Todos os componentes filhos serão renderizados dentro do Layout */}
        <Layout>
          {/* === DEFINIÇÃO DAS ROTAS === */}
          <Routes>
            {/* ROTA PRINCIPAL - Dashboard */}
            <Route path="/" element={<Dashboard />} />
            
            {/* ROTA DINÂMICA - Rastreamento por veículo */}
            {/* :vehicleId é um parâmetro que será capturado pela página */}
            <Route path="/tracking/:vehicleId" element={<Tracking />} />
            
            {/* ROTAS ESTÁTICAS - Funcionalidades principais */}
            <Route path="/billing" element={<Billing />} />     {/* Boletos */}
            <Route path="/quotes" element={<Quotes />} />       {/* Cotações */}
            <Route path="/support" element={<Support />} />     {/* Suporte */}
            <Route path="/towing" element={<Towing />} />       {/* Guincho */}
            <Route path="/profile" element={<Profile />} />     {/* Perfil */}
            <Route path="/settings" element={<Settings />} />   {/* Configurações */}
          </Routes>
        </Layout>
        
        {/* === SISTEMA DE NOTIFICAÇÕES === */}
        {/* Exibe mensagens toast no canto superior direito */}
        {/* Usado para feedback de ações (sucesso, erro, aviso) */}
        <Toaster position="top-right" />
      </div>
    </Router>
  )
}

export default App