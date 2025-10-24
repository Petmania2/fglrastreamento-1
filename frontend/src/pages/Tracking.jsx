import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { FiNavigation, FiClock, FiActivity } from 'react-icons/fi'
import L from 'leaflet'
import toast from 'react-hot-toast'

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

const Tracking = () => {
  const { vehicleId } = useParams()
  const [vehicle, setVehicle] = useState(null)
  const [trackingData, setTrackingData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchVehicleData()
    fetchTrackingData()
    
    // Simula atualização em tempo real
    const interval = setInterval(fetchTrackingData, 5000)
    return () => clearInterval(interval)
  }, [vehicleId])

  const fetchVehicleData = async () => {
    try {
      const response = await fetch(`/api/vehicles/${vehicleId}`)
      const data = await response.json()
      
      if (data.success) {
        setVehicle(data.data)
      } else {
        toast.error('Veículo não encontrado')
      }
    } catch (error) {
      toast.error('Erro ao carregar dados do veículo')
    }
  }

  const fetchTrackingData = async () => {
    try {
      const response = await fetch(`/api/tracking/${vehicleId}`)
      const data = await response.json()
      
      if (data.success) {
        setTrackingData(data.data)
      }
    } catch (error) {
      console.error('Erro ao carregar dados de rastreamento')
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

  if (!vehicle || !trackingData) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Veículo não encontrado</h3>
        <p className="text-gray-600">Não foi possível carregar os dados de rastreamento.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Rastreamento</h1>
          <p className="text-gray-600">{vehicle.model} - {vehicle.plate}</p>
        </div>
        
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
          trackingData.status === 'moving' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-800'
        }`}>
          <FiActivity className="w-4 h-4 mr-1" />
          {trackingData.status === 'moving' ? 'Em movimento' : 'Parado'}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FiNavigation className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Velocidade</p>
              <p className="text-2xl font-bold text-gray-900">{trackingData.speed} km/h</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <FiNavigation className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Direção</p>
              <p className="text-2xl font-bold text-gray-900">{trackingData.direction}°</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <FiClock className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Última atualização</p>
              <p className="text-sm font-bold text-gray-900">
                {new Date(trackingData.timestamp).toLocaleTimeString('pt-BR')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Localização Atual</h3>
        <div className="h-96 rounded-lg overflow-hidden">
          <MapContainer
            center={[trackingData.location.lat, trackingData.location.lng]}
            zoom={15}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[trackingData.location.lat, trackingData.location.lng]}>
              <Popup>
                <div className="text-center">
                  <strong>{vehicle.model}</strong><br />
                  Placa: {vehicle.plate}<br />
                  Velocidade: {trackingData.speed} km/h<br />
                  {new Date(trackingData.timestamp).toLocaleString('pt-BR')}
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>

      {/* Location Details */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Detalhes da Localização</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-600">Latitude</p>
            <p className="text-lg text-gray-900">{trackingData.location.lat.toFixed(6)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Longitude</p>
            <p className="text-lg text-gray-900">{trackingData.location.lng.toFixed(6)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tracking