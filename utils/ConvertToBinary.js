import { ConvertToMorse } from "./ConverToMorse.js";


//2진수 8비트로 확장
export function ExpansionToBinary() {
    const binaryData = hashMorseCode();

    // 8비트로 확장하는 함수
    function expandTo8Bits(arr) {
        const length = arr.length;
        if (length === 8) return arr;
        if (length > 8) return arr.slice(0, 8);

        const result = [];
        let idx = 0;
        while (result.length < 8) {
            result.push(arr[idx]);
            idx = (idx + 1) % length;  // 배열 순환
        }
        return result;
    }

    // 확장된 결과 저장
    const expandedResult = binaryData.map(item => {
        const expandedItem = {};

        Object.entries(item).forEach(([key, value]) => {
            // Blank는 숫자일 수도 있으니, 배열이 아닐 경우 처리
            if (Array.isArray(value)) {
                expandedItem[key] = expandTo8Bits(value);
            } else {
                expandedItem[key] = value;  // Blank 같은 경우는 그대로 둠
            }
        });

        return expandedItem;
    });

    //console.log(JSON.stringify(expandedResult, null, 2));
    return expandedResult;
}


//모스부호 2진수로 변환
function hashMorseCode() {
    const morseData = ConvertToMorse();
    const binaryResult = [];

    morseData.forEach((item) => {
        // 공백 처리
        if (item.Blank) {
            const lastItem = binaryResult[binaryResult.length - 1];
            const lastKey = Object.keys(lastItem).pop();
            const lastValue = lastItem[lastKey];

            binaryResult.push({ Blank: lastValue });
            return;
        }

        // 초성, 중성, 종성 모두 있을 때
        if (item.Chosung && item.Jungsung && item.Jongsung) {
            binaryResult.push({
                Chosung: morseToBinary(item.Chosung),
                Jungsung: morseToBinary(item.Jungsung),
                Jongsung: morseToBinary(item.Jongsung),
            });
            return;
        }

        // 초성 + 중성만 있을 때
        if (item.Chosung && item.Jungsung) {
            binaryResult.push({
                Chosung: morseToBinary(item.Chosung),
                Jungsung: morseToBinary(item.Jungsung),
            });
            return;
        }

        // 단일 초성
        if (item.Chosung) {
            binaryResult.push({
                Chosung: morseToBinary(item.Chosung),
            });
            return;
        }

        // 단일 중성
        if (item.Jungsung) {
            binaryResult.push({
                Jungsung: morseToBinary(item.Jungsung),
            });
        }
    });

    return binaryResult;
}

// 모스 부호를 이진 배열로 변환 ('.' → 0, '-' → 1)
function morseToBinary(morseStr) {
    return morseStr.split('').map(symbol => symbol === '.' ? 0 : 1);
}
