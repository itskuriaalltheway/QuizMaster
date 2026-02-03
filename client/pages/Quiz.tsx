import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, XCircle, RotateCcw, Trophy } from "lucide-react";
import Layout from "../components/Layout";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface Topic {
  id: string;
  name: string;
  icon: string;
}

const TOPICS: Topic[] = [
  { id: "science", name: "Science", icon: "🔬" },
  { id: "history", name: "History", icon: "📚" },
  { id: "technology", name: "Technology", icon: "💻" },
  { id: "geography", name: "Geography", icon: "🌍" },
  { id: "literature", name: "Literature", icon: "✍️" },
  { id: "sports", name: "Sports", icon: "⚽" },
];

const QUESTIONS_DATABASE: Record<string, Record<string, Question[]>> = {
  science: {
    easy: [
      {
        id: 1,
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correct: 2,
        explanation: "The chemical symbol for gold is Au, from its Latin name 'Aurum'.",
      },
      {
        id: 2,
        question: "How many planets are in our solar system?",
        options: ["7", "8", "9", "10"],
        correct: 1,
        explanation: "There are 8 planets in our solar system: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune.",
      },
      {
        id: 3,
        question: "What is the powerhouse of the cell?",
        options: ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"],
        correct: 1,
        explanation: "The mitochondria is known as the powerhouse of the cell because it produces energy (ATP) for cellular activities.",
      },
    ],
    moderate: [
      {
        id: 4,
        question: "What is the pH of pure water at 25°C?",
        options: ["5", "6", "7", "8"],
        correct: 2,
        explanation: "Pure water at 25°C has a pH of 7, making it neutral.",
      },
      {
        id: 5,
        question: "Which gas makes up approximately 78% of Earth's atmosphere?",
        options: ["Oxygen", "Nitrogen", "Argon", "Carbon Dioxide"],
        correct: 1,
        explanation: "Nitrogen (N₂) makes up about 78% of the Earth's atmosphere, while oxygen makes up about 21%.",
      },
    ],
    hard: [
      {
        id: 6,
        question: "What is the name of the phenomenon where light bends when passing through different media?",
        options: ["Diffraction", "Refraction", "Reflection", "Dispersion"],
        correct: 1,
        explanation: "Refraction is the bending of light when it passes from one medium to another with a different refractive index.",
      },
      {
        id: 7,
        question: "Which quantum number determines the shape of an orbital?",
        options: ["Principal (n)", "Angular momentum (l)", "Magnetic (ml)", "Spin (ms)"],
        correct: 1,
        explanation: "The angular momentum quantum number (l) determines the shape of an orbital.",
      },
    ],
  },
  history: {
    easy: [
      {
        id: 1,
        question: "In what year did World War II end?",
        options: ["1943", "1944", "1945", "1946"],
        correct: 2,
        explanation: "World War II ended in 1945 with the surrender of Germany and Japan.",
      },
      {
        id: 2,
        question: "Who was the first President of the United States?",
        options: ["Thomas Jefferson", "George Washington", "Abraham Lincoln", "Benjamin Franklin"],
        correct: 1,
        explanation: "George Washington was the first President of the United States, serving from 1789 to 1797.",
      },
    ],
    moderate: [
      {
        id: 3,
        question: "In what year did the Berlin Wall fall?",
        options: ["1987", "1988", "1989", "1990"],
        correct: 2,
        explanation: "The Berlin Wall fell on November 9, 1989, marking the beginning of the end of the Cold War.",
      },
    ],
    hard: [
      {
        id: 4,
        question: "Which treaty ended the Thirty Years' War?",
        options: ["Treaty of Westphalia", "Peace of Augsburg", "Treaty of Münster", "Treaty of Osnabrück"],
        correct: 0,
        explanation: "The Treaty of Westphalia (1648) ended the Thirty Years' War and is considered the start of the modern nation-state system.",
      },
    ],
  },
  technology: {
    easy: [
      {
        id: 1,
        question: "What does CPU stand for?",
        options: ["Central Processing Unit", "Central Power Unit", "Computer Processing Unit", "Central Processor Unit"],
        correct: 0,
        explanation: "CPU stands for Central Processing Unit, the main component of a computer that executes instructions.",
      },
      {
        id: 2,
        question: "In what year was the first iPhone released?",
        options: ["2005", "2006", "2007", "2008"],
        correct: 2,
        explanation: "The first iPhone was released by Apple on June 29, 2007.",
      },
    ],
    moderate: [
      {
        id: 3,
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
        correct: 0,
        explanation: "HTML stands for HyperText Markup Language, used to create web pages.",
      },
    ],
    hard: [
      {
        id: 4,
        question: "What is the time complexity of binary search?",
        options: ["O(n)", "O(n log n)", "O(log n)", "O(1)"],
        correct: 2,
        explanation: "Binary search has a time complexity of O(log n) because it divides the search space in half with each iteration.",
      },
    ],
  },
  geography: {
    easy: [
      {
        id: 1,
        question: "What is the capital of France?",
        options: ["Lyon", "Marseille", "Paris", "Nice"],
        correct: 2,
        explanation: "Paris is the capital and largest city of France.",
      },
      {
        id: 2,
        question: "Which is the largest continent by area?",
        options: ["Africa", "Asia", "Europe", "Antarctica"],
        correct: 1,
        explanation: "Asia is the largest continent by area, covering about 44.58 million square kilometers.",
      },
    ],
    moderate: [
      {
        id: 3,
        question: "What is the capital of Australia?",
        options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
        correct: 2,
        explanation: "Canberra is the capital city of Australia, not Sydney which is the most well-known city.",
      },
    ],
    hard: [
      {
        id: 4,
        question: "Which mountain range contains Mount Kilimanjaro?",
        options: ["Atlas Mountains", "Rwenzori Mountains", "Eastern Arc Mountains", "Kenya Highlands"],
        correct: 2,
        explanation: "Mount Kilimanjaro is part of the Eastern Arc Mountains in Tanzania.",
      },
    ],
  },
  literature: {
    easy: [
      {
        id: 1,
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Christopher Marlowe", "William Shakespeare", "Ben Jonson", "Edmund Spenser"],
        correct: 1,
        explanation: "William Shakespeare wrote 'Romeo and Juliet', one of the most famous tragedies in English literature.",
      },
    ],
    moderate: [
      {
        id: 2,
        question: "In '1984', what is the name of Big Brother's secret police?",
        options: ["Stasi", "Thought Police", "Gestapo", "Secret Service"],
        correct: 1,
        explanation: "The Thought Police is the secret police force in George Orwell's '1984'.",
      },
    ],
    hard: [
      {
        id: 3,
        question: "Who is the author of 'One Hundred Years of Solitude'?",
        options: ["Pablo Neruda", "Gabriel García Márquez", "Jorge Luis Borges", "Julio Cortázar"],
        correct: 1,
        explanation: "Gabriel García Márquez wrote 'One Hundred Years of Solitude', a masterpiece of magical realism.",
      },
    ],
  },
  sports: {
    easy: [
      {
        id: 1,
        question: "How many players are on a basketball team on the court?",
        options: ["4", "5", "6", "7"],
        correct: 1,
        explanation: "A basketball team has 5 players on the court during a game.",
      },
    ],
    moderate: [
      {
        id: 2,
        question: "In tennis, what is a score of 40-40 called?",
        options: ["Deuce", "Advantage", "Match point", "Break point"],
        correct: 0,
        explanation: "In tennis, a score of 40-40 is called 'Deuce', and a player must win by 2 points from that position.",
      },
    ],
    hard: [
      {
        id: 3,
        question: "How many innings are in a standard baseball game?",
        options: ["7", "8", "9", "10"],
        correct: 2,
        explanation: "A standard baseball game consists of 9 innings, with each team getting a turn to bat and field.",
      },
    ],
  },
};

type QuizState = "selection" | "quiz" | "results";

interface QuizResults {
  score: number;
  total: number;
  topic: string;
  difficulty: string;
  answers: (number | null)[];
}

export default function Quiz() {
  const [state, setState] = useState<QuizState>("selection");
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [results, setResults] = useState<QuizResults | null>(null);

  const questions = selectedTopic && selectedDifficulty 
    ? QUESTIONS_DATABASE[selectedTopic]?.[selectedDifficulty] || []
    : [];

  const handleStartQuiz = () => {
    if (selectedTopic && selectedDifficulty) {
      const topicQuestions = QUESTIONS_DATABASE[selectedTopic]?.[selectedDifficulty] || [];
      setAnswers(new Array(topicQuestions.length).fill(null));
      setState("quiz");
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
    }
  };

  const handleNextQuestion = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = selectedAnswer;
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(newAnswers[currentQuestionIndex + 1] ?? null);
    } else {
      // Quiz completed
      const score = newAnswers.filter(
        (ans, idx) => ans === questions[idx].correct
      ).length;

      const topicName = TOPICS.find(t => t.id === selectedTopic)?.name || selectedTopic;
      
      setResults({
        score,
        total: questions.length,
        topic: topicName,
        difficulty: selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1),
        answers: newAnswers,
      });
      setState("results");
    }
  };

  const handleRetake = () => {
    setState("selection");
    setSelectedTopic("");
    setSelectedDifficulty("");
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setResults(null);
  };

  if (state === "selection") {
    return (
      <Layout>
        <div className="min-h-[70vh] bg-gradient-to-br from-primary/5 to-secondary/5 py-12">
          <div className="container mx-auto px-4">
            {/* Topic Selection */}
            <div className="max-w-4xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-8">Select a Topic</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {TOPICS.map((topic) => (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic.id)}
                    className={`p-6 rounded-lg border-2 transition font-semibold text-lg ${
                      selectedTopic === topic.id
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card hover:border-primary"
                    }`}
                  >
                    <span className="text-3xl mr-2">{topic.icon}</span>
                    {topic.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Selection */}
            <div className="max-w-4xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-8">Select Difficulty</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {["easy", "moderate", "hard"].map((difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className={`p-6 rounded-lg border-2 transition font-semibold text-lg ${
                      selectedDifficulty === difficulty
                        ? "border-secondary bg-secondary text-secondary-foreground"
                        : "border-border bg-card hover:border-secondary"
                    }`}
                  >
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Start Button */}
            <div className="max-w-4xl mx-auto text-center">
              <button
                onClick={handleStartQuiz}
                disabled={!selectedTopic || !selectedDifficulty}
                className={`px-8 py-4 rounded-lg font-semibold text-lg transition ${
                  selectedTopic && selectedDifficulty
                    ? "bg-primary text-primary-foreground hover:opacity-90"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (state === "quiz" && questions.length > 0) {
    const question = questions[currentQuestionIndex];

    return (
      <Layout>
        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 py-12 min-h-[70vh]">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-foreground">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </span>
                  <span className="text-sm font-semibold text-muted-foreground">
                    {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Card */}
              <div className="bg-card rounded-xl p-8 border border-border mb-8 shadow-sm">
                <h2 className="text-2xl font-bold text-foreground mb-8">
                  {question.question}
                </h2>

                {/* Options */}
                <div className="space-y-3">
                  {question.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedAnswer(idx)}
                      className={`w-full p-4 rounded-lg border-2 text-left transition font-medium ${
                        selectedAnswer === idx
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary"
                      }`}
                    >
                      <span className="inline-block w-6 h-6 rounded-full border-2 mr-3 text-center leading-4 text-sm">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex gap-4">
                <button
                  onClick={handleNextQuestion}
                  disabled={selectedAnswer === null}
                  className={`flex-1 py-3 rounded-lg font-semibold transition ${
                    selectedAnswer !== null
                      ? "bg-primary text-primary-foreground hover:opacity-90"
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  }`}
                >
                  {currentQuestionIndex === questions.length - 1 ? "Finish Quiz" : "Next Question"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (state === "results" && results) {
    const percentage = Math.round((results.score / results.total) * 100);

    return (
      <Layout>
        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 py-12 min-h-[70vh]">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              {/* Results Card */}
              <div className="bg-card rounded-xl p-8 border border-border shadow-md mb-8 text-center">
                <Trophy className="w-16 h-16 text-secondary mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-foreground mb-2">Quiz Complete!</h2>
                <p className="text-muted-foreground mb-8">
                  {results.topic} • {results.difficulty}
                </p>

                {/* Score Display */}
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8 mb-8">
                  <div className="text-5xl font-bold text-primary mb-2">
                    {results.score}/{results.total}
                  </div>
                  <div className="text-2xl font-semibold text-foreground mb-2">
                    {percentage}%
                  </div>
                  <p className="text-muted-foreground">
                    {percentage >= 80
                      ? "Excellent work!"
                      : percentage >= 60
                      ? "Good job!"
                      : percentage >= 40
                      ? "Not bad, keep practicing!"
                      : "Keep learning!"}
                  </p>
                </div>

                {/* Answer Review */}
                <div className="bg-background rounded-lg p-6 mb-8 text-left max-h-96 overflow-y-auto">
                  <h3 className="font-bold text-foreground mb-4">Answer Review</h3>
                  {questions.map((q, idx) => {
                    const userAnswer = results.answers[idx];
                    const isCorrect = userAnswer === q.correct;

                    return (
                      <div key={idx} className="mb-4 pb-4 border-b border-border last:border-0">
                        <div className="flex items-start gap-3 mb-2">
                          {isCorrect ? (
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-foreground">{q.question}</p>
                            {!isCorrect && (
                              <p className="text-xs text-muted-foreground mt-1">
                                Your answer: {userAnswer !== null ? q.options[userAnswer] : "Not answered"}
                              </p>
                            )}
                            <p className="text-xs text-green-600 mt-1">
                              Correct answer: {q.options[q.correct]}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 flex-col sm:flex-row">
                <button
                  onClick={handleRetake}
                  className="flex-1 py-3 px-6 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Try Another Quiz
                </button>
                <Link
                  to="/leaderboard"
                  className="flex-1 py-3 px-6 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:opacity-90 transition text-center flex items-center justify-center gap-2"
                >
                  <Trophy className="w-5 h-5" />
                  View Leaderboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return null;
}
