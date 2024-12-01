import { ArrowRight, Shield, Search, Database, PieChart, Globe, Zap, Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import logo from '../assets/logo.png';
import { Footer } from './Footer';
import { FlowChart } from './FlowChart';
import { motion } from 'framer-motion';
import appPreviewLight from '../assets/app_preview_light.png';
import appPreviewDark from '../assets/app_preview_dark.png';

export function LandingPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isDark, toggleTheme } = useTheme();

  const flowSteps = [
    {
      icon: Shield,
      title: t('Initial Search'),
      description: t('Enter company details for comprehensive screening'),
      gradient: 'bg-emerald-500',
      iconBg: 'bg-emerald-50'
    },
    {
      icon: Database,
      title: t('EGRUL/ORGINFO'),
      description: t('Official registry check and verification'),
      gradient: 'bg-blue-500',
      iconBg: 'bg-blue-50'
    },
    {
      icon: Search,
      title: t('OFAC Check'),
      description: t('SDN List screening and compliance verification'),
      gradient: 'bg-indigo-500',
      iconBg: 'bg-indigo-50'
    }
  ];

  const features = [
    {
      icon: PieChart,
      title: t('Risk Analysis'),
      description: t('Comprehensive risk assessment'),
      color: 'text-rose-500',
      bg: 'bg-rose-500/10'
    },
    {
      icon: Globe,
      title: t('Multi-Language Support'),
      description: t('Support for English, Russian, and Uzbek'),
      color: 'text-blue-500',
      bg: 'bg-blue-500/10'
    },
    {
      icon: Zap,
      title: t('Real-time Updates'),
      description: t('Instant compliance status monitoring'),
      color: 'text-amber-500',
      bg: 'bg-amber-500/10'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Grid Background Layer */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 
          bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] 
          dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_2px,transparent_2px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_2px,transparent_2px)] 
          bg-[size:40px_40px]"
        />
      </div>

      {/* Content Layer */}
      <header className="fixed top-0 left-0 right-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <img src={logo} alt="Comply-X Logo" className="h-10 w-10" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">Comply-X</span>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title={isDark ? t('switchToLightMode') : t('switchToDarkMode')}
              >
                {isDark ? <Sun className="w-5 h-5 text-gray-200" /> : <Moon className="w-5 h-5 text-gray-600" />}
              </button>
              <button
                onClick={() => navigate('/login')}
                className="px-6 py-2 bg-[#008766] text-white rounded-lg hover:bg-[#007055] transition-all"
              >
                {t('login')}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="relative flex-grow pt-20">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="relative container mx-auto px-4 py-20 text-center"
        >
          <div className="max-w-5xl mx-auto">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-[#008766] to-blue-600 bg-clip-text text-transparent mb-6 leading-tight">
              {t('Modern Compliance Management')}
            </h1>
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-12">
              {t('Streamline your compliance workflow with automated screening, risk assessment, and real-time monitoring')}
            </p>

            {/* App Preview Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mx-auto mb-16 max-w-4xl"
            >
              <div className="relative rounded-xl shadow-2xl overflow-hidden">
                {/* Browser-like header */}
                <div className="bg-gray-100 dark:bg-gray-800 p-4 flex items-center space-x-2 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="bg-white dark:bg-gray-700 rounded-md px-4 py-1 text-sm text-gray-600 dark:text-gray-300 flex items-center">
                      <span className="mr-2">🔒</span>
                      comply-x.me
                    </div>
                  </div>
                </div>

                {/* App Preview Image */}
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={isDark ? appPreviewDark : appPreviewLight}
                    alt="Comply-X Dashboard"
                    className="w-full h-auto"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent" />
                </motion.div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -z-10 inset-0 bg-gradient-to-r from-[#008766]/20 to-blue-500/20 blur-3xl transform translate-y-8 scale-95" />
            </motion.div>

            <button
              onClick={() => navigate('/login')}
              className="px-8 py-4 bg-[#008766] text-white rounded-lg hover:bg-[#007055] 
                transition-all transform hover:scale-105 flex items-center space-x-3 mx-auto group shadow-lg"
            >
              <span className="text-lg">{t('Get Started')}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.section>

        {/* Flow Chart Section */}
        <div className="relative bg-white dark:bg-gray-900 py-20">
          <FlowChart flowSteps={flowSteps} />
        </div>

        {/* Features Grid */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative container mx-auto px-4 py-20"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            {t('Powerful Features')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.1,
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 500
                }}
                className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg
                  transition-all duration-150 hover:-translate-y-1 group cursor-pointer"
              >
                <div className={`w-14 h-14 ${feature.bg} rounded-xl flex items-center justify-center mb-6 
                  group-hover:scale-110 transition-transform duration-150`}>
                  <feature.icon className={`w-7 h-7 ${feature.color} group-hover:rotate-6 transition-transform duration-150`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 
                  group-hover:text-[#008766] dark:group-hover:text-[#00b388] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
} 