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
