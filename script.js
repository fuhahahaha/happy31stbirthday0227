// ページ読み込み時のふわっとアニメーション
function startAnimation() {
    setTimeout(() => {
        document.querySelectorAll('.float-item').forEach(el => {
            el.classList.add('appear');
        });
    }, 100);
}

// 【修正版】トップからQ1へ
function goToQuest() {
    const layer = document.getElementById('transition-layer');
    layer.style.display = 'block'; // 幕を表示
    layer.classList.add('active');

    setTimeout(() => {
        // トップ画面を非表示にする
        document.getElementById('screen-top').style.display = 'none';
        
        // Q1画面を表示し、activeクラスをつけて操作可能にする
        const q1 = document.getElementById('q1-screen');
        q1.style.display = 'block'; // これが抜けていると表示されません
        q1.classList.add('active');
        
        layer.classList.remove('active');
        setTimeout(() => { layer.style.display = 'none'; }, 800);
    }, 800);
}

function checkAnswer() {
    const phone = document.querySelector('.q1-phone');
    const userAnswer = document.getElementById('ans1').value.trim();
    const correctAnswer = "0120227774";

    // 1. まずは「送信した感」を出すために電話を揺らす
    // アニメーションを一度リセットして再実行
    phone.style.animation = 'none';
    phone.offsetHeight; /* ブラウザに再描画を認識させるおまじない */
    phone.style.animation = 'phone-shake-real 0.5s 1'; // 判定用に短く激しく揺らす

    // 2. 判定処理
    setTimeout(() => {
        if (userAnswer === correctAnswer) {
            // 正解：震えを止めて次へ
            phone.style.animation = 'none';
            alert("正解！電話が繋がった！");
            // 次のQ2へ遷移する処理
        } else {
            // 不正解：元のループアニメーションに戻す
            alert("番号が違うみたい。");
            phone.style.animation = 'phone-shake-real 3s infinite';
        }
    }, 500); // 0.5秒の震えが終わった後に判定結果を出す
}

// 【修正版】Q1からトップへ
function goBack() {
    const layer = document.getElementById('transition-layer');
    layer.style.display = 'block';
    layer.classList.add('active');

    setTimeout(() => {
        // Q1画面を非表示にし、activeクラスを外す
        const q1 = document.getElementById('q1-screen');
        q1.classList.remove('active');
        q1.style.display = 'none';
        
        // トップ画面を再表示する
        const top = document.getElementById('screen-top');
        top.style.display = 'flex'; // 元のレイアウト（flex）に戻す
        
        layer.classList.remove('active');
        setTimeout(() => { layer.style.display = 'none'; }, 800);
    }, 800);
}

// 不正解の時に電話を震わせる演出（おまけ）
function shakePhone() {
    const phone = document.querySelector('.q1-phone');
    phone.style.animation = 'none';
    phone.offsetHeight; // reflow
    phone.style.animation = 'gatagata 0.5s'; // トップページで作ったガタガタを流用
}