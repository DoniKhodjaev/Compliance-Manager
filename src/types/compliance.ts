export interface CompanyDetails {
  name: string;
  CEO?: string;
  inn?: string;
  Founders?: Founder[];
}

export interface Founder {
  name: string;
  owner: string;
  inn?: string;
  isCompany: boolean;
  companyDetails?: {
    name: string;
    inn?: string;
    CEO?: string;
    Founders?: Founder[];
  };
  cleanName?: string; // Add missing property
  ownershipPercentage?: number; // Add missing property
}

export interface ComplianceResult {
  ofacMatch: boolean;
  blacklistMatch: boolean;
  matchScore: number;
} 