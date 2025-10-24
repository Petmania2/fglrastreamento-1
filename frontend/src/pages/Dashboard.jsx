/**
 * FGL RASTREAMENTO - PÁGINA DASHBOARD
 * 
 * Esta é a página principal da aplicação que exibe:
 * - Lista de todos os veículos cadastrados
 * - Cards com estatísticas (ativos, inativos, total)
 * - Grid responsivo com informações de cada veículo
 * - Botões de ação para rastreamento
 * 
 * FUNCIONALIDADES:
 * - Carregamento assíncrono dos veículos via API
 * - Exibição de estatísticas em tempo real
 * - Navegação para página de rastreamento
 * - Estado de loading durante carregamento
 * - Tratamento de erros com notificações
 * 
 * FLUXO DE DADOS:
 * 1. Componente monta -> useEffect dispara
 * 2. fetchVehicles() faz requisição para API
 * 3. Dados são armazenados no estado local
 * 4. Interface é atualizada com os veículos
 */

// === IMPORTAÇÕES DO REACT ===
import { useState, useEffect } from 'react'  // Hooks para estado e efeitos colaterais
import { Link } from 'react-router-dom'      // Componente para navegação

// === IMPORTAÇÃO DOS ÍCONES ===
import { FiMap, FiActivity, FiAlertCircle } from 'react-icons/fi'

// === IMPORTAÇÃO DO SISTEMA DE NOTIFICAÇÕES ===
import toast from 'react-hot-toast'  // Para exibir mensagens de sucesso/erro

/**
 * COMPONENTE DASHBOARD PRINCIPAL
 * 
 * Gerencia o estado dos veículos e exibe a interface principal
 */
const Dashboard = () => {
  // === ESTADOS LOCAIS ===
  // Array com todos os veículos carregados da API
  const [vehicles, setVehicles] = useState([])
  
  // Flag para controlar o estado de carregamento
  const [loading, setLoading] = useState(true)

  // === EFEITO COLATERAL ===
  // Executa uma vez quando o componente é montado
  useEffect(() => {
    fetchVehicles()  // Carrega os veículos da API
  }, [])  // Array vazio = executa apenas uma vez

  /**
   * FUNÇÃO PARA BUSCAR VEÍCULOS DA API
   * 
   * Fluxo:
   * 1. Faz requisição GET para /api/vehicles
   * 2. Converte resposta para JSON
   * 3. Verifica se foi bem-sucedida
   * 4. Atualiza estado ou exibe erro
   * 5. Remove estado de loading
   */
  const fetchVehicles = async () => {
    try {
      // Requisição para a API do backend
      const response = await fetch('/api/vehicles')
      const data = await response.json()
      
      // Verifica se a API retornou sucesso
      if (data.success) {
        setVehicles(data.data)  // Atualiza lista de veículos
      } else {
        // Exibe mensagem de erro se API retornou falha
        toast.error('Erro ao carregar veículos')
      }
    } catch (error) {
      // Captura erros de rede ou parsing
      toast.error('Erro de conexão')
      console.error('Erro ao buscar veículos:', error)
    } finally {
      // Sempre remove o loading, independente do resultado
      setLoading(false)
    }
  }

  // === RENDERIZAÇÃO CONDICIONAL - LOADING ===
  // Exibe spinner enquanto os dados estão sendo carregados
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        {/* Spinner animado com rotação contínua */}
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  // === RENDERIZAÇÃO PRINCIPAL ===
  return (
    <div className="space-y-6"> {/* Container com espaçamento vertical */}
      
      {/* === HEADER DA PÁGINA === */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Meus Veículos</h1>
        {/* Contador dinâmico com pluralização */}
        <div className="text-sm text-gray-600">
          {vehicles.length} veículo{vehicles.length !== 1 ? 's' : ''} cadastrado{vehicles.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* === CARDS DE ESTATÍSTICAS === */}
      {/* Grid responsivo: 1 coluna em mobile, 3 em desktop */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* CARD 1: VEÍCULOS ATIVOS */}
        <div className="card"> {/* Classe CSS customizada definida no Tailwind */}
          <div className="flex items-center">
            {/* Ícone com fundo colorido */}
            <div className="p-2 bg-green-100 rounded-lg">
              <FiActivity className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Ativos</p>
              {/* Cálculo dinâmico: filtra veículos com status 'active' */}
              <p className="text-2xl font-bold text-gray-900">
                {vehicles.filter(v => v.status === 'active').length}
              </p>
            </div>
          </div>
        </div>

        {/* CARD 2: VEÍCULOS INATIVOS */}
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <FiAlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Inativos</p>
              {/* Cálculo dinâmico: filtra veículos com status 'inactive' */}
              <p className="text-2xl font-bold text-gray-900">
                {vehicles.filter(v => v.status === 'inactive').length}
              </p>
            </div>
          </div>
        </div>

        {/* CARD 3: TOTAL DE VEÍCULOS */}
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FiMap className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total</p>
              {/* Conta total de veículos no array */}
              <p className="text-2xl font-bold text-gray-900">{vehicles.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* === GRID DE VEÍCULOS === */}
      {/* Grid responsivo: 1 coluna (mobile), 2 colunas (tablet), 3 colunas (desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Itera sobre cada veículo e cria um card */}
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="card hover:shadow-md transition-shadow">
            
            {/* ÁREA DA IMAGEM DO VEÍCULO */}
            <div className="aspect-w-16 aspect-h-9 mb-4">
              {/* Placeholder para imagem (futuramente pode ser substituído por imagem real) */}
              <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 text-sm">Foto do Veículo</span>
              </div>
            </div>
            
            {/* INFORMAÇÕES DO VEÍCULO */}
            <div className="space-y-2">
              {/* Modelo do veículo */}
              <h3 className="font-semibold text-gray-900">{vehicle.model}</h3>
              {/* Placa do veículo */}
              <p className="text-sm text-gray-600">Placa: {vehicle.plate}</p>
              
              {/* LINHA DE AÇÕES */}
              <div className="flex items-center justify-between">
                {/* BADGE DE STATUS */}
                {/* Estilização condicional baseada no status */}
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  vehicle.status === 'active' 
                    ? 'bg-green-100 text-green-800'  // Verde para ativo
                    : 'bg-red-100 text-red-800'      // Vermelho para inativo
                }`}>
                  {vehicle.status === 'active' ? 'Ativo' : 'Inativo'}
                </span>
                
                {/* BOTÃO DE RASTREAMENTO */}
                {/* Link para página de rastreamento com ID do veículo */}
                <Link
                  to={`/tracking/${vehicle.id}`}
                  className="btn-primary text-sm"
                  // Desabilita botão se veículo estiver inativo
                  disabled={vehicle.status === 'inactive'}
                >
                  <FiMap className="w-4 h-4 mr-1" />
                  Rastrear
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* === ESTADO VAZIO === */}
      {/* Exibido quando não há veículos cadastrados */}
      {vehicles.length === 0 && (
        <div className="text-center py-12">
          {/* Ícone grande para chamar atenção */}
          <FiMap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          {/* Mensagem principal */}
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum veículo cadastrado</h3>
          {/* Mensagem explicativa */}
          <p className="text-gray-600">Solicite uma cotação para adicionar seu primeiro veículo.</p>
          {/* Call-to-action para cotação */}
          <Link to="/quotes" className="btn-primary mt-4 inline-flex items-center">
            Solicitar Cotação
          </Link>
        </div>
      )}
    </div>
  )
}

// Exporta o componente para uso no roteamento da aplicação
export default Dashboard