import { useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import type { SdnEntry } from '../utils/ofacChecker';
import { useTranslation } from 'react-i18next';

interface SDNDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  entry: SdnEntry;
}

export function SDNDetailsModal({ isOpen, onClose, entry }: SDNDetailsModalProps) {
  const { t } = useTranslation();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div ref={modalRef} className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {t('sdnEntryDetails')}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {t('name')}
            </h3>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">{entry.name}</p>
          </div>

          {entry.type && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {t('type')}
              </h3>
              <p className="mt-1 text-sm text-gray-900 dark:text-white">{entry.type}</p>
            </div>
          )}

          {entry.name_variations && entry.name_variations.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {t('nameVariations')}
              </h3>
              <ul className="mt-1 space-y-1">
                {entry.name_variations.map((name: string, index: number) => (
                  <li key={index} className="text-sm text-gray-900 dark:text-white">
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {entry.programs && entry.programs.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {t('programs')}
              </h3>
              <ul className="mt-1 space-y-1">
                {entry.programs.map((program: string, index: number) => (
                  <li key={index} className="text-sm text-gray-900 dark:text-white">
                    {program}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {entry.remarks && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {t('remarks')}
              </h3>
              <p className="mt-1 text-sm text-gray-900 dark:text-white">{entry.remarks}</p>
            </div>
          )}

          {entry.addresses && entry.addresses.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {t('addresses')}
              </h3>
              <ul className="mt-1 space-y-1">
                {entry.addresses.map((address: { city: string; country: string }, index: number) => (
                  <li key={index} className="text-sm text-gray-900 dark:text-white">
                    {address.city}, {address.country}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 