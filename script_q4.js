/* --- script_q4.js --- */

// 最初に見せていいメール（1〜4）だけにする
const mails = [
    {
        id: 1,
        sender: "THE SENSE FUJI 予約センター",
        date: "2026/01/19",
        subject: "【@harukaf11】様 予約内容確認",
        body: `-------------------------------------
◆予約完了のお知らせ◆
-------------------------------------

@harukaf11 様

公式Xよりお問い合わせありがとうございます。

THE SENSE FUJI をご利用いただきありがとうございます。以下の内容でご予約を承りました。
                
●予約番号　　　　　：IK1508360627
●チェックイン日　　：2026年02月28日(土)
●チェックアウト日　：2026年03月01日(日)
●チェックアウト時間：〜11:00
●お部屋　　　　　：サウナヴィラDX
                
ゆうじくんのお誕生日楽しみですね！
サプライズの内容については、後日追ってご連絡いたします。
                
当日のご来館を心よりお待ちしております。

THE SENSE FUJI スタッフ一同`
    },
    {
        id: 2,
        sender: "フロントデスク担当",
        date: "2026/01/31",
        subject: "お客様リクエストの共有",
        body: "はるか様より、お連れ様向けの『謎解きのヒント』をお預かりしました。\n担当スタッフは以下の準備をお願いします。\n\n◆内容：一つ目のヒント\n◆隠し場所：枕の下\n\n以上"
    },
    {
        id: 3,
        sender: "THE SENSE FUJI 予約センター",
        date: "2026/02/03",
        subject: "オススメの富士山周辺の観光案内",
        body: "周辺の観光マップを送付いたします。\n冬の富士山は冷え込みますので、暖かい服装でお越しください。"
    },
    {
        id: 4,
        sender: "THE BONEZ",
        date: "2026/02/05",
        subject: "当日限定URLのご案内",
        body: "YUJI IZUMA様専用の特設サイトをご共有します。\nURLは2月28日当日のみ有効です。\n\n以下のリンクより次のステップへお進みください。\n<a href='#' onclick='transitionToQ5()' class='special-link'>特設ページへ</a>"
    }
];

// Q5クリア後に届く「本当の新着メール」データ
const finalMailData = {
    id: 5,
    sender: "SMASH CORP",
    date: "2026/02/28",
    subject: "【重要】YUJI ROCK FESTIVAL '26 開催予告",
    body: `
<div class="fess-announce-box">
<img src="q4/yujirock_icon.png" class="fess-icon">
<p class="fess-main-text">
初開催決定！<br>
『YUJI ROCK FESTIVAL '26』<br>
第一弾アーティスト発表！
</p>
</div>
<p class="fess-sub-text">
詳細は以下URLから今すぐチェック!<br>▼　▼　▼
</p>
<a href='#' onclick='goToQ6()' class='final-link'>YUJI ROCK FESTIVAL '26</a>
    `
};

// 3. リストを表示する関数
function initMailList() {
    const listElement = document.getElementById('q4-mail-list');
    if (!listElement) return;
    listElement.innerHTML = ''; 

    mails.forEach(mail => {
        const item = document.createElement('div');
        item.className = 'q4-mail-item';
        item.onclick = () => showMailDetail(mail);
        
        // 【重要】がついているタイトルを赤くする仕掛け
        const titleClass = mail.subject.startsWith('【重要】') ? 'mail-subject important-text' : 'mail-subject';

        item.innerHTML = `
            <div class="mail-info">
                <span>${mail.sender}</span>
                <span>${mail.date}</span>
            </div>
            <div class="${titleClass}">${mail.subject}</div>
        `;
        listElement.appendChild(item);
    });
}

// 4. クリア後に呼ばれる関数（pushで一番下に追加）
function receiveFinalMail() {
    if (mails.find(m => m.id === 5)) return; // 重複防止

    // ★push を使うことで、1〜4通目の「後」に追加されるよ！
    mails.push(finalMailData); 

    const screen = document.getElementById('q4-screen');
    if (screen) screen.style.backgroundColor = "#fff0f5"; 
    
    initMailList(); // 画面を更新
}

// --- 以下、ボタン操作や詳細表示の関数 ---

function showMailDetail(mail) {
    document.getElementById('detail-subject').innerText = mail.subject;
    document.getElementById('detail-info').innerText = `From: ${mail.sender} | Date: ${mail.date}`;
    document.getElementById('detail-body').innerHTML = mail.body.replace(/\n/g, '<br>');
    document.getElementById('q4-mail-detail').classList.remove('hidden');
}

function hideMailDetail() {
    document.getElementById('q4-mail-detail').classList.add('hidden');
}

function transitionToQ5() {
    if (confirm("これより最終セキュリティを解除します。準備はいいですか？")) {
        document.getElementById('q4-screen').classList.add('hidden');
        document.getElementById('q5-screen').classList.remove('hidden');
        if (typeof initNeedleGame === 'function') initNeedleGame();
    }
}

function goToQ6() {
    window.open('https://fuhahahaha.github.io/yujirockfestival2026/', '_blank');
}

// 5. プレビュー用の起動設定
document.addEventListener('DOMContentLoaded', () => {
    // プレビューしたい時は下の receiveFinalMail() のコメントを外してね！
    initMailList();
});