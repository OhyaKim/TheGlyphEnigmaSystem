import { GetSpokenText } from "../module/speech.js";

export function InputTextLength() {  
    const InputText = GetSpokenText();

    const TextLength = InputText.length;
    //.log(TextLength);

    return TextLength;
}

