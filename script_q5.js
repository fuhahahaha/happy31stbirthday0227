/* --- script_q5.js --- */

let threadY = 140; 
let speedY = 6; 
let isShooting = false;
let gameActive = true;
let animationId;

function initNeedleGame() { resetGame(); }

function moveThread() {
    if (!gameActive || isShooting) return;
    const thread = document.getElementById('q5-thread');
    const tipOffset = 88; 
    threadY += speedY;
    const minThreadY = -tipOffset; 
    const maxThreadY = 380 - tipOffset;

    if (threadY <= minThreadY || threadY >= maxThreadY) {
        speedY = (speedY > 0 ? -1 : 1) * (Math.random() * 7 + 5); 
        threadY = (threadY <= minThreadY) ? minThreadY : maxThreadY;
    }
    thread.style.top = threadY + "px";
    animationId = requestAnimationFrame(moveThread);
}

function shootThread() {
    if (isShooting || !gameActive) return;
    isShooting = true;
    const thread = document.getElementById('q5-thread');
    thread.style.transition = "left 1.5s ease-out"; 
    thread.style.left = "0px";
    setTimeout(checkHit, 1500);
}

function checkHit() {
    gameActive = false;
    document.getElementById('q5-game-canvas').classList.add('darken');
    const threadTipY = threadY + 88; 
    const btn = document.getElementById('q5-shoot-btn');

    if (threadTipY >= 105 && threadTipY <= 180) {
        document.getElementById('q5-success-img').classList.remove('hidden');
        btn.innerText = "次へ";
        btn.classList.add('next'); 
        btn.onclick = goToFinalPage;
    } else {
        document.getElementById('q5-miss-img').classList.remove('hidden');
        btn.innerText = "もう一回";
        btn.classList.add('retry'); 
        btn.onclick = resetGame;
    }
}

function goToFinalPage() {
    const resultImg = document.getElementById('q5-success-img');
    resultImg.src = "q5/HINT2.png"; 
    const btn = document.getElementById('q5-shoot-btn');
    btn.innerText = "終了";
    btn.classList.remove('next');
    btn.classList.add('finish');
    btn.onclick = function() {
        document.getElementById('q5-screen').classList.add('hidden');
        document.getElementById('q4-screen').classList.remove('hidden');
        if (typeof receiveFinalMail === 'function') receiveFinalMail();
    };
}

function resetGame() {
    gameActive = true; isShooting = false;
    document.getElementById('q5-game-canvas').classList.remove('darken');
    document.getElementById('q5-success-img').classList.add('hidden');
    document.getElementById('q5-miss-img').classList.add('hidden');
    const btn = document.getElementById('q5-shoot-btn');
    btn.innerText = "今だ！";
    btn.classList.remove('next', 'retry', 'finish');
    btn.onclick = shootThread;
    const thread = document.getElementById('q5-thread');
    thread.style.transition = "none";
    thread.style.left = "-330px";
    moveThread();
}