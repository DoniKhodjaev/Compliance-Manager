import type { BlacklistEntry, BlacklistMatch } from '../types';

export class BlacklistCheckerClass {
  checkName(name: string, blacklist: BlacklistEntry[]): BlacklistMatch | null {
    const nameLower = name.toLowerCase();

    // Find exact match in the blacklist
    const matchingEntry = blacklist.find(entry =>
      Object.values(entry.names).some(nameVariant => nameVariant.toLowerCase() === nameLower)
    );

    if (!matchingEntry) return null;

    // Find the specific key that matched
    const matchedKey = (Object.keys(matchingEntry.names) as Array<keyof typeof matchingEntry.names>).find(
      key => matchingEntry.names[key].toLowerCase() === nameLower
    );

    return {
      isMatch: true,
      matchedName: matchingEntry.names[matchedKey as keyof typeof matchingEntry.names] || name,
      matchType: matchedKey as 'full' | 'short' | 'abbreviation' | 'inn',
      language: matchedKey?.includes('Ru') ? 'ru' : 'en',
      entry: matchingEntry,
    };
  }
}

export const BlacklistChecker = new BlacklistCheckerClass();
