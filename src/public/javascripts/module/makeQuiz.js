// ===================================
// クイズを表示するクラス
// ===================================
class QuizDisplay {
  constructor(oneQuiz) {
    this.quiz = oneQuiz;/* クイズデータをインスタンス */
  }
  // ===================================
  // 結果を表示する関数
  // ===================================
  resultDisplay() {
    information.innerText = 'あなたの正解数は' + correctCount + 'です!!';
    genreDisplay.innerHTML = '';
    difficultDisplay.innerHTML = '';
    quizDisplay.innerHTML = '再度挑戦したい場合は、以下をクリック';
    const button = document.createElement('button');
    answerBtns.appendChild(button);
    button.id = 'restart';
    button.textContent = 'ホームに戻る';
    pointsDisplay.innerText = correctCount + '点';
    const form = document.getElementById("form");
    form.classList.remove("none");
    const pointForm = document.getElementById("pointForm");
    pointForm.value = correctCount;
    console.log("ok");

  };
  // ===================================
  // クイズを表示する関数
  // ===================================
  presentQuiz() {
    if (count === 10) { /* 10問目なら結果表示 */
      this.resultDisplay();
      return;
    }
    // ===================================
    // 問題を表示する関数
    // ===================================
    information.innerText = `問題${++count}`;/* 問題数表示 問題数加算処理 */
    genreDisplay.innerText = '[ジャンル]' + this.quiz['category'];
    difficultDisplay.innerText = '[難易度]' + this.quiz['difficulty'];
    quizDisplay.innerText = this.quiz['question'];
    // ===================================
    // 正解と不正解をランダムに混ぜる関数
    // ===================================
    this.quiz['incorrect_answers'].push(this.quiz['correct_answer']);/* 正解と不正解を同じ配列に */
    let answers = this.quiz['incorrect_answers'];
    let correctAnswerWord = this.quiz['correct_answer'];  /* 正解単語を格納 */
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
      let div = document.createElement('div');
      answerBtns.appendChild(div);
      let button = document.createElement('BUTTON');
      button.className = 'ansBtn';
      button.textContent = randomAnswers[i];
      if (randomAnswers[i] === correctAnswerWord) {  /* 正解を識別するid付帯 */
        button.id = 'correct_answer_button'
      } else {
        button.className = 'incorrect_answer_button'
      }
      div.appendChild(button);
    }
  };
}
