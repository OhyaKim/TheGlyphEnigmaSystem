let latestTranscript = '';  // 말한 텍스트 저장용 변수
let recognizing = false;    // 음성 인식 상태 변수
let manualStop = false;     // 사용자가 직접 중지했는지 플래그

const startBtn = document.getElementById('speak');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!SpeechRecognition) {
    console.log("현재 브라우저는 Web Speech API를 지원하지 않습니다.");
} else {
    const recognition = new SpeechRecognition();
    recognition.continuous = true;     // 계속 인식 모드
    recognition.interimResults = true; // 중간 결과도 받음
    recognition.lang = 'ko-KR';

    recognition.onstart = () => {
        recognizing = true;
        manualStop = false;            // 인식 시작하면 수동 중지 초기화
        console.log('음성 인식 시작');
        startBtn.style.backgroundImage = 'url("./assets/img/btn_on.png")';  
      };

    recognition.onresult = (e) => {
        let interim = '', final = '';
        for (let i = e.resultIndex; i < e.results.length; i++) {
            const transcript = e.results[i][0].transcript;
            if (e.results[i].isFinal) {
                final += transcript + ' ';
            } else {
                interim += transcript;
            }
        }
        latestTranscript = final.trim() || interim.trim();

        console.clear();
        console.log('중간:', interim);
        console.log('최종:', final);
    };

    recognition.onerror = (event) => {
        console.error('음성 인식 에러:', event.error);
    };

    recognition.onend = () => {
        recognizing = false;
        console.log('음성 인식 종료');
        startBtn.style.backgroundImage = 'url("./assets/img/btn_off.png")';  

        if (!manualStop) {
            // 사용자가 중지 누른 게 아니면 자동 재시작
            recognition.start();
        }
    };

    startBtn.addEventListener('click', () => {
        if (recognizing) {
            manualStop = true;    // 수동 중지 표시
            recognition.stop();
        } else {
            recognition.start();
        }
    });
}

// 현재 말하고 있는 상태 반환 (boolean)
export function IsRecognizing() {
    return recognizing;
}

// 최신 음성 텍스트 반환 (중간 or 최종)
export function GetSpokenText() {
    return latestTranscript;
}
