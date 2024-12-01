import { useRef, useEffect, useState } from 'react';
import { X, CheckCircle, AlertTriangle, Shield, Building2, User, ChevronDown, ChevronRight, RefreshCw, XCircle } from 'lucide-react';
import type { CommonEntity } from '../types';
import type { ComplianceResult, Founder } from '../types/compliance';
import { transliterate } from 'transliteration';
import { toast } from 'react-hot-toast';
import { BlacklistChecker } from '../utils/blacklistChecker';
import { getEntityStatus } from '../utils/entityUtils';
import { useTranslation } from 'react-i18next';

interface CommonEntityDetailsModalProps {
  entity: CommonEntity;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updates: Partial<CommonEntity>) => void;
  onRefresh: () => void;
  blacklistEntries?: any[];
}

export function CommonEntityDetailsModal({ 
  entity,
  isOpen,
  onClose,
  onSave,
  onRefresh,
  blacklistEntries = []
}: CommonEntityDetailsModalProps) {
  const { t } = useTranslation();
  const modalRef = useRef<HTMLDivElement>(null);
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({});
  const [isChecking, setIsChecking] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(entity.status);
  const [notes, setNotes] = useState(entity.notes || '');
  const [complianceResults, setComplianceResults] = useState<Record<string, ComplianceResult>>({});
  
  const checkedINNs = useRef<Set<string>>(new Set());

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      loadInitialResults(); // Load results when modal opens
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const loadInitialResults = async () => {
    try {
      // Check main entity
      await checkEntity(entity.name, entity.inn);
      if (entity.CEO) await checkEntity(entity.CEO);
  
      // Check founders if available
      if (entity.Founders && entity.Founders.length > 0) {
        await checkFounders(entity.Founders);
      }
    } catch (error) {
      console.error('Error loading initial compliance results:', error);
    }
  };
  
  const renderSourceBadge = (source: 'orginfo' | 'egrul') => {
    switch (source) {
      case 'orginfo':
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full 
            bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            ORGINFO
          </span>
        );
      case 'egrul':
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full 
            bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
            EGRUL
          </span>
        );
      default:
        return null;
    }
  };
  const renderComplianceIcons = (entityId: string) => {
    const result = complianceResults[entityId];
    if (!result) return null;
  
    return (
      <div className="flex items-center space-x-2">
        {result.ofacMatch && (
          <span className="flex items-center text-red-600" title="OFAC Match">
            <XCircle className="w-4 h-4" />
            <span className="ml-1 text-xs text-red-500">OFAC</span>
          </span>
        )}
        {result.blacklistMatch && (
          <span className="text-red-500 dark:text-red-400" title="Blacklisted">
          <Shield className="w-4 h-4" />
        </span>
        )}
        {!result.ofacMatch && !result.blacklistMatch && (
          <span className="flex items-center text-green-500" title="Clear">
            <CheckCircle className="w-4 h-4" />
            <span className="ml-1 text-xs text-green-500">Clear</span>
          </span>
        )}
      </div>
    );
  };
  
  const checkEntity = async (name: string, inn?: string) => {
    try {
      const transliteratedName = transliterate(name);
      const blacklistMatch = !!BlacklistChecker.checkName(transliteratedName, blacklistEntries);
      const response = await fetch(import.meta.env.VITE_BACKEND_URL+'/api/sdn/search?query='+encodeURIComponent(transliteratedName));
      if (!response.ok) {
        throw new Error('Failed to search SDN list');
      }
      const searchResults = await response.json();
      const averageMatchScore = searchResults.average_match_score || 0;
  
      // Update complianceResults state
      setComplianceResults((prev) => ({
        ...prev,
        [transliteratedName]: {
          ofacMatch: averageMatchScore >= 0.7,
          blacklistMatch: blacklistMatch,
          matchScore: averageMatchScore,
        },
      }));
  
      if (inn && !checkedINNs.current.has(inn)) {
        checkedINNs.current.add(inn);
        const innResponse = await fetch(import.meta.env.VITE_BACKEND_URL+'/api/sdn/search?query='+encodeURIComponent(inn));
        if (innResponse.ok) {
          const innResults = await innResponse.json();
          const innMatchScore = innResults.average_match_score || 0;
  
          setComplianceResults((prev) => ({
            ...prev,
            [inn]: {
              ofacMatch: innMatchScore >= 0.7,
              blacklistMatch: false,
              matchScore: innMatchScore,
            },
          }));
        }
      }
    } catch (error) {
      console.error(`Error checking entity ${name}:`, error);
      toast.error('Failed to check entity against SDN list');
    }
  };

  const checkFounders = async (founders: Founder[]) => {
    for (const founder of founders) {
      await checkEntity(founder.owner, founder.inn);
      if (founder.isCompany && founder.companyDetails) {
        if (founder.companyDetails.CEO) {
          await checkEntity(founder.companyDetails.CEO);
        }
        if (founder.companyDetails?.Founders && founder.companyDetails.Founders.length > 0) {
          await checkFounders(founder.companyDetails.Founders);
        }
      }
    }
  };

  const handleSave = () => {
    onSave({
      status: currentStatus,
      notes: notes
    });
    onClose();
  };

  const handleRecheckOFAC = async () => {
    // Hide current compliance icons
    setComplianceResults({}); // Clear current results

    try {
      setIsChecking(true);
      const results: Record<string, ComplianceResult> = {};
      const checkedINNs = new Set<string>();

      const checkEntity = async (name: string, inn?: string) => {
        try {
          const transliteratedName = transliterate(name);
          const blacklistMatch = BlacklistChecker.checkName(transliteratedName, []) || false;
          const response = await fetch(import.meta.env.VITE_BACKEND_URL+'/api/sdn/search?query='+encodeURIComponent(transliteratedName));
          if (!response.ok) {
            throw new Error('Failed to search SDN list');
          }
          const searchResults = await response.json();
          const averageMatchScore = searchResults.average_match_score || 0;

          results[transliteratedName] = {
            ofacMatch: averageMatchScore >= 0.7,
            blacklistMatch: !!blacklistMatch,
            matchScore: averageMatchScore
          };

          if (inn && !checkedINNs.has(inn)) {
            checkedINNs.add(inn);
            const innResponse = await fetch(import.meta.env.VITE_BACKEND_URL+'/api/sdn/search?query='+encodeURIComponent(inn));
            if (innResponse.ok) {
              const innResults = await innResponse.json();
              const innMatchScore = innResults.average_match_score || 0;
              
              results[inn] = {
                ofacMatch: innMatchScore >= 0.7,
                blacklistMatch: false,
                matchScore: innMatchScore
              };
            }
          }
        } catch (error) {
          console.error(`Error checking entity ${name}:`, error);
          toast.error('Failed to check entity against SDN list');
        }
      };

      // Check main entity
      await checkEntity(entity.name, entity.inn);
      if (entity.CEO) await checkEntity(entity.CEO);

      // Check founders recursively
      const checkFounders = async (founders: Founder[]) => {
        for (const founder of founders) {
          await checkEntity(founder.owner, founder.inn);
          if (founder.isCompany && founder.companyDetails) {
            if (founder.companyDetails.CEO) {
              await checkEntity(founder.companyDetails.CEO);
            }
            if (founder.companyDetails?.Founders && founder.companyDetails.Founders.length > 0) {
              await checkFounders(founder.companyDetails.Founders ?? []);
            }
          }
        }
      };
      

      if (entity.Founders && entity.Founders.length > 0) {
        await checkFounders(entity.Founders);
      }

      // After all checks are done, update the compliance results
      setComplianceResults(results);

      // Determine the new status based on the results
      const newStatus = getEntityStatus(results, entity);
      setCurrentStatus(newStatus); // Update the current status in the UI

      // Refresh the entity details
      onRefresh();
      toast.success('OFAC check completed successfully');
    } catch (error) {
      console.error('Error rechecking OFAC:', error);
      toast.error('Failed to recheck OFAC');
    } finally {
      setIsChecking(false);
    }
  };

  const renderStatusIcon = (name: string) => {
    const result = complianceResults[name];
    if (!result) return null;

    const iconColor = result.ofacMatch ? 'text-red-500' : result.blacklistMatch ? 'text-yellow-500' : 'text-green-500';

    return (
      <div className={`flex items-center ${iconColor}`}>
        {result.ofacMatch ? <Shield className="w-4 h-4" /> : result.blacklistMatch ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
        <span className="ml-1 text-xs">{Math.round(result.matchScore * 100)}% match</span>
      </div>
    );
  };

  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev => ({
      ...prev,
      [nodeId]: !prev[nodeId]
    }));
  };

  const renderFounders = (founders: Founder[], parentId = "") => (
    <ul className="space-y-0.5 ml-4 mt-1">
      {founders.map((founder, index) => {
        const nodeId = `${parentId}_${index}`;
        const isExpanded = expandedNodes[nodeId];
        const hasCompanyDetails = founder.isCompany && founder.companyDetails;
        const transliteratedName = transliterate(founder.owner);
  
        return (
          <li key={nodeId} className="flex flex-col space-y-0.5">
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center">
                {hasCompanyDetails && (
                  <button onClick={() => toggleNode(nodeId)} className="p-0.5">
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                )}
                {founder.isCompany ? (
                  <Building2 className="w-4 h-4 text-gray-400 ml-1" />
                ) : (
                  <User className="w-4 h-4 text-gray-400 ml-1" />
                )}
                <div className="ml-2 flex flex-col">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span>{founder.cleanName || founder.owner}</span>
                      {founder.ownershipPercentage && (
                        <span className="ml-2 text-sm text-blue-500">
                          ({founder.ownershipPercentage}%)
                        </span>
                      )}
                    </div>
                    <div className="ml-4">{renderComplianceIcons(transliteratedName)}</div>
                  </div>
                  {founder.inn && (
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>INN: {founder.inn}</span>
                      <div className="ml-4">{renderComplianceIcons(founder.inn)}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
  
            {isExpanded && hasCompanyDetails && (
              <div className="ml-6 pl-2 border-l border-gray-300 dark:border-gray-600">
                {founder.companyDetails?.CEO && (
                  <div className="flex items-center justify-between py-1">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">CEO:</span>
                      <span>{transliterate(founder.companyDetails.CEO)}</span>
                    </div>
                    {renderComplianceIcons(transliterate(founder.companyDetails.CEO))}
                  </div>
                )}
  
  {founder.companyDetails?.Founders && founder.companyDetails.Founders.length > 0 && (
                  <div className="mt-2">
                    <span className="text-sm text-gray-500">Founders:</span>
                    {renderFounders(founder.companyDetails?.Founders ?? [], nodeId)}
                  </div>
                )}

              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div ref={modalRef} className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Entity Details
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <select
                value={currentStatus}
                onChange={(e) => setCurrentStatus(e.target.value as CommonEntity['status'])}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                  focus:outline-none focus:ring-[#008766] focus:border-transparent 
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="clean">{t('clean')}</option>
                <option value="needs_review">{t('needsReview')}</option>
                <option value="flagged">{t('flagged')}</option>
              </select>
              <button
                onClick={handleRecheckOFAC}
                disabled={isChecking}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isChecking ? 'animate-spin' : ''}`} />
                {t('recheckOFAC')}
              </button>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {t('source')}: {renderSourceBadge(entity.source) ? entity.source.toUpperCase() : 'N/A'}
            </span>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                {transliterate(entity.name)}
              </h4>
              {renderStatusIcon(transliterate(entity.name))}
            </div>
            
            {entity.inn && (
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">{t('inn')}: {entity.inn || '-'}</span>
                {renderStatusIcon(entity.inn || '-')}
              </div>
            )}

            {entity.CEO && (
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                <div>
                  <span className="font-medium">{t('ceo')}:</span> {transliterate(entity.CEO)}
                </div>
                {renderStatusIcon(transliterate(entity.CEO))}
              </div>
            )}
          </div>

          {/* Ownership Structure */}
          {entity.Founders && entity.Founders.length > 0 && (
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                {t('ownershipStructure')}
              </h4>
              {renderFounders(entity.Founders)}
            </div>
          )}

          {/* Notes */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {t('notes')}  
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                focus:outline-none focus:ring-[#008766] focus:border-transparent 
                bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              rows={4}
              placeholder={t('addNotesPlaceholder')}
            />
          </div>

          {/* Last Checked */}
          {entity.lastChecked && (
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {t('lastChecked')}: {new Date(entity.lastChecked).toLocaleString()}
            </div>
          )}

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-[#008766] text-white rounded-lg hover:bg-[#007055]"
            >
              {t('saveChanges')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 