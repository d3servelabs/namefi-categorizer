# @namefi/cat

A TypeScript/JavaScript library for parsing, validating, and classifying domain names. It provides utilities to:

- Validate [LDH (Letter-Digit-Hyphen)](https://en.wikipedia.org/wiki/Hostname#Restrictions_on_valid_host_names) domains  
- Extract domain components (e.g., child domain, parent domains, TLD)  
- Classify domains into "clubs" based on length, language, frequency rank, etc.  
- Check English word membership and ranking in popular corpora (e.g., Google Web Trillion Word Corpus)  

## Table of Contents

1. [Installation](#installation)  
2. [Key Features](#key-features)  
    1. [Domain Parsing and Validation](#domain-parsing-and-validation)  
    2. [Numeric Clubs](#numeric-clubs)  
    3. [English Word Clubs](#english-word-clubs)  
    4. [Tagging System](#tagging-system)  
3. [Usage Examples](#usage-examples)  
4. [API Reference](#api-reference)  
    1. [Domain Parser](#domain-parser)  
    2. [Number Club](#number-club)  
    3. [English Word Club](#english-word-club)  
    4. [Tagging Functions](#tagging-functions)  
5. [Testing](#testing)  
6. [Contributing](#contributing)

---

## Installation

Using npm:

```bash
npm install @namefi/cat
```

Using Yarn:

```bash
yarn add @namefi/cat
```

---

## Key Features

### Domain Parsing and Validation

- **LDH Validation**: Ensures domain segments contain only letters, digits, and hyphens.  
- **Extraction**: Retrieve the child domain (left-most label), parent domains, and top-level domain (TLD).  

### Numeric Clubs

- Categorize purely numeric domain segments by length:
  - **Single Digit Club**  
  - **Double Digits Club**  
  - **999 Club** (3-digit)  
  - **10k Club** (4-digit)  
  - **100k Club** (5-digit)

### English Word Clubs

- **GWTWC (Google Web Trillion Word Corpus)** Ranking Checks:
  - Top 1K  
  - Top 10K  
  - Top 100K  

- **MIT10K** Word List Check:
  - Validate if a word exists in the MIT 10,000-word list (en-US).

### Tagging System

- Generates tags for:
  1. **Language** (ISO 639-1 based)  
  2. **TLD** (e.g., `.com`, `.net`)  
  3. **Number Clubs** (e.g., `999 Club`, `10k Club`)  
  4. **English Word Clubs** (e.g., `English Top 1K`)

These tags provide a structured way to label and categorize domains in your application.

---

## Usage Examples

```ts
import {
  extractChildDomain,
  extractParentDomains,
  extractTopLevelDomain,
  isLDHDomain,
  getTags
} from '@namefi/cat';

// 1. Validate and parse domain
const domain = 'example.com';

if (isLDHDomain(domain)) {
  console.log(`"${domain}" is a valid LDH domain!`);

  const child = extractChildDomain(domain);  // "example"
  const parents = extractParentDomains(domain); // "com"
  const tld = extractTopLevelDomain(domain); // "com"

  console.log('Child domain:', child);
  console.log('Parent domains:', parents);
  console.log('TLD:', tld);
}

// 2. Get all tags for a domain
const domainTags = getTags('888.com');
domainTags.forEach(tag => {
  console.log(tag.id, tag.name, tag.description);
});

/*
 Example output:
  tld_com           .com TLD          Domain of the TLD: com
  num_3d            999 Club          Domain of the number club: 3 digits
  ewc_gwtwc_10k     English Top 10K   Domain of the English word club: English Top 10K
 (the actual English word tags vary based on the domain)
*/
```

---

## API Reference

Below is a high-level overview of the main functions and their purposes. For detailed type definitions, see the source code or generated TypeDoc/API docs (if you choose to generate them).

### Domain Parser

- **`isLDHSegment(segment: string): boolean`**  
  Checks if a single segment (label) is valid according to LDH rules.

- **`isLDHDomain(domain: string): boolean`**  
  Validates the entire domain structure.

- **`extractChildDomain(domainName: string): string`**  
  Returns the left-most label (SLD if there are only two labels).

- **`extractParentDomains(domainName: string): string`**  
  Returns all labels except the left-most (usually everything after the SLD).

- **`extractTopLevelDomain(domainName: string): string`**  
  Returns the last label (e.g., “com”, “org”).

### Number Club

- **`getPureNumberClub(segment: string): string | null`**  
  Checks if `segment` is purely numeric and categorizes it by length.  
  - Returns `"999 Club"`, `"10k Club"`, `"100k Club"`, etc., or `null` if no match.

- **`getNumTagBySegment(digit: number): Tag`**  
  Returns a `Tag` object representing the numeric “club” for a given number length.

### English Word Club

- **`isMIT10K(word: string): boolean`**  
  Checks if a word is in the MIT 10K English word list.

- **`inGwtwc(word: string): boolean`**  
  Checks if a word appears in the GWTWC top 333k list.

- **`isGwtwc100K(word: string): boolean`**  
  Returns `true` if the word is in the top 100,000 of GWTWC.

- **`isGwtwc10K(word: string): boolean`**  
  Returns `true` if the word is in the top 10,000 of GWTWC.

- **`isGwtwc1K(word: string): boolean`**  
  Returns `true` if the word is in the top 1,000 of GWTWC.

### Tagging Functions

- **`getTags(domainName: string): Tag[]`**  
  A comprehensive function that returns an array of `Tag`s for a given domain. It checks:  
  1. **TLD**: Example: `[ { id: 'tld_com', name: '.com TLD', ... } ]`  
  2. **Number Club**: Based on the length of the first label. E.g., `num_3d` → `999 Club`.  
  3. **English Word Club**: If the first label matches GWTWC top ranks (e.g., `ewc_gwtwc_1k`).

- **`getTagOfLangTypeFromLangCode(langCode: string): Tag`**  
  Creates a language tag (e.g., `lang_en`).

- **`getTagOfTldType(tld: string): Tag`**  
  Creates a TLD tag (e.g., `tld_com`).

- **`getTagOfEnglishWordClub(club: string): Tag`**  
  Creates a tag for English word club ranks (e.g., `ewc_gwtwc_10k`).

---

## Testing

This package includes a test suite built with [Jest](https://jestjs.io/). To run the tests:

```bash
npm test
```

or

```bash
yarn test
```

**Examples of tests include**:
- Domain parsing and validation  
- English word classification (MIT10K, GWTWC)  
- Numeric clubs (e.g., `999 Club`, `10k Club`)  
- Tagging system end-to-end tests (`getTags`)

---

## Contributing

Contributions are welcome! If you’d like to propose a feature or report a bug:

1. **Fork** the repository  
2. **Create** a new feature or bug branch  
3. **Open** a Pull Request (PR) describing your changes  

Please ensure all tests pass and code is linted before submitting a PR.

---