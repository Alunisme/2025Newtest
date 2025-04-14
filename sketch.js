// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let questions = [
  {
    type: "choice",
    question: "網站背景的星星在滑鼠點擊後會有什麼改變",
    options: ["變快", "變猩猩", "變慢", "變啥"],
    answer: 0,
  },
  {
    type: "text",
    question: "筆記選項按下後的筆記介紹的介紹內容的最右邊是哪三個字母",
    answer: "ouo",
  },
  {
    type: "choice",
    question: "作品集的第一個作品叫什麼",
    options: ["不是我啦", "下拉選單運用", "其實是我喲", "嗨"],
    answer: 1,
  },
  {
    type: "text",
    question: "在反應力測驗遊戲中，按到圖案時，畫面會變什麼顏色(ex：red、blue、yellow)",
    answer: "green",
  },
  {
    type: "choice",
    question: "在反應力測驗遊戲中，得分為15分時，你的rank為何?",
    options: ["你是烏龜嗎", "一坨答辯", "福能", "蛤"],
    answer: 0,
  },
];

let currentQuestion = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
let userAnswer = "";
let showResult = false;
let feedbackAnimation = false;
let feedbackTimer = 0;
let showStartScreen = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont("Microsoft JhengHei"); // 支援中文字型
}

function draw() {
  background(220);

  if (showStartScreen) {
    displayStartScreen();
  } else if (feedbackAnimation) {
    displayFeedback();
  } else if (showResult) {
    displayResult();
  } else {
    displayQuestion();
  }

  // 顯示底部固定文字
  displayFooter();
}

function displayStartScreen() {
  textAlign(CENTER, CENTER);
  textSize(48);
  text("歡迎來到測驗遊戲", width / 2, height / 3);

  fill(200);
  rect(width / 2 - 100, height / 2, 200, 50, 10);
  fill(0);
  textSize(32);
  text("開始遊戲", width / 2, height / 2 + 25);
}

function displayQuestion() {
  textAlign(CENTER, CENTER);
  textSize(32);
  text(questions[currentQuestion].question, width / 2, height / 4);

  if (questions[currentQuestion].type === "choice") {
    let buttonWidth = 150;
    let buttonHeight = 50;
    let spacing = 20;
    let totalWidth =
      questions[currentQuestion].options.length * buttonWidth +
      (questions[currentQuestion].options.length - 1) * spacing;
    let startX = (width - totalWidth) / 2;

    for (let i = 0; i < questions[currentQuestion].options.length; i++) {
      let x = startX + i * (buttonWidth + spacing);
      let y = height / 2;

      // 按鈕樣式
      if (userAnswer === i) {
        fill(255, 223, 186); // 按下後變亮橙色
        stroke(255, 165, 0); // 添加橙色邊框
        strokeWeight(3);
      } else {
        fill(200);
        noStroke();
      }
      rect(x, y - buttonHeight / 2, buttonWidth, buttonHeight, 10);

      fill(0);
      noStroke();
      textSize(16);
      textAlign(CENTER, CENTER);
      text(
        questions[currentQuestion].options[i],
        x + buttonWidth / 2,
        y
      );
    }
  } else if (questions[currentQuestion].type === "text") {
    fill(255);
    rect(width / 2 - 150, height / 2 - 20, 300, 40);
    fill(0);
    text(userAnswer, width / 2, height / 2);
  }

  fill(200);
  rect(width / 2 - 100, height - 100, 200, 50);
  fill(0);
  text("送出答案", width / 2, height - 75);
}

function displayResult() {
  textAlign(CENTER, CENTER);
  textSize(48);
  text(`答對: ${correctAnswers} 題`, width / 2, height / 4);
  text(`答錯: ${incorrectAnswers} 題`, width / 2, height / 4 + 60);

  let message = "";
  if (correctAnswers === 5) {
    message = "好棒棒";
  } else if (correctAnswers === 4) {
    message = "還可以";
  } else if (correctAnswers === 3) {
    message = "不錯喔";
  } else if (correctAnswers === 2) {
    message = "牛皮";
  } else if (correctAnswers === 1) {
    message = "答辯";
  }

  textSize(64);
  text(message, width / 2, height / 2);

  textSize(32);
  fill(200);
  rect(width / 2 - 100, height / 2 + 100, 200, 50);
  fill(0);
  text("再來一次", width / 2, height / 2 + 125);
}

function displayFeedback() {
  textAlign(CENTER, CENTER);
  textSize(48);
  if (feedbackAnimation === "correct") {
    fill(0, 255, 0);
    text("答對!", width / 2, height / 2);
  } else if (feedbackAnimation === "incorrect") {
    fill(255, 0, 0);
    text("答錯!", width / 2, height / 2);
  }

  if (millis() - feedbackTimer > 1000) {
    feedbackAnimation = false;
  }
}

function displayFooter() {
  textAlign(CENTER, CENTER);
  textSize(24);
  fill(0);
  text("TKYET 413730267 伍志倫", width / 2, height - 30);
}

function mousePressed() {
  if (showStartScreen) {
    if (
      mouseX > width / 2 - 100 &&
      mouseX < width / 2 + 100 &&
      mouseY > height / 2 &&
      mouseY < height / 2 + 50
    ) {
      showStartScreen = false;
    }
    return;
  }

  if (feedbackAnimation) return;

  if (showResult) {
    if (
      mouseX > width / 2 - 100 &&
      mouseX < width / 2 + 100 &&
      mouseY > height / 2 + 100 &&
      mouseY < height / 2 + 150
    ) {
      resetQuiz();
    }
    return;
  }

  if (
    mouseX > width / 2 - 100 &&
    mouseX < width / 2 + 100 &&
    mouseY > height - 100 &&
    mouseY < height - 50
  ) {
    checkAnswer();
    return;
  }

  if (questions[currentQuestion].type === "choice") {
    let buttonWidth = 150;
    let buttonHeight = 50;
    let spacing = 20;
    let totalWidth =
      questions[currentQuestion].options.length * buttonWidth +
      (questions[currentQuestion].options.length - 1) * spacing;
    let startX = (width - totalWidth) / 2;

    for (let i = 0; i < questions[currentQuestion].options.length; i++) {
      let x = startX + i * (buttonWidth + spacing);
      let y = height / 2;
      if (
        mouseX > x &&
        mouseX < x + buttonWidth &&
        mouseY > y - buttonHeight / 2 &&
        mouseY < y + buttonHeight / 2
      ) {
        userAnswer = i;
      }
    }
  }
}

function keyTyped() {
  if (questions[currentQuestion].type === "text") {
    if (keyCode === BACKSPACE) {
      userAnswer = userAnswer.slice(0, -1);
    } else {
      userAnswer += key;
    }
  }
}

function keyPressed() {
  if (keyCode === ENTER) {
    checkAnswer();
  }
}

function checkAnswer() {
  let correct = false;
  if (questions[currentQuestion].type === "choice") {
    correct = userAnswer === questions[currentQuestion].answer;
  } else if (questions[currentQuestion].type === "text") {
    correct = userAnswer === questions[currentQuestion].answer;
  }

  if (correct) {
    correctAnswers++;
    feedbackAnimation = "correct";
  } else {
    incorrectAnswers++;
    feedbackAnimation = "incorrect";
  }

  feedbackTimer = millis();
  userAnswer = "";
  currentQuestion++;

  if (currentQuestion >= questions.length) {
    showResult = true;
  }
}

function resetQuiz() {
  currentQuestion = 0;
  correctAnswers = 0;
  incorrectAnswers = 0;
  userAnswer = "";
  showResult = false;
}
