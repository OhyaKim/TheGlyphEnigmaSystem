import { TextStructure } from './textStructure.js';

const vowelGroupCheck = {
    'Horizontal': ["ㅏ", "ㅑ", "ㅓ", "ㅕ", "ㅣ", "ㅐ", "ㅒ", "ㅔ", "ㅖ"],
    'Vertical': ["ㅗ", "ㅛ", "ㅜ", "ㅠ", "ㅡ"],
    'Mix': ["ㅘ", "ㅙ", "ㅚ", "ㅝ", "ㅞ", "ㅟ", "ㅢ"],
};

const TextCombi = {
    'case00': "빈칸",
    'case01-1': "초성",
    'case01-2': "중성",
    'case02-1': "초성+중성 (가로)",
    'case02-2': "초성+중성 (세로)",
    'case02-3': "초성+중성 (혼합)",
    'case03_1': "초성+중성+종성 (가로)",
    'case03_2': "초성+중성+종성 (세로)",
    'case03_3': "초성+중성+종성 (혼합)",
};

export function textCombination() {
    const TextStructureResult = TextStructure();
    const InputTextDivision = TextStructureResult.TextStructure;

    let Combination = [];

    InputTextDivision.forEach((item, index) => {
        if (item.Blank) {
            Combination.push({ index, Combination: TextCombi.case00 });

        } else if (item.Chosung && item.Jungsung && item.Jongsung) {
            if (vowelGroupCheck.Horizontal.includes(item.Jungsung)) {
                Combination.push({ index, Combination: TextCombi['case03_1'] });
            } else if (vowelGroupCheck.Vertical.includes(item.Jungsung)) {
                Combination.push({ index, Combination: TextCombi['case03_2'] });
            } else if (vowelGroupCheck.Mix.includes(item.Jungsung)) {
                Combination.push({ index, Combination: TextCombi['case03_3'] });
            }

        } else if (item.Chosung && item.Jungsung) {
            if (vowelGroupCheck.Horizontal.includes(item.Jungsung)) {
                Combination.push({ index, Combination: TextCombi["case02-1"] });
            } else if (vowelGroupCheck.Vertical.includes(item.Jungsung)) {
                Combination.push({ index, Combination: TextCombi["case02-2"] });
            } else if (vowelGroupCheck.Mix.includes(item.Jungsung)) {
                Combination.push({ index, Combination: TextCombi["case02-3"] });
            }

        } else if (item.Chosung) {
            Combination.push({ index, Combination: TextCombi['case01-1'] });
        } else if (item.Jungsung) {
            Combination.push({ index, Combination: TextCombi['case01-2'] });
        } else {
            Combination.push({ index, Combination: "알 수 없음" });
        }
    });

    //console.log(JSON.stringify(Combination, null, 2));

    return Combination
}
