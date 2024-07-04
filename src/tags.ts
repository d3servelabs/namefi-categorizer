/**
 * Tags:
 *  en
 *      - or any 2-letter language code from ISO 639-1)
 *  .com TLD
 *      - or any TLD
 *  Pure Number
 *      - Single Digit Club
 *      - Double Digits Club
 *      - 999 Club
 *      - 10k Club
 *      - 100k Club
 *    ...
 *  English World Club
 *    English Top 1K
 *    English Top 10K
 *    English Top 100K
*/

import { getPureNumberClub } from "./number-club";
import { isGwtwc100K, isGwtwc10K, isGwtwc1K } from "./english-word-club";

export function getTags(domainName: string) {
    let tags = [];
    let segments = domainName.split('.');

    // get TLD tag
    let tld = segments[segments.length - 1];
    let lld = segments[segments.length - 2];

    tags.push(`.${tld} TLD`);

    // get leave level domain tag

    // get number club tag
    let numberClub = getPureNumberClub(lld);
    if (numberClub) {
        tags.push('Pure Number');
        switch (lld.length) {
            case 1:
                tags.push('Single Digit Club');
                break;
            case 2:
                tags.push('Double Digits Club');
                break;
            case 3:
                tags.push('999 Club');
                break;
            case 4:
                tags.push('10k Club');
                break;
            case 5:
                tags.push('100k Club');
                break;
        }
    }

    // get english word club tag
    if (isGwtwc1K(lld)) {
        tags.push('English Top 1K');
    }

    if (isGwtwc10K(lld)) {
        tags.push('English Top 10K');
    }

    if (isGwtwc100K(lld)) {
        tags.push('English Top 10K');
    }

    return tags;
}