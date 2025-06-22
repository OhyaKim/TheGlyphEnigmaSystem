import { TextStructure } from "./TextStructure.js";
import { KORMorse } from '../assets/data/KORMorse.js';

export function ConvertToMorse() {
    const TextStructure_Result = TextStructure();
    const InputTextDivision = TextStructure_Result.TextStructure;

    let ConverToMorse = [];

    InputTextDivision.forEach((item, index) => {
        // 초성 + 중성 + 종성
        if (item.Chosung && item.Jungsung && item.Jongsung) {
            ConverToMorse.push({
                Chosung: KORMorse.Consonant[item.Chosung],
                Jungsung: KORMorse.Vowel[item.Jungsung],
                Jongsung: KORMorse.Consonant[item.Jongsung]
            });
        }

        // 초성 + 중성
        else if (item.Chosung && item.Jungsung) {
            ConverToMorse.push({
                Chosung: KORMorse.Consonant[item.Chosung],
                Jungsung: KORMorse.Vowel[item.Jungsung]
            });
        }

        // 단일 초성
        else if (item.Chosung) {
            ConverToMorse.push({
                Chosung: KORMorse.Consonant[item.Chosung]
            });
        }

        // 단일 중성
        else if (item.Jungsung) {
            ConverToMorse.push({
                Jungsung: KORMorse.Vowel[item.Jungsung]
            });
        }
    });


    //console.log(JSON.stringify(ConverToMorse, null, 2));
    

    return ConverToMorse
}
