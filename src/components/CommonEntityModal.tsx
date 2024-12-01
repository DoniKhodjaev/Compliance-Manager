import { useState } from 'react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { CommonEntity } from '../types';

interface CommonEntityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (entity: Omit<CommonEntity, 'id' | 'lastChecked' | 'complianceStatus'>) => void;
}

type FormData = {
  name: string;
  status: 'clean' | 'needs_review' | 'flagged';
  source: 'orginfo' | 'egrul';
};

export function CommonEntityModal({ isOpen, onClose, onSave }: CommonEntityModalProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    status: 'clean',
    source: 'orginfo'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setFormData({ name: '', status: 'clean', source: 'orginfo' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h3 className="text-xl font-semibold text-white">
            {t('addCommonEntity')}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-300">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              {t('entityName')}
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-2 bg-[#2A3441] border border-gray-600 rounded-lg 
                text-white placeholder-gray-500 focus:outline-none focus:border-[#008766]"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">
              {t('entityStatus')}
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                status: e.target.value as 'clean' | 'needs_review' | 'flagged'
              }))}
              className="w-full px-4 py-2 bg-[#2A3441] border border-gray-600 rounded-lg 
                text-white focus:outline-none focus:border-[#008766]"
            >
              <option value="clean">{t('statusClean')}</option>
              <option value="needs_review">{t('statusNeedsReview')}</option>
              <option value="flagged">{t('statusFlagged')}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">
              {t('entitySource')}
            </label>
            <select
              value={formData.source}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                source: e.target.value as 'orginfo' | 'egrul'
              }))}
              className="w-full px-4 py-2 bg-[#2A3441] border border-gray-600 rounded-lg 
                text-white focus:outline-none focus:border-[#008766]"
            >
              <option value="orginfo">{t('sourceOrgInfo')}</option>
              <option value="egrul">{t('sourceEGRUL')}</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
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