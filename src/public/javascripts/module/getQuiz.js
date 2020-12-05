const getQuiz = () => { // 開始を押した場合
  information.innerText = '取得中';
  quizDisplay.innerText = '少々お待ちください';

  const startBtn = document.getElementById('start_btn');  // 開始ボタンを削除
  startBtn.parentNode.removeChild(start_btn);

  fetch('https://opentdb.com/api.php?amount=10')
    .then((response) => {
      return response.json();
    })
    .catch(err => alert(err))/* 例外処理 */
    .then((json) => {
      quizArray = json.results;
      oneQuiz = quizArray[0];  /* 第一問取得 */
      const quiz = new QuizDisplay(oneQuiz);  /* クイズ表示クラスインスタンス作成 */
      quiz.presentQuiz();  /* 表示メソッド呼び出し */
    });
}
