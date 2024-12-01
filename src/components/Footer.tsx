import { useTranslation } from 'react-i18next';;

export function Footer() {
  const { t } = useTranslation();
  
  return (
    <footer className="relative bg-[#008766]/90 dark:bg-gray-900/90 backdrop-blur-sm py-12 mt-auto z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-6">

          <div className="flex flex-col items-center space-y-2">
            <p className="text-white/90 dark:text-gray-400">
              © 2024 Comply-X. {t('allRightsReserved')}
            </p>
            <p className="flex items-center text-sm text-white/80 dark:text-gray-400">              <a 
                href="https://github.com/doniyorkhodjaev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-1 text-white hover:text-white/80 transition-colors dark:text-[#008766]"
              >
                Doniyor Khodjaev
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
