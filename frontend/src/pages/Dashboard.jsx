import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiMap, FiActivity, FiAlertCircle } from 'react-icons/fi'
import toast from 'react-hot-toast'

const Dashboard = () => {
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchVehicles()
  }, [])

  const fetchVehicles = async () => {
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
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Meus Veículos</h1>
        <div className="text-sm text-gray-600">
          {vehicles.length} veículo{vehicles.length !== 1 ? 's' : ''} cadastrado{vehicles.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <FiActivity className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Ativos</p>
              <p className="text-2xl font-bold text-gray-900">
                {vehicles.filter(v => v.status === 'active').length}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <FiAlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Inativos</p>
              <p className="text-2xl font-bold text-gray-900">
                {vehicles.filter(v => v.status === 'inactive').length}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FiMap className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900">{vehicles.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="card hover:shadow-md transition-shadow">
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500 text-sm">Foto do Veículo</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">{vehicle.model}</h3>
              <p className="text-sm text-gray-600">Placa: {vehicle.plate}</p>
              
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  vehicle.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {vehicle.status === 'active' ? 'Ativo' : 'Inativo'}
                </span>
                
                <Link
                  to={`/tracking/${vehicle.id}`}
                  className="btn-primary text-sm"
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

      {vehicles.length === 0 && (
        <div className="text-center py-12">
          <FiMap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum veículo cadastrado</h3>
          <p className="text-gray-600">Solicite uma cotação para adicionar seu primeiro veículo.</p>
          <Link to="/quotes" className="btn-primary mt-4 inline-flex items-center">
            Solicitar Cotação
          </Link>
        </div>
      )}
    </div>
  )
}

export default Dashboard