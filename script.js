// ページ読み込み時のふわっとアニメーション
function startAnimation() {
    setTimeout(() => {
        document.querySelectorAll('.float-item').forEach(el => {
            el.classList.add('appear');
        });
    }, 100);
}

// ボタンを押した時の「円が広がる」遷移
function goToQuest() {
    // BGM再生
    const bgm = document.getElementById('myBgm');
    bgm.play().catch(() => {
        console.log("Audio play failed - user interaction required");
    });

    // 黒い円を広げる
    const layer = document.getElementById('transition-layer');
    layer.classList.add('active');

    // 0.8秒後（円が広がりきった後）に画面を切り替える
    setTimeout(() => {
        // トップ画面を隠す
        document.getElementById('screen-top').style.display = 'none';
        
        // クイズ画面を表示
        const questScreen = document.getElementById('quest-screen');
        questScreen.style.opacity = '1';
        
        // 黒い幕を消して、中身が見えるようにする
        layer.style.display = 'none';
    }, 800);
}