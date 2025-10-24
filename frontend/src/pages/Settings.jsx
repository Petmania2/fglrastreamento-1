import { useState } from 'react'
import { FiBell, FiMoon, FiSun, FiGlobe, FiShield } from 'react-icons/fi'
import toast from 'react-hot-toast'

const Settings = () => {
  const [settings, setSettings] = useState({
    theme: 'light',
    language: 'pt-BR',
    notifications: {
      email: true,
      push: true,
      sms: false,
      contractExpiry: true,
      paymentReminder: true
    },
    privacy: {
      shareLocation: true,
      analytics: false
    }
  })

  const handleThemeChange = (theme) => {
    setSettings(prev => ({
      ...prev,
      theme
    }))
    toast.success(`Tema ${theme === 'light' ? 'claro' : 'escuro'} ativado`)
  }

  const handleLanguageChange = (language) => {
    setSettings(prev => ({
      ...prev,
      language
    }))
    toast.success('Idioma alterado com sucesso')
  }

  const handleNotificationChange = (key) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }))
  }

  const handlePrivacyChange = (key) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: !prev.privacy[key]
      }
    }))
  }

  const saveSettings = () => {
    // Simular salvamento
    toast.success('Configurações salvas com sucesso!')
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>

      {/* Theme Settings */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FiSun className="w-5 h-5 mr-2" />
          Aparência
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Tema
            </label>
            <div className="flex space-x-4">
              <button
                onClick={() => handleThemeChange('light')}
                className={`flex items-center px-4 py-2 rounded-lg border-2 transition-colors ${
                  settings.theme === 'light'
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <FiSun className="w-4 h-4 mr-2" />
                Claro
              </button>
              <button
                onClick={() => handleThemeChange('dark')}
                className={`flex items-center px-4 py-2 rounded-lg border-2 transition-colors ${
                  settings.theme === 'dark'
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <FiMoon className="w-4 h-4 mr-2" />
                Escuro
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Language Settings */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FiGlobe className="w-5 h-5 mr-2" />
          Idioma
        </h2>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Idioma da Interface
          </label>
          <select
            value={settings.language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="input max-w-xs"
          >
            <option value="pt-BR">Português (Brasil)</option>
            <option value="en-US">English (US)</option>
            <option value="es-ES">Español</option>
          </select>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FiBell className="w-5 h-5 mr-2" />
          Notificações
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Notificações por Email</h3>
              <p className="text-sm text-gray-600">Receber atualizações por email</p>
            </div>
            <button
              onClick={() => handleNotificationChange('email')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.notifications.email ? 'bg-primary-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.notifications.email ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Notificações Push</h3>
              <p className="text-sm text-gray-600">Receber notificações no navegador</p>
            </div>
            <button
              onClick={() => handleNotificationChange('push')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.notifications.push ? 'bg-primary-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.notifications.push ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">SMS</h3>
              <p className="text-sm text-gray-600">Receber alertas por SMS</p>
            </div>
            <button
              onClick={() => handleNotificationChange('sms')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.notifications.sms ? 'bg-primary-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.notifications.sms ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <hr className="my-4" />

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Vencimento de Contrato</h3>
              <p className="text-sm text-gray-600">Alertas sobre renovação de contrato</p>
            </div>
            <button
              onClick={() => handleNotificationChange('contractExpiry')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.notifications.contractExpiry ? 'bg-primary-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.notifications.contractExpiry ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Lembrete de Pagamento</h3>
              <p className="text-sm text-gray-600">Alertas sobre boletos próximos ao vencimento</p>
            </div>
            <button
              onClick={() => handleNotificationChange('paymentReminder')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.notifications.paymentReminder ? 'bg-primary-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.notifications.paymentReminder ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <FiShield className="w-5 h-5 mr-2" />
          Privacidade
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Compartilhar Localização</h3>
              <p className="text-sm text-gray-600">Permitir compartilhamento de dados de localização</p>
            </div>
            <button
              onClick={() => handlePrivacyChange('shareLocation')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.privacy.shareLocation ? 'bg-primary-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.privacy.shareLocation ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Analytics</h3>
              <p className="text-sm text-gray-600">Permitir coleta de dados para melhorias</p>
            </div>
            <button
              onClick={() => handlePrivacyChange('analytics')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.privacy.analytics ? 'bg-primary-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.privacy.analytics ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={saveSettings}
          className="btn-primary"
        >
          Salvar Configurações
        </button>
      </div>
    </div>
  )
}

export default Settings