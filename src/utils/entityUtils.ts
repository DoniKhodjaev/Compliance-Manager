import { CommonEntity } from '../types';
import { ComplianceResult } from '../types/compliance';
import { transliterate } from 'transliteration';

export const getEntityStatus = (results: Record<string, ComplianceResult>, entity: CommonEntity): CommonEntity['status'] => {
  // Collect all results including founders recursively
  const getAllResults = (entity: CommonEntity): ComplianceResult[] => {
    const entityResults: ComplianceResult[] = [];
    
    // Add main entity results
    if (results[transliterate(entity.name)]) {
      entityResults.push(results[transliterate(entity.name)]);
    }
    if (entity.inn && results[entity.inn]) {
      entityResults.push(results[entity.inn]);
    }
    if (entity.CEO && results[transliterate(entity.CEO)]) {
      entityResults.push(results[transliterate(entity.CEO)]);
    }

    // Add founders results recursively
    const checkFounders = (founders: CommonEntity['Founders'] = []): void => {
      founders.forEach(founder => {
        if (results[transliterate(founder.owner)]) {
          entityResults.push(results[transliterate(founder.owner)]);
        }
        if (founder.companyDetails) {
          if (founder.companyDetails.inn && results[founder.companyDetails.inn]) {
            entityResults.push(results[founder.companyDetails.inn]);
          }
          if (founder.companyDetails.CEO && results[transliterate(founder.companyDetails.CEO)]) {
            entityResults.push(results[transliterate(founder.companyDetails.CEO)]);
          }
          if (founder.companyDetails.Founders) {
            checkFounders(founder.companyDetails.Founders);
          }
        }
      });
    };

    if (entity.Founders) {
      checkFounders(entity.Founders);
    }

    return entityResults;
  };

  const allResults = getAllResults(entity);

  // If any result has 100% match or ofacMatch is true, mark as flagged
  if (allResults.some(result => result.matchScore >= 1.0 || result.ofacMatch)) {
    return 'flagged';
  }
  // If any result has match score >= 0.85, mark as needs review
  else if (allResults.some(result => result.matchScore >= 0.85)) {
    return 'needs_review';
  }
  // Otherwise mark as clean
  else {
    return 'clean';
  }
}; 