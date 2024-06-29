import { 
    isGwtwc100K, 
    isGwtwc10K, 
    isGwtwc1K, 
    isMIT10K } from "./english-word-club";

describe('Word Lists', () => {
    test.each([
        'alpha', 'be', 'cat', 'david', 'engage', 'friend',
        'gate', 'hello', 'in', 'join',
        'karma', 'long', 'merry', 'number', 'opera', 
        'paper', 'quit', 'rest', 'star', 'ten',
        'usual', 'victory', 'win', 'xbox', 'yes', 'zoo'
    ] as const) ('MIT10K should include "%s"', (word) => {
        expect(isMIT10K(word)).toBeTruthy();
    });

    test.each([
        'alpha', 'be', 'cat', 'david', 'engage', 'friend',
        'gate', 'hello', 'in', 'join',
        'karma', 'long', 'merry', 'number', 'opera', 
        'paper', 'quit', 'rest', 'star', 'ten',
        'usual', 'victory', 'win', 'xbox', 'yes', 'zoo'
    ] as const) ('Gwtwc100K should include "%s"', (word) => {
        expect(isGwtwc100K(word)).toBeTruthy();
    });

    test.each([
        'alpha', 'be', 'cat', 'david', 'engage', 'friend',
        'gate', 'hello', 'in', 'join',
        'karma', 'long', 'merry', 'number', 'opera', 
        'paper', 'quit', 'rest', 'star', 'ten',
        'usual', 'victory', 'win', 'xbox', 'yes', 'zoo'
    ] as const) ('Gwtwc10K should include "%s"', (word) => {
        expect(isGwtwc10K(word)).toBeTruthy();
    });

});

describe('Gwtwc1K', () => {
    test.each([
        'be', 'four'
    ] as const) ('Gwtwc1K should include "%s"', (word) => {
        expect(isGwtwc1K(word)).toBeTruthy();
    });
});

describe('isSingleEnglishWord', () => {
    test.each([
        'be', 'four'
    ] as const) ('isSingleEnglishWord should include "%s"', (word) => {
        expect(isGwtwc1K(word)).toBeTruthy();
    });
});