//사용자가 입력한 텍스트의 글자마다 초성 중성, 종성 분리 및 단일 자모 or 완성형 판별
import { GetInputText } from "../module/speech.js";

const CHOSUNG_LIST = [
    "ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ",
    "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ",
    "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ",
    "ㅋ", "ㅌ", "ㅍ", "ㅎ"
];


const JUNGSUNG_LIST = [
    "ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ",
    "ㅕ", "ㅖ", "ㅗ", "ㅘ", "ㅙ", "ㅚ",
    "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ",
    "ㅡ", "ㅢ", "ㅣ"
];


const JONGSUNG_LIST = [
    "", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ",
    "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ",
    "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ",
    "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"
];

export function TextStructure() {
    let InputText = GetInputText();
    let texts = InputText.split('');

    let KoreanType = ""; //한글타입 (자모 단일 , 완성형)
    let TextStructure = [];


    texts.forEach(element => {
        const KOR_CODE_START = 0xAC00; // 44032
        const KOR_CODE_END = 0xD7A3;   // 55203
        const charCode = element.charCodeAt(0);

        // 완성형 한글
        if (charCode >= KOR_CODE_START && charCode <= KOR_CODE_END) {
            KoreanType = "Completion";

            const codeIndex = charCode - KOR_CODE_START;
            const CHOSUNG_INDEX = Math.floor(codeIndex / 588);
            const JUNGSUNG_INDEX = Math.floor((codeIndex % 588) / 28);
            const JONGSUNG_INDEX = codeIndex % 28;

            const result = {
                Chosung: CHOSUNG_LIST[CHOSUNG_INDEX],
                Jungsung: JUNGSUNG_LIST[JUNGSUNG_INDEX],
            };

            if (JONGSUNG_INDEX !== 0) {
                result.Jongsung = JONGSUNG_LIST[JONGSUNG_INDEX];
            }

            TextStructure.push(result);
        }

        // 자모 단일 문자
        else if (CHOSUNG_LIST.includes(element)) {
            KoreanType = "SINGLE";
            TextStructure.push({ Chosung: element });
        }
        else if (JUNGSUNG_LIST.includes(element)) {
            KoreanType = "SINGLE";
            TextStructure.push({ Jungsung: element });
        }
    });



   //console.log(JSON.stringify(TextStructure));


    return {
    TextStructure: TextStructure,  // 구조분해 대상
    KoreanType: KoreanType         // 조합 유형
};
}
