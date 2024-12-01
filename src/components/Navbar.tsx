import {
  LayoutDashboard,
  Search,
  Users,
  Shield,
  FileText,
  PieChart,
  Sun,
  Moon,
  LogOut,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';

interface NavbarProps {
  currentPage: 'dashboard' | 'entity-screening' | 'common-entities' | 'blacklist' | 'sdn-list' | 'reports';
  onNavigate: (page: NavbarProps['currentPage']) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onLogout: () => void;
}

export function Navbar({ onNavigate, isDark, onToggleTheme, onLogout }: NavbarProps) {
  const { t } = useTranslation();
  
  const navItems = [
    { id: 'dashboard' as const, label: t('dashboard'), icon: LayoutDashboard, path: '/app/dashboard' },
    { id: 'entity-screening' as const, label: t('entityScreening'), icon: Search, path: '/app/entity-screening' },
    { id: 'common-entities' as const, label: t('commonEntities'), icon: Users, path: '/app/common-entities' },
    { id: 'blacklist' as const, label: t('blacklist'), icon: Shield, path: '/app/blacklist' },
    { id: 'sdn-list' as const, label: t('sdnList'), icon: FileText, path: '/app/sdn-list' },
    { id: 'reports' as const, label: t('reports'), icon: PieChart, path: '/app/reports' },
  ];

  return (
    <nav className={`shadow-sm w-full ${
      isDark 
        ? 'bg-gray-800 dark:bg-gray-800' 
        : 'bg-[#008766]'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center flex-1">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-white">
                {t('Comply-X')}
              </span>
            </div>
            {/* Navigation Items */}
            <div className="hidden md:flex md:items-center md:space-x-4 ml-10 flex-1 justify-center">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.id}
                    to={item.path}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2 ${
                        isActive
                          ? isDark 
                            ? 'bg-[#008766] text-white'
                            : 'bg-[#007055] text-white'
                          : 'text-white hover:text-gray-100 hover:bg-[#007055]/50'
                      }`
                    }
                    onClick={() => onNavigate(item.id)}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
          {/* Theme Toggle, Language Switcher and Logout Buttons */}
          <div className="flex items-center">
            {/* Add vertical divider */}
            <div className={`w-0.5 h-8 mx-4 ${
              isDark 
                ? 'bg-[#008766]/60' 
                : 'bg-white/60'
            }`} />
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <button
                onClick={onToggleTheme}
                className="p-2 rounded-full text-white hover:bg-[#007055]/50 transition-colors"
                title={isDark ? t('switchToLightMode') : t('switchToDarkMode')}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={onLogout}
                className="p-2 rounded-full text-white hover:bg-[#007055]/50 transition-colors"
                title={t('logout')}
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
