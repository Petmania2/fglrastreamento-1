import { useState, useEffect } from 'react'
import { FiUpload, FiX, FiFileText, FiSend } from 'react-icons/fi'
import toast from 'react-hot-toast'

const Quotes = () => {
  const [formData, setFormData] = useState({
    plate: '',
    model: '',
    additionalInfo: ''
  })
  const [files, setFiles] = useState([])
  const [quotes, setQuotes] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchQuotes()
  }, [])

  const fetchQuotes = async () => {
    try {
      const response = await fetch('/api/quotes')
      const data = await response.json()
      
      if (data.success) {
        setQuotes(data.data)
      }
    } catch (error) {
      console.error('Erro ao carregar cotações')
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files)
    
    // Validar tipos de arquivo
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']
    const invalidFiles = selectedFiles.filter(file => !validTypes.includes(file.type))
    
    if (invalidFiles.length > 0) {
      toast.error('Apenas imagens (JPG, PNG) e PDFs são permitidos')
      return
    }
    
    // Validar tamanho (5MB por arquivo)
    const oversizedFiles = selectedFiles.filter(file => file.size > 5 * 1024 * 1024)
    if (oversizedFiles.length > 0) {
      toast.error('Arquivos devem ter no máximo 5MB')
      return
    }
    
    setFiles(prev => [...prev, ...selectedFiles].slice(0, 5)) // Máximo 5 arquivos
  }

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.plate || !formData.model) {
      toast.error('Placa e modelo são obrigatórios')
      return
    }
    
    if (files.length < 1) {
      toast.error('É necessário enviar pelo menos 1 documento do veículo')
      return
    }
    
    setLoading(true)
    
    try {
      const formDataToSend = new FormData()
      formDataToSend.append('plate', formData.plate)
      formDataToSend.append('model', formData.model)
      formDataToSend.append('additionalInfo', formData.additionalInfo)
      
      files.forEach(file => {
        formDataToSend.append('files', file)
      })
      
      const response = await fetch('/api/quotes', {
        method: 'POST',
        body: formDataToSend
      })
      
      const data = await response.json()
      
      if (data.success) {
        toast.success('Solicitação de cotação enviada com sucesso!')
        setFormData({ plate: '', model: '', additionalInfo: '' })
        setFiles([])
        fetchQuotes()
      } else {
        toast.error(data.message || 'Erro ao enviar cotação')
      }
    } catch (error) {
      toast.error('Erro de conexão')
    } finally {
      setLoading(false)
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Solicitar Cotação</h1>

      {/* Quote Form */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Novo Veículo</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Placa do Veículo *
              </label>
              <input
                type="text"
                name="plate"
                value={formData.plate}
                onChange={handleInputChange}
                placeholder="ABC-1234"
                className="input"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Modelo do Veículo *
              </label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleInputChange}
                placeholder="Honda Civic 2020"
                className="input"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Informações Adicionais
            </label>
            <textarea
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleInputChange}
              rows={4}
              placeholder="Descreva características especiais, modificações, etc."
              className="input"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Documentos do Veículo * (CRLV, CNH, etc.)
            </label>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                multiple
                accept="image/*,.pdf"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <FiUpload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">
                  Envie os documentos atualizados do veículo
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  CRLV, CNH, Comprovante de Residência (PDF ou Imagens)
                </span>
              </label>
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <FiFileText className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{file.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FiX className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex items-center"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              ) : (
                <FiSend className="w-4 h-4 mr-2" />
              )}
              {loading ? 'Enviando...' : 'Enviar Cotação'}
            </button>
          </div>
        </form>
      </div>

      {/* Previous Quotes */}
      {quotes.length > 0 && (
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Cotações Anteriores</h2>
          <div className="space-y-4">
            {quotes.map((quote) => (
              <div key={quote.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{quote.model}</h3>
                    <p className="text-sm text-gray-600">Placa: {quote.plate}</p>
                    <p className="text-xs text-gray-500">
                      Enviado em {new Date(quote.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      {quote.status === 'pending' ? 'Pendente' : 'Processando'}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      Resposta em {quote.estimatedResponse}
                    </p>
                  </div>
                </div>
                {quote.files.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs text-gray-500">
                      {quote.files.length} arquivo{quote.files.length !== 1 ? 's' : ''} enviado{quote.files.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Quotes