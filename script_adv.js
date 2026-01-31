/* --- script_adv.js 修正版 --- */

const q2Scenario = {
    "start": {
        face: "q2/face_normal.png",
        text: "お電話ありがとうございます！\nこちらTHE SENSE FUJIです。\n\nいかがなさいましたか？",
        choices: [{ text: "プレゼントの鍵について聞く", next: "key_ask" }]
    },
    "key_ask": {
        face: "q2/face_wow.png",
        text: "プレゼントの鍵についてですね。\n\n…あ！\n今日はゆうじさんのお誕生日お祝いだとお伺いしています！\nおめでとうございます！",
        next: "key_info"
    },
    "key_info": {
        face: "q2/face_smile.png",
        text: "それで、\nプレゼントの鍵についてなんですが",
        next: "key_worried"
    },
    "key_worried": {
        face: "q2/face_worried.png",
        text: "実は当ホテル側からは、\n個人情報保護の観点から\n詳しいことはお伝えしかねます...",
        choices: [{ text: "ヒントだけでも！", next: "hint_ask" }]
    },
    "hint_ask": {
        face: "q2/face_grin.png",
        text: "あ！！\nここだけの話、\n<span class='accent-text'>ホテル従業員専用サイト</span>\nに接続すれば、\nはるかさんとの会話ログ\nが見れるかもしれないです！",
        choices: [{ text: "従業員専用サイトって？", next: "site_ask" }]
    },
    "site_ask": {
        face: "q2/face_worried.png",
        text: "従業員専用サイトは、\n<span class='accent-text'>専用のWifiパスワード</span>\nを使ってVPNに接続すると表示されますよ！\n\nたしか\n<span class='accent-text'>ホテルBalmyのWifiパスワード</span>\nと同じだったはず...\n\n年越しに泊まってましたよね？",
        choices: [{ text: "思い出してみる！", next: "ending" }]
    },
    "ending": {
        face: "q2/face_smile.png",
        text: "頑張って思い出してくださいね！\n\nとりあえず\n従業員専用サイト\nのURLだけ送っておきますね！\n\nプレゼントの鍵が見つかることを祈っております！",
        next: "finish"
    },
    "finish": {
        face: "q2/face_normal.png",
        text: "\n（<span class='accent-text'>BalmyのWiFi</span>ってなんだっけ...？）",
        choices: [{ text: "思い出す", next: "start" }]
    }
};

let currentScene = "start";
let isTyping = false;
let typeTimer = null;
let currentFullText = "";

function startQ2Adventure() {
    currentScene = "start";
    playScene("start");
    // startQ2Timer(); // タイマー関数が必要なら有効にしてね
}

function playScene(sceneKey) {
    if (!q2Scenario[sceneKey]) return;
    
    currentScene = sceneKey;
    const scene = q2Scenario[sceneKey];
    const charImg = document.getElementById('q2-char-img');
    
    // finishシーンの時だけ画像を70%透過にする
    if (sceneKey === "finish") {
        charImg.style.opacity = 0.7;
    } else {
        charImg.style.opacity = 1;
    }
    
    charImg.src = scene.face;

    document.getElementById('q2-choice-layer').classList.add('hidden');
    document.getElementById('q2-next-icon').classList.add('hidden');
    
    typeText(scene.text);
}

function typeText(text) {
    isTyping = true;
    currentFullText = text;
    let i = 0;
    const textBox = document.getElementById('q2-text-box');
    const msgWindow = document.querySelector('.q2-msg-window');
    textBox.innerHTML = ""; 

    if (typeTimer) clearInterval(typeTimer);

    typeTimer = setInterval(() => {
        if (i < text.length) {
            if (text.charAt(i) === "<") {
                let tagEnd = text.indexOf(">", i);
                i = tagEnd + 1;
            }
            textBox.innerHTML = text.substring(0, i + 1);
            i++;
            msgWindow.scrollTop = msgWindow.scrollHeight;
        } else {
            completeTyping();
        }
    }, 50); 
}

function completeTyping() {
    clearInterval(typeTimer);
    isTyping = false;
    // 【重要】ここを innerHTML に書き換え！
    document.getElementById('q2-text-box').innerHTML = currentFullText;
    
    const scene = q2Scenario[currentScene];
    
    if (scene.choices) {
        showChoices(scene.choices);
    } else if (scene.next) {
        document.getElementById('q2-next-icon').classList.remove('hidden');
    }
}

function handleWindowClick() {
    if (isTyping) {
        completeTyping();
    } else {
        const scene = q2Scenario[currentScene];
        if (scene.next && !scene.choices) {
            playScene(scene.next);
        }
    }
}

function showChoices(choices) {
    const layer = document.getElementById('q2-choice-layer');
    layer.innerHTML = "";
    layer.classList.remove('hidden');

    choices.forEach(c => {
        const btn = document.createElement('div');
        btn.className = "q2-choice-btn";
        if (currentScene === "finish") {
            btn.className += " pink-btn";
        }
        btn.innerText = c.text;
        btn.onclick = (e) => {
            e.stopPropagation();
            
            // finishシーンのボタン（思い出す）が押された場合
            if (currentScene === "finish") {
                transitionToQ3();
            } else {
                playScene(c.next);
            }
        };
        layer.appendChild(btn);
    });
}

// Q3画面への遷移
function transitionToQ3() {
    document.getElementById('q2-screen').classList.add('hidden');
    document.getElementById('q3-screen').classList.remove('hidden');
}

function checkQ3Password() {
    const input = document.getElementById('q3-pass-input').value;
    const errorMsg = document.getElementById('q3-error');
    
    // 正解：Balmy16888
    if (input === "Balmy16888") { 
        alert("VPN接続に成功しました！従業員専用データベースにアクセスします...");
        
        // Q3を隠してQ4を出す
        document.getElementById('q3-screen').classList.add('hidden');
        document.getElementById('q4-screen').classList.remove('hidden');
        
        // 【重要！】ここで script_q4.js のリスト作成関数を呼ぶ！
        if (typeof initMailList === 'function') {
            initMailList();
        }
        
    } else {
        errorMsg.classList.remove('hidden');
    }
}