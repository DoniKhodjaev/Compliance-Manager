import { useState } from "react";
import { apiClient, API_ENDPOINTS } from '../utils/api';
import {
  ChevronDown,
  ChevronRight,
  User,
  XCircle,
  CheckCircle,
  AlertTriangle,
  Building2,
  Plus,
  Shield,
} from "lucide-react";
import { BlacklistChecker } from "../utils/blacklistChecker";
import { transliterate } from "../utils/translit";
import type { CommonEntity, BlacklistEntry } from '../types';
import { toast } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

interface EntitySearchProps {
  onAddToCommonEntities: (entity: Omit<CommonEntity, 'id'>) => void;
  existingEntities: CommonEntity[];
  blacklistEntries: BlacklistEntry[];
}

interface ComplianceResult {
  ofacMatch: boolean;
  blacklistMatch: boolean;
  matchScore: number;
}

interface ComplianceResults {
  [key: string]: ComplianceResult;
}

export const EntitySearch = ({ 
  onAddToCommonEntities, 
  existingEntities,
  blacklistEntries 
}: EntitySearchProps) => {
  const { t } = useTranslation();
  const [orgInfoSearch, setOrgInfoSearch] = useState("");
  const [orgInfoResult, setOrgInfoResult] = useState<any>(null);
  const [egrulSearch, setEgrulSearch] = useState("");
  const [egrulResult, setEgrulResult] = useState<any>(null);
  const [loadingOrgInfo, setLoadingOrgInfo] = useState(false);
  const [loadingEgrul, setLoadingEgrul] = useState(false);
  const [complianceResults, setComplianceResults] = useState<ComplianceResults>({});
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({});


  const checkCompliance = async (data: any) => {
    try {
      const uniqueEntities = new Set<string>();

      // Function to check a single entity and update state immediately
      const checkSingleEntity = async (entity: string) => {
        try {
          const response = await apiClient.get(API_ENDPOINTS.SEARCH_SDN, {
            params: { query: encodeURIComponent(entity) }
          });
          
          const searchResults = response.data;
          const averageMatchScore = searchResults.average_match_score || 0;
          const blacklistMatch = !!BlacklistChecker.checkName(entity, blacklistEntries);

          const result = {
            ofacMatch: averageMatchScore >= 1.0,
            blacklistMatch: blacklistMatch,
            matchScore: averageMatchScore
          };

          // Update state immediately
          setComplianceResults(prev => ({
            ...prev,
            [entity]: result
          }));

          return result;
        } catch (error) {
          console.error(`Error checking entity ${entity}:`, error);
          toast.error(`Failed to check ${entity}`);
          return null;
        }
      };

      // Collect all entities to check
      const collectEntities = (data: any) => {
        if (data.name) uniqueEntities.add(transliterate(data.name));
        if (data.inn || data.TIN) uniqueEntities.add(data.inn || data.TIN);
        if (data.CEO) uniqueEntities.add(transliterate(data.CEO));

        if (data.Founders) {
          data.Founders.forEach((founder: any) => {
            uniqueEntities.add(transliterate(founder.owner));
            if (founder.inn) uniqueEntities.add(founder.inn);
            if (founder.companyDetails) {
              collectEntities(founder.companyDetails);
            }
          });
        }
      };

      collectEntities(data);

      // Check all entities
      for (const entity of uniqueEntities) {
        await checkSingleEntity(entity);
      }

    } catch (error) {
      console.error("Error during compliance check:", error);
      toast.error('Failed to perform compliance check');
    }
  };

  const handleOrgInfoSearch = async (query: string) => {
    if (!query.trim()) {
      toast.error('Please enter a company name to search');
      return;
    }

    setLoadingOrgInfo(true);
    try {
      const response = await apiClient.get(API_ENDPOINTS.SEARCH_ORGINFO, {
        params: { company_name: query }
      });
      
      if (response.data.error) {
        toast.error('No results found for this company name');
        setOrgInfoResult(null);
      } else {
        setOrgInfoResult(response.data);
        await checkCompliance(response.data);
      }
    } catch (error) {
      console.error('Error searching ORGINFO:', error);
      toast.error('Failed to search ORGINFO database');
    } finally {
      setLoadingOrgInfo(false);
    }
  };

  const handleEgrulSearch = async () => {
    if (!egrulSearch.trim()) {
      toast.error('Please enter an INN to search');
      return;
    }

    setLoadingEgrul(true);
    try {
      const response = await apiClient.get(API_ENDPOINTS.SEARCH_EGRUL, {
        params: { inn: egrulSearch }
      });
      
      if (!response.data || 
          Object.keys(response.data).length === 0 || 
          response.data.error || 
          !response.data.name) {
        toast.error('No results found for this INN');
        setEgrulResult(null);
      } else {
        setEgrulResult(response.data);
        await checkCompliance(response.data);
      }
    } catch (error: any) {
      console.error("Error fetching EGRUL data:", error);
      const errorMessage = error.response?.data?.message || 'Failed to fetch EGRUL data. Please try again.';
      toast.error(errorMessage);
      setEgrulResult(null);
    } finally {
      setLoadingEgrul(false);
    }
  };

  const toggleNode = (nodeId: string) => {
    setExpandedNodes((prev: Record<string, boolean>) => ({ 
      ...prev, 
      [nodeId]: !prev[nodeId] 
    }));
  };

  const renderComplianceIcons = (entityId: string) => {
    const result = complianceResults[entityId];
    if (!result) return null;

    return (
      <div className="flex items-center space-x-2">
        {/* OFAC Status */}
        {result.matchScore >= 1.0 && (
          <span className="flex items-center text-red-600" title="100% OFAC Match">
            <XCircle className="w-4 h-4" />
            <span className="ml-1 text-xs text-red-500">100% match</span>
          </span>
        )}
        {result.matchScore >= 0.85 && result.matchScore < 1.0 && (
          <span className="flex items-center text-yellow-500" title="Potential OFAC Match">
            <AlertTriangle className="w-4 h-4" />
            <span className="ml-1 text-xs text-yellow-500">
              {Math.round(result.matchScore * 100)}% match
            </span>
          </span>
        )}
        {/* Blacklist Status */}
        {result.blacklistMatch && (
          <span className="flex items-center text-red-600" title="Blacklisted">
            <Shield className="w-4 h-4" />
          </span>
        )}
        {/* Clear Status */}
        {!result.blacklistMatch && result.matchScore < 0.85 && (
          <span className="flex items-center text-green-500" title="Clear">
            <CheckCircle className="w-4 h-4" />
            <span className="ml-1 text-xs text-green-500">Clear</span>
          </span>
        )}
      </div>
    );
  };

  const renderOwnershipTree = (owners: any[], parentId = "") => (
    <ul className="space-y-0.5 ml-4 mt-1">
      {owners.map((owner, index) => {
        const nodeId = `${parentId}_${index}`;
        const isExpanded = expandedNodes[nodeId];
        const hasCompanyDetails = owner.isCompany && owner.companyDetails;
        const transliteratedName = transliterate(owner.owner);

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
                {owner.isCompany ? (
                  <Building2 className="w-4 h-4 text-gray-400 ml-1" />
                ) : (
                  <User className="w-4 h-4 text-gray-400 ml-1" />
                )}
                <div className="ml-2 flex flex-col w-full">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span>{owner.cleanName || owner.owner}</span>
                      {owner.ownershipPercentage !== undefined && (
                        <span className="ml-2 text-sm text-blue-500">
                          ({owner.ownershipPercentage}%)
                        </span>
                      )}
                    </div>
                    <div className="ml-4">
                      {renderComplianceIcons(transliteratedName)}
                    </div>
                  </div>
                  {owner.inn && (
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>INN: {owner.inn}</span>
                      <div className="ml-4">
                        {renderComplianceIcons(owner.inn)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {isExpanded && hasCompanyDetails && (
              <div className="ml-6 pl-2 border-l border-gray-300 dark:border-gray-600">
                {owner.companyDetails.CEO && (
                  <div className="flex items-center justify-between py-1">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">CEO:</span>
                      <span>{owner.companyDetails.CEO}</span>
                    </div>
                    {renderComplianceIcons(transliterate(owner.companyDetails.CEO))}
                  </div>
                )}
                
                {owner.companyDetails.Founders?.length > 0 && (
                  <div className="mt-2">
                    <span className="text-sm text-gray-500">Founders:</span>
                    {renderOwnershipTree(owner.companyDetails.Founders, nodeId)}
                  </div>
                )}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );

  const isEntityInCommonEntities = (entityName: string): boolean => {
    if (!entityName) return false;
    
    try {
      const transliteratedName = transliterate(entityName).toLowerCase();
      return existingEntities.some(
        (existingEntity: CommonEntity) => {
          if (!existingEntity.name) return false;
          return transliterate(existingEntity.name).toLowerCase() === transliteratedName;
        }
      );
    } catch (error) {
      console.error('Error in transliteration:', error);
      return false;
    }
  };

  const renderEntityInfo = (entityData: any) => {
    if (!entityData) return null;

    return (
      <div className="mt-4 bg-gray-200 dark:bg-gray-900 p-4 rounded-md">
        <div className="flex flex-col space-y-2">
          {/* Company Name with Status Icons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-semibold">
                {t('companyName')}
              </span>
              <span>{entityData.name ? transliterate(entityData.name) : ''}</span>
            </div>
            {entityData.name && renderComplianceIcons(transliterate(entityData.name))}
          </div>

          {/* INN Section with Status Icons */}
          {(entityData.inn || entityData.TIN) && (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="font-semibold">
                  {t('inn')}
                </span>
                <span>{entityData.inn || entityData.TIN}</span>
              </div>
              {renderComplianceIcons(entityData.inn || entityData.TIN)}
            </div>
          )}

          {/* CEO Section with Status Icons */}
          {entityData.CEO && (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="font-semibold">
                  {t('ceo')}
                </span>
                <span>{transliterate(entityData.CEO)}</span>
              </div>
              {renderComplianceIcons(transliterate(entityData.CEO))}
            </div>
          )}

          {/* Founders Section with Status Icons */}
          {entityData.Founders && entityData.Founders.length > 0 && (
            <div className="mt-4">
              <span className="font-semibold">
                {t('founders')}
              </span>
              {renderOwnershipTree(entityData.Founders)}
            </div>
          )}
        </div>
      </div>
    );
  };

  const handleAddToCommonEntities = async (entityData: any) => {
    if (!entityData || !entityData.name) {
      toast.error('Invalid entity data');
      return;
    }

    try {
      const newEntity: Omit<CommonEntity, 'id'> = {
        name: entityData.name,
        inn: entityData.TIN || entityData.inn || '',
        source: entityData.inn ? 'egrul' : 'orginfo',
        CEO: entityData.CEO || '',
        Founders: entityData.Founders || [],
        status: 'clean',
        lastChecked: new Date().toISOString(),
        notes: ''
      };

      await onAddToCommonEntities(newEntity);
      toast.success(`${entityData.name} has been added to Common Entities`);
      
    } catch (error: any) {
      console.error("Error adding entity:", error);
      toast.error('Failed to add entity. Please try again.');
    }
  };

  const handleOrgInfoKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleOrgInfoSearch(orgInfoSearch);
    }
  };

  const handleEgrulKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleEgrulSearch();
    }
  };

  const handleEgrulInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setEgrulSearch(value);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        {t('entityScreening')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* OrgInfo Section */}
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
            {t('searchOrgInfo')}
          </h3>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder={t('enterCompanyName')}
              value={orgInfoSearch}
              onChange={(e) => setOrgInfoSearch(e.target.value)}
              onKeyPress={handleOrgInfoKeyPress}
              className="flex-grow px-3 py-2 border rounded-md 
                border-gray-300 dark:border-gray-600 
                bg-white dark:bg-gray-600 
                text-gray-900 dark:text-gray-100
                placeholder-gray-500 dark:placeholder-gray-400
                focus:outline-none focus:ring-[#008766] focus:border-transparent"
            />
            <button
              onClick={() => handleOrgInfoSearch(orgInfoSearch)}
              className="bg-[#008766] text-white px-4 py-2 rounded-md hover:bg-[#007055] whitespace-nowrap"
              disabled={loadingOrgInfo}
            >
              {loadingOrgInfo ? t('searching') : t('search')}
            </button>
            {orgInfoResult && (
              <button
                onClick={() => handleAddToCommonEntities(orgInfoResult)}
                disabled={isEntityInCommonEntities(orgInfoResult.name)}
                className={`flex items-center px-4 py-2 bg-blue-500 text-white rounded-md 
                  ${isEntityInCommonEntities(orgInfoResult.name) 
                    ? 'opacity-50 cursor-not-allowed bg-gray-400' 
                    : 'hover:bg-blue-600'}`}
                title={isEntityInCommonEntities(orgInfoResult.name) 
                  ? 'Entity already exists in Common Entities' 
                  : 'Add to Common Entities'}
              >
                <Plus className="w-4 h-4 mr-2" />
                {t('add')}
              </button>
            )}
          </div>

          {orgInfoResult && (
            <div className="mt-4">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                {t('results')}
              </h4>
              
              {orgInfoResult.error ? (
                <p className="text-red-500">{orgInfoResult.error}</p>
              ) : (
                renderEntityInfo(orgInfoResult)
              )}
            </div>
          )}
        </div>

        {/* EGRUL Section */}
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
            {t('searchEGRUL')}
          </h3>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder={t('enterINN')}
              value={egrulSearch}
              onChange={handleEgrulInputChange}
              onKeyPress={handleEgrulKeyPress}
              className="flex-grow px-3 py-2 border rounded-md 
                border-gray-300 dark:border-gray-600 
                bg-white dark:bg-gray-600 
                text-gray-900 dark:text-gray-100
                placeholder-gray-500 dark:placeholder-gray-400
                focus:outline-none focus:ring-[#008766] focus:border-transparent"
            />
            <button
              onClick={handleEgrulSearch}
              className="bg-[#008766] text-white px-4 py-2 rounded-md hover:bg-[#007055] whitespace-nowrap"
              disabled={loadingEgrul}
            >
              {loadingEgrul ? t('searching') : t('search')}
            </button>
            {egrulResult && (
              <button
                onClick={() => handleAddToCommonEntities(egrulResult)}
                disabled={isEntityInCommonEntities(egrulResult.name)}
                className={`flex items-center px-4 py-2 bg-blue-500 text-white rounded-md 
                  ${isEntityInCommonEntities(egrulResult.name) 
                    ? 'opacity-50 cursor-not-allowed bg-gray-400' 
                    : 'hover:bg-blue-600'}`}
                title={isEntityInCommonEntities(egrulResult.name) 
                  ? 'Entity already exists in Common Entities' 
                  : 'Add to Common Entities'}
              >
                <Plus className="w-4 h-4 mr-2" />
                {t('add')}
              </button>
            )}
          </div>

          {egrulResult && (
            <div className="mt-4">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                {t('results')}
              </h4>
              {egrulResult.error ? (
                <p className="text-red-500">{egrulResult.error}</p>
              ) : (
                renderEntityInfo(egrulResult)
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EntitySearch;
