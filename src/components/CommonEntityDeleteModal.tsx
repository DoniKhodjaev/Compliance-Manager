import { useRef, useEffect } from 'react';
import { AlertTriangle, X } from "lucide-react";
import type { CommonEntity } from "../types";
import { useTranslation } from 'react-i18next';

interface CommonEntityDeleteModalProps {
  entity: CommonEntity;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function CommonEntityDeleteModal({
  entity,
  isOpen,
  onClose,
  onConfirm,
}: CommonEntityDeleteModalProps) {
  const { t } = useTranslation();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div ref={modalRef} className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full shadow-xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t('deleteConfirmation')}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
                {t('deleteCommonlistConfirmMessage')}
            </p>
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
              <p className="text-sm text-gray-900 dark:text-gray-100">
                  <span className="font-medium">{t('name')}:</span> {entity.name}
              </p>
              <p className="text-sm text-gray-900 dark:text-gray-100">
                  <span className="font-medium">{t('source')}:</span> {entity.source.toUpperCase()}
              </p>
              {entity.CEO && (
                <p className="text-sm text-gray-900 dark:text-gray-100">
                    <span className="font-medium">{t('ceo')}:</span> {entity.CEO}
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
            >
                {t('cancel')}
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
                {t('delete')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 