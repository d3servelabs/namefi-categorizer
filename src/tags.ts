import { isGwtwc100K, isGwtwc10K, isGwtwc1K } from './english-word-club';
import { assertOrFail, extractTopLevelDomain } from './domain-parser';

interface Tag {
  id: string;
  name: string;
  description: string;
}

// language tags id  lang_en, lang_zh, ... lang_<ISO 639-1>
/**
 * Get tag from language code
 * @param langCode
 * @returns
 */
export const getTagOfLangTypeFromLangCode = (langCode: string): Tag => {
  return {
    id: `lang_${langCode}`,
    name: `${langCode} language`,
    description: `Domain of the language: ${langCode}`,
  };
};
export const getTagOfLangFromTagId = (tagId: string): Tag => {
  assertOrFail(tagId.startsWith('lang_'), 'Invalid tag id');
  const langCode = tagId.slice(5);
  return {
    id: tagId,
    name: `${langCode} language`,
    description: `Domain of the language: ${langCode}`,
  };
};

// tld tags id  tld_com, tld_net, tld_org, tld_<tld_ldh>
/**
 * Get tag from TLD
 * @param tld
 * @returns
 */
export const getTagOfTldType = (tld: string): Tag => {
  return {
    id: `tld_${tld}`,
    name: `.${tld} TLD`,
    description: `Domain of the TLD: ${tld}`,
  };
};

export const getTagOfTldFromTagId = (tagId: string): Tag => {
  assertOrFail(tagId.startsWith('tld_'), 'Invalid tag id');
  const tld = tagId.slice(4);
  return {
    id: tagId,
    name: `${tld} TLD`,
    description: `Domain of the TLD: ${tld}`,
  };
};

// number club tags id  num_1d, num_2d, num_3d, num_4d, num_<length>d
export const getNumTagBySegment = (digit: number): Tag => {
  let name;
  switch (digit) {
    case 1:
      name = 'Single Digit Club';
      break;
    case 2:
      name = 'Double Digit Club';
      break;
    case 3:
      name = '999 Club';
      break;
    case 4:
      name = '10k Club';
      break;
    case 5:
      name = '100k Club';
      break;
    default:
      name = `${digit} Digit Club`;
      break;
  }

  return {
    id: `num_${digit}d`,
    name,
    description: `Domain of the number club: ${digit} digits`,
  };
};

export const getTagOfNumberClubFromTagId = (tagId: string): Tag => {
  assertOrFail(tagId.startsWith('num_'), 'Invalid tag id');
  const digit = parseInt(tagId.slice(4, -1));
  return getNumTagBySegment(digit);
};

// Length of child domain tags id child_<length>s
export const getTagOfLengthOfLastSegment = (length: number): Tag => {
  return {
    id: `length_${length}`,
    name: `Length of last segment: ${length}`,
    description: `Domain of the length of last segment: ${length}`,
  };
};

export const getTagOfLengthOfLastSegmentFromTagId = (tagId: string): Tag => {
  assertOrFail(tagId.startsWith('length_'), 'Invalid tag id');
  const length = parseInt(tagId.slice(7));
  return getTagOfLengthOfLastSegment(length);
};

// english word club tags id  ewc_gwtwc_1k, ewc_gwtwc_10k, ewc_gwtwc_100k
export const getTagOfEnglishWordClub = (club: string): Tag => {
  let name;
  switch (club) {
    case 'gwtwc_1k':
      name = 'English Top 1K';
      break;
    case 'gwtwc_10k':
      name = 'English Top 10K';
      break;
    case 'gwtwc_100k':
      name = 'English Top 100K';
      break;
    default:
      name = 'English Word Club';
      break;
  }

  return {
    id: `en_${club}`,
    name,
    description: `Domain of the English word club: ${name}`,
  };
};

export const getTagOfEnglishWordClubFromTagId = (tagId: string): Tag => {
  assertOrFail(tagId.startsWith('ewc_'), 'Invalid tag id');
  const club = tagId.slice(4);
  return getTagOfEnglishWordClub(club);
};

export function getTags(domainName: string): Tag[] {
  const tags: Tag[] = [];
  const tld = extractTopLevelDomain(domainName);
  const firstLD = domainName.split('.')[0];
  const firstLDLength = firstLD.length;

  // TODO add language tag

  // Add TLD tag
  tags.push(getTagOfTldType(tld));

  // Add number club tag
  if (firstLDLength > 0 && /^\d+$/.test(firstLD)) {
    tags.push(getNumTagBySegment(firstLDLength));
  }

  // Add length of last segment tag
  tags.push(getTagOfLengthOfLastSegment(firstLDLength));

  // Add English word club tag
  if (isGwtwc1K(firstLD)) {
    tags.push(getTagOfEnglishWordClub('gwtwc_1k'));
  } else if (isGwtwc10K(firstLD)) {
    tags.push(getTagOfEnglishWordClub('gwtwc_10k'));
  } else if (isGwtwc100K(firstLD)) {
    tags.push(getTagOfEnglishWordClub('gwtwc_100k'));
  }
  return tags;
}
