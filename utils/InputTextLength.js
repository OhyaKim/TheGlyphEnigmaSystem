import { GetInputText } from "../module/speech.js";

let preInputText = "";

export function InputTextLength() {
    const InputText = GetInputText();
    let TextLength = InputText.length;
    

    if (preInputText != InputText) {
        console.log(TextLength+" "+InputText);
        preInputText = InputText;
    }

    
    return TextLength;

}