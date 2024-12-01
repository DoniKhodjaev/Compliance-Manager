import { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { useTranslation } from "react-i18next";

interface DashboardFiltersProps {
  onFilterChange: (filters: any) => void;
}

interface FilterState {
  search: string;
  dateFrom: string;
  dateTo: string;
  amountFrom: string;
  amountTo: string;
  senderName: string;
  receiverName: string;
  bankName: string;
  reference: string;
  status: "" | "processing" | "clear" | "flagged";
}

export function DashboardFilters({ onFilterChange }: DashboardFiltersProps) {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    dateFrom: "",
    dateTo: "",
    amountFrom: "",
    amountTo: "",
    senderName: "",
    receiverName: "",
    bankName: "",
    reference: "",
    status: "",
  });

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const emptyFilters: FilterState = {
      search: "",
      dateFrom: "",
      dateTo: "",
      amountFrom: "",
      amountTo: "",
      senderName: "",
      receiverName: "",
      bankName: "",
      reference: "",
      status: "",
    };
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
      {/* Search Bar */}
      <div className="relative flex items-center">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder={t('searchByNameBankReference')}
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="w-full pl-10 pr-4 h-10 border border-gray-300 dark:border-gray-600 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-[#008766] focus:border-transparent 
              bg-white dark:bg-gray-700 text-gray-900 dark:text-white
              placeholder-gray-500 dark:placeholder-gray-400"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="ml-3 h-10 px-3 flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <Filter className="w-5 h-5" />
        </button>
      </div>

      {/* Advanced Filters */}
      {isExpanded && (
        <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('dateRange')}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => handleFilterChange("dateFrom", e.target.value)}
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md 
                    focus:outline-none focus:ring-[#008766] focus:border-transparent 
                    bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => handleFilterChange("dateTo", e.target.value)}
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md 
                    focus:outline-none focus:ring-[#008766] focus:border-transparent 
                    bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Amount Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('amountRange')}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="From"
                  value={filters.amountFrom}
                  onChange={(e) =>
                    handleFilterChange("amountFrom", e.target.value)
                  }
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md 
                    focus:outline-none focus:ring-[#008766] focus:border-transparent 
                    bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input
                  type="number"
                  placeholder="To"
                  value={filters.amountTo}
                  onChange={(e) =>
                    handleFilterChange("amountTo", e.target.value)
                  }
                  className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md 
                    focus:outline-none focus:ring-[#008766] focus:border-transparent 
                    bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('status')}
              </label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md 
                  focus:outline-none focus:ring-[#008766] focus:border-transparent 
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">{t('all')}</option>
                <option value="processing">{t('processing')}</option>
                <option value="clear">{t('clear')}</option>
                <option value="flagged">{t('flagged')}</option>
              </select>
            </div>

            {/* Sender Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('senderName')}
              </label>
              <input
                type="text"
                placeholder={t('enterSenderName')}
                value={filters.senderName}
                onChange={(e) =>
                  handleFilterChange("senderName", e.target.value)
                }
                className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md 
                  focus:outline-none focus:ring-[#008766] focus:border-transparent 
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* Receiver Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('receiverName')}
              </label>
              <input
                type="text"
                placeholder={t('enterReceiverName')}
                value={filters.receiverName}
                onChange={(e) =>
                  handleFilterChange("receiverName", e.target.value)
                }
                className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md 
                  focus:outline-none focus:ring-[#008766] focus:border-transparent 
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* Bank Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('bankName')}
              </label>
              <input
                type="text"
                placeholder={t('enterBankName')}
                value={filters.bankName}
                onChange={(e) => handleFilterChange("bankName", e.target.value)}
                className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md 
                  focus:outline-none focus:ring-[#008766] focus:border-transparent 
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* Reference Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('referenceNumber')}
              </label>
              <input
                type="text"
                placeholder={t('enterReferenceNumber')}
                value={filters.reference}
                onChange={(e) =>
                  handleFilterChange("reference", e.target.value)
                }
                className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-md 
                  focus:outline-none focus:ring-[#008766] focus:border-transparent 
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          {/* Clear Filters Button */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={clearFilters}
              className="flex items-center px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <X className="w-4 h-4 mr-1" />
              {t('clearFilters')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
