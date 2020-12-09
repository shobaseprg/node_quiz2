let count = 0;
let correctCount = 0;
let quizArray = [];

// ===================================
// ノード取得
// ===================================
const information = document.getElementById('information');
const genreDisplay = document.getElementById('genre_display');
const difficultDisplay = document.getElementById('difficult_display');
const quizDisplay = document.getElementById('quiz_display');
const answerBtns = document.getElementById('answer_btns');
const pointsDisplay = document.getElementById('pointDisplay');
// ===================================
// 再開する関数
// ===================================
document.addEventListener('click', (e) => {
  if (e.target.id === 'restart') {
    location.reload();
  }
});
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
document.addEventListener('click', pushBtn);
// ===================================
// 開始ボタンを押した時
// ===================================
document.getElementById('start_btn').addEventListener('click', getQuiz);
