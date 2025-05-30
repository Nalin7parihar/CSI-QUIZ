// Sample questions - you'll replace these with your own
export const techQuestions = [
  {
    id: 1,
    question: "A hacker intercepts your password via public Wi-Fi. What attack is this?",
    options: ["SQL Injection", "Man-in-the-middle", "DDoS", "Brute Force"],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: "Which of the following correctly describes the main functions of HTML, CSS, and JavaScript on a webpage",
    options: ["HTML makes the page interactive, CSS stores data, and JavaScript creates structure ", "HTML adds style, CSS creates structure, and JavaScript stores data", "HTML creates the structure, CSS adds style, and JavaScript makes the page interactive", ". HTML stores data, CSS makes the page interactive, and JavaScript adds style"],
    correctAnswer: 2,
  },
  {
    id: 3,
    question: "What is the full form of URL?",
    options: [
      "Uniform Resource Locator",
      "Universal Resource Language",
      "Uniform Record Locator",
      "Universal Record Language",
    ],
    correctAnswer: 0,
  },
  {
    id: 4,
    question: ". Imagine you have a recipe that tells you exactly what to do, in order, to bake a cake. In programming, what is this recipe called?",
    options: ["Hardware blueprint", "Data storage", "Algorithm", "Internet"],
    correctAnswer: 2,
  },
  {
    id: 5,
    question: "Which of these stores data permanently?",
    options: [
      "RAM",
      "ROM",
      "CPU",
      "Cache",
    ],
    correctAnswer: 1,
  },
  {
    id: 6,
    question: "What is a bug in programming?",
    options: [
      "Virus",
      "Syntax",
      "Error in code",
      "Password",
    ],
    correctAnswer: 2,
  },
  {
    id: 7,
    question: "Which of these stores multiple items under a single name?",
    options: ["Variable", "Function", "Array", "Loop"],
    correctAnswer: 2,
  },
  {
    id: 8,
    question: "What does virtual memory allow a computer to do?",
    options: ["Use disk space to extend RAM when physical RAM is full", "Store programs permanently", "Improve internet speed", "Protect against viruses"],
    correctAnswer: 0,
  },
  {
    id:9,
    question:  "What is a browser used for?",
    options : ["Writing code","Running games","Surfing the internet","Compressing files"],
    correctAnswer : 2
  },
  {
    id:10,
    question:  "Which of the following is an example of a cloud service?",
    options : ["Google Drive","Microsoft Word installed on your PC","USB flash drive","Printer"],
    correctAnswer : 0
  }
]

export const nonTechQuestions = [
  {
    id: 1,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    correctAnswer: 2,
  },
  {
    id: 3,
    question: "What is the capital of Japan?",
    options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
    correctAnswer: 2,
  },
  {
    id: 4,
    question: "Which element has the chemical symbol 'O'?",
    options: ["Gold", "Oxygen", "Osmium", "Oganesson"],
    correctAnswer: 1,
  },
  {
    id: 5,
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correctAnswer: 1,
  },
  {
    id: 6,
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: 3,
  },
  {
    id: 7,
    question: "In which year did World War II end?",
    options: ["1944", "1945", "1946", "1947"],
    correctAnswer: 1,
  },
  {
    id: 8,
    question: "What is the currency of the United Kingdom?",
    options: ["Euro", "Dollar", "Pound Sterling", "Franc"],
    correctAnswer: 2,
  },
]

// Function to get questions based on quiz type
export function getQuestions(type) {
  return type === "tech" ? techQuestions : nonTechQuestions
}

// Function to shuffle questions for randomization
export function shuffleQuestions(questions) {
  const shuffled = [...questions]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}
