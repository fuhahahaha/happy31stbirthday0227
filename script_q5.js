/* --- script_q5.js 修正版 --- */
const q5Messages = [
    { time: 1.0, text: "まずはここまで<br>クリアおめでとうございます。" },
    { time: 9.0, text: "ここからは、あなたの「集中力」が試されます。" },
    { time: 13.0, text: "準備はよろしいでしょうか？" },
    { time: 18.0, text: "タイミングを見極めて..." },
    { time: 21.0, text: "ThreadをNeedleに<br>入れてください" }
];

// 起動のメイン関数
// 起動のメイン関数（遷移直後に呼ばれる）
function initNeedleGame() {
    console.log("Q5起動！🦍");
    window.newMailSound = new Audio('bgm/newmail.mp3');
    const screen = document.getElementById('q5-screen');
    const intro = document.getElementById('q5-intro-overlay');
    const gameMain = document.getElementById('q5-game-main');

    if (screen) {
        screen.classList.remove('hidden');
        screen.style.display = 'flex'; // CSSに合わせてflexで表示
    }

    if (intro) {
        intro.style.display = 'flex'; // 幕を表示
    }

    if (gameMain) {
        gameMain.style.display = 'none'; // ゲーム本体はまだ隠す
    }
}

// script.jsの launchDebugPage から呼ばれる名前もカバー
function initGame() { initNeedleGame(); }
function initQ5Game() { initNeedleGame(); }

function startQ5Sequence() {
    const bgm = document.getElementById('q5-bgm');
    const playBtn = document.getElementById('q5-play-btn');
    const msgArea = document.getElementById('q5-message-area');
    const gameMain = document.getElementById('q5-game-main');
    const intro = document.getElementById('q5-intro-overlay');

    if (playBtn) playBtn.style.display = 'none';
    if (msgArea) msgArea.classList.remove('hidden');
    
    bgm.load();
    bgm.play().catch(e => console.error("再生エラー:", e));

    const checkTime = setInterval(() => {
        const currentTime = bgm.currentTime;
        q5Messages.forEach(m => {
            if (currentTime >= m.time && currentTime < m.time + 0.5) {
                msgArea.innerHTML = m.text;
                msgArea.style.opacity = 1;
            }
        });

        if (currentTime >= 24.0) {
            clearInterval(checkTime);
            msgArea.style.opacity = 0;
            
            setTimeout(() => {
                // 1. イントロ（黒い幕）を完全に消す
                if (intro) {
                    intro.style.display = 'none';
                    intro.style.zIndex = '-1'; // 念のため後ろに回す💅
                }
                
                // 2. ゲーム本体を表示
                if (gameMain) {
                    gameMain.style.display = 'flex'; // blockではなくflexで！
                    gameMain.style.zIndex = '10001'; // イントロより前に出す
                    setTimeout(() => { 
                        gameMain.style.opacity = 1;
                        gameMain.classList.add('q5-appear'); // CSSのアニメーション発火
                    }, 50);
                }
                
                // 3. ゲームのループを再開
                resetGame();
            }, 800);
        }
    }, 100);
}

// --- ゲームロジック ---
let threadY = 140, speedY = 6, isShooting = false, gameActive = true, animationId;

function moveThread() {
    if (!gameActive || isShooting) return;
    const thread = document.getElementById('q5-thread');
    const tipOffset = 88;
    threadY += speedY;
    const minThreadY = -tipOffset, maxThreadY = 380 - tipOffset;
    if (threadY <= minThreadY || threadY >= maxThreadY) {
        speedY = (speedY > 0 ? -1 : 1) * (Math.random() * 10 + 10);
        threadY = (threadY <= minThreadY) ? minThreadY : maxThreadY;
    }
    if (thread) thread.style.top = threadY + "px";
    animationId = requestAnimationFrame(moveThread);
}

function shootThread() {
    if (isShooting || !gameActive) return;
    isShooting = true;
    const thread = document.getElementById('q5-thread');
    if (thread) {
        thread.style.transition = "left 1.5s ease-out";
        thread.style.left = "0px";
    }
    setTimeout(checkHit, 1500);
}

function checkHit() {
    gameActive = false;
    document.getElementById('q5-screen').classList.add('darken');
    const threadTipY = threadY + 88;
    const btn = document.getElementById('q5-shoot-btn');
    if (threadTipY >= 105 && threadTipY <= 180) {
        new Audio('bgm/game_success.mp3').play().catch(() => {});
        document.getElementById('q5-success-img').classList.remove('hidden');
        btn.innerText = "次へ";
        btn.onclick = goToFinalPage;
    } else {
        new Audio('bgm/game_failed.mp3').play().catch(() => {});
        document.getElementById('q5-miss-img').classList.remove('hidden');
        btn.innerText = "ボスゴリラ!";
        btn.onclick = resetGame;
    }
}

function resetGame() {
    gameActive = true; isShooting = false;
    document.getElementById('q5-screen').classList.remove('darken');
    document.getElementById('q5-success-img').classList.add('hidden');
    document.getElementById('q5-miss-img').classList.add('hidden');
    const btn = document.getElementById('q5-shoot-btn');
    btn.innerText = "ボスゴリラ!";
    btn.onclick = shootThread;
    const thread = document.getElementById('q5-thread');
    if (thread) { thread.style.transition = "none"; thread.style.left = "-330px"; }
    cancelAnimationFrame(animationId);
    moveThread();
}

function goToFinalPage() {
    const resultImg = document.getElementById('q5-success-img');
    if (resultImg) resultImg.src = "q5/HINT2.png";
    const btn = document.getElementById('q5-shoot-btn');
    btn.innerText = "終了";
    btn.onclick = function() {
        document.getElementById('q5-screen').classList.add('hidden');
        document.getElementById('q5-screen').style.display = 'none';
        const q4 = document.getElementById('q4-screen');
        q4.classList.remove('hidden');
        q4.style.display = 'flex';
        if (window.mails && window.finalMailData) {
            if (!window.mails.find(m => m.id === window.finalMailData.id)) {
                window.mails.unshift(window.finalMailData);
            }
        }
        if (typeof window.initMailList === 'function') window.initMailList();
        // Q5 BGM停止 + kaiju resume
        const q5bgm = document.getElementById('q5-bgm');
        if (q5bgm) { q5bgm.pause(); q5bgm.currentTime = 0; }
        if (window.kaijuBgm) window.kaijuBgm.play().catch(() => {});
        if (window.newMailSound) window.newMailSound.play().catch(() => {});
        alert("新着メールが 1通 届きました");
    };
}