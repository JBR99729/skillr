#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const UNITS_FILE = path.join(ROOT, 'data', 'curriculum-units.json');
const OUTPUT_FILE = path.join(ROOT, 'data', 'curriculum-equivalents.json');

const SOURCES = {
  australia: 'https://www.australiancurriculum.edu.au/',
  victoriaMaths: 'https://f10.vcaa.vic.edu.au/learning-areas/mathematics/curriculum',
  victoriaEnglish: 'https://f10.vcaa.vic.edu.au/learning-areas/english/english/curriculum',
  victoriaScience: 'https://f10.vcaa.vic.edu.au/learning-areas/science/curriculum',
  nswMaths: 'https://curriculum.nsw.edu.au/learning-areas/mathematics/mathematics-k-10-2022/outcomes',
  nswEnglish: 'https://curriculum.nsw.edu.au/learning-areas/english/english-k-10-2022/outcomes',
  nswSciencePrimary: 'https://curriculum.nsw.edu.au/learning-areas/science/science-and-technology-k-6-2024/outcomes',
  nswScienceSecondary: 'https://curriculum.nsw.edu.au/learning-areas/science/science-7-10-2023/outcomes',
  usaMathsEnglish: 'https://corestandards.org/',
  usaScience: 'https://www.nextgenscience.org/standards/standards',
  canada: 'https://www.dcp.edu.gov.on.ca/en/curriculum',
  england: 'https://www.gov.uk/government/collections/national-curriculum',
  india: 'https://ncert.nic.in/textbook.php',
};

const VIC_EXCEPTIONS = {
  AC9M3M06: 'VC2M3N07',
  AC9M10M05: 'VC2M10M04',
  AC9M10SP03: 'VC2M10ASP06',
  AC9E7LE07: 'VC2E7LE06',
  AC9E10LE07: 'VC2E10LE04 + VC2E10LE05',
  AC9E10LE08: 'VC2E10LE06',
};

const VIC_SCIENCE_UNDERSTANDING = {
  AC9SFU01: 'VC2S2U01', AC9SFU02: 'VC2S2U10', AC9SFU03: 'VC2S2U04',
  AC9S1U01: 'VC2S2U02', AC9S1U02: 'VC2S2U07', AC9S1U03: 'VC2S2U11',
  AC9S2U01: 'VC2S2U08', AC9S2U02: 'VC2S2U12', AC9S2U03: 'VC2S2U06',
  AC9S3U01: 'VC2S4U01 + VC2S4U02', AC9S3U02: 'VC2S4U06', AC9S3U03: 'VC2S4U09', AC9S3U04: 'VC2S4U04',
  AC9S4U01: 'VC2S4U03', AC9S4U02: 'VC2S4U07', AC9S4U03: 'VC2S4U10', AC9S4U04: 'VC2S4U05',
  AC9S5U01: 'VC2S6U02', AC9S5U02: 'VC2S6U05', AC9S5U03: 'VC2S6U08', AC9S5U04: 'VC2S6U03',
  AC9S6U01: 'VC2S6U01', AC9S6U02: 'VC2S6U07', AC9S6U03: 'VC2S6U09', AC9S6U04: 'VC2S6U04',
  AC9S7U01: 'VC2S8U01', AC9S7U02: 'VC2S8U04', AC9S7U03: 'VC2S8U12', AC9S7U04: 'VC2S8U14', AC9S7U05: 'VC2S8U05', AC9S7U06: 'VC2S8U06',
  AC9S8U01: 'VC2S8U02', AC9S8U02: 'VC2S8U03', AC9S8U03: 'VC2S8U10', AC9S8U04: 'VC2S8U11', AC9S8U05: 'VC2S8U15', AC9S8U06: 'VC2S8U07', AC9S8U07: 'VC2S8U08',
  AC9S9U01: 'VC2S10U02', AC9S9U02: 'VC2S10U01', AC9S9U03: 'VC2S10U10', AC9S9U04: 'VC2S10U14', AC9S9U05: 'VC2S10U15', AC9S9U06: 'VC2S10U06', AC9S9U07: 'VC2S10U08',
  AC9S10U01: 'VC2S10U04', AC9S10U02: 'VC2S10U05', AC9S10U03: 'VC2S10U13', AC9S10U04: 'VC2S10U11', AC9S10U05: 'VC2S10U17', AC9S10U06: 'VC2S10U07', AC9S10U07: 'VC2S10U09',
};

const VIC_FOUNDATION_SCIENCE = {
  AC9SFH01: 'VC2S2H01',
  AC9SFI01: 'VC2S2I01',
  AC9SFI02: 'VC2S2I02 + VC2S2I03',
  AC9SFI03: 'VC2S2I04',
  AC9SFI04: 'VC2S2I05',
  AC9SFI05: 'VC2S2I06',
};

const NSW_FOUNDATION_MATHS = {
  AC9MFN01: 'MAE-RWN-01 + MAE-RWN-02',
  AC9MFN02: 'MAE-RWN-01',
  AC9MFN03: 'MAE-RWN-01',
  AC9MFN04: 'MAE-CSQ-02',
  AC9MFN05: 'MAE-CSQ-01',
  AC9MFN06: 'MAE-FG-02',
  AC9MFA01: 'MAE-FG-01',
  AC9MFM01: 'MAE-GM-02 + MAE-3DS-02 + MAE-NSM-01 + MAE-NSM-02',
  AC9MFM02: 'MAE-NSM-02',
  AC9MFSP01: 'MAE-2DS-01 + MAE-3DS-01',
  AC9MFSP02: 'MAE-GM-01',
  AC9MFST01: 'MAE-DATA-01',
};

function includesAny(text, terms) {
  return terms.some(term => text.includes(term));
}

function isProbabilityCode(code) {
  return /^AC9M(?:F|\d+)P\d{2}$/.test(code);
}

function nswStage(yearNumber) {
  if (!yearNumber) return 'Early Stage 1';
  if (yearNumber <= 2) return 'Stage 1';
  if (yearNumber <= 4) return 'Stage 2';
  if (yearNumber <= 6) return 'Stage 3';
  if (yearNumber <= 8) return 'Stage 4';
  return 'Stage 5';
}

function victorianScienceBand(yearNumber) {
  if (!yearNumber || yearNumber <= 2) return 2;
  if (yearNumber <= 4) return 4;
  if (yearNumber <= 6) return 6;
  if (yearNumber <= 8) return 8;
  return 10;
}

function victoriaCode(unit) {
  if (VIC_EXCEPTIONS[unit.code]) return VIC_EXCEPTIONS[unit.code];
  if (unit.subjectSlug !== 'science') return `VC2${unit.code.slice(3)}`;
  if (VIC_SCIENCE_UNDERSTANDING[unit.code]) return VIC_SCIENCE_UNDERSTANDING[unit.code];
  if (VIC_FOUNDATION_SCIENCE[unit.code]) return VIC_FOUNDATION_SCIENCE[unit.code];
  const match = unit.code.match(/^AC9S(?:F|\d+)([HI])(\d{2})$/);
  if (!match) throw new Error(`No Victorian Science mapping rule for ${unit.code}`);
  return `VC2S${victorianScienceBand(unit.yearNumber)}${match[1]}${match[2]}`;
}

function nswMathsStage1(unit) {
  const code = unit.code;
  if (/ST01$/.test(code)) return 'MA1-DATA-01';
  if (/ST02$/.test(code)) return 'MA1-DATA-02';
  if (/SP01$/.test(code)) return 'MA1-2DS-01 + MA1-3DS-01';
  if (/SP02$/.test(code)) return 'MA1-GM-01';
  const explicit = {
    AC9M1N01: 'MA1-RWN-01 + MA1-RWN-02', AC9M1N02: 'MA1-RWN-02', AC9M1N03: 'MA1-RWN-01 + MA1-FG-01',
    AC9M1N04: 'MA1-CSQ-01', AC9M1N05: 'MA1-CSQ-01 + MA1-NSM-01', AC9M1N06: 'MA1-FG-01',
    AC9M1A01: 'MA1-RWN-01 + MA1-FG-01', AC9M1A02: 'MA1-FG-01',
    AC9M1M01: 'MA1-GM-02 + MA1-3DS-02 + MA1-NSM-01 + MA1-NSM-02', AC9M1M02: 'MA1-GM-02', AC9M1M03: 'MA1-NSM-02',
    AC9M2N01: 'MA1-RWN-01 + MA1-RWN-02', AC9M2N02: 'MA1-RWN-02', AC9M2N03: 'MA1-GM-03',
    AC9M2N04: 'MA1-CSQ-01', AC9M2N05: 'MA1-FG-01', AC9M2N06: 'MA1-CSQ-01 + MA1-FG-01 + MA1-NSM-01',
    AC9M2A01: 'MA1-CSQ-01', AC9M2A02: 'MA1-CSQ-01', AC9M2A03: 'MA1-FG-01',
    AC9M2M01: 'MA1-GM-02 + MA1-3DS-02 + MA1-NSM-01', AC9M2M02: 'MA1-GM-03 + MA1-2DS-01',
    AC9M2M03: 'MA1-NSM-02', AC9M2M04: 'MA1-NSM-02', AC9M2M05: 'MA1-GM-01',
  };
  return explicit[code] || 'MAO-WM-01';
}

function nswMathsStage2(unit) {
  const d = unit.description.toLowerCase();
  if (isProbabilityCode(unit.code)) return 'MA2-CHAN-01';
  if (/ST/.test(unit.code)) {
    if (includesAny(d, ['collect', 'acquire', 'conduct', 'investigation'])) return 'MA2-DATA-01 + MA2-DATA-02';
    return 'MA2-DATA-02';
  }
  if (/SP/.test(unit.code)) {
    if (includesAny(d, ['grid', 'position', 'location', 'landmark', 'pathway', 'direction'])) return 'MA2-GM-01';
    if (includesAny(d, ['symmetry', 'transform', 'combine', 'composite'])) return 'MA2-2DS-02';
    return includesAny(d, ['object', 'three-dimensional']) ? 'MA2-3DS-01' : 'MA2-2DS-01';
  }
  if (/M\d{2}$/.test(unit.code)) {
    const measures = [d.includes('length'), d.includes('mass'), includesAny(d, ['capacity', 'volume'])].filter(Boolean).length;
    if (measures > 1) return 'MA2-GM-02 + MA2-NSM-01 + MA2-3DS-02';
    if (includesAny(d, ['time', 'duration', 'clock'])) return 'MA2-NSM-02';
    if (/\bangles?\b/.test(d)) return 'MA2-GM-03';
    if (includesAny(d, ['area', 'perimeter'])) return 'MA2-2DS-03 + MA2-GM-02';
    if (d.includes('length')) return 'MA2-GM-02';
    if (d.includes('mass')) return 'MA2-NSM-01';
    if (includesAny(d, ['capacity', 'volume'])) return 'MA2-3DS-02';
    if (includesAny(d, ['dollar', 'cent', 'money'])) return 'MA2-AR-01 + MA2-MR-01';
    return 'MA2-GM-02 + MA2-NSM-01 + MA2-3DS-02';
  }
  if (/A\d{2}$/.test(unit.code)) return includesAny(d, ['multiplication', 'division', 'multiple']) ? 'MA2-MR-01 + MA2-MR-02' : 'MA2-AR-01 + MA2-AR-02';
  if (includesAny(d, ['additive and multiplicative', 'addition and multiplication', 'addition, subtraction, multiplication and division'])) return 'MA2-AR-01 + MA2-MR-01';
  if (/\b(?:multiply|multiplication|divide|division|multiplicative|factors?|multiples?)\b/.test(d)) return 'MA2-MR-01 + MA2-MR-02';
  if (/\b(?:add|addition|subtract|subtraction|additive)\b/.test(d)) return 'MA2-AR-01 + MA2-AR-02';
  if (includesAny(d, ['estimate the quantity', 'algorithm to generate numbers', 'algorithms involving a sequence'])) return 'MA2-RN-01 + MAO-WM-01';
  if (includesAny(d, ['fraction'])) return 'MA2-PF-01';
  if (includesAny(d, ['decimal'])) return 'MA2-RN-02';
  if (includesAny(d, ['place value', 'natural numbers', 'numerals', 'powers of 10', 'odd and even'])) return 'MA2-RN-01';
  return 'MA2-AR-01 + MA2-AR-02';
}

function nswMathsStage3(unit) {
  const d = unit.description.toLowerCase();
  if (isProbabilityCode(unit.code)) return 'MA3-CHAN-01';
  if (/ST/.test(unit.code)) return includesAny(d, ['construct', 'collect', 'acquire', 'conduct', 'investigation']) ? 'MA3-DATA-01 + MA3-DATA-02' : 'MA3-DATA-02';
  if (/SP/.test(unit.code)) {
    if (includesAny(d, ['coordinate', 'location', 'position', 'grid'])) return 'MA3-GM-01';
    if (includesAny(d, ['three-dimensional', 'prism', 'pyramid', 'cross-section', 'object', 'net'])) return 'MA3-3DS-01';
    return 'MA3-2DS-01';
  }
  if (/M\d{2}$/.test(unit.code)) {
    if (includesAny(d, ['time', 'duration'])) return 'MA3-NSM-02';
    if (/\bangles?\b/.test(d)) return 'MA3-GM-03';
    if (includesAny(d, ['area', 'rectangle', 'triangle', 'parallelogram'])) return 'MA3-2DS-02 + MA3-2DS-03';
    if (includesAny(d, ['volume', 'capacity'])) return 'MA3-3DS-02';
    if (d.includes('mass')) return 'MA3-NSM-01';
    return 'MA3-GM-02';
  }
  if (/A\d{2}$/.test(unit.code)) return 'MA3-MR-02';
  if (includesAny(d, ['additive and multiplicative', 'addition and multiplication', 'addition, subtraction, multiplication and division'])) return 'MA3-AR-01 + MA3-MR-01';
  if (includesAny(d, ['percent'])) return 'MA3-RN-03';
  if (includesAny(d, ['factor', 'multiple', 'divisib', 'prime', 'multiplication', 'division'])) return 'MA3-MR-01 + MA3-MR-02';
  if (includesAny(d, ['addition', 'subtraction', 'additive'])) return 'MA3-AR-01';
  if (includesAny(d, ['fraction'])) return 'MA3-RQF-01 + MA3-RQF-02';
  if (includesAny(d, ['decimal'])) return 'MA3-RN-02';
  return 'MA3-RN-01';
}

function nswMathsStage4(unit) {
  const d = unit.description.toLowerCase();
  if (isProbabilityCode(unit.code)) return 'MA4-PRO-C-01';
  if (/ST/.test(unit.code)) return includesAny(d, ['display', 'graphical', 'classif']) ? 'MA4-DAT-C-01' : 'MA4-DAT-C-01 + MA4-DAT-C-02';
  if (/SP/.test(unit.code)) {
    if (includesAny(d, ['coordinate', 'cartesian', 'transformation'])) return 'MA4-LIN-C-01 + MA4-GEO-C-01';
    return 'MA4-GEO-C-01 + MAO-WM-01';
  }
  if (/M\d{2}$/.test(unit.code)) {
    if (includesAny(d, ['pythagoras'])) return 'MA4-PYT-C-01';
    if (includesAny(d, ['volume', 'capacity', 'prism'])) return 'MA4-VOL-C-01';
    if (includesAny(d, ['area', 'parallelogram', 'triangle'])) return 'MA4-ARE-C-01';
    if (includesAny(d, ['circle', 'circumference', 'perimeter'])) return 'MA4-LEN-C-01';
    if (/\bangles?\b/.test(d)) return 'MA4-ANG-C-01';
    if (/\bratios?\b|\brates?\b|\btime zones?\b/.test(d)) return 'MA4-RAT-C-01';
    return 'MAO-WM-01';
  }
  if (/A\d{2}$/.test(unit.code)) {
    if (includesAny(d, ['equation', 'unknown', 'substitution'])) return 'MA4-EQU-C-01 + MA4-LIN-C-01';
    if (includesAny(d, ['graph', 'function', 'cartesian', 'relation'])) return 'MA4-LIN-C-01';
    return 'MA4-ALG-C-01';
  }
  if (includesAny(d, ['integer'])) return 'MA4-INT-C-01';
  if (includesAny(d, ['index', 'exponent', 'square root', 'irrational'])) return 'MA4-IND-C-01';
  if (/\bratios?\b|\brates?\b/.test(d)) return 'MA4-RAT-C-01';
  return 'MA4-FRC-C-01';
}

function nswMathsStage5(unit) {
  const d = unit.description.toLowerCase();
  if (isProbabilityCode(unit.code)) return includesAny(d, ['conditional', 'two-way', 'venn']) ? 'MA5-PRO-P-01' : 'MA5-PRO-C-01';
  if (/ST/.test(unit.code)) {
    if (includesAny(d, ['bivariate', 'scatter', 'two-way', '2 numerical', 'categorical variables'])) return 'MA5-DAT-C-02';
    if (includesAny(d, ['inquiry', 'investigation', 'sampling', 'survey', 'bias', 'media', 'inference'])) return 'MA5-DAT-P-01';
    return 'MA5-DAT-C-01';
  }
  if (/SP/.test(unit.code)) {
    if (d.includes('network')) return 'MA5-NET-P-01';
    if (includesAny(d, ['sine', 'cosine', 'tangent', 'trigonometric'])) return 'MA5-TRG-C-01';
    return 'MA5-GEO-P-02 + MAO-WM-01';
  }
  if (/M\d{2}$/.test(unit.code)) {
    if (includesAny(d, ['trigonometry', 'pythagoras', 'elevation', 'depression', 'bearing'])) return 'MA5-TRG-C-01 + MA5-TRG-C-02';
    if (d.includes('volume') || d.includes('surface area')) return 'MA5-VOL-C-01 + MA5-ARE-C-01';
    if (includesAny(d, ['scientific notation', 'very small', 'very large', 'measurement error', 'errors in measurement', 'accuracy'])) return 'MA5-MAG-C-01';
    if (d.includes('logarithmic')) return 'MA5-LOG-P-01 + MA5-MAG-C-01';
    if (includesAny(d, ['proportion', 'ratio', 'rate', 'scale'])) return 'MA5-RAT-P-01 + MA5-GEO-C-01';
    return 'MAO-WM-01';
  }
  if (/A\d{2}$/.test(unit.code)) {
    if (includesAny(d, ['simultaneous', 'inequalit'])) return 'MA5-EQU-P-02 + MA5-FNC-P-01';
    if (includesAny(d, ['quadratic equation', 'solve quadratic'])) return 'MA5-EQU-P-02 + MA5-NLI-C-01';
    if (includesAny(d, ['simplify algebraic', 'expand', 'factorise'])) return includesAny(d, ['exponent', 'index']) ? 'MA5-ALG-C-01 + MA5-ALG-P-01 + MA5-IND-C-01' : 'MA5-ALG-C-01 + MA5-ALG-P-01';
    if (includesAny(d, ['quadratic', 'exponential', 'growth', 'decay', 'non-linear'])) return 'MA5-NLI-C-01 + MA5-NLI-C-02';
    if (includesAny(d, ['gradient', 'midpoint', 'linear', 'line segment'])) return 'MA5-LIN-C-01 + MA5-LIN-C-02';
    if (includesAny(d, ['function', 'relation', 'parameter'])) return 'MA5-FNC-P-01 + MA5-NLI-P-01';
    if (includesAny(d, ['exponent', 'index'])) return 'MA5-IND-C-01 + MA5-IND-P-01';
    return 'MA5-ALG-C-01 + MA5-ALG-P-01';
  }
  if (includesAny(d, ['real number', 'irrational', 'exact representation'])) return 'MA5-IND-P-02 + MA5-MAG-C-01';
  return 'MA5-MAG-C-01';
}

function nswMaths(unit) {
  if (NSW_FOUNDATION_MATHS[unit.code]) return NSW_FOUNDATION_MATHS[unit.code];
  const stage = nswStage(unit.yearNumber);
  if (stage === 'Stage 1') return nswMathsStage1(unit);
  if (stage === 'Stage 2') return nswMathsStage2(unit);
  if (stage === 'Stage 3') return nswMathsStage3(unit);
  if (stage === 'Stage 4') return nswMathsStage4(unit);
  if (stage === 'Stage 5') return nswMathsStage5(unit);
  throw new Error(`No NSW Mathematics mapping rule for ${unit.code}`);
}

function nswEnglish(unit) {
  const stage = nswStage(unit.yearNumber);
  const stagePrefix = stage === 'Early Stage 1' ? 'ENE' : stage.replace('Stage ', 'EN');
  const d = unit.description.toLowerCase();
  if (stage === 'Stage 4' || stage === 'Stage 5') {
    if (/^(?:plan|create and edit|craft|write and create)/.test(d) || /\b(?:edit|revise|publish)\b/.test(d)) return `${stagePrefix}-ECB-01 + ${stagePrefix}-ECA-01`;
    if (/^(?:create|deliver|listen|use interaction)/.test(d) || /\bspoken (?:text|presentation)/.test(d)) return `${stagePrefix}-ECA-01`;
    if (includesAny(d, ['comprehension', 'read', 'view', 'listen'])) return `${stagePrefix}-RVL-01 + ${stagePrefix}-URA-01`;
    if (includesAny(d, ['represent', 'perspective', 'context', 'values', 'attitudes', 'identit'])) return `${stagePrefix}-URB-01`;
    if (includesAny(d, ['literary', 'literature', 'aesthetic', 'intertext', 'interpretation', 'opinion about'])) return `${stagePrefix}-URC-01 + ${stagePrefix}-URA-01`;
    return `${stagePrefix}-URA-01`;
  }
  const socialLanguageCodes = new Set(['AC9EFLA01', 'AC9EFLA02', 'AC9E1LA01', 'AC9E1LA02', 'AC9E2LA01', 'AC9E3LA01', 'AC9E4LA01', 'AC9E5LA01', 'AC9E6LA01']);
  if (socialLanguageCodes.has(unit.code)) return `${stagePrefix}-OLC-01`;
  if (/\bpunctuation\b|\bapostrophes?\b|\bcommas?\b|\bcapital letters?\b/.test(d)) return stage === 'Stage 2' ? 'EN2-CWT-01 + EN2-CWT-02 + EN2-CWT-03' : `${stagePrefix}-CWT-01`;
  if (/\bhandwriting\b|\bjoined letters?\b|\bunjoined (?:upper-case and lower-case )?letters?\b|\bletter formations?\b|\bdigital transcription\b/.test(d)) return `${stagePrefix}-HANDW-01`;
  if (unit.code.includes('LE')) return stage === 'Stage 3' ? 'EN3-UARL-01 + EN3-UARL-02' : `${stagePrefix}-UARL-01`;
  if (/\bletters?.{0,100}\bsounds?\b|\bsounds?.{0,100}\bletters?\b/.test(d)) return stage === 'Stage 2' || stage === 'Stage 3' ? `${stagePrefix}-SPELL-01 + ${stagePrefix}-RECOM-01` : `${stagePrefix}-PHOKW-01`;
  if (/^(?:plan|create|write)\b/.test(d) && !/^write words? (?:legibly|using joined|using unjoined)/.test(d)) {
    if (/\b(?:spoken|oral|presentation)\b/.test(d)) return `${stagePrefix}-OLC-01`;
    if (stage === 'Stage 2') {
      if (includesAny(d, ['imaginative']) && includesAny(d, ['informative']) && includesAny(d, ['persuasive'])) return 'EN2-CWT-01 + EN2-CWT-02 + EN2-CWT-03';
      if (d.includes('persuasive')) return 'EN2-CWT-03';
      if (includesAny(d, ['informative', 'explain', 'report'])) return 'EN2-CWT-02';
      if (includesAny(d, ['imaginative', 'narrative'])) return 'EN2-CWT-01';
      return 'EN2-CWT-01 + EN2-CWT-02 + EN2-CWT-03';
    }
    return `${stagePrefix}-CWT-01`;
  }
  if (/\b(?:spell|spelling|morpholog|orthograph|prefix|suffix|word famil)/.test(d)) return `${stagePrefix}-SPELL-01`;
  if (/\b(?:phonological|phonemes?|syllables?|onset|rime|blend|blending|segment|segmenting)\b/.test(d)) return stage === 'Early Stage 1' ? 'ENE-PHOAW-01' : stage === 'Stage 1' ? 'EN1-PHOKW-01' : `${stagePrefix}-SPELL-01 + ${stagePrefix}-RECOM-01`;
  if (/\b(?:phonic|grapheme|decode|encode)\w*\b|\bletters? and sounds?\b|\bsound-letter/.test(d)) return stage === 'Stage 2' || stage === 'Stage 3' ? `${stagePrefix}-SPELL-01 + ${stagePrefix}-RECOM-01` : `${stagePrefix}-PHOKW-01`;
  if (includesAny(d, ['fluency', 'read aloud', 'automaticity', 'prosody'])) return `${stagePrefix}-REFLU-01`;
  if (includesAny(d, ['vocabulary', 'word knowledge', 'technical words', 'tier 2', 'tier 3'])) return `${stagePrefix}-VOCAB-01`;
  if (includesAny(d, ['interaction', 'oral', 'spoken', 'listen', 'discussion', 'conversation', 'presentation'])) return `${stagePrefix}-OLC-01`;
  if (includesAny(d, ['literary', 'literature', 'character', 'setting', 'poetry', 'author', 'aesthetic'])) return stage === 'Stage 3' ? 'EN3-UARL-01 + EN3-UARL-02' : `${stagePrefix}-UARL-01`;
  if (includesAny(d, ['create', 'write', 'edit', 'publish', 'sentence'])) {
    if (stage === 'Stage 2') {
      if (d.includes('persuasive')) return 'EN2-CWT-03';
      if (includesAny(d, ['informative', 'explain', 'report'])) return 'EN2-CWT-02';
      if (includesAny(d, ['imaginative', 'narrative'])) return 'EN2-CWT-01';
      return 'EN2-CWT-01 + EN2-CWT-02 + EN2-CWT-03';
    }
    return `${stagePrefix}-CWT-01`;
  }
  return `${stagePrefix}-RECOM-01`;
}

function nswScience(unit) {
  const stage = nswStage(unit.yearNumber);
  const code = unit.code;
  if (stage === 'Early Stage 1') {
    if (code.includes('U') || code.includes('H')) return 'STE-SCI-01';
    return code.endsWith('I03') || code.endsWith('I04') || code.endsWith('I05') ? 'STE-PQU-01 + STE-SCI-01' : 'STE-PQU-01';
  }
  if (stage === 'Stage 1' || stage === 'Stage 2' || stage === 'Stage 3') {
    const prefix = `ST${stage.slice(-1)}`;
    if (code.includes('U') || code.includes('H')) return `${prefix}-SCI-01`;
    if (code.endsWith('I01') || code.endsWith('I02')) return `${prefix}-PQU-01`;
    if (code.endsWith('I06') && stage === 'Stage 3') return 'ST3-CWT-01 + ST3-DAT-01';
    return `${prefix}-DAT-01 + ${prefix}-PQU-01`;
  }
  const prefix = stage === 'Stage 4' ? 'SC4' : 'SC5';
  const d = unit.description.toLowerCase();
  const inquiry = code.match(/I(\d{2})$/)?.[1];
  if (inquiry) {
    const map = { '01': 'WS-02', '02': 'WS-03 + WS-04', '03': 'WS-01 + WS-04', '04': 'WS-05', '05': 'WS-06', '06': 'WS-06', '07': stage === 'Stage 5' ? 'DA2-01 + WS-06' : 'DA1-01 + WS-06', '08': 'WS-08' };
    return map[inquiry].split(' + ').map(outcome => `${prefix}-${outcome}`).join(' + ');
  }
  if (code.includes('H')) return stage === 'Stage 5' ? 'SC5-DA2-01' : 'SC4-DA1-01';
  if (stage === 'Stage 4') {
    if (includesAny(d, ['cell', 'classification', 'organism'])) return 'SC4-CLS-01 + SC4-LIV-01';
    if (includesAny(d, ['ecosystem', 'food web', 'living system'])) return 'SC4-LIV-01';
    if (includesAny(d, ['earth', 'sun', 'moon', 'universe', 'eclipse', 'season', 'tide'])) return 'SC4-OTU-01';
    if (includesAny(d, ['force', 'motion'])) return 'SC4-FOR-01';
    if (includesAny(d, ['mixture', 'separate', 'pure substance'])) return 'SC4-SOL-01';
    if (includesAny(d, ['element', 'compound', 'particle', 'matter'])) return 'SC4-PRT-01';
    return 'SC4-CHG-01';
  }
  if (includesAny(d, ['big bang', 'universe'])) return 'SC4-OTU-01 (supporting prior-stage alignment)';
  if (includesAny(d, ['dna', 'gene', 'heredity', 'meiosis', 'mitosis', 'reproduction'])) return 'SC5-GEV-02';
  if (includesAny(d, ['evolution', 'natural selection', 'diversity'])) return 'SC5-GEV-01';
  if (includesAny(d, ['disease', 'body system', 'homeostasis'])) return 'SC5-DIS-01';
  if (includesAny(d, ['climate', 'carbon cycle', 'environment', 'human activity'])) return 'SC5-ENV-01';
  if (includesAny(d, ['newton', 'force', 'acceleration', 'motion'])) return 'SC5-WAM-02';
  if (includesAny(d, ['wave', 'energy transfer'])) return 'SC5-WAM-01';
  if (includesAny(d, ['energy use', 'energy efficiency'])) return 'SC5-EGY-01';
  if (includesAny(d, ['reaction rate'])) return 'SC5-RXN-02';
  if (includesAny(d, ['reaction', 'synthesis', 'decomposition', 'displacement'])) return 'SC5-RXN-01';
  if (includesAny(d, ['atom', 'periodic table', 'material'])) return 'SC5-MAT-01';
  return 'SC5-DA2-01';
}

function nswCode(unit) {
  if (unit.subjectSlug === 'maths') return nswMaths(unit);
  if (unit.subjectSlug === 'english') return nswEnglish(unit);
  return nswScience(unit);
}

function international(unit) {
  const foundation = !unit.yearNumber;
  const grade = foundation ? 'Kindergarten' : `Grade ${unit.yearNumber}`;
  const usaLevel = unit.subjectSlug === 'science'
    ? foundation ? 'Kindergarten' : unit.yearNumber <= 5 ? grade : unit.yearNumber <= 8 ? 'Middle School (Grades 6–8)' : 'High School (Grades 9–12)'
    : unit.yearNumber && unit.yearNumber >= 9 ? 'Grades 9–10 band' : grade;
  const englandYear = foundation ? 1 : unit.yearNumber + 1;
  const englandStage = englandYear <= 2 ? 'Key Stage 1' : englandYear <= 6 ? 'Key Stage 2' : englandYear <= 9 ? 'Key Stage 3' : 'Key Stage 4';
  const indiaLevel = foundation ? 'Foundational Stage / Balvatika 3' : `Class ${unit.yearNumber}`;
  return {
    usa: {
      framework: unit.subjectSlug === 'science' ? 'Next Generation Science Standards (NGSS)' : unit.subjectSlug === 'maths' ? 'Common Core State Standards for Mathematics' : 'Common Core State Standards for English Language Arts',
      level: usaLevel,
      url: unit.subjectSlug === 'science' ? SOURCES.usaScience : SOURCES.usaMathsEnglish,
    },
    canada: {
      framework: `Ontario Curriculum — ${unit.subject}`,
      level: grade,
      url: SOURCES.canada,
    },
    england: {
      framework: `National Curriculum in England — ${unit.subject}`,
      level: `Year ${englandYear}, ${englandStage}`,
      url: SOURCES.england,
    },
    india: {
      framework: `NCERT / CBSE — ${unit.subject}`,
      level: indiaLevel,
      url: SOURCES.india,
    },
  };
}

function victoriaLevel(unit) {
  if (unit.subjectSlug === 'science') {
    const band = victorianScienceBand(unit.yearNumber);
    return band === 2 ? 'Foundation–Level 2' : `Levels ${band - 1}–${band}`;
  }
  return unit.yearNumber ? `Level ${unit.yearNumber}` : 'Foundation';
}

function sourceForVictoria(subject) {
  return subject === 'maths' ? SOURCES.victoriaMaths : subject === 'english' ? SOURCES.victoriaEnglish : SOURCES.victoriaScience;
}

function sourceForNsw(unit) {
  if (unit.subjectSlug === 'maths') return SOURCES.nswMaths;
  if (unit.subjectSlug === 'english') return SOURCES.nswEnglish;
  return unit.yearNumber && unit.yearNumber >= 7 ? SOURCES.nswScienceSecondary : SOURCES.nswSciencePrimary;
}

const source = JSON.parse(fs.readFileSync(UNITS_FILE, 'utf8'));
const mappings = {};

for (const unit of source.units) {
  const regions = international(unit);
  mappings[unit.code] = {
    code: unit.code,
    subject: unit.subject,
    year: unit.levelLabel,
    title: unit.title,
    skill: unit.description,
    url: unit.url,
    australia: { framework: 'Australian Curriculum v9.0', code: unit.code, level: unit.levelLabel, url: SOURCES.australia },
    victoria: { framework: `Victorian Curriculum F–10 Version 2.0 — ${unit.subject}`, code: victoriaCode(unit), level: victoriaLevel(unit), relationship: 'matching or closely related content', url: sourceForVictoria(unit.subjectSlug) },
    nsw: { framework: unit.subjectSlug === 'maths' ? 'NSW Mathematics K–10 Syllabus (2022)' : unit.subjectSlug === 'english' ? 'NSW English K–10 Syllabus (2022)' : unit.yearNumber && unit.yearNumber >= 7 ? 'NSW Science 7–10 Syllabus (2023)' : 'NSW Science and Technology K–6 Syllabus (2024)', code: nswCode(unit), level: nswStage(unit.yearNumber), relationship: 'closest outcome alignment', url: sourceForNsw(unit) },
    ...regions,
  };
}

if (Object.keys(mappings).length !== source.units.length) throw new Error('Mapping output count does not match curriculum inventory.');
for (const [code, mapping] of Object.entries(mappings)) {
  for (const key of ['victoria', 'nsw', 'usa', 'canada', 'england', 'india']) {
    if (!mapping[key]?.level || !mapping[key]?.framework || !mapping[key]?.url) throw new Error(`${code}: incomplete ${key} mapping`);
  }
  if (!mapping.victoria.code || !mapping.nsw.code) throw new Error(`${code}: missing Australian state code mapping`);
}

fs.writeFileSync(OUTPUT_FILE, `${JSON.stringify({ generatedBy: 'scripts/build_curriculum_equivalents.mjs', convention: 'International entries are matching or closely related planning references, not claims that curricula are identical.', sources: SOURCES, mappings }, null, 2)}\n`);
console.log(`Wrote ${Object.keys(mappings).length} curriculum equivalence records to ${path.relative(ROOT, OUTPUT_FILE)}.`);
