import { useState } from 'react'
import { FiTruck, FiPhone, FiAlertTriangle, FiMapPin, FiClock } from 'react-icons/fi'
import toast from 'react-hot-toast'

const Towing = () => {
  const [usedTowings, setUsedTowings] = useState(0) // Simular guinchos já utilizados
  const maxTowings = 2

  const handleTowingRequest = () => {
    if (usedTowings >= maxTowings) {
      toast.error('Você já utilizou seus 2 guinchos anuais!')
      return
    }

    const phoneNumber = '554142444424'
    const message = `Olá! Preciso solicitar um guincho da FGL Rastreamento.

📍 Localização: [Informe sua localização]
🚗 Veículo: [Informe modelo e placa]
⚠️ Problema: [Descreva o problema]

Guinchos restantes: ${maxTowings - usedTowings - 1}/2`

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
    
    // Simular uso do guincho
    setUsedTowings(prev => prev + 1)
    toast.success('Solicitação enviada! Aguarde o contato do guincho.')
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Solicitar Guincho</h1>

      {/* Status Card */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Status dos Guinchos</h2>
          <div className="flex items-center space-x-2">
            <FiTruck className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-600">
              {maxTowings - usedTowings} restantes
            </span>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Guinchos utilizados este ano:</span>
            <span className="font-semibold text-gray-900">{usedTowings}/{maxTowings}</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all ${
                usedTowings === 0 ? 'bg-green-500' : 
                usedTowings === 1 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${(usedTowings / maxTowings) * 100}%` }}
            ></div>
          </div>
        </div>

        {usedTowings >= maxTowings && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <div className="flex items-center">
              <FiAlertTriangle className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-sm text-red-700 font-medium">
                Limite de guinchos atingido para este ano
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Request Towing Card */}
      <div className="card text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiTruck className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Solicitar Guincho de Emergência
          </h2>
          <p className="text-gray-600 mb-6">
            Precisa de um guincho? Entre em contato conosco via WhatsApp
          </p>
        </div>

        <button
          onClick={handleTowingRequest}
          disabled={usedTowings >= maxTowings}
          className={`px-8 py-3 rounded-lg font-medium transition-colors flex items-center mx-auto ${
            usedTowings >= maxTowings
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          <FiPhone className="w-5 h-5 mr-2" />
          {usedTowings >= maxTowings ? 'Limite Atingido' : 'Solicitar Guincho'}
        </button>

        <p className="text-sm text-gray-500 mt-4">
          Número: (41) 2444-2424
        </p>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="p-3 bg-green-100 rounded-lg w-fit mx-auto mb-4">
            <FiClock className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Atendimento 24h</h3>
          <p className="text-sm text-gray-600">
            Disponível todos os dias<br />
            da semana
          </p>
        </div>

        <div className="card text-center">
          <div className="p-3 bg-yellow-100 rounded-lg w-fit mx-auto mb-4">
            <FiMapPin className="w-6 h-6 text-yellow-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Cobertura Regional</h3>
          <p className="text-sm text-gray-600">
            Atendemos toda a<br />
            região metropolitana
          </p>
        </div>

        <div className="card text-center">
          <div className="p-3 bg-red-100 rounded-lg w-fit mx-auto mb-4">
            <FiAlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Limite Anual</h3>
          <p className="text-sm text-gray-600">
            2 guinchos gratuitos<br />
            por ano
          </p>
        </div>
      </div>

      {/* Instructions */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Como Solicitar</h3>
        <div className="space-y-3">
          <div className="flex items-start">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
              <span className="text-xs font-medium text-blue-600">1</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Clique em "Solicitar Guincho"</h4>
              <p className="text-sm text-gray-600">Você será redirecionado para o WhatsApp</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
              <span className="text-xs font-medium text-blue-600">2</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Informe sua localização</h4>
              <p className="text-sm text-gray-600">Envie sua localização exata e o problema</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
              <span className="text-xs font-medium text-blue-600">3</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Aguarde o guincho</h4>
              <p className="text-sm text-gray-600">Tempo médio de chegada: 30-60 minutos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Towing