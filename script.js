// SpeechRecognitionの準備
SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
const recognition = new SpeechRecognition();
// 現在の SpeechRecognition の言語を返して設定します。指定されない場合、これはデフォルトで HTML lang 属性の値になります。どちらも設定されていない場合、ユーザーエージェントの言語設定が使用されます。
recognition.lang = 'ja-JP';
// 各認識の継続的な結果を返すか、単一の認識結果だけを返すかを制御します。デフォルトは単一 (false) です。
recognition.continuous = true;
// SpeechRecognition インターフェイスの interimResults プロパティは interim の結果を返す (true) か返さない (false) か制御します。Interim の結果は最終的ではない結果になります (例えば SpeechRecognitionResult.isFinal プロパティは false となる)。
recognition.interimResults = true;

var app = new Vue({
  el: '#app',
  data: {
    message: 'スタートボタンを押してください。'
  }
})

var app2 = new Vue({
  el: '#app2',
  data: {
    histories: []
  }
})

function startButton() {
    recognition.start();
    app.message = '認識中……'
}

/* 参考: https://kesin.hatenablog.com/entry/2013/08/27/Web%E3%82%A2%E3%83%97%E3%83%AA%E3%81%AB%E9%AB%98%E6%A9%9F%E8%83%BD%E3%81%AA%E9%9F%B3%E5%A3%B0%E8%AA%8D%E8%AD%98%E3%82%92%E8%BF%BD%E5%8A%A0%E3%81%99%E3%82%8BWeb_Speech_API */
recognition.onresult = function(event) {
  let results = event.results;
  for (let i = event.resultIndex; i<results.length; i++) {
      // 認識の最終結果
      if (results[i].isFinal) {
          app.message = '認識中……';
          let res = results[i][0].transcript;
          app2.histories.push({ text: res })
      }
      // 認識の中間結果
      else{
          app.message = results[i][0].transcript;
      }
      
  }
}

recognition.onaudioend = function() {
  app.message = '音声認識は終了しました。';
  recognition.start();
}

recognition.onsoundend = function() {
  console.log('音の検出は終わりました。');
}