/* --- script_q4.js --- */

// 最初に見せていいメール（1〜4）だけにする
const mails = [
    {
        id: 1,
        sender: "THE SENSE FUJI 予約センター",
        date: "2026/1/12",
        subject: "【予約完了】はるか様 ご宿泊予約承りました",
        body: `（ここには元の中身を入れてね）`
    },
    {
        id: 2,
        sender: "フロントデスク担当",
        date: "2026/01/10",
        subject: "ヒント①の登録（お客様リクエスト）",
        body: "（ここには元の中身を入れてね）"
    },
    {
        id: 3,
        sender: "システム管理者",
        date: "2026/01/20",
        subject: "【警告】不正アクセス検知",
        body: "（ここには元の中身を入れてね）"
    },
    {
        id: 4,
        sender: "システム管理者",
        date: "2026/01/25",
        subject: "【重要】限定URLのご案内",
        body: "こちらのURLは、ゆうじ様のお誕生日当日のみ有効な限定アクセスキーです。\n\n以下のリンクより最終ステップへお進みください。\n\n<a href='#' onclick='transitionToQ5()' class='special-link'>最終ログインページへ</a>"
    }
];

// Q5クリア後に届く「本当の新着メール」データ
const finalMailData = {
    id: 5,
    sender: "古川 遥夏",
    date: "2026/01/26",
    subject: "【重要】ゆうじくんへ最後のメッセージ",
    body: `ゆうじくん、ミッションクリアおめでとう！<br>
全ての謎を解いてくれてありがとう。<br><br>
いよいよこれが本当の最後です。<br>
私たちの最高の思い出をここに詰め込みました。<br><br>
準備ができたら、下のリンクから受け取ってね。<br><br>
<a href='#' onclick='goToQ6()' class='final-link'>YUJI'S BIRTHDAY FESTIVAL 2026</a>`
};

// 起動時と新着受信時に、メールリストを画面に描画する関数
function initMailList() {
    const listElement = document.getElementById('q4-mail-list');
    listElement.innerHTML = ''; // 一旦空にする

    mails.forEach(mail => {
        const item = document.createElement('div');
        item.className = 'q4-mail-item';
        item.onclick = () => showMailDetail(mail);
        item.innerHTML = `
            <div class="mail-info">
                <span>${mail.sender}</span>
                <span>${mail.date}</span>
            </div>
            <div class="mail-subject">${mail.subject}</div>
        `;
        listElement.appendChild(item);
    });
}

// メール詳細を表示
function showMailDetail(mail) {
    document.getElementById('detail-subject').innerText = mail.subject;
    document.getElementById('detail-info').innerText = `From: ${mail.sender} | Date: ${mail.date}`;
    document.getElementById('detail-body').innerHTML = mail.body; // HTMLとして埋め込む（リンク有効化のため）
    document.getElementById('q4-mail-detail').classList.remove('hidden');
}

// 詳細を閉じる
function hideMailDetail() {
    document.getElementById('q4-mail-detail').classList.add('hidden');
}

function transitionToQ5() {
    // ゆうじくんに心の準備をさせるアラート（お好みで！）
    if (confirm("これより最終セキュリティを解除します。準備はいいですか？")) {
        // Q4を隠してQ5を表示
        document.getElementById('q4-screen').classList.add('hidden');
        document.getElementById('q5-screen').classList.remove('hidden');
        
        // script_q5.js にあるゲーム開始関数を呼ぶ
        if (typeof initNeedleGame === 'function') {
            initNeedleGame();
        }
        
        console.log("最終ミッション：針穴通しゲーム開始！");
    }
}

// Q5クリア後に呼ばれる「本当の新着メール」追加関数
function receiveFinalMail() {
    // すでにID:5が追加されていたら何もしない
    if (mails.find(m => m.id === 5)) return;

    // 配列の先頭（一番上）に新着を追加！
    mails.unshift(finalMailData); 

    // Q4の背景色をわかりやすく変える
    const screen = document.getElementById('q4-screen');
    if (screen) screen.style.backgroundColor = "#fff0f5"; 
    
    // リストを再描画！これで画面に反映されるよ
    initMailList(); 
}

// ページ読み込み時にリストを表示
document.addEventListener('DOMContentLoaded', () => {
    initMailList();
});

// Q6（フェスサイト）への遷移
function goToQ6() {
    document.getElementById('q4-screen').classList.add('hidden');
    document.getElementById('q6-screen').classList.remove('hidden');
    // 必要ならここでQ6の初期化関数を呼ぶ
}