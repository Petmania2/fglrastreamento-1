import { useState, useEffect } from 'react'
import { FiUser, FiMail, FiPhone, FiLock, FiSave } from 'react-icons/fi'
import toast from 'react-hot-toast'

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  })
  const [loading, setLoading] = useState(false)
  const [loadingPassword, setLoadingPassword] = useState(false)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/auth/profile')
      const data = await response.json()
      
      if (data.success) {
        setProfile(data.data)
      }
    } catch (error) {
      toast.error('Erro ao carregar perfil')
    }
  }

  const handleProfileChange = (e) => {
    const { name, value } = e.target
    setProfile(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswords(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleProfileSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profile)
      })
      
      const data = await response.json()
      
      if (data.success) {
        toast.success('Perfil atualizado com sucesso!')
        setProfile(data.data)
      } else {
        toast.error(data.message || 'Erro ao atualizar perfil')
      }
    } catch (error) {
      toast.error('Erro de conexão')
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    
    if (passwords.new !== passwords.confirm) {
      toast.error('Nova senha e confirmação não coincidem')
      return
    }
    
    if (passwords.new.length < 6) {
      toast.error('Nova senha deve ter pelo menos 6 caracteres')
      return
    }
    
    setLoadingPassword(true)
    
    try {
      // Simular mudança de senha
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success('Senha alterada com sucesso!')
      setPasswords({ current: '', new: '', confirm: '' })
    } catch (error) {
      toast.error('Erro ao alterar senha')
    } finally {
      setLoadingPassword(false)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Meu Perfil</h1>

      {/* Profile Information */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Informações Pessoais</h2>
        
        <form onSubmit={handleProfileSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome Completo
            </label>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                className="input pl-10"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                className="input pl-10"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Telefone
            </label>
            <div className="relative">
              <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="tel"
                name="phone"
                value={profile.phone}
                onChange={handleProfileChange}
                className="input pl-10"
                placeholder="(11) 99999-9999"
              />
            </div>
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
                <FiSave className="w-4 h-4 mr-2" />
              )}
              {loading ? 'Salvando...' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      </div>

      {/* Change Password */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Alterar Senha</h2>
        
        <form onSubmit={handlePasswordSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Senha Atual
            </label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                name="current"
                value={passwords.current}
                onChange={handlePasswordChange}
                className="input pl-10"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nova Senha
            </label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                name="new"
                value={passwords.new}
                onChange={handlePasswordChange}
                className="input pl-10"
                minLength={6}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirmar Nova Senha
            </label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="password"
                name="confirm"
                value={passwords.confirm}
                onChange={handlePasswordChange}
                className="input pl-10"
                minLength={6}
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loadingPassword}
              className="btn-primary flex items-center"
            >
              {loadingPassword ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              ) : (
                <FiLock className="w-4 h-4 mr-2" />
              )}
              {loadingPassword ? 'Alterando...' : 'Alterar Senha'}
            </button>
          </div>
        </form>
      </div>

      {/* Account Info */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Informações da Conta</h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">ID da Conta:</span>
            <span className="text-sm font-medium text-gray-900">{profile.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Membro desde:</span>
            <span className="text-sm font-medium text-gray-900">Janeiro 2024</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600">Plano:</span>
            <span className="text-sm font-medium text-primary-600">Básico</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile