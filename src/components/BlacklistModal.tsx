import { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import type { BlacklistEntry } from '../types';
import { useTranslation } from 'react-i18next';

interface BlacklistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (entry: Omit<BlacklistEntry, 'id' | 'dateAdded'>) => void;
  entry?: BlacklistEntry | null;
}

export function BlacklistModal({ isOpen, onClose, onSave, entry }: BlacklistModalProps) {
  const { t } = useTranslation();
  const modalRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    inn: entry?.inn || '',
    names: {
      fullNameEn: entry?.names?.fullNameEn || '',
      fullNameRu: entry?.names?.fullNameRu || '',
      shortNameEn: entry?.names?.shortNameEn || '',
      shortNameRu: entry?.names?.shortNameRu || '',
      abbreviationEn: entry?.names?.abbreviationEn || '',
      abbreviationRu: entry?.names?.abbreviationRu || '',
    },
    notes: entry?.notes || '',
  });

  useEffect(() => {
    if (entry) {
      setFormData({
        inn: entry.inn || '',
        names: {
          fullNameEn: entry.names.fullNameEn || '',
          fullNameRu: entry.names.fullNameRu || '',
          shortNameEn: entry.names.shortNameEn || '',
          shortNameRu: entry.names.shortNameRu || '',
          abbreviationEn: entry.names.abbreviationEn || '',
          abbreviationRu: entry.names.abbreviationRu || '',
        },
        notes: entry.notes || '',
      });
    } else {
      setFormData({
        inn: '',
        names: {
          fullNameEn: '',
          fullNameRu: '',
          shortNameEn: '',
          shortNameRu: '',
          abbreviationEn: '',
          abbreviationRu: '',
        },
        notes: '',
      });
    }
  }, [entry]);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div ref={modalRef} className="bg-[#1E2532] rounded-lg w-full max-w-2xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h3 className="text-xl font-semibold text-white">
            {entry ? t('editBlacklistEntry') : t('addBlacklistEntry')}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-300">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* INN Field */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              {t('innOptional')}
            </label>
            <input
              type="text"
              value={formData.inn}
              onChange={(e) => setFormData(prev => ({ ...prev, inn: e.target.value }))}
              className="w-full px-4 py-2 bg-[#2A3441] border border-gray-600 rounded-lg 
                text-white placeholder-gray-500 focus:outline-none focus:border-[#008766]"
            />
          </div>

          {/* Names Section */}
          <div className="space-y-4">
            {/* Full Names */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  {t('fullNameEn')}
                </label>
                <input
                  type="text"
                  value={formData.names.fullNameEn}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    names: { ...prev.names, fullNameEn: e.target.value }
                  }))}
                  className="w-full px-4 py-2 bg-[#2A3441] border border-gray-600 rounded-lg 
                    text-white placeholder-gray-500 focus:outline-none focus:border-[#008766]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  {t('fullNameRu')}
                </label>
                <input
                  type="text"
                  value={formData.names.fullNameRu}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    names: { ...prev.names, fullNameRu: e.target.value }
                  }))}
                  className="w-full px-4 py-2 bg-[#2A3441] border border-gray-600 rounded-lg 
                    text-white placeholder-gray-500 focus:outline-none focus:border-[#008766]"
                  required
                />
              </div>
            </div>

            {/* Short Names */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  {t('shortNameEn')}
                </label>
                <input
                  type="text"
                  value={formData.names.shortNameEn}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    names: { ...prev.names, shortNameEn: e.target.value }
                  }))}
                  className="w-full px-4 py-2 bg-[#2A3441] border border-gray-600 rounded-lg 
                    text-white placeholder-gray-500 focus:outline-none focus:border-[#008766]"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  {t('shortNameRu')}
                </label>
                <input
                  type="text"
                  value={formData.names.shortNameRu}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    names: { ...prev.names, shortNameRu: e.target.value }
                  }))}
                  className="w-full px-4 py-2 bg-[#2A3441] border border-gray-600 rounded-lg 
                    text-white placeholder-gray-500 focus:outline-none focus:border-[#008766]"
                />
              </div>
            </div>

            {/* Abbreviations */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  {t('abbreviationEn')}
                </label>
                <input
                  type="text"
                  value={formData.names.abbreviationEn}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    names: { ...prev.names, abbreviationEn: e.target.value }
                  }))}
                  className="w-full px-4 py-2 bg-[#2A3441] border border-gray-600 rounded-lg 
                    text-white placeholder-gray-500 focus:outline-none focus:border-[#008766]"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  {t('abbreviationRu')}
                </label>
                <input
                  type="text"
                  value={formData.names.abbreviationRu}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    names: { ...prev.names, abbreviationRu: e.target.value }
                  }))}
                  className="w-full px-4 py-2 bg-[#2A3441] border border-gray-600 rounded-lg 
                    text-white placeholder-gray-500 focus:outline-none focus:border-[#008766]"
                />
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              {t('notes')}
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              rows={4}
              className="w-full px-4 py-2 bg-[#2A3441] border border-gray-600 rounded-lg 
                text-white placeholder-gray-500 focus:outline-none focus:border-[#008766]"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#008766] text-white rounded-lg hover:bg-[#007055]"
            >
              {t('save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
