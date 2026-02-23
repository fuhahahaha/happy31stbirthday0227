/* --- script_q4.js --- */


// 最初に見せていいメール（1〜4）だけにする
const mails = [
    {
        id: 1,
        sender: "THE SENSE FUJI 予約センター",
        date: "2026/01/19",
        subject: "【予約内容確認】@omedetomaru 様",
        body: `-------------------------------------
◆予約完了のお知らせ◆
-------------------------------------

@omedetomaru 様

公式X（旧Twitter）よりお問い合わせありがとうございます。

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
        body: "はるか様より、お連れ様向けの『謎解きのヒント』をお預かりしました。\n担当スタッフは以下の準備をお願いします。\n\n◆内容：一つ目のヒント\n◆隠し場所：机の裏\n\n以上"
    },
    {
        id: 3,
        sender: "THE SENSE FUJI 予約センター",
        date: "2026/02/03",
        subject: "オススメの富士山周辺の観光案内",
        body: `
        <p class="guide-intro">周辺の観光マップを送付いたします。<br>冬の富士山は冷え込みますので、暖かい服装でお越しください。</p>
        
        <div class="guide-container">
            <div class="guide-box">
                <div class="guide-img-wrapper">
                    <img src="q4/spot1.png" alt="スポット名">
                </div>
            
                <div class="guide-content">
                    <div class="guide-name">パノラマロープウェイ</div>
                    <div class="guide-desc">
                        富士山の絶景と河口湖の眺望を楽しむロープウェイ！寒いかな！けど景色めちゃ良さそうだった。
                    </div>
                </div>
            </div>

            <div class="guide-box">
                <div class="guide-img-wrapper">
                    <img src="q4/spot2.png" alt="スポット名">
                </div>
                <div class="guide-content">
                    <div class="guide-name">富士浅間神社</div>
                    <div class="guide-desc">
                        「せんげんじんじゃ」と読みます！富士山を神格化した神様を祀る神社で、1900年以上も歴史があります。
                    </div>
                </div>
            </div>

            <div class="guide-box">
                <div class="guide-img-wrapper">
                    <img src="q4/spot3.png" alt="スポット名">
                </div>
                <div class="guide-content">
                    <div class="guide-name">ほうとう不動河口湖北本店</div>
                    <div class="guide-desc">
                        河口湖といえば「ほうとう不動」と言っても過言ではないほど、観光客にも地元民にも愛されている名店。
                    </div>
                    </div>
                </div>
            </div>

            <div class="guide-box">
                <div class="guide-img-wrapper">
                    <img src="q4/spot4.png" alt="スポット名">
                </div>
                <div class="guide-content">
                    <div class="guide-name">グリ ティー＆ペーストリーズ</div>
                    <div class="guide-desc">
                        河口湖畔の絶景海外風カフェ。静かな人気店です！けどカフェはここ以外もたくさんあったからコーヒー飲みたくなったら探そう◎
                    </div>
                </div>
            </div>

            <div class="guide-box">
                <div class="guide-img-wrapper">
                    <img src="q4/spot5.png" alt="スポット名">
                </div>
                <div class="guide-content">
                    <div class="guide-name">kawaguchiko base</div>
                    <div class="guide-desc">
                        地元産の野菜やこだわりの特産品が並ぶ市場、地元食材を味わえるレストランやカフェが集う。お土産はここで買お〜！
                    </div>
                </div>
            </div>

        </div>
    `
    },
    {
        id: 4,
        sender: "THE BONEZ",
        date: "2026/02/05",
        subject: "当日限定URLのご案内",
        body: "YUJI IZUMA様専用の特設サイトをご共有します。<br>URLは2月28日当日のみ有効です。<br><br>以下のリンクより次のステップへお進みください。<br><br><a href='#' onclick='transitionToQ5()' class='special-link'>特設ページへ</a>"
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

// --- 3. リストを表示する関数（ ---// --- 3. リストを表示する関数 ---
function initMailList() {
    const listElement = document.getElementById('q4-mail-list');
    if (!listElement) return;
    listElement.innerHTML = ''; 

    // mails 配列を使ってリストを作成
    mails.forEach(mail => {
        const item = document.createElement('div');
        item.className = 'q4-mail-item';
        item.dataset.id = mail.id; // 既読判定用
        
        // クリックイベントを登録
        item.onclick = () => showMailDetail(mail.id);
        
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

// --- 4. 詳細を表示する関数 ---
function showMailDetail(mailId) {
    // 【修正箇所】mailData ではなく mails から探すようにしたよ！
    const mail = mails.find(m => m.id === mailId);
    if (!mail) return;

    // 件名と本文をセット
    document.getElementById('detail-subject').textContent = mail.subject;

    // 本文の表示（HTMLタグがあるかどうかで処理を分ける）
    const bodyElement = document.getElementById('detail-body');
    if (mail.body.includes('<') && mail.body.includes('>')) {
        bodyElement.innerHTML = mail.body;
    } else {
        // テキストメールの場合は改行を反映させる
        bodyElement.innerHTML = mail.body.replace(/\n/g, '<br>');
    }

    // 詳細画面をふわっと表示
    document.getElementById('q4-mail-detail').classList.remove('hidden');

    // 既読クラスを付与
    const mailElements = document.querySelectorAll('.q4-mail-item');
    mailElements.forEach(el => {
        if (el.dataset.id === String(mailId)) {
            el.classList.add('read');
        }
    });
}

function hideMailDetail() {
    document.getElementById('q4-mail-detail').classList.add('hidden');
}



window.mails = mails; // 公開！
window.finalMailData = finalMailData; // 公開！
window.initMailList = initMailList; // 公開！

function transitionToQ5() {
    if (confirm("外部サイトに遷移します。よろしいですか？")) {
        // kaiju BGM を一時停止（currentTime保持 → Q4に戻ったとき続きから再生）
        if (window.kaijuBgm) window.kaijuBgm.pause();

        document.getElementById('q4-screen').classList.add('hidden');
        document.getElementById('q4-screen').style.display = 'none';
        
        const q5 = document.getElementById('q5-screen');
        q5.classList.remove('hidden');
        q5.style.display = 'block';
        
        // script_q5.js 側の初期化関数（名前を合わせてね）
        if (typeof initNeedleGame === 'function') initNeedleGame();
    }
}

function goToQ6() {
    const bgm = document.getElementById('q5-bgm');
    if (bgm) { bgm.pause(); bgm.currentTime = 0; }
    if (window.kaijuBgm) { window.kaijuBgm.pause(); window.kaijuBgm.currentTime = 0; }
    window.open('https://fuhahahaha.github.io/yujirockfestival2026/', '_blank');
}

// 5. プレビュー用の起動設定
window.initMailList = initMailList; // 外部から呼べるように念押し💅

document.addEventListener('DOMContentLoaded', () => {
    // 画面が存在する場合だけ初期化する
    if(document.getElementById('q4-mail-list')){
        initMailList();
    }
});