let InputText = ''; //텍스트 저장
let recognizing = false; //음성인식 상태
let recognition = null;
let silenceTimer = null; // 무음 타이머

const SILENCE_TIMEOUT = 1000; //1초

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if(!SpeechRecognition){
    console.log("현재 브라우저는 WebSpeech API를 지원하지 않습니다.");
}else{
    recognition = new SpeechRecognition();

    recognition.continuous = true; //계속 음성인식 모드
    recognition.interimResults = true; //중간 결과 받기
    recognition.lang = 'ko-KR' //한국어 인식

    recognition.onstart = () => {
        
        recognizing = true;
        console.log("음성인식 시작");
    }

    recognition.onresult = (e) =>{
        let interim = '';
        for(let i = e.resultIndex; i < e.results.length; i++){
            const transcript = e.results[i][0].transcript;
            interim += transcript;
        }

        InputText = interim.replace(/\s/g, '');
        resetTimer();

        console.clear();
       // console.log("Input Text : " , InputText);
    }

    recognition.error = (event) => {
        console.log("음성 인식 에러 : ", event.error);
    }

    recognition.onend = () => {
        recognition.stop();
        recognizing = false;
        console.log("음성인식 종료");

        recognition.start();
        
    }

}

function resetTimer(){
    if(silenceTimer){
        clearTimeout(silenceTimer);
    }

    silenceTimer = setTimeout(() => {
        InputText = "";
    }, SILENCE_TIMEOUT);
}

export function IsRecognizing(){
    return recognizing;
}

export function GetInputText(){
    return InputText;
}

export function StartRecognition() {
    if(recognition && !recognizing){
        recognition.start();
    }
}