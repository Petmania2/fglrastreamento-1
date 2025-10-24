import { useState, useEffect } from 'react'
import { FiDownload, FiCalendar, FiDollarSign, FiRefreshCw } from 'react-icons/fi'
import toast from 'react-hot-toast'

const Billing = () => {
  const [bills, setBills] = useState([])
  const [contracts, setContracts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBills()
    fetchContracts()
  }, [])

  const fetchBills = async () => {
    try {
      const response = await fetch('/api/billing')
      const data = await response.json()
      
      if (data.success) {
        setBills(data.data)
      }
    } catch (error) {
      toast.error('Erro ao carregar boletos')
    }
  }

  const fetchContracts = async () => {
    try {
      const response = await fetch('/api/contracts')
      const data = await response.json()
      
      if (data.success) {
        setContracts(data.data)
      }
    } catch (error) {
      toast.error('Erro ao carregar contratos')
    } finally {
      setLoading(false)
    }
  }

  const generateDuplicate = async (billId) => {
    try {
      const response = await fetch(`/api/billing/${billId}/generate-duplicate`, {
        method: 'POST'
      })
      const data = await response.json()
      
      if (data.success) {
        toast.success('Segunda via gerada com sucesso!')
      } else {
        toast.error('Erro ao gerar segunda via')
      }
    } catch (error) {
      toast.error('Erro de conexão')
    }
  }

  const renewContract = async (contractId) => {
    try {
      const response = await fetch(`/api/contracts/${contractId}/renew`, {
        method: 'POST'
      })
      const data = await response.json()
      
      if (data.success) {
        toast.success(`Contrato renovado! Novo valor: R$ ${data.data.monthlyValue.toFixed(2)}`)
        fetchContracts()
      } else {
        toast.error('Erro ao renovar contrato')
      }
    } catch (error) {
      toast.error('Erro de conexão')
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'overdue':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'paid':
        return 'Pago'
      case 'pending':
        return 'Pendente'
      case 'overdue':
        return 'Atrasado'
      default:
        return 'Desconhecido'
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
      <h1 className="text-2xl font-bold text-gray-900">Boletos e Contratos</h1>

      {/* Contracts Section */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Contratos Ativos</h2>
        <div className="space-y-4">
          {contracts.map((contract) => (
            <div key={contract.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <div>
                      <p className="font-medium text-gray-900">Contrato #{contract.id}</p>
                      <p className="text-sm text-gray-600">
                        Vigência: {new Date(contract.startDate).toLocaleDateString('pt-BR')} - {new Date(contract.endDate).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Valor Mensal</p>
                      <p className="font-semibold text-gray-900">R$ {contract.monthlyValue.toFixed(2)}</p>
                    </div>
                    {contract.daysToExpire <= 30 && (
                      <div>
                        <p className="text-sm text-red-600">Expira em {contract.daysToExpire} dias</p>
                        {contract.fipeAdjustment > 0 && (
                          <p className="text-xs text-gray-500">Ajuste FIPE: +{contract.fipeAdjustment}%</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                
                {contract.needsRenewal && (
                  <button
                    onClick={() => renewContract(contract.id)}
                    className="btn-primary flex items-center"
                  >
                    <FiRefreshCw className="w-4 h-4 mr-2" />
                    Renovar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bills Section */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Histórico de Boletos</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mês/Ano
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vencimento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bills.map((bill) => (
                <tr key={bill.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FiCalendar className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">
                        {new Date(bill.month + '-01').toLocaleDateString('pt-BR', { 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FiDollarSign className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900">
                        R$ {bill.value.toFixed(2)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(bill.dueDate).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(bill.status)}`}>
                      {getStatusText(bill.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {bill.status !== 'paid' && (
                      <button
                        onClick={() => generateDuplicate(bill.id)}
                        className="text-primary-600 hover:text-primary-900 flex items-center"
                      >
                        <FiDownload className="w-4 h-4 mr-1" />
                        Segunda Via
                      </button>
                    )}
                    {bill.status === 'paid' && bill.paidDate && (
                      <span className="text-green-600 text-xs">
                        Pago em {new Date(bill.paidDate).toLocaleDateString('pt-BR')}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Billing