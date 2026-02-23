// 本番 / デバッグ振り分け（URLに ?debug があればデバッグモード）
function init() {
    const isDebug = new URLSearchParams(window.location.search).has('debug');
    if (isDebug) {
        debugManager();
    } else {
        startLoading();
    }
}

// 1. ページが読み込まれたらまずこれを実行
function startLoading() {
    const loader = document.getElementById('loading-screen');
    const topScreen = document.getElementById('screen-top');

    // 5秒待ってからフェードアウト開始
    setTimeout(() => {
        loader.style.opacity = '0'; // CSSのtransitionでふわっと消える
        
        // フェードアウト(1秒)が終わるのを待ってから完全に消す
        setTimeout(() => {
            loader.style.display = 'none';
            
            // 2. ここで本来の「screen-top」を表示させる処理を呼ぶ！
            // もし元々の script.js に startAnimation という関数があるならそれを実行
            if (typeof startAnimation === "function") {
                // startAnimation()の中で screen-top の .hidden を外す処理が入ってるか確認してね！
                startAnimation(); 
            } else {
                // もし関数がない場合は、力技で screen-top を表示させる
                topScreen.classList.remove('hidden');
            }
        }, 1000); 
    }, 5000);
}

// ページ読み込み時のふわっとアニメーション
function startAnimation() {
    // 1. まず screen-top の hidden を外して見えるようにする！
    const topScreen = document.getElementById('screen-top');
    topScreen.classList.remove('hidden');
    topScreen.style.display = 'flex'; // .container { display: flex } に合わせる

    // 2. その後、中のアイテムをふわっと出す
    setTimeout(() => {
        document.querySelectorAll('.float-item').forEach(el => {
            el.classList.add('appear');
        });
    }, 100);

    // BGM: birthdayreggae（TOP画面から Q2開始まで）
    window.birthdayBgm = new Audio('bgm/birthdayreggae.mp3');
    window.birthdayBgm.loop = true;
    window.birthdayBgm.play().catch(() => {
        // モバイルのAutoplay制限対策：初回タッチで再生
        const resume = () => {
            window.birthdayBgm.play().catch(() => {});
        };
        document.addEventListener('touchstart', resume, { once: true });
        document.addEventListener('click', resume, { once: true });
    });
}

// 【修正版】トップからQ1へ
function goToQuest() {
    // start-btn クリック時の効果音
    new Audio('bgm/pi.mp3').play().catch(() => {});

    // umamusume をQ1表示タイミングでプリロード
    if (!window.umaBgm) {
        window.umaBgm = new Audio('bgm/umamusume.mp3');
        window.umaBgm.loop = true;
    }

    const layer = document.getElementById('transition-layer');
    layer.style.display = 'block'; // 幕を表示
    layer.classList.add('active');

    setTimeout(() => {
        // トップ画面を非表示にする
        document.getElementById('screen-top').style.display = 'none';
        
        // Q1画面を表示し、activeクラスをつけて操作可能にする
        const q1 = document.getElementById('q1-screen');
        q1.classList.remove('hidden');
        q1.style.display = 'block';
        q1.classList.add('active');
        
        layer.classList.remove('active');
        setTimeout(() => { layer.style.display = 'none'; }, 800);
    }, 800);
}

function checkAnswer() {
    new Audio('bgm/phonecall.mp3').play().catch(() => {});

    const phone = document.querySelector('.q1-phone');
    const userAnswer = document.getElementById('ans1').value.trim();
    const correctAnswer = "0120227774";

    phone.style.animation = 'none';
    phone.offsetHeight; 
    phone.style.animation = 'phone-shake-real 0.5s 1'; 

    setTimeout(() => {
        if (userAnswer === correctAnswer) {
            // --- ここから Q2 への遷移処理 ---
            const layer = document.getElementById('transition-layer');
            layer.style.display = 'block';
            layer.classList.add('active');

            setTimeout(() => {
                // Q1 を非表示にする
                const q1 = document.getElementById('q1-screen');
                q1.classList.remove('active');
                q1.style.display = 'none';

                // Q2 を表示して、アドベンチャーパートを開始する
                const q2 = document.getElementById('q2-screen');
                q2.classList.remove('hidden');
                q2.style.display = 'block';
                q2.classList.add('active');

                // script_adv.js の関数を呼び出す（後で追加するよ！）
                startQ2Adventure(); 

                layer.classList.remove('active');
                setTimeout(() => { layer.style.display = 'none'; }, 800);
            }, 800);
            // --------------------------------
        } else {
            alert("番号が違うみたい。");
            phone.style.animation = 'phone-shake-real 3s infinite';
        }
    }, 500);
}

// script.js の一番下とかに追加

function startHackerLoading(callback) {
    const hackerScreen = document.getElementById('hacker-loading');
    const consoleBox = document.getElementById('hacker-console');
    const bar = document.getElementById('hacker-bar');
    
    // body背景を黒に
    document.body.style.background = '#000';

    // 表示させる
    hackerScreen.classList.remove('hidden');
    hackerScreen.style.display = 'flex';

    // ログの内容（テック感を出す！）
    const logs = [
        "> INITIALIZING EXPLOIT...",
        "> SCANNING FOR OPEN PORTS...",
        "> BYPASSING VPN FIREWALL...",
        "> ACCESS GRANTED: staff-tokaiteio",
        "> FETCHING ENCRYPTED MAIL...",
        "> DECRYPTING PACKETS [OK]"
    ];

    let i = 0;
    consoleBox.innerHTML = ""; // ログをリセット
    
    const logInterval = setInterval(() => {
        if (i < logs.length) {
            const p = document.createElement('p');
            p.textContent = logs[i];
            p.style.margin = "2px 0";
            consoleBox.appendChild(p);
            consoleBox.scrollTop = consoleBox.scrollHeight;
            
            // プログレスバーを伸ばす
            bar.style.width = ((i + 1) / logs.length * 100) + "%";
            i++;
        } else {
            clearInterval(logInterval);
            
            // ログ出し終わってから少し余韻
            setTimeout(() => {
                const hackerScreen = document.getElementById('hacker-loading');
                
                // 1. まずハッカー画面をふわっと透明にする
                hackerScreen.style.opacity = '0';
                
                setTimeout(() => {
                    // 2. 完全に消してからQ3を表示
                    hackerScreen.style.display = 'none';
                    
                    if (callback) {
                        callback(); // ここで Q3 が表示され、CSSのアニメーションが発火するよ！
                    }
                }, 800); // CSSの transition 時間に合わせる
            }, 1000);
        }
    }, 400); // ログが出るスピード（お好みで調整！）
}


// ★★★★★★デバッグ用★★★★★

function debugManager() {
    // 1. まずローディング画面を消す
    const loader = document.getElementById('loading-screen');
    if (loader) loader.style.display = 'none';

    // 2. デバッグ用メニューを画面に作る
    const menu = document.createElement('div');
    menu.id = 'debug-menu';
    menu.innerHTML = `
        <div style="background:rgba(0,0,0,0.8); color:white; padding:20px; position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); z-index:10001; border-radius:15px; text-align:center; border:2px solid #0f0; font-family:sans-serif;">
            <h3 style="margin-top:0; color:#0f0;">DEBUG MODE</h3>
            <p style="font-size:12px;">開始する画面を選択してね💅</p>
            <select id="page-select" style="padding:10px; width:100%; margin-bottom:15px; border-radius:5px;">
                <option value="top">TOP (スタート画面)</option>
                <option value="q1">Q1 (電話番号入力)</option>
                <option value="q2">Q2 (The Sense Fuji)</option>
                <option value="q3">Q3 (ログイン画面)</option>
                <option value="q4">Q4 (メールボックス)</option>
                <option value="q5">Q5 (糸通しゲーム)</option>
                <option value="q6">Q6 (エンディング/フェス)</option>
            </select><br>
            <button onclick="launchDebugPage()" style="background:#0f0; color:#000; border:none; padding:10px 20px; border-radius:5px; font-weight:bold; cursor:pointer; width:100%;">START!</button>
        </div>
    `;
    document.body.appendChild(menu);
}

function launchDebugPage() {
    const page = document.getElementById('page-select').value;
    const menu = document.getElementById('debug-menu');
    
    if (menu) menu.remove();

    // 1. すべての画面をリセット
    const allScreens = document.querySelectorAll('.container, .screen, [id*="screen"], [id$="container"]');
    allScreens.forEach(s => {
        s.style.removeProperty('display'); // インラインスタイルを残さない
        s.classList.add('hidden');
        s.classList.remove('active');
    });

    // 2. IDのパターンを2通り試す（top-screen か screen-top か）
    let target = document.getElementById(page + '-screen') || document.getElementById('screen-' + page);

    if (target) {
        // 表示設定
        const flexPages = ['q3', 'q4', 'q5', 'top'];
        target.style.display = flexPages.includes(page) ? 'flex' : 'block';
        target.classList.remove('hidden');
        target.classList.add('active');

        // 3. 特殊な初期化
        if (page === 'top' && typeof startAnimation === 'function') startAnimation();
        if (page === 'q2' && typeof startQ2Adventure === 'function') startQ2Adventure();
        if (page === 'q4' && typeof initMailList === 'function') initMailList();
        
        if (page === 'q5') {
            const intro = document.getElementById('q5-intro-overlay');
            const gameMain = document.getElementById('q5-game-main');
            if (intro) intro.style.display = 'none';
            if (gameMain) {
                gameMain.style.opacity = '1';
                gameMain.style.display = 'flex';
            }
            if (typeof initNeedleGame === 'function') initNeedleGame();
        }
    } else {
        alert("画面が見つからないよ！IDが『" + page + "-screen』か『screen-" + page + "』になってるか確認してね✨");
    }
}
