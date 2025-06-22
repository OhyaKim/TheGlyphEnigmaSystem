import { GetInputText, IsRecognizing, StartRecognition } from './module/speech.js';
import { InputTextLength } from './utils/InputTextLength.js';
import { TextStructure } from './utils/TextStructure.js';
import { textCombination } from './utils/TextCombination.js';
import { ConvertToMorse } from './utils/ConverToMorse.js';
import { ExpansionToBinary } from './utils/ConvertToBinary.js';

setInterval(() => {
    if (!IsRecognizing()) {
        StartRecognition();
    } else{
        GetInputText();
        InputTextLength();
        TextStructure();
        textCombination();
        ConvertToMorse();
        ExpansionToBinary();
    }

}, 30);  // 1초마다 체크
