/**
 * FGL RASTREAMENTO - LAYOUT PRINCIPAL
 * 
 * Este componente define a estrutura visual principal da aplicação:
 * - Sidebar responsiva com navegação principal
 * - Header com informações do usuário
 * - Área de conteúdo dinâmico
 * - Sistema de overlay para mobile
 * 
 * FUNCIONALIDADES:
 * - Sidebar colapsável para dispositivos móveis
 * - Destaque visual da página ativa
 * - Navegação intuitiva com ícones
 * - Design responsivo (mobile-first)
 * 
 * TECNOLOGIAS:
 * - React Hooks (useState para estado local)
 * - React Router (Link, useLocation)
 * - Feather Icons (via react-icons/fi)
 * - TailwindCSS (classes utilitárias)
 */

// === IMPORTAÇÕES DO REACT ===
import { useState } from 'react'                    // Hook para gerenciar estado local
import { Link, useLocation } from 'react-router-dom' // Navegação e localização atual

// === IMPORTAÇÃO DOS ÍCONES ===
// Biblioteca Feather Icons - ícones minimalistas e consistentes
import { 
  FiHome,        // Ícone de casa (Dashboard)
  FiMap,         // Ícone de mapa (Rastreamento)
  FiCreditCard,  // Ícone de cartão (Boletos)
  FiFileText,    // Ícone de documento (Cotação)
  FiUser,        // Ícone de usuário (Perfil)
  FiSettings,    // Ícone de configurações
  FiMenu,        // Ícone de menu hamburguer (mobile)
  FiX,           // Ícone de fechar (mobile)
  FiPhone,       // Ícone de telefone (Suporte)
  FiTruck        // Ícone de caminhão (Guincho)
} from 'react-icons/fi'

/**
 * COMPONENTE LAYOUT PRINCIPAL
 * 
 * @param {Object} props - Propriedades do componente
 * @param {ReactNode} props.children - Conteúdo a ser renderizado na área principal
 */
const Layout = ({ children }) => {
  // === ESTADOS LOCAIS ===
  // Controla se a sidebar está aberta em dispositivos móveis
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  // Hook para obter a localização atual (URL ativa)
  // Usado para destacar o item de menu ativo
  const location = useLocation()

  // === CONFIGURAÇÃO DA NAVEGAÇÃO ===
  // Array com todos os itens do menu lateral
  // Cada item contém: nome, rota, ícone
  const navigation = [
    { name: 'Dashboard', href: '/', icon: FiHome },
    { name: 'Boletos', href: '/billing', icon: FiCreditCard },
    { name: 'Cotação', href: '/quotes', icon: FiFileText },
    { name: 'Central de Atendimento', href: '/support', icon: FiPhone },
    { name: 'Solicitar Guincho', href: '/towing', icon: FiTruck },
    { name: 'Perfil', href: '/profile', icon: FiUser },
    { name: 'Configurações', href: '/settings', icon: FiSettings },
  ]

  // === RENDERIZAÇÃO DO COMPONENTE ===
  return (
    // Container principal - layout flex horizontal ocupando toda a tela
    <div className="flex h-screen bg-gray-50">
      
      {/* === SIDEBAR (MENU LATERAL) === */}
      {/* 
        COMPORTAMENTO RESPONSIVO:
        - Mobile: sidebar oculta por padrão, aparece com overlay
        - Desktop: sidebar sempre visível, estática
        
        CLASSES TAILWIND EXPLICADAS:
        - translate-x-0: sidebar visível
        - -translate-x-full: sidebar oculta (fora da tela)
        - lg:translate-x-0: sempre visível em telas grandes
        - lg:static: posicionamento estático em desktop
      */}
      <div className={`${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        
        {/* HEADER DA SIDEBAR - Logo + Botão Fechar */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-primary-600">FGL Rastreamento</h1>
          {/* Botão fechar - apenas visível em mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>
        
        {/* NAVEGAÇÃO PRINCIPAL */}
        <nav className="mt-6">
          {/* Itera sobre todos os itens de navegação */}
          {navigation.map((item) => {
            // Verifica se o item atual está ativo (URL corresponde)
            const isActive = location.pathname === item.href
            
            return (
              <Link
                key={item.name}
                to={item.href}
                // ESTILIZAÇÃO CONDICIONAL:
                // - Item ativo: fundo azul claro, texto azul, borda direita
                // - Item inativo: texto cinza, hover com fundo claro
                className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-600 border-r-2 border-primary-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
                // Fecha sidebar ao clicar (importante para mobile)
                onClick={() => setSidebarOpen(false)}
              >
                {/* Ícone do item de menu */}
                <item.icon className="w-5 h-5 mr-3" />
                {/* Nome do item */}
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* === CONTEÚDO PRINCIPAL === */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* HEADER SUPERIOR */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            {/* Botão menu hamburguer - apenas visível em mobile */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
            >
              <FiMenu className="w-6 h-6" />
            </button>
            
            {/* INFORMAÇÕES DO USUÁRIO */}
            <div className="flex items-center space-x-4">
              {/* Saudação personalizada */}
              <span className="text-sm text-gray-600">Bem-vindo, Felipe!</span>
              {/* Avatar do usuário (inicial do nome) */}
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">F</span>
              </div>
            </div>
          </div>
        </header>

        {/* ÁREA DE CONTEÚDO DINÂMICO */}
        {/* Aqui serão renderizadas todas as páginas da aplicação */}
        <main className="flex-1 overflow-y-auto p-6">
          {children} {/* Conteúdo passado como prop */}
        </main>
      </div>

      {/* === OVERLAY PARA MOBILE === */}
      {/* Fundo escuro que aparece quando sidebar está aberta em mobile */}
      {/* Permite fechar a sidebar clicando fora dela */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

// Exporta o componente para uso em outras partes da aplicação
export default Layout