import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  CheckCircle,
  XCircle,
  RotateCcw,
  Trophy,
  ArrowRight,
} from "lucide-react";
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
  description: string;
  questionCount: number;
}

const TOPICS: Topic[] = [
  {
    id: "science",
    name: "Science",
    icon: "🔬",
    description: "Test your knowledge in physics, chemistry, and biology",
    questionCount: 20,
  },
  {
    id: "history",
    name: "History",
    icon: "📚",
    description: "Explore historical events and famous figures",
    questionCount: 20,
  },
  {
    id: "technology",
    name: "Technology",
    icon: "💻",
    description: "Challenge yourself with programming and tech questions",
    questionCount: 20,
  },
  {
    id: "geography",
    name: "Geography",
    icon: "🌍",
    description: "Master countries, capitals, and world knowledge",
    questionCount: 20,
  },
  {
    id: "literature",
    name: "Literature",
    icon: "✍️",
    description: "Test your knowledge of books and authors",
    questionCount: 20,
  },
  {
    id: "sports",
    name: "Sports",
    icon: "⚽",
    description: "Show what you know about athletic competitions",
    questionCount: 20,
  },
];

const QUESTIONS_DATABASE: Record<string, Record<string, Question[]>> = {
  science: {
    easy: [
      {
        id: 1,
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correct: 2,
        explanation:
          "The chemical symbol for gold is Au, from its Latin name 'Aurum'.",
      },
      {
        id: 2,
        question: "How many planets are in our solar system?",
        options: ["7", "8", "9", "10"],
        correct: 1,
        explanation:
          "There are 8 planets in our solar system: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune.",
      },
      {
        id: 3,
        question: "What is the powerhouse of the cell?",
        options: ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"],
        correct: 1,
        explanation:
          "The mitochondria is known as the powerhouse of the cell because it produces energy (ATP) for cellular activities.",
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
        explanation:
          "Nitrogen (N₂) makes up about 78% of the Earth's atmosphere, while oxygen makes up about 21%.",
      },
    ],
    hard: [
      {
        id: 6,
        question:
          "What is the name of the phenomenon where light bends when passing through different media?",
        options: ["Diffraction", "Refraction", "Reflection", "Dispersion"],
        correct: 1,
        explanation:
          "Refraction is the bending of light when it passes from one medium to another with a different refractive index.",
      },
      {
        id: 7,
        question: "Which quantum number determines the shape of an orbital?",
        options: [
          "Principal (n)",
          "Angular momentum (l)",
          "Magnetic (ml)",
          "Spin (ms)",
        ],
        correct: 1,
        explanation:
          "The angular momentum quantum number (l) determines the shape of an orbital.",
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
        explanation:
          "World War II ended in 1945 with the surrender of Germany and Japan.",
      },
      {
        id: 2,
        question: "Who was the first President of the United States?",
        options: [
          "Thomas Jefferson",
          "George Washington",
          "Abraham Lincoln",
          "Benjamin Franklin",
        ],
        correct: 1,
        explanation:
          "George Washington was the first President of the United States, serving from 1789 to 1797.",
      },
    ],
    moderate: [
      {
        id: 3,
        question: "In what year did the Berlin Wall fall?",
        options: ["1987", "1988", "1989", "1990"],
        correct: 2,
        explanation:
          "The Berlin Wall fell on November 9, 1989, marking the beginning of the end of the Cold War.",
      },
    ],
    hard: [
      {
        id: 4,
        question: "Which treaty ended the Thirty Years' War?",
        options: [
          "Treaty of Westphalia",
          "Peace of Augsburg",
          "Treaty of Münster",
          "Treaty of Osnabrück",
        ],
        correct: 0,
        explanation:
          "The Treaty of Westphalia (1648) ended the Thirty Years' War and is considered the start of the modern nation-state system.",
      },
    ],
  },
  technology: {
    easy: [
      {
        id: 1,
        question: "What does CPU stand for?",
        options: [
          "Central Processing Unit",
          "Central Power Unit",
          "Computer Processing Unit",
          "Central Processor Unit",
        ],
        correct: 0,
        explanation:
          "CPU stands for Central Processing Unit, the main component of a computer that executes instructions.",
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
        options: [
          "Hyper Text Markup Language",
          "High Tech Modern Language",
          "Home Tool Markup Language",
          "Hyperlinks and Text Markup Language",
        ],
        correct: 0,
        explanation:
          "HTML stands for HyperText Markup Language, used to create web pages.",
      },
    ],
    hard: [
      {
        id: 4,
        question: "What is the time complexity of binary search?",
        options: ["O(n)", "O(n log n)", "O(log n)", "O(1)"],
        correct: 2,
        explanation:
          "Binary search has a time complexity of O(log n) because it divides the search space in half with each iteration.",
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
        explanation:
          "Asia is the largest continent by area, covering about 44.58 million square kilometers.",
      },
    ],
    moderate: [
      {
        id: 3,
        question: "What is the capital of Australia?",
        options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
        correct: 2,
        explanation:
          "Canberra is the capital city of Australia, not Sydney which is the most well-known city.",
      },
    ],
    hard: [
      {
        id: 4,
        question: "Which mountain range contains Mount Kilimanjaro?",
        options: [
          "Atlas Mountains",
          "Rwenzori Mountains",
          "Eastern Arc Mountains",
          "Kenya Highlands",
        ],
        correct: 2,
        explanation:
          "Mount Kilimanjaro is part of the Eastern Arc Mountains in Tanzania.",
      },
    ],
  },
  literature: {
    easy: [
      {
        id: 1,
        question: "Who wrote 'Romeo and Juliet'?",
        options: [
          "Christopher Marlowe",
          "William Shakespeare",
          "Ben Jonson",
          "Edmund Spenser",
        ],
        correct: 1,
        explanation:
          "William Shakespeare wrote 'Romeo and Juliet', one of the most famous tragedies in English literature.",
      },
    ],
    moderate: [
      {
        id: 2,
        question: "In '1984', what is the name of Big Brother's secret police?",
        options: ["Stasi", "Thought Police", "Gestapo", "Secret Service"],
        correct: 1,
        explanation:
          "The Thought Police is the secret police force in George Orwell's '1984'.",
      },
    ],
    hard: [
      {
        id: 3,
        question: "Who is the author of 'One Hundred Years of Solitude'?",
        options: [
          "Pablo Neruda",
          "Gabriel García Márquez",
          "Jorge Luis Borges",
          "Julio Cortázar",
        ],
        correct: 1,
        explanation:
          "Gabriel García Márquez wrote 'One Hundred Years of Solitude', a masterpiece of magical realism.",
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
        explanation:
          "A basketball team has 5 players on the court during a game.",
      },
    ],
    moderate: [
      {
        id: 2,
        question: "In tennis, what is a score of 40-40 called?",
        options: ["Deuce", "Advantage", "Match point", "Break point"],
        correct: 0,
        explanation:
          "In tennis, a score of 40-40 is called 'Deuce', and a player must win by 2 points from that position.",
      },
    ],
    hard: [
      {
        id: 3,
        question: "How many innings are in a standard baseball game?",
        options: ["7", "8", "9", "10"],
        correct: 2,
        explanation:
          "A standard baseball game consists of 9 innings, with each team getting a turn to bat and field.",
      },
    ],
  },
};

type QuizState = "selection" | "difficulty" | "quiz" | "results";

interface QuizResults {
  score: number;
  total: number;
  topic: string;
  difficulty: string;
  answers: (number | null)[];
}

// Topics Landing Page
function TopicsLanding() {
  return (
    <Layout>
      <div className="bg-gradient-to-br from-primary/5 to-secondary/5 py-12 min-h-[70vh]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Choose Your Topic
            </h1>
            <p className="text-lg text-muted-foreground">
              Pick a subject you'd like to test your knowledge on. Each topic
              has questions at multiple difficulty levels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {TOPICS.map((topic) => (
              <Link
                key={topic.id}
                to={`/quiz/${topic.id}`}
                className="group bg-card rounded-xl p-6 border-2 border-border hover:border-primary transition hover:shadow-lg hover:-translate-y-1 cursor-pointer"
              >
                <div className="text-5xl mb-4">{topic.icon}</div>
                <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition">
                  {topic.name}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  {topic.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {topic.questionCount} Questions
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Topic Detail with Difficulty Selection
function TopicDifficulty({
  topic,
  onSelectDifficulty,
}: {
  topic: Topic;
  onSelectDifficulty: (diff: string) => void;
}) {
  return (
    <Layout>
      <div className="bg-gradient-to-br from-primary/5 to-secondary/5 py-12 min-h-[70vh]">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Back Button and Topic Header */}
            <Link
              to="/quiz"
              className="text-primary hover:text-primary/80 transition font-semibold mb-8 inline-flex items-center gap-2"
            >
              ← Back to Topics
            </Link>

            <div className="bg-card rounded-xl p-8 border border-border mb-8 text-center">
              <div className="text-6xl mb-4">{topic.icon}</div>
              <h1 className="text-4xl font-bold text-foreground mb-3">
                {topic.name}
              </h1>
              <p className="text-muted-foreground mb-4">{topic.description}</p>
              <p className="text-sm text-primary font-semibold">
                {topic.questionCount} questions available across all difficulty
                levels
              </p>
            </div>

            {/* Difficulty Selection */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Select Difficulty Level
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Easy */}
                <button
                  onClick={() => onSelectDifficulty("easy")}
                  className="group relative overflow-hidden bg-card rounded-lg p-8 border-2 border-green-200 hover:border-green-500 transition hover:shadow-lg text-left"
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-green-50 -mr-8 -mt-8 group-hover:bg-green-100 transition rounded-full" />
                  <div className="relative z-10">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      🟢
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      Easy
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Perfect for beginners learning the basics
                    </p>
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                      Recommended for starters
                    </span>
                  </div>
                </button>

                {/* Moderate */}
                <button
                  onClick={() => onSelectDifficulty("moderate")}
                  className="group relative overflow-hidden bg-card rounded-lg p-8 border-2 border-yellow-200 hover:border-yellow-500 transition hover:shadow-lg text-left"
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-50 -mr-8 -mt-8 group-hover:bg-yellow-100 transition rounded-full" />
                  <div className="relative z-10">
                    <div className="text-3xl font-bold text-yellow-600 mb-2">
                      🟡
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      Moderate
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Challenge yourself with intermediate questions
                    </p>
                    <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">
                      Most popular
                    </span>
                  </div>
                </button>

                {/* Hard */}
                <button
                  onClick={() => onSelectDifficulty("hard")}
                  className="group relative overflow-hidden bg-card rounded-lg p-8 border-2 border-red-200 hover:border-red-500 transition hover:shadow-lg text-left"
                >
                  <div className="absolute top-0 right-0 w-20 h-20 bg-red-50 -mr-8 -mt-8 group-hover:bg-red-100 transition rounded-full" />
                  <div className="relative z-10">
                    <div className="text-3xl font-bold text-red-600 mb-2">
                      🔴
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      Hard
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Master advanced topics and deep concepts
                    </p>
                    <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                      For experts
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Quiz Component (unchanged)
function QuizInterface({
  topic,
  difficulty,
  questions,
  onComplete,
}: {
  topic: Topic;
  difficulty: string;
  questions: Question[];
  onComplete: (results: QuizResults) => void;
}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(questions.length).fill(null),
  );

  const question = questions[currentQuestionIndex];

  const handleNextQuestion = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = selectedAnswer;
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(newAnswers[currentQuestionIndex + 1] ?? null);
    } else {
      const score = newAnswers.filter(
        (ans, idx) => ans === questions[idx].correct,
      ).length;

      onComplete({
        score,
        total: questions.length,
        topic: topic.name,
        difficulty: difficulty.charAt(0).toUpperCase() + difficulty.slice(1),
        answers: newAnswers,
      });
    }
  };

  return (
    <Layout>
      <div className="bg-gradient-to-br from-primary/5 to-secondary/5 py-12 min-h-[70vh]">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-foreground">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
                <span className="text-sm font-semibold text-muted-foreground">
                  {Math.round(
                    ((currentQuestionIndex + 1) / questions.length) * 100,
                  )}
                  %
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{
                    width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="bg-card rounded-xl p-8 border border-border mb-8 shadow-sm">
              <h2 className="text-2xl font-bold text-foreground mb-8">
                {question.question}
              </h2>

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

            <button
              onClick={handleNextQuestion}
              disabled={selectedAnswer === null}
              className={`w-full py-3 rounded-lg font-semibold transition ${
                selectedAnswer !== null
                  ? "bg-primary text-primary-foreground hover:opacity-90"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }`}
            >
              {currentQuestionIndex === questions.length - 1
                ? "Finish Quiz"
                : "Next Question"}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Results Component (unchanged)
function QuizResults({
  results,
  onRetry,
}: {
  results: QuizResults;
  onRetry: () => void;
}) {
  const percentage = Math.round((results.score / results.total) * 100);
  const questions =
    QUESTIONS_DATABASE[results.topic.toLowerCase()]?.[
      results.difficulty.toLowerCase()
    ] || [];

  return (
    <Layout>
      <div className="bg-gradient-to-br from-primary/5 to-secondary/5 py-12 min-h-[70vh]">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-card rounded-xl p-8 border border-border shadow-md mb-8 text-center">
              <Trophy className="w-16 h-16 text-secondary mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Quiz Complete!
              </h2>
              <p className="text-muted-foreground mb-8">
                {results.topic} • {results.difficulty}
              </p>

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

              <div className="bg-background rounded-lg p-6 mb-8 text-left max-h-96 overflow-y-auto">
                <h3 className="font-bold text-foreground mb-4">
                  Answer Review
                </h3>
                {questions.map((q, idx) => {
                  const userAnswer = results.answers[idx];
                  const isCorrect = userAnswer === q.correct;

                  return (
                    <div
                      key={idx}
                      className="mb-4 pb-4 border-b border-border last:border-0"
                    >
                      <div className="flex items-start gap-3 mb-2">
                        {isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-foreground">
                            {q.question}
                          </p>
                          {!isCorrect && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Your answer:{" "}
                              {userAnswer !== null
                                ? q.options[userAnswer]
                                : "Not answered"}
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

            <div className="flex gap-4 flex-col sm:flex-row">
              <button
                onClick={onRetry}
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

// Main Quiz Component with Routing
export default function Quiz() {
  const { topic } = useParams<{ topic?: string }>();
  const [state, setState] = useState<QuizState>(
    topic ? "difficulty" : "selection",
  );
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");
  const [results, setResults] = useState<QuizResults | null>(null);

  const currentTopic = TOPICS.find((t) => t.id === topic);

  if (state === "selection") {
    return <TopicsLanding />;
  }

  if (state === "difficulty" && currentTopic) {
    return (
      <TopicDifficulty
        topic={currentTopic}
        onSelectDifficulty={(difficulty) => {
          setSelectedDifficulty(difficulty);
          setState("quiz");
        }}
      />
    );
  }

  if (state === "quiz" && currentTopic && selectedDifficulty) {
    const questions =
      QUESTIONS_DATABASE[currentTopic.id]?.[selectedDifficulty] || [];
    return (
      <QuizInterface
        topic={currentTopic}
        difficulty={selectedDifficulty}
        questions={questions}
        onComplete={(quizResults) => {
          setResults(quizResults);
          setState("results");
        }}
      />
    );
  }

  if (state === "results" && results) {
    return (
      <QuizResults
        results={results}
        onRetry={() => {
          setState("selection");
          setSelectedDifficulty("");
          setResults(null);
        }}
      />
    );
  }

  return null;
}
