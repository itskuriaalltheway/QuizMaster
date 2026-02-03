import { Link, useLocation } from "react-router-dom";
import { Brain } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition">
              <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                <Brain className="w-6 h-6" />
              </div>
              <h1 className="text-xl font-bold text-foreground hidden sm:block">QuizMaster</h1>
            </Link>

            {/* Navigation */}
            <nav className="flex items-center gap-1 sm:gap-2">
              <Link
                to="/"
                className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition ${
                  isActive("/")
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                Home
              </Link>
              <Link
                to="/quiz"
                className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition ${
                  isActive("/quiz")
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                Quiz
              </Link>
              <Link
                to="/leaderboard"
                className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition ${
                  isActive("/leaderboard")
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                Leaderboard
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-foreground mb-4">QuizMaster</h3>
              <p className="text-muted-foreground text-sm">
                Test your knowledge with our comprehensive quiz platform.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Features</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition">Multiple Topics</a></li>
                <li><a href="#" className="hover:text-primary transition">Difficulty Levels</a></li>
                <li><a href="#" className="hover:text-primary transition">Instant Feedback</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/" className="hover:text-primary transition">Home</Link></li>
                <li><Link to="/quiz" className="hover:text-primary transition">Start Quiz</Link></li>
                <li><Link to="/leaderboard" className="hover:text-primary transition">Leaderboard</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 QuizMaster. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
