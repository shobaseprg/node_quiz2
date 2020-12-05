const pushBtn = (e) => {
  if (e.target.id === 'correct_answer_button' || e.target.className === 'incorrect_answer_button') {
    deleteAnswer();
    if (e.target.id === 'correct_answer_button') { correctCount++; }
    oneQuiz = quizArray[count];  /* 次問取得 */
    const quiz = new QuizDisplay(oneQuiz);  /* クイズ表示クラスインスタンス作成 */
    quiz.presentQuiz();  /* 表示メソッド呼び出し */
  }
}
