let count = 0;
let correctCount = 0;
let quizArray = [];

const information = document.getElementById("information");
const genreDisplay = document.getElementById("genre_display");
const difficultDisplay = document.getElementById("difficult_display");
const quizDisplay = document.getElementById("quiz_display");
const answerBtns = document.getElementById("answer_btns");

// 正解数カウントクロージャー
function correctCountUp(init) {
  let quizNumber = init;
  return function () {
    return ++quizNumber;
  }
};
correctCountUp(0);  /* 初期化 */

// ===================================
// クイズを表示するクラス
// ===================================
class QuizDisplay {
  constructor(oneQuiz) {
    this.quiz = oneQuiz;/* クイズデータをインスタンス */
  }
  // ===================================
  // クイズを表示する関数
  // ===================================
  presentQuiz() {
    if (count === 10) { /* 10問目なら結果表示 */
      resultDisplay();
      return;
    }
    // ===================================
    // 問題を表示する関数
    // ===================================
    information.innerText = `問題${++count}`;/* 問題数表示 問題数加算処理 */
    genreDisplay.innerText = "[ジャンル]" + this.quiz['category'];
    difficultDisplay.innerText = "[難易度]" + this.quiz['difficulty'];
    quizDisplay.innerText = this.quiz['question'];

    // ===================================
    // 正解と不正解をランダムに混ぜる関数
    // ===================================
    this.quiz["incorrect_answers"].push(this.quiz["correct_answer"]);/* 正解と不正解を同じ配列に */
    let answers = this.quiz["incorrect_answers"];
    let correctAnswerWord = this.quiz["correct_answer"];  /* 正解単語を格納 */
    for (let i = answers.length; 1 < i; i--) {  /* シャッフル */
      let k = Math.floor(Math.random() * i);
      [answers[k], answers[i - 1]] = [answers[i - 1], answers[k]];
    }
    let randomAnswers = answers;
    console.log(correctAnswerWord);

    // ===================================
    // 答えボタンを作る関数
    // ===================================
    for (let i = 0; i < randomAnswers.length; i++) {
      let div = document.createElement("div");
      answerBtns.appendChild(div);
      let button = document.createElement("BUTTON");
      button.className = "ansBtn";
      button.textContent = randomAnswers[i];
      if (randomAnswers[i] === correctAnswerWord) {  /* 正解を識別するid付帯 */
        button.id = "correct_answer_button"
      } else {
        button.className = "incorrect_answer_button"
      }
      div.appendChild(button);
    }
  };
}
// ===================================
// 再開する関数
// ===================================
document.addEventListener("click", (e) => {
  if (e.target.id === "restart") {
    location.reload();
  }
});
// ===================================
// 結果を表示する関数
// ===================================
const resultDisplay = () => {
  information.innerText = "あなたの正解数は" + correctCount + "です!!";
  genreDisplay.innerHTML = "";
  difficultDisplay.innerHTML = "";
  quizDisplay.innerHTML = "再度挑戦したい場合は、以下をクリック";
  const button = document.createElement("button");
  answerBtns.appendChild(button);
  button.id = "restart";
  button.textContent = "ホームに戻る";
};
// ===================================
// 回答を消去する関数
// ===================================
const deleteAnswer = () => {
  while (answerBtns.firstChild) {
    answerBtns.removeChild(answerBtns.firstChild);
  }
};
// ===================================
// ボタンを押した場合
// ===================================
document.addEventListener("click", (e) => {
  if (e.target.id === "correct_answer_button" || e.target.className === "incorrect_answer_button") {
    deleteAnswer();
    if (e.target.id === "correct_answer_button") { correctCount++; }
    oneQuiz = quizArray[count];  /* 次問取得 */
    const quiz = new QuizDisplay(oneQuiz);  /* クイズ表示クラスインスタンス作成 */
    quiz.presentQuiz();  /* 表示メソッド呼び出し */
  }
});

// ===================================
// 開始ボタンを押した時
// ===================================
document.getElementById("start_btn").addEventListener("click", () => { // 開始を押した場合
  information.innerText = "取得中";
  quizDisplay.innerText = "少々お待ちください";

  const startBtn = document.getElementById("start_btn");  // 開始ボタンを削除
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
});
