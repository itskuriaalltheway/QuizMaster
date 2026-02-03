import { Link } from "react-router-dom";
import { Zap, Trophy, Brain, Target, BookOpen, Users } from "lucide-react";
import Layout from "../components/Layout";

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 py-20 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
              Master Your Knowledge
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed">
              Challenge yourself with our comprehensive quiz platform. Test your skills across multiple topics and difficulty levels. Join thousands of learners worldwide.
            </p>
            <Link
              to="/quiz"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition text-lg"
            >
              <Zap className="w-5 h-5" />
              Start Quiz Now
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-32 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-16">
            Why Choose QuizMaster?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-card rounded-xl p-8 border border-border shadow-sm hover:shadow-md transition">
              <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Smart Learning</h3>
              <p className="text-muted-foreground">
                Adaptive quizzes designed to test and expand your knowledge across diverse topics.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-card rounded-xl p-8 border border-border shadow-sm hover:shadow-md transition">
              <div className="bg-secondary/10 p-3 rounded-lg w-fit mb-4">
                <Target className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Difficulty Levels</h3>
              <p className="text-muted-foreground">
                Easy, Moderate, and Hard modes. Progress at your own pace and challenge yourself when ready.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-card rounded-xl p-8 border border-border shadow-sm hover:shadow-md transition">
              <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Multiple Topics</h3>
              <p className="text-muted-foreground">
                Choose from 5+ topics including Science, History, Technology, and more.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-card rounded-xl p-8 border border-border shadow-sm hover:shadow-md transition">
              <div className="bg-secondary/10 p-3 rounded-lg w-fit mb-4">
                <Zap className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Instant Feedback</h3>
              <p className="text-muted-foreground">
                Get immediate results with detailed explanations for each question.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-card rounded-xl p-8 border border-border shadow-sm hover:shadow-md transition">
              <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Track Progress</h3>
              <p className="text-muted-foreground">
                Monitor your performance and see how you improve over time.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-card rounded-xl p-8 border border-border shadow-sm hover:shadow-md transition">
              <div className="bg-secondary/10 p-3 rounded-lg w-fit mb-4">
                <Users className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Compete Globally</h3>
              <p className="text-muted-foreground">
                Compare your scores with others on our global leaderboard system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="py-20 sm:py-32 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-16">
            Available Topics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {["Science", "History", "Technology", "Geography", "Literature", "Sports"].map((topic, idx) => (
              <div
                key={idx}
                className="bg-background rounded-lg p-6 text-center border border-border hover:border-primary transition cursor-pointer group"
              >
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition">
                  {topic}
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                  {20 + idx * 5} questions available
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-accent py-16 sm:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Challenge Yourself?
          </h2>
          <p className="text-primary-foreground/90 text-lg mb-8 max-w-2xl mx-auto">
            Start your quiz journey today and join our community of learners.
          </p>
          <Link
            to="/quiz"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-foreground text-primary rounded-lg font-semibold hover:opacity-90 transition text-lg"
          >
            <Zap className="w-5 h-5" />
            Get Started Now
          </Link>
        </div>
      </section>
    </Layout>
  );
}
