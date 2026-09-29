// ===============================
// QUIZ QUESTIONS
// ===============================

const questions = [
    {
        subject: "AI",
        difficulty: "Easy",
        question: "What does AI stand for?",
        options: [
            "Artificial Intelligence",
            "Automated Internet",
            "Advanced Information",
            "Artificial Internet"
        ],
        answer: 0
    },

    {
        subject: "AI",
        difficulty: "Easy",
        question: "Which of these is an example of AI?",
        options: [
            "Calculator",
            "Voice Assistant",
            "Keyboard",
            "Monitor"
        ],
        answer: 1
    },

    {
        subject: "AI",
        difficulty: "Medium",
        question: "What is machine learning?",
        options: [
            "A type of computer hardware",
            "A method where computers learn from data",
            "A programming language",
            "A database system"
        ],
        answer: 1
    },

    {
        subject: "Python",
        difficulty: "Easy",
        question: "Which symbol is used for comments in Python?",
        options: [
            "//",
            "/*",
            "#",
            "<!--"
        ],
        answer: 2
    },

    {
        subject: "Python",
        difficulty: "Easy",
        question: "Which function is used to display output in Python?",
        options: [
            "display()",
            "print()",
            "show()",
            "output()"
        ],
        answer: 1
    },

    {
        subject: "Python",
        difficulty: "Medium",
        question: "Which data type stores multiple values in an ordered collection?",
        options: [
            "List",
            "Integer",
            "Boolean",
            "Float"
        ],
        answer: 0
    },

    {
        subject: "Java",
        difficulty: "Easy",
        question: "Which keyword is used to create a class in Java?",
        options: [
            "class",
            "ClassName",
            "new",
            "create"
        ],
        answer: 0
    },

    {
        subject: "Java",
        difficulty: "Easy",
        question: "Which method is the starting point of a Java program?",
        options: [
            "start()",
            "run()",
            "main()",
            "execute()"
        ],
        answer: 2
    },

    {
        subject: "Java",
        difficulty: "Medium",
        question: "Which concept allows a class to have multiple forms?",
        options: [
            "Inheritance",
            "Polymorphism",
            "Encapsulation",
            "Abstraction"
        ],
        answer: 1
    },

    {
        subject: "DBMS",
        difficulty: "Easy",
        question: "What does DBMS stand for?",
        options: [
            "Database Management System",
            "Data Backup Management System",
            "Database Machine System",
            "Data Management Software"
        ],
        answer: 0
    },

    {
        subject: "DBMS",
        difficulty: "Easy",
        question: "Which SQL command is used to retrieve data?",
        options: [
            "INSERT",
            "UPDATE",
            "SELECT",
            "DELETE"
        ],
        answer: 2
    },

    {
        subject: "DBMS",
        difficulty: "Medium",
        question: "Which key uniquely identifies each record in a table?",
        options: [
            "Foreign Key",
            "Primary Key",
            "Candidate Key",
            "Alternate Key"
        ],
        answer: 1
    },

    {
        subject: "Web",
        difficulty: "Easy",
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlink Text Management Language",
            "Home Tool Markup Language"
        ],
        answer: 0
    },

    {
        subject: "Web",
        difficulty: "Easy",
        question: "Which tag is used to create a paragraph in HTML?",
        options: [
            "<h1>",
            "<p>",
            "<br>",
            "<div>"
        ],
        answer: 1
    },

    {
        subject: "Web",
        difficulty: "Medium",
        question: "Which language is mainly used to add interactivity to web pages?",
        options: [
            "HTML",
            "CSS",
            "JavaScript",
            "SQL"
        ],
        answer: 2
    }
];


// ===============================
// VARIABLES
// ===============================

let quizQuestions = [];
let currentQuestion = 0;
let userAnswers = [];
let timeLeft = 60;
let timerInterval;

let studentName = "";


// ===============================
// PAGE NAVIGATION
// ===============================

function showPage(pageId) {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    document.getElementById(pageId).classList.add("active");
}


function showSetup() {
    showPage("setupPage");
}


function goHome() {
    clearInterval(timerInterval);
    showPage("homePage");
}


// ===============================
// START QUIZ
// ===============================

function startQuiz() {

    studentName = document.getElementById("studentName").value.trim();

    const subject = document.getElementById("subject").value;
    const difficulty = document.getElementById("difficulty").value;

    if (studentName === "") {
        alert("Please enter your name.");
        return;
    }

    // Filter questions according to selection
    quizQuestions = questions.filter(question =>
        question.subject === subject &&
        question.difficulty === difficulty
    );

    // If selected difficulty has fewer questions,
    // use all questions from the selected subject
    if (quizQuestions.length === 0) {

        quizQuestions = questions.filter(question =>
            question.subject === subject
        );
    }

    // Shuffle questions
    quizQuestions = shuffleArray(quizQuestions);

    currentQuestion = 0;

    userAnswers = new Array(quizQuestions.length).fill(null);

    timeLeft = 60;

    showPage("quizPage");

    displayQuestion();

    startTimer();
}


// ===============================
// SHUFFLE QUESTIONS
// ===============================

function shuffleArray(array) {

    return array.sort(() => Math.random() - 0.5);
}


// ===============================
// DISPLAY QUESTION
// ===============================

function displayQuestion() {

    const question = quizQuestions[currentQuestion];

    document.getElementById("questionNumber").textContent =
        `Question ${currentQuestion + 1}`;

    document.getElementById("totalQuestions").textContent =
        `/ ${quizQuestions.length}`;

    document.getElementById("questionText").textContent =
        question.question;

    const optionsContainer =
        document.getElementById("optionsContainer");

    optionsContainer.innerHTML = "";


    question.options.forEach((option, index) => {

        const label = document.createElement("label");

        label.className = "option";

        if (userAnswers[currentQuestion] === index) {
            label.classList.add("selected");
        }

        label.innerHTML = `
            <input
                type="radio"
                name="answer"
                value="${index}"
                ${userAnswers[currentQuestion] === index ? "checked" : ""}
            >
            ${option}
        `;


        label.querySelector("input").addEventListener("change", () => {

            userAnswers[currentQuestion] = index;

            document.querySelectorAll(".option").forEach(item => {
                item.classList.remove("selected");
            });

            label.classList.add("selected");
        });


        optionsContainer.appendChild(label);

    });


    updateProgress();

    updateButtons();
}


// ===============================
// PROGRESS BAR
// ===============================

function updateProgress() {

    const progress =
        ((currentQuestion + 1) / quizQuestions.length) * 100;

    document.getElementById("progressBar").style.width =
        `${progress}%`;
}


// ===============================
// BUTTON CONTROL
// ===============================

function updateButtons() {

    const previousBtn =
        document.getElementById("previousBtn");

    const nextBtn =
        document.getElementById("nextBtn");

    const submitBtn =
        document.getElementById("submitBtn");


    // First question
    previousBtn.style.display =
        currentQuestion === 0 ? "none" : "inline-block";


    // Last question
    if (currentQuestion === quizQuestions.length - 1) {

        nextBtn.style.display = "none";
        submitBtn.style.display = "inline-block";

    } else {

        nextBtn.style.display = "inline-block";
        submitBtn.style.display = "none";
    }
}


// ===============================
// NEXT QUESTION
// ===============================

function nextQuestion() {

    if (currentQuestion < quizQuestions.length - 1) {

        currentQuestion++;

        displayQuestion();
    }
}


// ===============================
// PREVIOUS QUESTION
// ===============================

function previousQuestion() {

    if (currentQuestion > 0) {

        currentQuestion--;

        displayQuestion();
    }
}


// ===============================
// TIMER
// ===============================

function startTimer() {

    clearInterval(timerInterval);

    document.getElementById("timer").textContent =
        timeLeft;


    timerInterval = setInterval(() => {

        timeLeft--;

        document.getElementById("timer").textContent =
            timeLeft;


        if (timeLeft <= 0) {

            clearInterval(timerInterval);

            alert("Time is over! Your quiz will be submitted.");

            submitQuiz();
        }

    }, 1000);
}


// ===============================
// SUBMIT QUIZ
// ===============================

function submitQuiz() {

    clearInterval(timerInterval);

    let correct = 0;

    let wrong = 0;

    let unanswered = 0;


    quizQuestions.forEach((question, index) => {

        if (userAnswers[index] === null) {

            unanswered++;

        } else if (userAnswers[index] === question.answer) {

            correct++;

        } else {

            wrong++;
        }

    });


    const total = quizQuestions.length;

    const percentage =
        Math.round((correct / total) * 100);


    // Display result

    document.getElementById("resultName").textContent =
        studentName;

    document.getElementById("totalResult").textContent =
        total;

    document.getElementById("correctResult").textContent =
        correct;

    document.getElementById("wrongResult").textContent =
        wrong;

    document.getElementById("percentageResult").textContent =
        `${percentage}%`;


    // Result message

    let message = "";

    if (percentage >= 80) {

        message = "Excellent work! Keep learning and growing.";

    } else if (percentage >= 50) {

        message = "Good effort! Keep practicing to improve.";

    } else {

        message = "Keep practicing. You can improve with more preparation.";
    }


    document.getElementById("resultMessage").textContent =
        message;


    // Save result

    const result = {

        name: studentName,

        subject: document.getElementById("subject").value,

        difficulty: document.getElementById("difficulty").value,

        score: correct,

        total: total,

        percentage: percentage,

        date: new Date().toLocaleString()
    };


    localStorage.setItem(
        "quizResult",
        JSON.stringify(result)
    );


    showPage("resultPage");
}


// ===============================
// RESTART QUIZ
// ===============================

function restartQuiz() {

    startQuiz();
}


// ===============================
// LOAD PREVIOUS RESULT
// ===============================

function loadPreviousResult() {

    const savedResult =
        localStorage.getItem("quizResult");

    if (savedResult) {

        console.log(
            "Previous Result:",
            JSON.parse(savedResult)
        );
    }
}


// Run when website loads
loadPreviousResult();