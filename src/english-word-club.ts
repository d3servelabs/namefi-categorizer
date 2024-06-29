// Read the data/mit10ken.txt
// Each line is an English word. 
// Return an array of all the words in the file.

import * as fs from 'fs';
import path from 'path';
const mit10k_en_us_path = path.resolve(__dirname, './data/mit10k-en-US.txt');

const mit10k_en_us = fs.readFileSync(mit10k_en_us_path, 'utf8').split('\n');
const gwtwc_top_333k = fs.readFileSync(path.resolve(__dirname, './data/gwtwc/count_1w.txt'), 'utf8').split('\n')
    .map((line) => {
        const word = line.split('\t')[0];
        const count = line.split('\t')[1];
        return [word, count];
    });

const gwtwc_count_map = {}; // Google Web Trillion Word Corpus
gwtwc_top_333k.forEach((pair) => {
    gwtwc_count_map[pair[0]] = pair[1];
});

const gwtwc_rank_map = {}; // Google Web Trillion Word Corpus
gwtwc_top_333k.forEach((pair, i) => {
    gwtwc_rank_map[pair[0]] = i;
});

export const isMIT10K = function(segment: string) {
    return mit10k_en_us.includes(segment);
}

export const inGwtwc = function(segment: string) {
    return gwtwc_rank_map[segment] !== undefined;
}

export const isGwtwc100K = function(segment: string) {
    return gwtwc_rank_map[segment] < 100000;
}

export const isGwtwc10K = function(segment: string) {
    return gwtwc_rank_map[segment] < 10000;
}

export const isGwtwc1K = function(segment: string) {
    return gwtwc_rank_map[segment] < 1000;
}

const englishWordDictionary = require(path.resolve(__dirname, './data/words_dictionary.json'));

export const isSingleEnglishWord = function(sld: string) {
    return englishWordDictionary[sld] > 0;
}