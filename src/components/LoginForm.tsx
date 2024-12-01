import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Eye, EyeOff, Info, Sun, Moon } from 'lucide-react';
import logo from '../assets/logo.png';
import { useTheme } from '../contexts/ThemeContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';

interface LoginFormProps {
  onLoginSuccess: () => void;
}

export function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const { isDark, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);
  const [errors, setErrors] = useState({ username: false, password: false });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({ username: false, password: false }); // Reset errors

    // Validate
    const newErrors = {
      username: !username,
      password: !password
    };

    if (newErrors.username || newErrors.password) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    if (username === 'admin' && password === 'admin123') {
      await new Promise(resolve => setTimeout(resolve, 500));
      localStorage.setItem('token', 'dummy-token');
      onLoginSuccess();
      toast.success('Login successful!');
    } else {
      setErrors({ username: true, password: true });
      toast.error('Invalid credentials');
    }

    setIsLoading(false);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gray-100'
    }`}>
      <div className={`${
        isDark 
          ? 'bg-white/10 backdrop-blur-lg' 
          : 'bg-white'
        } p-8 rounded-2xl shadow-lg w-[400px] relative overflow-hidden`}>
        {/* Theme Toggle and Language Switcher */}
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          <LanguageSwitcher />
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full 
              ${isDark 
                ? 'text-gray-400 hover:text-white' 
                : 'text-gray-600 hover:text-gray-900'
              } transition-colors`}
            aria-label={t('toggleTheme')}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Logo and Title */}
        <div className="flex flex-col items-center mb-8">
          <img src={logo} alt="Logo" className="w-36 h-36 mb-4" />
          <h2 className={`text-2xl font-bold ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            {t('Comply-X')}
          </h2>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDark ? 'text-gray-200' : 'text-gray-700'
            }`}>
              {t('username')}
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrors(prev => ({ ...prev, username: false }));
              }}
              className={`w-full px-4 py-3 rounded-lg transition-all
                ${isDark 
                  ? 'bg-white/10 text-white border-gray-600' 
                  : 'bg-white text-gray-900 border-gray-300'
                }
                ${errors.username ? 'border-red-500' : ''}
                border focus:outline-none focus:ring-1 focus:ring-[#008766] focus:border-[#008766]
                placeholder:text-gray-500`}
              placeholder={t('enterUsername')}
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-500">
                {!username ? t('usernameRequired') : t('invalidUsername')}
              </p>
            )}
          </div>
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              isDark ? 'text-gray-200' : 'text-gray-700'
            }`}>
              {t('password')}
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors(prev => ({ ...prev, password: false }));
                }}
                className={`w-full px-4 py-3 rounded-lg transition-all
                  ${isDark 
                    ? 'bg-white/10 text-white border-gray-600' 
                    : 'bg-white text-gray-900 border-gray-300'
                  }
                  ${errors.password ? 'border-red-500' : ''}
                  border focus:outline-none focus:ring-1 focus:ring-[#008766] focus:border-[#008766]
                  placeholder:text-gray-500`}
                placeholder={t('enterPassword')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-1/2 -translate-y-1/2 
                  ${isDark ? 'text-gray-400' : 'text-gray-500'} 
                  hover:text-gray-700 transition-colors`}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {!password ? t('passwordRequired') : t('invalidPassword')}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#008766] text-white rounded-lg hover:bg-[#007055] 
              disabled:opacity-50 disabled:cursor-not-allowed transition-all
              transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                {t('loading')}
              </div>
            ) : (
              t('loginButton')
            )}
          </button>
        </form>

        {/* Test Credentials Section */}
        <div className="mt-6">
          <button
            onClick={() => setShowCredentials(!showCredentials)}
            className={`flex items-center justify-center w-full text-sm 
              ${isDark 
                ? 'text-gray-400 hover:text-white' 
                : 'text-gray-600 hover:text-gray-900'
              } transition-colors`}
          >
            <Info className="w-4 h-4 mr-1" />
            {showCredentials ? t('Test Credentials') : t('Test Credentials')}
          </button>
          {showCredentials && (
            <div className={`mt-3 p-3 rounded-lg border 
              ${isDark 
                ? 'bg-white/5 border-gray-600' 
                : 'bg-gray-50 border-gray-300'
              }`}>
              <p className={`text-sm mb-2 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>{t('Test Credentials')}</p>
              <p className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {t('username')}: <span className={isDark ? 'text-white' : 'text-gray-900'}>admin</span>
              </p>
              <p className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {t('password')}: <span className={isDark ? 'text-white' : 'text-gray-900'}>admin123</span>
              </p>
            </div>
          )}
        </div>

        {/* Bottom Design Element */}
        <div className={`absolute -bottom-32 -right-32 w-64 h-64 
          bg-gradient-to-br ${isDark ? 'from-[#008766]/30' : 'from-[#008766]/10'} 
          to-transparent rounded-full blur-3xl pointer-events-none`} />
        <div className={`absolute -top-32 -left-32 w-64 h-64 
          bg-gradient-to-br ${isDark ? 'from-blue-500/20' : 'from-blue-500/10'} 
          to-transparent rounded-full blur-3xl pointer-events-none`} />
      </div>
    </div>
  );
} 