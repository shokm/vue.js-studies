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
      message: 'hello!'
    }
})

var app2 = new Vue({
    el: '#app2',
    data: {
      todos: [
        { text: 'ここに結果が表示されます' }
      ]
    }
  })

function button_c() {
    recognition.start();
    app.message = '認識中……'
}

recognition.onresult = function(event) {
    let results = event.results;
    for (let i = event.resultIndex; i<results.length; i++){
        //認識の最終結果
        if(results[i].isFinal){
            app.message = '認識中……';
            let res = results[i][0].transcript;
            app2.todos.push({ text: res })
        }
        //認識の中間結果
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