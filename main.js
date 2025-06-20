import { GetSpokenText, IsRecognizing } from './module/speech.js';
import { InputTextLength } from './utils/InputTextLength.js';
import { TextStructure } from './utils/textStructure.js';
import { textCombination } from './utils/textCombination.js';

setInterval(() => {
  if (IsRecognizing()) {
    InputTextLength();
    TextStructure();
    textCombination();
  }
}, 30);  // 1초마다 체크
