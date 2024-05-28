import { parse } from "dotenv";

export const assertOrFail = function(condition: boolean, message: string) {
    if (!condition) {
        throw new Error(message);
    }
}

export const extractChildDomain = function(domainName: string) {
    assertOrFail(/^[a-z0-9\-]+(\.[a-z0-9\-]+)+$/.test(domainName), 'Invalid domain name');
    let segments = domainName.split('.');
    return segments[0];
}

export const ldhSegmentRegexStr = "^[a-z0-9\-]+$";
export const ldhDomainRegexStr = "^[a-z0-9\-]+(\.[a-z0-9\-]+)+$";

/// Extracts the parent domains of a given domain name:
/// the part of the domain name that is not the child domain.
export const extractParentDomains = function(domainName: string) {
    assertOrFail(/^[a-z0-9\-]+(\.[a-z0-9\-]+)+$/.test(domainName), 'Invalid domain name');
    let segments = domainName.split('.');
    return segments.slice(1).join('.');
}

export const extractTopLevelDomain = function(domainName: string) {
    assertOrFail(/^[a-z0-9\-]+(\.[a-z0-9\-]+)+$/.test(domainName), 'Invalid domain name');
    let segments = domainName.split('.');
    return segments[segments.length - 1];
}

export const isLDHSegment = function(segment: string):boolean {
    return /^[a-z0-9\-]+$/.test(segment);
}

export const isLDHDomain = function(domainName: string):boolean {
    return /^[a-z0-9\-]+(\.[a-z0-9\-]+)+$/.test(domainName);
}

export const isLdhSegmentIDN = function(ldhSegment: string) {
    assertOrFail(isLDHSegment(ldhSegment), 'Domain name not a valid LDH segment');
    if (ldhSegment.startsWith('xn--')) {
        return true;
    } else {
        return false;
    }
}

export const isLdhSegmentPureNumber = function(ldhSegment: string) {
    assertOrFail(isLDHSegment(ldhSegment), 'Domain name not a valid LDH domain');
    return /^\d+$/.test(ldhSegment);
}