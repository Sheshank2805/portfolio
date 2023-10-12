const quizData = [
    {
  question: "1)What is the chemical symbol for water?",
  options: ["H2O", "CO2", "O2", "NaCl"],
  correctAnswer: "H2O"
},
// Question 2
{
  question: "2)Which planet is known as the 'Red Planet'?",
  options: ["Venus", "Mars", "Jupiter", "Saturn"],
  correctAnswer: "Mars"
},
// Question 3
{
  question: "3)Who wrote the play 'Romeo and Juliet'?",
  options: ["William Shakespeare", "Jane Austen", "Charles Dickens", "Mark Twain"],
  correctAnswer: "William Shakespeare"
},
// Question 4
{
  question: "4)What is the largest organ in the human body?",
  options: ["Brain", "Liver", "Heart", "Skin"],
  correctAnswer: "Skin"
},
// Question 5
{
  question: "5)In which country would you find the Eiffel Tower?",
  options: ["Italy", "France", "Spain", "Germany"],
  correctAnswer: "France"
},
// Question 6
{
  question: "6)Which scientist is best known for his theory of relativity?",
  options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Nikola Tesla"],
  correctAnswer: "Albert Einstein"
},
// Question 7
{
  question: "7)What is the symbol for the chemical element gold?",
  options: ["Au", "Go", "Ag", "Gd"],
  correctAnswer: "Au"
},
// Question 8
{
  question: "8)Who is the author of 'The Great Gatsby'?",
  options: ["J.D. Salinger", "F. Scott Fitzgerald", "Ernest Hemingway", "George Orwell"],
  correctAnswer: "F. Scott Fitzgerald"
},
// Question 9
{
  question: "9)What is the largest ocean on Earth?",
  options: ["Atlantic Ocean", "Arctic Ocean", "Indian Ocean", "Pacific Ocean"],
  correctAnswer: "Pacific Ocean"
},
// Question 10
{
  question: "10)What is the chemical symbol for oxygen?",
  options: ["O2", "H2O", "CO2", "O"],
  correctAnswer: "O2"
},
// Question 11
{
  question: "11)What is the chemical symbol for the element carbondioxide?",
  options: ["O", "O2", "Oh", "CO2"],
  correctAnswer: "CO2"
},
// Question 12
{
  question: "12)Which scientist inveted Telescope?",
  options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Marie Curie"],
  correctAnswer: "Galileo Galilei"
},
// Question 13
{
  question: "13)What is the organ that Excretes the waste in the human body?",
  options: ["Liver", "Heart", "Brain", "Skin"],
  correctAnswer: "Liver"
},
// Question 14
{
  question: "14)What is the unit of measurement for electrical resistance?",
  options: ["Watt", "Ohm", "Volt", "Ampere"],
  correctAnswer: "Ohm"
},
// Question 15
{
  question: "15)What is the process by which plants make their food?",
  options: ["Respiration", "Photosynthesis", "Fermentation", "Oxidation"],
  correctAnswer: "Photosynthesis"
},
// Question 16
{
  question: "16)Which gas is most abundant in the Earth's atmosphere?",
  options: ["Carbon dioxide", "Oxygen", "Nitrogen", "Helium"],
  correctAnswer: "Nitrogen"
},
// Question 17
{
  question: "17)What is the SI unit for measuring force?",
  options: ["Newton", "Watt", "Joule", "Kilogram"],
  correctAnswer: "Newton"
},
// Question 18
{
  question: "18)What type of energy is stored in a stretched rubber band?",
  options: ["Chemical energy", "Thermal energy", "Potential energy", "Kinetic energy"],
  correctAnswer: "Potential energy"
},
// Question 19
{
  question: "19)What is the process by which liquid changes into vapor at the surface?",
  options: ["Melting", "Condensation", "Sublimation", "Evaporation"],
  correctAnswer: "Evaporation"
},
// Question 20
{
  question: "20)What is the smallest unit of an element that retains its chemical properties?",
  options: ["Atom", "Molecule", "Cell", "Proton"],
  correctAnswer: "Atom"
},
  ];

    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const feedbackElement = document.getElementById("feedback");
    const timerElement = document.getElementById("timer");
    const questionNumberElement = document.getElementById("question-number");
    const nextButton = document.getElementById("next-button");
    const restartButton = document.getElementById("restart-button");
    const startContainer = document.getElementById("start-container");
    const questionInfo = document.getElementById("question-info");
    const actionButtons = document.getElementById("action-buttons");
    const startButton = document.getElementById("start-button");

    let currentQuestionIndex = 0;
    let score = 0;
    let timeLeft = 15;
    let timer;
    let quizStarted = false;

    startButton.addEventListener("click", startQuiz);
    nextButton.addEventListener("click", displayNextQuestion);
    restartButton.addEventListener("click", restartQuiz);

    function startQuiz() {
      quizStarted = true;
      startContainer.style.display = "none";
      questionInfo.style.display = "flex";
      actionButtons.style.display = "flex";
      displayQuestion();
    }

    function displayQuestion() {
      if (currentQuestionIndex < quizData.length) {
        const currentQuestion = quizData[currentQuestionIndex];
        questionNumberElement.textContent = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
        questionElement.textContent = currentQuestion.question;
        optionsElement.innerHTML = "";

        currentQuestion.options.forEach((option, index) => {
          const li = document.createElement("li");
          li.className = "option";
          li.textContent = option;
          li.addEventListener("click", () => checkAnswer(index));
          optionsElement.appendChild(li);
        });

        startTimer();
        nextButton.style.display="inline-block"
        restartButton.style.display="none"
      } else {
        showScore();
      }
    }

    function restartQuiz() {
      quizStarted = false;
      currentQuestionIndex = 0;
      score = 0;
      clearInterval(timer);
       startContainer.style.display = "block";
      // actionButtons.style.display = "none";
       feedbackElement.textContent = "";
      startQuiz()
      displayQuestion();
    }

    function displayNextQuestion() {
      currentQuestionIndex++;
      clearInterval(timer);
      feedbackElement.textContent = "";
      displayQuestion();
    }

    function checkAnswer(selectedIndex) {
      clearInterval(timer);

      const currentQuestion = quizData[currentQuestionIndex];
      const correctIndex = currentQuestion.options.indexOf(currentQuestion.correctAnswer);

      const options = document.getElementsByClassName("option");
      for (let i = 0; i < options.length; i++) {
        options[i].style.pointerEvents = "none"; // Disable further interactions

        if (i === correctIndex) {
          options[i].style.border = "2px solid green";
          options[i].style.backgroundColor = "lightgreen";
        } else if (i === selectedIndex) {
          options[i].style.border = "2px solid red";
          options[i].style.backgroundColor = "lightcoral";
        }
      }

      if (selectedIndex === correctIndex) {
        score++;
        feedbackElement.textContent = "Correct!";
        feedbackElement.style.color = "green";
      } else {
        feedbackElement.textContent = "Wrong!";
        feedbackElement.style.color = "red";
      }

    //   setTimeout(() => {
    //     feedbackElement.textContent = "";
    //     nextButton.style.display = "inline-block";
    //     if (currentQuestionIndex < quizData.length - 1) {
    //   displayNextQuestion();
    // } else {
    //   showScore();
    // }
    //   }, 1000);
     }
    function startTimer() {
      timeLeft = 15;
      timerElement.textContent = `Time Left: ${timeLeft}`;
      timer = setInterval(() => {
        if (timeLeft === 0) {
      clearInterval(timer);
      checkAnswer(-1); 
      return;
    } else {
      timeLeft--;
      timerElement.textContent = `Time Left: ${timeLeft}`;
    }
  }, 1000);
}
    function showScore() {
      questionElement.textContent = "Quiz Completed!";
      optionsElement.innerHTML = "";
      feedbackElement.textContent = `Your Score: ${score}/${quizData.length}`;
      timerElement.textContent = "";
      restartButton.style.display = "inline-block";
      nextButton.style.display="none"
    }
  
