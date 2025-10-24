import { FiPhone, FiMessageCircle, FiClock, FiUsers } from 'react-icons/fi'

const Support = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = '5511971000304'
    const message = 'Olá! Preciso de atendimento da FGL Rastreamento.'
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Central de Atendimento</h1>

      {/* Main Support Card */}
      <div className="card text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiMessageCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Atendimento via WhatsApp
          </h2>
          <p className="text-gray-600 mb-6">
            Fale conosco diretamente pelo WhatsApp para um atendimento rápido e personalizado
          </p>
        </div>

        <button
          onClick={handleWhatsAppClick}
          className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center mx-auto"
        >
          <FiMessageCircle className="w-5 h-5 mr-2" />
          Iniciar Conversa
        </button>

        <p className="text-sm text-gray-500 mt-4">
          Número: (11) 97100-0304
        </p>
      </div>

      {/* Support Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="p-3 bg-blue-100 rounded-lg w-fit mx-auto mb-4">
            <FiClock className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Horário de Atendimento</h3>
          <p className="text-sm text-gray-600">
            Segunda a Sexta<br />
            08:00 às 18:00
          </p>
        </div>

        <div className="card text-center">
          <div className="p-3 bg-purple-100 rounded-lg w-fit mx-auto mb-4">
            <FiPhone className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Suporte Técnico</h3>
          <p className="text-sm text-gray-600">
            Problemas com rastreamento<br />
            e instalação
          </p>
        </div>

        <div className="card text-center">
          <div className="p-3 bg-orange-100 rounded-lg w-fit mx-auto mb-4">
            <FiUsers className="w-6 h-6 text-orange-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Atendimento Comercial</h3>
          <p className="text-sm text-gray-600">
            Vendas, contratos<br />
            e renovações
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Perguntas Frequentes</h3>
        <div className="space-y-4">
          <div className="border-b border-gray-200 pb-4">
            <h4 className="font-medium text-gray-900 mb-2">Como funciona o rastreamento?</h4>
            <p className="text-sm text-gray-600">
              Nosso sistema monitora seu veículo 24h por dia através de GPS, enviando a localização em tempo real.
            </p>
          </div>
          
          <div className="border-b border-gray-200 pb-4">
            <h4 className="font-medium text-gray-900 mb-2">Como solicitar guincho?</h4>
            <p className="text-sm text-gray-600">
              Acesse a aba "Solicitar Guincho" no menu lateral ou entre em contato via WhatsApp.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Como gerar segunda via do boleto?</h4>
            <p className="text-sm text-gray-600">
              Vá em "Boletos" no menu e clique em "Segunda Via" no boleto desejado.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Support