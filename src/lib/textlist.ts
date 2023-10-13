//text in top page
const T_text1 = `この度は実験へ参加してくださりありがとうございます。¥n
本実験は工学院大学の研究室が実施する金銭分配に関するアンケート調査です。¥n
実験の概要やその流れ、注意事項等の事前説明はランサーズ上にある、本調査の募集ページに記載しております。¥n`;

const T_text2 =`ご質問や不明点がございましたら、工学院大学応用経済分析研究室の¥n
齋野(j319138@ns.kogakuin.ac.jp)までご連絡ください。¥n
この調査研究やその手順、リスクや利点についてご質問や苦情がある場合は、¥n
研究室担当教員矢﨑(yasaki@cc.kogakuin.ac.jp)までご連絡ください。¥n
独立した連絡先 : この研究の実施方法に懸念やご質問がある場合は、工学院大学研究支援室(〒192-0015 東京都八王子市中野町2665-1)までご連絡ください。¥n
`

// text in briefing page
const B_text1 = `【本実験の概要】¥n
本実験ではパソコンの画面上に表示される"お金の分配"に関する質問について「どのくらいを相手に渡すか」、
もしくは「提示された金額を受け入れるか」を皆様の直感に従い、答えていただくものです。¥n
この実験の所要時間はおよそ5分程度となっております。¥n
回答は任意であり、実験途中で参加を中断することも可能なため、回答の継続が難しい場合などはブラウザのタブを直接閉じ、実験を中断することができます。¥n
基本的には回答は1人につき1度までですが、やむを得ない事情で回答を中断された場合は再度回答していただいても構いません。¥n
回答の途中経過は保存されませんので、中断された際は最初から実験を始めてください。`;

const B_text2 = `【データ提供の可否について】¥n
実験終了後の事後説明でデータ提供の可否について確認させていただきます。¥n
その際にデータ提供不可の申し出をされたり、参加を中断された場合は、送信されたデータは削除され分析には用いられません。¥n
なお，研究実施者側では回答者が特定できない形でデータを取得しておりますので，アンケート回答終了時にデータ提供に同意いただいた場合，
その後の撤回は出来ません。あらかじめご了承ください。`;

const B_text3 = `【謝礼のお渡し方法等について】¥n
本実験に最後まで参加し、データ提供に同意していただいた方に、謝礼として30円をお渡しいたします。¥n
恐れ入りますが、実験への参加を中止した場合やデータ提供に同意されなかった場合、
こちらの指示とは異なった回答をされた場合などは、謝礼をお渡しできません。ご承知いただければ幸いです。¥n
データ提供等の事後説明に同意していただいた方には確認番号を提示いたします。¥n
その番号をランサーズの本実験募集ページの下にある空欄に入力していただければ、ランサーズ社を通して謝礼をお支払いさせていただきます。¥n
実験にお答えいただいた方でも本番号がなければ謝礼をお渡しすることができません。必ずお控えをお取りいただきますようお願いいたします。`;

const B_text4 = `【データの利用方法について】¥n
今回取得したデータは研究および教育目的で利用され、統計的に解析された結果は論文や学会発表または大学の講義等様々な形で公表される場合があります。¥n
さらにアンケートへの回答そのものも研究報告および成果の一部として2次利用可能な状態で公開(オープンデータ化)される可能性があります。¥n
なお研究実施者は、今回の調査において回答者の皆様の個人特定が可能となるデータ(名前や電話番号など)を取得しません。¥n
したがって、研究成果の報告やデータ公開に際しても匿名性は保たれます。¥n
また、アンケートに回答を入力し、次のページへ移動した時点で、お答えいただいたデータは送信されます。¥n
ですが実験を途中で中断された場合や事後説明でデータ提供不可の申し出をされた際、送信されたデータは削除されます。`;

const B_text5 = `【実験の流れ】¥n
実験の流れとしましては¥n
次ページでパスコードを使ってログイン → 各種アンケートに答える → 確認番号のページの入力¥n
となっております。¥n
詳しい流れは右上の「実験の流れ」ボタンからご確認ください。`;

const B_text6 = `調査は任意であり、協力しないことによって回答者が不利益を被ることはありません。¥n
下のボタンを押し、次のページにおけるパスコードの入力・送信をもって事前説明の内容を理解し、これに同意したとみなすこととさせていただきます。`;

// text in gamerule page
const G_text1 = `これから1000円を分けるゲームを2回行っていただきます。¥n
実験に参加していただいている方には「提案者」と「応答者」の2種類の役割のうち1種類が、各ゲームでランダムに割り当てられます。
また、実験は完全にオンライン上で行われており、参加者の匿名性は確保されています。¥n
提案者は1000円のお金の分け方を自由に決めることができ、応答者はその提案を受け入れることも断ることもできます。¥n
提案者に選ばれた場合は相手にあげる金額を、半角数字で入力してください。¥n
応答者に選ばれた場合は画面に表示された提案を受け入れるか断るかを選んでください。`;

const G_text2 = `役割の振り分けは各ゲーム開始時にランダムで行われます。¥n
また、本実験はリアルタイムで他の方と同時に実施するわけではありません。¥n
そのため、「提案者」役の方が提示した金額は一旦データベースに保存されたのち、「応答者」役の人が他に現れた際に再び提示されます。¥n
つまり、1回目のゲームで提案者役の方が提案した金額は、他の方が1回目のゲームに応答者役として参加した際に提示されます。¥n
1回目のゲームで提示した金額が2回目のゲームで表示される、もしくはその逆は起こりません。`;

const G_text3 = `一度送信した内容はその後、修正することはできませんのでご注意ください。¥n
また、実験開始から終了までの間、ブラウザの戻るボタンはご使用にならないでください。¥n
データが正常に送信・処理されない可能性があります。`;

const D_text1 = `ご協力いただきありがとうございました。本ページは実験の事後説明のページです。¥n
改めて実験の目的を説明したのち、データの提供について同意するかをお答えいただければと思います。`;

const D_text2 = `実験の事前説明でも述べたとおり、本アンケートの目的は"お金の分配"に関する調査を行うことです。¥n
ですが正確には"初めに提示された金額"が"その後の分配行動"にどのような影響を及ぼすかを調べることが本実験の主目的となります。¥n
そのため、実験の参加者には金額の異なる分配額の提示が1回目のアンケートでは行われておりました。¥n
つまり、ずべての参加者が1回目のゲームでは応答者役に割り当てられています。¥n
また、2回目のゲームでは"その後の分配行動"を調査するため、参加者全員が提案者役に割り当てられています。¥n
従って、実験の事前説明のうち「役割の振り分けは各ゲーム時にランダムに行われる」という点は実際とは異なる説明でした。¥n
また、1回目のゲームで提示される金額は「250円」と「750円」の2通りしかなく、実験実施者側で設定したものとなっております。¥n
さらにこのため、2回目のゲームで回答者が提示した金額が他の参加者に提示されることはございません。¥n
こちらも実験の事前説明で説明したものとは異なっております。¥n
提示された金額の違いがその後の分配行動にどう影響するか、回答者の自然な反応を調査するために、事実はと異なる説明を行いました。¥n
大変申し訳ございませんが、ご理解いただければ幸いです。`;

const D_text3 = `もし、データの提供について同意いただけるのであれば、下のチェックボックスをクリックし(クリックするとチェックマークが付きます)、
確認番号の表示ボタンを押してください。ページを移動したのち、確認番号が画面に表示されます。¥n
また、データの提供について同意いただけない際は、直接このページのタブを閉じていただいて構いません。
その場合、すでにアンケートに回答いただいている場合でも謝礼をお渡しすることはできず、お答えいただいた内容は削除されます。
また、データは保存されませんので再びお答えいただく際は始めからとなります。ご理解いただければ幸いです。`;

export {
  T_text1,
  T_text2,
  B_text1,
  B_text2,
  B_text3,
  B_text4,
  B_text5,
  B_text6,
  G_text1,
  G_text2,
  G_text3,
  D_text1,
  D_text2,
  D_text3,
};
